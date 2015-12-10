using ImageSharing.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ImageSharing.Controllers
{
    public class LoginController : Controller
    {
        private ImageSharingDBConnection db = new ImageSharingDBConnection();
        // GET: Login
        public ActionResult Login(string UserName, string UserPassword)
        {
            List<User> users = db.UserDB.ToList();
            foreach (User item in users)
            {
                if (item.Name.Equals(UserName) && item.Password.Equals(UserPassword))
                {
                    Session["user"] = item;
                    return RedirectToAction("Index", "Home");
                }
            }
            return View();
        }
        public ActionResult Logout()
        {
            Session["user"] = null;
            return RedirectToAction("Login", "Login");
        }

        [HttpPost]
        public ActionResult CreateUser(User CreateUser)
        {
            try
            {
                List<User> users = db.UserDB.ToList();
                bool identicalUserFound = false;
                foreach (User item in users)
                {
                    if (item.Name.Equals(CreateUser.Name))
                    {
                        identicalUserFound = true;
                    }
                }
                if (!identicalUserFound)
                {
                    db.UserDB.Add(CreateUser);
                    db.SaveChanges();
                    Session["user"] = CreateUser;
                    return RedirectToAction("Index", "Home");
                }
                else
                {
                    ViewBag.Warning = "There is already a user with that name. Try again!";
                    return RedirectToAction("Login", "Login");
                }
            }
            catch (Exception)
            {
                ViewBag.Warning = "There is no information sent forth. Try again!";
                return RedirectToAction("Login", "Login");
            }
        }
    }
}