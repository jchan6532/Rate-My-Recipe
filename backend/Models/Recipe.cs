using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class Recipe
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(50)]
        [DataType(DataType.Text)]
        public string Name { get; set; }

        [Required]
        [StringLength(200)]
        [DataType(DataType.Text)]
        public string Description { get; set; }

        [Required]
        [DataType(DataType.DateTime)]
        public DateTime createdAt { get; set; }
    }
}