using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Services.UserService
{
    public interface IUserAuthService
    {
        dynamic CheckEmail(string email);
        dynamic CheckPassword(string password);
    }
}