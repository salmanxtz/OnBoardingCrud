using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ReactCoreCrudApp.Models;

namespace ReactCoreCrudApp.Controllers
{
    [Route("api/[controller]")]
    public class StoreController : Controller
    {
        CPPSDataContext db = new CPPSDataContext();

        // Fetching Stores List

        [HttpGet("stores")]
        public ActionResult ListOfStores()
        {
            List<StoreViewModel> storeList = db.Store.Select(store =>
             new StoreViewModel
             {
                 Id = store.Id,
                 Name = store.Name,
                 Address = store.Address
             }).ToList();
            return Json(new {storeList});
        }

        //saving/updating Product data into database

        [HttpPost("editStores")]
        public ActionResult EditStores([FromBody]StoreViewModel storeViewModel)
        {
            var result = false;
            try
            {
                if (storeViewModel.Id > 0)
                {
                    Store store = db.Store.SingleOrDefault(s => s.Id == storeViewModel.Id);
                    //store.Id = storeViewModel.Id;
                    store.Name = storeViewModel.Name;
                    store.Address = storeViewModel.Address;
                    db.SaveChanges();
                    result = true;
                }
                else
                {
                    Store store = new Store
                    {
                        //Id = storeViewModel.Id,
                        Name = storeViewModel.Name,
                        Address = storeViewModel.Address
                    };
                    db.Store.Add(store);
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

        [HttpPost("deleteStores")]
        public ActionResult DeleteStores([FromBody]StoreViewModel storeViewModel)
        {
            try
            {
                if (storeViewModel.Id > 0)
                {
                    Store store = db.Store.SingleOrDefault(s => s.Id == storeViewModel.Id);
                    db.Remove(store);
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