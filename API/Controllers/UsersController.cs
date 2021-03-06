using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using API.DTOs;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
  [Authorize]
  public class UsersController : BaseApiController
  {
    private readonly IUserRepository _repository;
    private readonly IMapper _mapper;

    public UsersController(IUserRepository repository, IMapper mapper)
    {
      _repository = repository;
      _mapper = mapper;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers()
    {
      var users = await _repository.GetUsersAsync();
      var userToReturn = _mapper.Map<IEnumerable<MemberDto>>(users);
      return Ok(userToReturn);
    }

    [HttpGet("{userName}")]
    public async Task<ActionResult<MemberDto>> GetUser(string userName)
    {
      return await _repository.GetMemberAsync(userName);
    }

    [HttpPut]
    public async Task<ActionResult> UpdateUser(MemberUpdateDto memberUpdateDto)
    {
      var userName = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
      var user = await _repository.GetUserByUserNameAsync(userName);

      _mapper.Map(memberUpdateDto, user);

      _repository.Update(user);

      if (await _repository.SaveAllAsync()) NoContent();
      
      return BadRequest("Failed to update user");
    }
  }
}