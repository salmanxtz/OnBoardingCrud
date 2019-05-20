﻿using System;
using System.Collections.Generic;

namespace ReactCoreCrudApp.Models
{
    public partial class Store
    {
        public Store()
        {
            ProductSold = new HashSet<ProductSold>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }

        public ICollection<ProductSold> ProductSold { get; set; }
    }
}
