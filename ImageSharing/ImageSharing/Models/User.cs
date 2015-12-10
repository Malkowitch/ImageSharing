using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ImageSharing.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Password { get; set; }
        public ICollection<Picture> Picture { get; set; }
    }
}