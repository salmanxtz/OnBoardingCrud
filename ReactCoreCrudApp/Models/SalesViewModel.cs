using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReactCoreCrudApp.Models
{
    public class SalesViewModel
    {
        public int Id { get; set; }

        public int ProductId { get; set; }
        public string ProductName { get; set; }

        public int CustomerId { get; set; }
        public string CustomerName { get; set; }

        public int StoreId { get; set; }
        public string StoreAddress { get; set; }

        public DateTime DateSold { get; set; }

        public Customer Customer { get; set; }
        public Product Product { get; set; }
        public Store Store { get; set; }
    }
}
