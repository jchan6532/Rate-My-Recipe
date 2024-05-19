using System.Text.RegularExpressions;

namespace backend.Services.UserService
{
    public class UserAuthService : IUserAuthService
    {
        public dynamic CheckEmail(string email)
        {
            return new { success = true };
        }

        public dynamic CheckPassword(string password)
        {
            if (string.IsNullOrWhiteSpace(password)) return new { success = false, message = "Password is empty" };
            
            if (password.Length < 8) return new { success = false, message = "Password is less than 8 characters" };

            if (!Regex.IsMatch(password, @"[A-Z]")) return new { success = false, message = "Password has no uppdercase" };

            if (!Regex.IsMatch(password, @"[a-z]")) return new { success = false, message = "Password has no lowercase" };

            if (!Regex.IsMatch(password, @"[0-9]")) return new { success = false, message = "Password is not numeric" };

            //if (!Regex.IsMatch(password, @"[\W_]")) return new { success = false, message = "Password has no special charactrers" };

            return new { success = true };
        }
    }
}