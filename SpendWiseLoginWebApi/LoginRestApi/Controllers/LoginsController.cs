using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LoginRestApi.Models;
using Microsoft.AspNetCore.Cors;

namespace LoginRestApi.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    [EnableCors]
    public class LoginsController : ControllerBase
    {
       [HttpGet]
        public List<Login> GetLogins()
        {
            List<Login> list = new List<Login>();
            using (var db = new ProjectdbContext())
            {
                list = db.Logins.Include(add=>add.Organizationheads).ToList();
            }
            return list;
        }

        [HttpGet]
        public Login GetUserWithID(int id)
        {
            Login user;
            using (var db = new ProjectdbContext())
            {
                user = db.Logins.Find(id);
            }
            return user;
        }

        [HttpPost]
        public Login SaveSingleUser([FromBody] Login user)
        {
            using (var db = new ProjectdbContext())
            {
                user.Pwd = BCrypt.Net.BCrypt.HashPassword(user.Pwd);
                db.Logins.Add(user);
                db.SaveChanges();
            }
            return user;
        }


        [HttpPost]
        public Login SaveUser(Login user)
        {
            using (var db = new ProjectdbContext()) 
            {
                user.Pwd=BCrypt.Net.BCrypt.HashPassword(user.Pwd);
                db.Logins.Add(user);
                db.SaveChanges();
            }
            return user;
        }

        [HttpPost]
        public IActionResult CheckLogin([FromBody] Person login)
        {

            if (login == null || string.IsNullOrWhiteSpace(login.uid) || string.IsNullOrWhiteSpace(login.password))
            {
                return BadRequest(new { Success = false, Message = "Invalid login data" });
            }

            Login user;
            
            using (var db = new ProjectdbContext())
            {
                user = db.Logins.Where(u => u.Uname == login.uid).Include(add=>add.Organizationheads).FirstOrDefault();
               
                if (user != null && BCrypt.Net.BCrypt.Verify(login.password, user.Pwd))
                {
                  
                    return Ok(new {User = user });
                }
            }
            return Unauthorized(new { Success = false, Message = "Invalid username or password" });

        }

    }
}
