using System.ComponentModel.DataAnnotations;

namespace FYP.Models
{
    public class RegisterViewModel
    {
        [Required]
        public string Username { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        [Required]
        [DataType(DataType.Password)]
        [Compare("Password", ErrorMessage = "Passwords do not match.")]
        public string ConfirmPassword { get; set; }

        // Optionally, you can let the user select a client or role or assign defaults.
        public int ClientId { get; set; }
        public int RoleId { get; set; }
    }
}
