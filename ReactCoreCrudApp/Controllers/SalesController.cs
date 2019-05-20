using System;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using ReactCoreCrudApp.Models;

namespace ReactCoreCrudApp.Controllers
{
    [Route("api/[controller]")]
    public class SalesController : Controller
    {
        CPPSDataContext db = new CPPSDataContext();
        [HttpGet("sales")]
        public ActionResult ListOfSales()
        {
            var salesList = db.ProductSold.Select(sales =>
             new SalesViewModel
             {
                 Id = sales.Id,
                 ProductId = sales.ProductId,
                 CustomerId = sales.CustomerId,
                 StoreId = sales.StoreId,
                 CustomerName = sales.Customer.Name,
                 ProductName = sales.Product.Name,
                 StoreAddress = sales.Store.Address,
                 DateSold = (sales.DateSold).Date

             }).ToList();

            return Json(new { salesList });
        }
        [HttpPost("saveMappedSales")]
        public ActionResult SaveMappedSales([FromBody]SalesViewModel mappedSale)
        {
            var response = false;
            try
            {
                if (mappedSale.Id > 0)
                {
                    ProductSold sale = db.ProductSold.Where(x => x.Id == mappedSale.Id).FirstOrDefault();
                    sale.Id = mappedSale.Id;
                    sale.DateSold =(mappedSale.DateSold).Date;
                    sale.ProductId = mappedSale.ProductId;
                    sale.CustomerId = mappedSale.CustomerId;
                    sale.StoreId = mappedSale.StoreId;
                    db.SaveChanges();
                    response = true;
                }
                else
                {
                    ProductSold newSale = new ProductSold();                    
                    newSale.DateSold = (mappedSale.DateSold).Date;
                    newSale.CustomerId = mappedSale.CustomerId;
                    newSale.ProductId = mappedSale.ProductId;
                    newSale.StoreId = mappedSale.StoreId;

                    db.ProductSold.Add(newSale);
                    db.SaveChanges();
                    response = true;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return  Json(new { response});
        }

        [HttpPost("deleteMappedSales")]
        public JsonResult RemoveSales([FromBody]SalesViewModel mappedSale)
        {
            ProductSold sale = db.ProductSold.SingleOrDefault(s => s.Id == mappedSale.Id);
            var response = false;
            try
            {
                if (sale != null)
                {
                    db.ProductSold.Remove(sale);
                    db.SaveChanges();
                    response = true;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return Json(new {response });
        }
    }
}