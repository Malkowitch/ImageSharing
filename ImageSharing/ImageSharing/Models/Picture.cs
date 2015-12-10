namespace ImageSharing.Models
{
    public class Picture
    {
        public int Id { get; set; }
        public string Base64 { get; set; }
        public User Owner { get; set; }
    }
}