using System;
using System.Collections;
using System.Linq;
using System.Collections.Generic;
using System.Diagnostics;
using NUnit.Framework;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;

namespace PSUCapstoneTestingProject.Front_end.UnitTests
{
    class ItemSelectionPageTetsts
    {
        IWebDriver driver;
        IWebElement username_input;
        IWebElement password_input;
        IWebElement organization_input;
        IWebElement login_button;

        [OneTimeSetUp]
        public void Setup()
        {
            driver = new ChromeDriver("C:/Users/Brandon Danielski/Documents");
            driver.Url = "http://localhost:3000/";
            username_input = driver.FindElement(By.Id("username"));
            password_input = driver.FindElement(By.Id("password"));
            organization_input = driver.FindElement(By.Id("organization"));
            login();
        }

        public void login()
        {
            driver.Navigate();
            username_input.Clear();
            password_input.Clear();
            organization_input.Clear();
            username_input.SendKeys("capstone_tester");
            password_input.SendKeys("capstoneBITZpls!0");
            organization_input.SendKeys("capstone2020");
            driver.FindElement(By.Id("signin")).Click();
            System.Threading.Thread.Sleep(1000);//Need to wait a second to get the swal2-title to get created.
        }

        [Test]
        public void item_select_happy_path()
        {
            Assert.Pass();
        }
    }


}
