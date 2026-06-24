using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Cruds_Practice.Models
{
    public class CT_Movie
    {
        [Key]
        public int PKMovie { get; set; }
        public int FKDirector { get; set; }
        [MaxLength(100)]
        public string Name { get; set; }
        public DateOnly Releasedate { get; set; }
        public TimeOnly Duration { get; set; }
        [MaxLength(50)]
        public string Gender { get; set; }

        [ForeignKey("FKDirector")]
        public virtual CT_Director? Director { get; set; }
    }
}
