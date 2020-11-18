using System;
using System.Collections;
using System.Linq;
using System.Collections.Generic;
using System.Diagnostics;
using NUnit.Framework;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.Support.UI;

namespace PSUCapstoneTestingProject.Front_end.UnitTests
{
    class ItemSelectionPageTetsts
    {
        IWebDriver driver;
        IWebElement username_input;
        IWebElement password_input;
        IWebElement organization_input;
        IWebElement login_button;
        IWebElement project_select;
        IWebElement select_item_type;

        [OneTimeSetUp]
        public void Setup()
        {
            driver = new ChromeDriver("C:/Users/Brandon Danielski/Documents");
            driver.Url = "http://localhost:3000/login";
            username_input = driver.FindElement(By.Id("username"));
            password_input = driver.FindElement(By.Id("password"));
            organization_input = driver.FindElement(By.Id("organization"));
            login();
            System.Threading.Thread.Sleep(1000);
            project_select = driver.FindElement(By.Id("projectselection"));
            select_item_type = driver.FindElement(By.Id("typeselection"));
        }

        [OneTimeTearDown]
        public void teardown()
        {
            System.Threading.Thread.Sleep(10000); //wait 5 seconds to clear cookies.
            //unlink();
            driver.Manage().Cookies.DeleteAllCookies(); //delete all cookies
        }

        public void login()
        {
            driver.Navigate();
            username_input.Clear();
            password_input.Clear();
            organization_input.Clear();
            username_input.SendKeys("capstone_tester");
            password_input.SendKeys("capstoneBITZpls!0");
            //username_input.SendKeys("bld");
            //password_input.SendKeys("September217");
            organization_input.SendKeys("Capstone2020");
            driver.FindElement(By.Id("signin")).Click();
            System.Threading.Thread.Sleep(1000);//Need to wait a second to get the swal2-title to get created.
        }

        public void unlink()
        {
            IWebDriver unlinkDriver = new ChromeDriver("C:/Users/Brandon Danielski/Documents");
            unlinkDriver.Url = "http://localhost:3000/unlink";
        }

        [Test]
        public void item_select_happy_path()
        {
            driver.FindElement(By.Id("itemid")).SendKeys("6807");
            driver.FindElement(By.Id("jiraid")).SendKeys("10065");
            driver.FindElement(By.Id("linkbutton")).Click();
            driver.FindElement(By.Id("itemid")).Clear();
            driver.FindElement(By.Id("jiraid")).Clear();
            Assert.IsTrue(driver.Url.Equals("http://localhost:3000/linkFields"));
        }

        [Test]
        public void item_bad_jama_input()
        {
            driver.FindElement(By.Id("itemid")).SendKeys("bad entry");
            driver.FindElement(By.Id("jiraid")).SendKeys("10065");
            driver.FindElement(By.Id("linkbutton")).Click();
            driver.FindElement(By.Id("itemid")).Clear();
            driver.FindElement(By.Id("jiraid")).Clear();
            Assert.IsTrue(driver.FindElement(By.Id("swal2-title")).Text.Equals("Sorry, we can't find that Jama ID));
        }

        [Test]
        public void item_bad_jira_inut()
        {
            driver.FindElement(By.Id("itemid")).SendKeys("6807");
            driver.FindElement(By.Id("jiraid")).SendKeys("bad entry");
            driver.FindElement(By.Id("linkbutton")).Click();
            driver.FindElement(By.Id("itemid")).Clear();
            driver.FindElement(By.Id("jiraid")).Clear();
            Assert.IsTrue(driver.FindElement(By.Id("swal2-title")).Text.Equals("Sorry, we can't find that Jama ID"));
        }

        [Test]
        public void item_bad_jama_bad_jira_input()
        {
            driver.FindElement(By.Id("itemid")).SendKeys("bad entry");
            driver.FindElement(By.Id("jiraid")).SendKeys("bad entry");
            driver.FindElement(By.Id("linkbutton")).Click();
            driver.FindElement(By.Id("itemid")).Clear();
            driver.FindElement(By.Id("jiraid")).Clear();
            Assert.IsTrue(driver.FindElement(By.Id("swal2-title")).Text.Equals("Sorry, we can't find that Jama ID));
        }

        [Test]
        public void item_no_jama_input()
        {
            driver.FindElement(By.Id("itemid")).SendKeys("");
            driver.FindElement(By.Id("jiraid")).SendKeys("10040");
            driver.FindElement(By.Id("linkbutton")).Click();
            driver.FindElement(By.Id("itemid")).Clear();
            driver.FindElement(By.Id("jiraid")).Clear();
            Assert.IsTrue(driver.FindElement(By.Id("swal2-title")).Text.Equals("Sorry, we can't find that Jama ID"));
        }

        [Test]
        public void item_no_jira_input()
        {
            driver.FindElement(By.Id("itemid")).SendKeys("6807");
            driver.FindElement(By.Id("jiraid")).SendKeys("");
            driver.FindElement(By.Id("linkbutton")).Click();
            driver.FindElement(By.Id("itemid")).Clear();
            driver.FindElement(By.Id("jiraid")).Clear();
            Assert.IsTrue(driver.FindElement(By.Id("swal2-title")).Text.Equals("Sorry, we can't find that Jama ID"));
        }

        [Test]
        public void item_no_jama_no_jira_input()
        {
            driver.FindElement(By.Id("itemid")).SendKeys("");
            driver.FindElement(By.Id("jiraid")).SendKeys("");
            driver.FindElement(By.Id("linkbutton")).Click();
            driver.FindElement(By.Id("itemid")).Clear();
            driver.FindElement(By.Id("jiraid")).Clear();
            Assert.IsTrue(driver.FindElement(By.Id("swal2-title")).Text.Equals("Sorry, we can't find that Jama ID"));
        }
    }


}
