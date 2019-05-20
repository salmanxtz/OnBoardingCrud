using System;
using System.Collections.Generic;

namespace ReactCoreCrudApp.Models
{
    public partial class Product
    {
        public Product()
        {
            ProductSold = new HashSet<ProductSold>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public decimal? Price { get; set; }

        public ICollection<ProductSold> ProductSold { get; set; }
    }
}
