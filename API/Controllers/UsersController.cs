using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Extenisions;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
  [Authorize]
  public class UsersController : BaseApiController
  {
    private readonly IUserRepository _repository;
    private readonly IMapper _mapper;
    private readonly IPhotoService _photoService;
    private readonly IPhotoService _photService;

    public UsersController(IUserRepository repository, IMapper mapper, IPhotoService photoService)
    {
      _repository = repository;
      _mapper = mapper;
      _photoService = photoService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers()
    {
      var users = await _repository.GetUsersAsync();
      var userToReturn = _mapper.Map<IEnumerable<MemberDto>>(users);
      return Ok(userToReturn);
    }

    [HttpGet("{userName}", Name = "GetUser")]
    public async Task<ActionResult<MemberDto>> GetUser(string userName)
    {
      return await _repository.GetMemberAsync(userName);
    }

    [HttpPut]
    public async Task<ActionResult> UpdateUser(MemberUpdateDto memberUpdateDto)
    {
      var user = await _repository.GetUserByUserNameAsync(User.GetUserName());

      _mapper.Map(memberUpdateDto, user);

      _repository.Update(user);

      if (await _repository.SaveAllAsync()) NoContent();
      
      return BadRequest("Failed to update user");
    }

    [HttpPost("add-photo")]
    public async Task<ActionResult<PhotoDto>> AddPhtoto(IFormFile file)
    {
      var user = await _repository.GetUserByUserNameAsync(User.GetUserName());
      var result = await _photoService.AddPhotoASync(file);
      
      if (result.Error != null) return BadRequest(result.Error.Message);
      
      var photo = new Photo
      {
        Url = result.SecureUrl.AbsoluteUri,
        PublicId = result.PublicId,
      };

      if (user.Photos.Count == 0)
      {
        photo.IsMain = true;
      }

      if (await _repository.SaveAllAsync())
      {
        // return CreatedAtRoute("GetUSer", _mapper.Map<PhotoDto>(photo));
        return CreatedAtRoute("GetUSer", new {userName = user.UserName} , _mapper.Map<PhotoDto>(photo));
      }
      
      
      return BadRequest("Problem adding photo");
    }
  }
}