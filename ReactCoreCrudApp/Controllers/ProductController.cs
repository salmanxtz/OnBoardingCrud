using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ReactCoreCrudApp.Models;

namespace ReactCoreCrudApp.Controllers
{
    [Route("api/[controller]")]
    public class ProductController : Controller
    {
        CPPSDataContext db = new CPPSDataContext();
        [HttpGet("products")]
        public ActionResult LIstOfProducts()
        {
            List<ProductViewModel> productList = db.Product.Select(p =>
                new ProductViewModel
                {
                    Id = p.Id,
                    Name = p.Name,
                    Price = p.Price

                }).ToList();
            return Json(new { productList });
        }

        //saving/updating Product data into database
        //        [HttpPost]
        [HttpPost("editProducts")]
        public ActionResult EditProducts([FromBody]ProductViewModel productViewModel)
        {
            var result = false;
            
            try
            {
                if (productViewModel.Id > 0)
                {
                    Product product = db.Product.SingleOrDefault(p => p.Id == productViewModel.Id);
                    //product.Id = productViewModel.Id;
                    product.Name = productViewModel.Name;
                    product.Price = productViewModel.Price;
                    db.SaveChanges();
                    result = true;
                }
                else
                {
                    Product product = new Product
                    {
                        //Id = productViewModel.Id,
                        Name = productViewModel.Name,
                        Price = productViewModel.Price
                    };
                    db.Product.Add(product);
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

        [HttpPost("deleteProducts")]
        public ActionResult DeleteProducts([FromBody]ProductViewModel productViewModel)
        {
            try
            {
                if (productViewModel.Id > 0)
                {
                    Product product = db.Product.SingleOrDefault(p => p.Id == productViewModel.Id);
                    db.Remove(product);
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