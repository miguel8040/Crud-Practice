using System.ComponentModel.DataAnnotations;

namespace Cruds_Practice.Models
{
    public class CT_Director
    {
        [Key]
        public int PKDirector { get; set; }
        [MaxLength(200)]
        public string Name { get; set; }
        [MaxLength(100)]
        public string Nationality { get; set; }
        public int Age { get; set; }
        public bool Active { get; set; } = true;
    }
}
