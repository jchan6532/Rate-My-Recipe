using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class Like
    {
        [ForeignKey("User")]
        [Required]
        public string UserId { get; set; }
        
        [ForeignKey("Recipe")]
        [Required]
        public string RecipeId { get; set; }

        // Navigation properties
        public User? User { get; set; }
        public Recipe? Recipe { get; set; }
    }
}