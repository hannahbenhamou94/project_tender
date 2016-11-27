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