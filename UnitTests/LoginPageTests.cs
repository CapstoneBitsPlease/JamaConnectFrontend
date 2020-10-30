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
    class LoginPageTests
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
            //login_button = driver.FindElement(By.Id(""));
        }

        [Test]
        public void happy_path_login()
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
            Assert.IsTrue(driver.FindElement(By.Id("swal2-title")).Text.Equals("User has been authenticated"));
            Assert.IsTrue(driver.Url.Equals("http://localhost:3000/selectItem"));
            driver.Url = "http://localhost:3000/";
        }

        [Test]
        public void bad_username_login()
        {
            driver.Navigate();
            username_input.Clear();
            password_input.Clear();
            organization_input.Clear();
            username_input.SendKeys("bad_username");
            password_input.SendKeys("capstoneBITZpls!0");
            organization_input.SendKeys("capstone2020");
            driver.FindElement(By.Id("signin")).Click();
            System.Threading.Thread.Sleep(1000);//Need to wait a second to get the swal2-title to get created.
            Assert.IsTrue(driver.FindElement(By.Id("swal2-title")).Text.Equals("Invalid login"));
        }

        [Test]
        public void bad_password_login()
        {
            driver.Navigate();
            username_input.Clear();
            password_input.Clear();
            organization_input.Clear();
            username_input.SendKeys("capstone_tester");
            password_input.SendKeys("bad_password");
            organization_input.SendKeys("capstone2020");
            driver.FindElement(By.Id("signin")).Click();
            System.Threading.Thread.Sleep(1000);//Need to wait a second to get the swal2-title to get created.
            Assert.IsTrue(driver.FindElement(By.Id("swal2-title")).Text.Equals("Invalid login"));
        }

        [Test]
        public void bad_organization_login()
        {
            driver.Navigate();
            username_input.Clear();
            password_input.Clear();
            organization_input.Clear();
            username_input.SendKeys("capstone_tester");
            password_input.SendKeys("capstoneBITZpls!0");
            organization_input.SendKeys("bad_organization");
            driver.FindElement(By.Id("signin")).Click();
            System.Threading.Thread.Sleep(1000);//Need to wait a second to get the swal2-title to get created.
            Assert.IsTrue(driver.FindElement(By.Id("swal2-title")).Text.Equals("Invalid login"));
        }

        [Test]
        public void bad_username_and_bad_password_login()
        {
            driver.Navigate();
            username_input.Clear();
            password_input.Clear();
            organization_input.Clear();
            username_input.SendKeys("bad_username");
            password_input.SendKeys("bad_password");
            organization_input.SendKeys("bad_organization");
            driver.FindElement(By.Id("signin")).Click();
            System.Threading.Thread.Sleep(1000);//Need to wait a second to get the swal2-title to get created.
            Assert.IsTrue(driver.FindElement(By.Id("swal2-title")).Text.Equals("Invalid login"));
        }

        [Test]
        public void bad_username_and_bad_organization_login()
        {
            driver.Navigate();
            username_input.Clear();
            password_input.Clear();
            organization_input.Clear();
            username_input.SendKeys("bad_username");
            password_input.SendKeys("capstoneBITZpls!0");
            organization_input.SendKeys("bad_organization");
            driver.FindElement(By.Id("signin")).Click();
            System.Threading.Thread.Sleep(1000);//Need to wait a second to get the swal2-title to get created.
            Assert.IsTrue(driver.FindElement(By.Id("swal2-title")).Text.Equals("Invalid login"));
        }

        [Test]
        public void bad_password_and_bad_ogranization_login()
        {
            driver.Navigate();
            username_input.Clear();
            password_input.Clear();
            organization_input.Clear();
            username_input.SendKeys("capstone_tester");
            password_input.SendKeys("bad_password");
            organization_input.SendKeys("bad_organization");
            driver.FindElement(By.Id("signin")).Click();
            System.Threading.Thread.Sleep(1000);//Need to wait a second to get the swal2-title to get created.
            Assert.IsTrue(driver.FindElement(By.Id("swal2-title")).Text.Equals("Invalid login"));
        }

        [Test]
        public void bad_username_bad_password_and_bad_organization_login()
        {
            driver.Navigate();
            username_input.Clear();
            password_input.Clear();
            organization_input.Clear();
            username_input.SendKeys("bad_username");
            password_input.SendKeys("bad_password");
            organization_input.SendKeys("bad_organization");
            driver.FindElement(By.Id("signin")).Click();
            System.Threading.Thread.Sleep(1000);//Need to wait a second to get the swal2-title to get created.
            Assert.IsTrue(driver.FindElement(By.Id("swal2-title")).Text.Equals("Invalid login"));
        }

        [Test]
        public void no_username_login()
        {
            driver.Navigate();
            username_input.Clear();
            password_input.Clear();
            organization_input.Clear();
            username_input.SendKeys("");
            password_input.SendKeys("capstoneBITZpls!0");
            organization_input.SendKeys("capstone2020");
            driver.FindElement(By.Id("signin")).Click();
            System.Threading.Thread.Sleep(1000);//Need to wait a second to get the swal2-title to get created.
            Assert.IsTrue(driver.FindElement(By.Id("swal2-title")).Text.Equals("Invalid login"));
        }

        [Test]
        public void no_password_login()
        {
            driver.Navigate();
            username_input.Clear();
            password_input.Clear();
            organization_input.Clear();
            username_input.SendKeys("capstone_tester");
            password_input.SendKeys("");
            organization_input.SendKeys("capstone2020");
            driver.FindElement(By.Id("signin")).Click();
            System.Threading.Thread.Sleep(1000);//Need to wait a second to get the swal2-title to get created.
            Assert.IsTrue(driver.FindElement(By.Id("swal2-title")).Text.Equals("Invalid login"));
        }

        [Test]
        public void no_organization_login()
        {
            driver.Navigate();
            username_input.Clear();
            password_input.Clear();
            organization_input.Clear();
            username_input.SendKeys("capstone_tester");
            password_input.SendKeys("capstoneBITZpls!0");
            organization_input.SendKeys("");
            driver.FindElement(By.Id("signin")).Click();
            System.Threading.Thread.Sleep(1000);//Need to wait a second to get the swal2-title to get created.
            Assert.IsTrue(driver.FindElement(By.Id("swal2-title")).Text.Equals("Invalid login"));
        }

        [Test]
        public void no_username_and_no_password_login()
        {
            driver.Navigate();
            username_input.Clear();
            password_input.Clear();
            organization_input.Clear();
            username_input.SendKeys("");
            password_input.SendKeys("");
            organization_input.SendKeys("capstone2020");
            driver.FindElement(By.Id("signin")).Click();
            System.Threading.Thread.Sleep(1000);//Need to wait a second to get the swal2-title to get created.
            Assert.IsTrue(driver.FindElement(By.Id("swal2-title")).Text.Equals("Invalid login"));
        }

        [Test]
        public void no_password_and_no_organization_login()
        {
            driver.Navigate();
            username_input.Clear();
            password_input.Clear();
            organization_input.Clear();
            username_input.SendKeys("capstone_tester");
            password_input.SendKeys("");
            organization_input.SendKeys("");
            driver.FindElement(By.Id("signin")).Click();
            System.Threading.Thread.Sleep(1000);//Need to wait a second to get the swal2-title to get created.
            Assert.IsTrue(driver.FindElement(By.Id("swal2-title")).Text.Equals("Invalid login"));
        }

        [Test]
        public void no_username_and_no_organization_login()
        {
            driver.Navigate();
            username_input.Clear();
            password_input.Clear();
            organization_input.Clear();
            username_input.SendKeys("");
            password_input.SendKeys("capstoneBITZpls!0");
            organization_input.SendKeys("");
            driver.FindElement(By.Id("signin")).Click();
            System.Threading.Thread.Sleep(1000);//Need to wait a second to get the swal2-title to get created.
            Assert.IsTrue(driver.FindElement(By.Id("swal2-title")).Text.Equals("Invalid login"));
        }

        [Test]
        public void no_username_no_password_and_no_organization_login()
        {
            driver.Navigate();
            username_input.Clear();
            password_input.Clear();
            organization_input.Clear();
            username_input.SendKeys("");
            password_input.SendKeys("");
            organization_input.SendKeys("");
            driver.FindElement(By.Id("signin")).Click();
            System.Threading.Thread.Sleep(1000);//Need to wait a second to get the swal2-title to get created.
            Assert.IsTrue(driver.FindElement(By.Id("swal2-title")).Text.Equals("Invalid login"));
        }
    }
}
