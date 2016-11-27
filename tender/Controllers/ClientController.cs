using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using tender.Models;

namespace tender.Controllers
{
    public class ClientController : Controller
    {
        // GET: Client
        public ActionResult Index()
        {
            return View();
        }


        public ActionResult getSuggestion(int numTender)
        {

            //if (Request.QueryString["id"] == null)
            //    return View();
            //int id = Convert.ToInt32(Request.QueryString["id"]);
            DbtenderEntities1 DB = new DbtenderEntities1();

            var result = from c in DB.Categories
                         join t in DB.Tenders on c.codeCategory equals t.codCategory
                         join s in DB.Suggestions on t.numTender equals s.numTender
                         join co in DB.Contestants on s.numCont equals co.numCon
                         join p in DB.ProducToTender on t.numTender equals p.numTender
                         join s1 in DB.SuggestionDetail on p.numProduct equals s1.numproduct
                         where t.numTender == numTender
                         orderby p.NameProduct
                         select new { t.name, t.numEditor, c.nameCategory, s.timeSuggestion, p.NameProduct, co.nameCompanyCont, co.phoneCont, s1.priceToProduct };


            //return View();

            return Json(result.ToList(), JsonRequestBehavior.AllowGet);

        }

        public JsonResult GetSiteMenus()
        {
            using (DbtenderEntities1 dc = new DbtenderEntities1())
            {
                var menu = dc.ClientMenu.ToList();
                return new JsonResult { Data = menu, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }
        }

        public ActionResult Suggestions()
        {
            DbtenderEntities1 DB = new DbtenderEntities1();
            List<Suggestions> TypeTender = DB.Suggestions.ToList();

            return View(TypeTender);

        }

        public ActionResult Tenders()
        {
            DbtenderEntities1 DB = new DbtenderEntities1();
            List<Tenders> TypeTender = DB.Tenders.ToList();

            return View(TypeTender);

        }

    }
}