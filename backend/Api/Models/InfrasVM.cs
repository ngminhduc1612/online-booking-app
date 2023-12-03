using System;

namespace Api.Models
{
    public class InfrasVM
    {
        public Guid InfrasId { get; set; }
        public string NameItem { get; set; }
        public byte Status { get; set; }
        public string Description { get; set; }
    }
}
