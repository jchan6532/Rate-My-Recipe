using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class Comment
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(200)]
        [DataType(DataType.Text)]
        public string Content { get; set; }

        [Required]
        [DataType(DataType.DateTime)]
        [DefaultValue(typeof(DateTime), "")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}