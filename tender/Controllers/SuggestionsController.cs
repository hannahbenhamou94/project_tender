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
    public class SuggestionsController : Controller
    {
        // GET: Suggestions
        public ActionResult Suggestions()
        {
            return View();
        }
        public ActionResult HollandSuggest()
        {
              return View();
        }
         
        public ActionResult stopTender(string numTender)
        {

            try
            {
                using (DbtenderEntities1 DB = new DbtenderEntities1())
                {
                    var tender = DB.Tenders.Find(Convert.ToInt32(numTender));
                    tender.status = "סגור";
                    DB.SaveChanges();
                }
            }
            catch (Exception) { }
            return View();
        }

        public ActionResult getSuggestionDetail(int numTender)
        {

            DbtenderEntities1 DB = new DbtenderEntities1();


            var status = from t in DB.Tenders
                         where t.numTender == numTender 
                         select  t.status;
            if(status.ToList()[0].ToString().Contains("סגור"))
            {
                return Json("close", JsonRequestBehavior.AllowGet);

            }

            //return View();


            var result = from  p in DB.ProducToTender
                          join  s in DB.Suggestions on p.numTender equals s.numTender
                           where p.numTender == numTender 
                         orderby p.NameProduct
                         select  new { p.numProduct,p.NameProduct,p.Amount,s.priceToproduct };


            //return View();

            return Json(result.Distinct().ToList(), JsonRequestBehavior.AllowGet);

        }

        public ActionResult getTender(int numTender)
        {

            List<Tenders> Tender = new List<Tenders>();
            using (DbtenderEntities1 DB = new DbtenderEntities1())
            {
                Tender = DB.Tenders.Where(a => a.numTender.Equals(numTender)).OrderBy(a => a.numTender).ToList();
            }
            return Json(Tender, JsonRequestBehavior.AllowGet);

        }
        public ActionResult getProduct(int numTender)
        {

            List<ProducToTender> products = new List<ProducToTender>();
            using (DbtenderEntities1 DB = new DbtenderEntities1())
            {
                products = DB.ProducToTender.Where(a => a.numTender.Equals(numTender)).OrderBy(a => a.numTender).ToList();
            }
            return Json(products, JsonRequestBehavior.AllowGet);

        }
        public ActionResult getType(int numType)
        {
            List<TypeTender> type = new List<TypeTender>();
            using (DbtenderEntities1 DB = new DbtenderEntities1())
            {
                type = DB.TypeTender.Where(a => a.numType.Equals(numType)).OrderBy(a => a.nameType).ToList();
            }
            return Json(type, JsonRequestBehavior.AllowGet);
        }

        public ActionResult getSuggestion(int numTender)
        {

            List<Suggestions> products = new List<Suggestions>();
            using (DbtenderEntities1 DB = new DbtenderEntities1())
            {
                products = DB.Suggestions.Where(a => a.numTender.Equals(numTender)).OrderBy(a => a.numSuggestion).ToList();
            }
            return Json(products, JsonRequestBehavior.AllowGet);

        }

        public ActionResult getPrice(int numSuggestion)
        {

            List<SuggestionDetail> products = new List<SuggestionDetail>();
            using (DbtenderEntities1 DB = new DbtenderEntities1())
            {
                products = DB.SuggestionDetail.Where(a => a.numsuggest.Equals(numSuggestion)).OrderBy(a => a.priceToProduct).ToList();
            }
            return Json(products, JsonRequestBehavior.AllowGet);

        }

    }
}