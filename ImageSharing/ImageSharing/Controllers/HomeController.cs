using ImageSharing.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ImageSharing.Controllers
{
    public class HomeController : Controller
    {
        private ImageSharingDBConnection db = new ImageSharingDBConnection();
        public ActionResult Index()
        {
            if (Session["user"] == null)
            {
                return RedirectToAction("Login", "Login");
            }
            User user = (User)Session["user"];
            return View(user);
        }
        //public ActionResult Index(string UserName)
        //{
        //    List<User> users = db.UserDB.ToList();
        //    User user = null;
        //    bool foundUser = false;

        //    foreach (User item in users)
        //    {
                
        //        if (item.Name.Equals(UserName))
        //        {
        //            user = item;
        //            foundUser = true;
        //        }
        //    }

        //    if (foundUser)
        //    {
        //        ViewBag.User = user;
        //        return View();
        //    }
        //    else
        //    {
        //        return RedirectToAction("Login", "Login");
        //    }
        //    //return View();
        //}
        //public ActionResult Login()
        //{
        //    return View();
        //}
        //[HttpPost]
        //public ActionResult CreateUser(User CreateUser)
        //{
        //    try
        //    {
        //        List<User> users = db.UserDB.ToList();
        //        bool identicalUserFound = false;
        //        foreach (User item in users)
        //        {
        //            if (item.Name.Equals(CreateUser.Name))
        //            {
        //                identicalUserFound = true;
        //            }
        //        }
        //        if (!identicalUserFound)
        //        {
        //            db.UserDB.Add(CreateUser);
        //            db.SaveChanges();
        //            return RedirectToAction("Index/" + CreateUser.Name);
        //        }
        //        else
        //        {
        //            ViewBag.Warning = "There is already a user with that name. Try again!";
        //            return RedirectToAction("Login");
        //        }
        //    }
        //    catch (Exception)
        //    {
        //        ViewBag.Warning = "There is no information sent forth. Try again!";
        //        return RedirectToAction("Login");
        //    }
        //}
    }
}