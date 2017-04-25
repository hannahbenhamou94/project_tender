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

        public int checkSuggestion(ConToTender con)
        {
            int numtender = Convert.ToInt32(con.numTender);
            try
            {
                using (DbtenderEntities1 DB = new DbtenderEntities1())
                {
                    var tender = DB.Tenders.Find(Convert.ToInt32(numtender));
                    if (tender== null)
                        return -1;

                }
            }

            catch (Exception) { }

            List<ConToTender> cont = new List<ConToTender>();
            using (DbtenderEntities1 DB = new DbtenderEntities1())
            {
                cont = DB.ConToTender.Where(a => a.numTender.Value.Equals(numtender)).OrderBy(a => a.numCon).ToList();
            }
            //  return Json(ProducToTender, JsonRequestBehavior.AllowGet);
            if (cont != null)
            {
                try


                {
                    foreach (var item in cont)
                    {

                        using (DbtenderEntities1 DB = new DbtenderEntities1())
                        {
                            if (item.numCon == con.numCon)
                                return 2;
                        }
                    }
                    return 0;
                }


                catch (Exception) { }
            }

            return 0;


        }

        public ActionResult checkTenders()
        {           
  
            List<Tenders> tenders = new List<Tenders>();
            using (DbtenderEntities1 DB = new DbtenderEntities1())
            {
                tenders = DB.Tenders.Where(a => a.status.Contains("טרם")).OrderBy(a => a.numTender).ToList();
            }
            //  return Json(ProducToTender, JsonRequestBehavior.AllowGet);
            if (tenders != null)
            {
                try


                {
                    foreach (var item in tenders)
                    {

                        using (DbtenderEntities1 DB = new DbtenderEntities1())
                        {
                            if (item.from <= DateTime.Now)
                            {
                                item.status = "פעיל";
                                try
                                {
                                    DB.SaveChanges();
                                }
                                catch
                                {

                                }
                            }
                            else if (item.from == DateTime.Now)
                            {
                                if (item.hourStart >=DateTime.Now.TimeOfDay)
                                {
                                    item.status = "פעיל";
                                    DB.SaveChanges();
                                }
                            }
                        }
                     }

                }
                catch (Exception) { }
            }

            return View();

        }
        public ActionResult getSuggestion(int numTender)
        {

            //if (Request.QueryString["id"] == null)
            //    return View();
            //int id = Convert.ToInt32(Request.QueryString["id"]);
            DbtenderEntities1 DB = new DbtenderEntities1();

            var result = from t in DB.Tenders
                         join c in DB.Categories on t.codCategory equals c.codeCategory
                         join s in DB.Suggestions on t.numTender equals s.numTender
                         join co in DB.Contestants on s.numCont equals co.numCon
                           where t.numTender == numTender
                         orderby s.numSuggestion
                         select new { t.name, t.numEditor, c.nameCategory, s.dataSuggestion, co.nameCompanyCont, co.phoneCont, s.priceToproduct,s.numSuggestion };


            //return View();

            return Json(result.ToList(), JsonRequestBehavior.AllowGet);

        }
        public int findTender()
        {

            int num = 0;
            DbtenderEntities1 DB = new DbtenderEntities1();

            List<Tenders> result = DB.Tenders.ToList();
            num = result.Count + 1;

            return num;
        }
        public ActionResult getLastTender()
        {
            int last = findTender();
            DbtenderEntities1 DB1 = new DbtenderEntities1();

            List<Tenders> results = DB1.Tenders.ToList();
            int tender = results[last].numTender;
            //if (Request.QueryString["id"] == null)
            //    return View();
            //int id = Convert.ToInt32(Request.QueryString["id"]);
            DbtenderEntities1 DB = new DbtenderEntities1();

            var result = from t in DB.Tenders
                         join c in DB.Categories on t.codCategory equals c.codeCategory
                          join co in DB.TypeTender on t.numType equals co.numType
                         where t.numTender == tender
                          select new { t.name, t.numEditor, c.nameCategory ,co.nameType,t.numTender,t.hourStart,t.typeAcquire};


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

        public ActionResult getDetail()
        {

            //if (Request.QueryString["id"] == null)
            //    return View();
            //int id = Convert.ToInt32(Request.QueryString["id"]);
            DbtenderEntities1 DB = new DbtenderEntities1();

            var result = from c in DB.Categories
                         join t in DB.Tenders on c.codeCategory equals t.codCategory
                         join s in DB.TypeTender on t.numType equals s.numType
                         join co in DB.Editors on t.numEditor equals co.numEditor
                         where (t.status).Contains("פעיל")
                         select new { t.numTender, t.name, t.typeAcquire, co.nameEditor, c.nameCategory, t.till, s.nameType, t.status ,t.numType};
            return Json(result.ToList(), JsonRequestBehavior.AllowGet);

        }


        public ActionResult getDetail2()
        {

            //if (Request.QueryString["id"] == null)
            //    return View();
            //int id = Convert.ToInt32(Request.QueryString["id"]);
            DbtenderEntities1 DB = new DbtenderEntities1();

            var result = from c in DB.Categories
                         join t in DB.Tenders on c.codeCategory equals t.codCategory
                         join s in DB.TypeTender on t.numType equals s.numType
                         join co in DB.Editors on t.numEditor equals co.numEditor
                          select new { t.numTender, t.name, t.typeAcquire, co.nameEditor, c.nameCategory, t.till, s.nameType, t.status, t.numType };
            return Json(result.ToList(), JsonRequestBehavior.AllowGet);

        }

        [HttpPost]
        public JsonResult save(Contestants con)
        {
            bool status = false;
            var isValidModel = TryUpdateModel(con);
           
                using (DbtenderEntities1 DB = new DbtenderEntities1())
                {


                    DB.Contestants.Add(con);
                    try
                    {
                        DB.SaveChanges();
                    }
                    catch (Exception)
                    {
                    }

                    status = true;
                }
            
            return new JsonResult { Data = new { status = status } };
        }
        public ActionResult getNumOfCon()
        {
            int num = 0;
            DbtenderEntities1 DB = new DbtenderEntities1();

            List<Contestants> result = DB.Contestants.ToList();
            num = result.Count + 1;

            return Json(num, JsonRequestBehavior.AllowGet);

        }

        //public ActionResult getLastTender()
        //{
        //    int num = 0;
        //    DbtenderEntities1 DB = new DbtenderEntities1();

        //    List<Contestants> result = DB.Contestants.ToList();
        //    num = result.Count + 1;

        //    return Json(num, JsonRequestBehavior.AllowGet);

        //}

    }
}