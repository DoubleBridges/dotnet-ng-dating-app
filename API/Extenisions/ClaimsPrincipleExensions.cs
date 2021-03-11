using System.Security.Claims;

namespace API.Extenisions
{
    public static class ClaimsPrincipleExensions
    {
        public static string GetUserName(this ClaimsPrincipal user)
        {
            return user.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        }
    }
}