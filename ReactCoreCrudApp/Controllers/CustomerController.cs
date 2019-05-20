using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ReactCoreCrudApp.Models;

namespace ReactCoreCrudApp.Controllers
{
    [Route("api/[controller]")]
    public class CustomerController : Controller
    {
        CPPSDataContext db = new CPPSDataContext();

        [HttpGet("customers")]
        public ActionResult ListOfCustomers()
        {
            List<CustomerViewModel> customerList = db.Customer.Select(c =>
            new CustomerViewModel
            {
                Id = c.Id,
                Name = c.Name,
                Address = c.Address
            }).ToList();
            return Json(new {customerList});            
        }

        //saving/updating Product data into database
        
        [HttpPost("editCustomers")]
        public ActionResult EditCustomers([FromBody]CustomerViewModel customerViewModel)
        {
            var result = false;

            try
            {
                if (customerViewModel.Id > 0)
                {
                    Customer customer = db.Customer.SingleOrDefault(p => p.Id == customerViewModel.Id);
                    //customer.Id = customerViewModel.Id;
                    customer.Name = customerViewModel.Name;
                    customer.Address = customerViewModel.Address;
                    db.SaveChanges();
                    result = true;
                }
                else
                {
                    Customer customer = new Customer
                    {
                        //Id = customerViewModel.Id,
                        Name = customerViewModel.Name,
                        Address = customerViewModel.Address
                    };
                    db.Customer.Add(customer);
                    db.SaveChanges();
                    result = true;
                }

            }
            catch (Exception ex)
            {
                throw ex;
            }
            return Json(new { result });
        }

        // deleteing customer from Customer list
        [HttpPost("deleteCustomers")]
        public ActionResult DeleteCustomers([FromBody]CustomerViewModel customerViewModel)
        {
            try
            {
                if (customerViewModel.Id > 0)
                {
                    Customer customer = db.Customer.SingleOrDefault(c => c.Id == customerViewModel.Id);
                    db.Remove(customer);
                    db.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return Json(new { result = true });
        }

    }
}