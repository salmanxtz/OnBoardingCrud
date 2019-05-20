using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ReactCoreCrudApp.Models;

namespace ReactCoreCrudApp.Controllers
{
    [Route("api/[controller]")]
    public class SampleDataController : Controller
    {
        [HttpGet("customers")]
        public ActionResult ListofCustomers()
        {
            CPPSDataContext db = new CPPSDataContext();
            var k = db.Customer.ToList();
            return Json(new { sucess ="yasss", k });

        }

    }
}
