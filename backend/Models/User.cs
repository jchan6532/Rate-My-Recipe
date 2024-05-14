using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(50)]
        [DataType(DataType.Text)]
        public string FirstName { get; set; }

        [Required]
        [StringLength(50)]
        [DataType(DataType.Text)]
        public string LastName { get; set; }

        [Required]
        [StringLength(50)]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }

        [Required]
        [StringLength(50)]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        [Required]
        [DataType(DataType.DateTime)]
        public DateTime createdAt { get; set; }
    }
}