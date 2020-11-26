using System;
using System.Collections;
using System.Linq;
using System.Collections.Generic;
using System.Diagnostics;
using NUnit.Framework;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;

namespace PSUCapstoneTestingProject.Front_end.IntigrationTests
{
    class IntegrationTests
    {
        IWebDriver driver;
        IWebDriver unlink_page_driver;
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
            //unlink_page_driver = new ChromeDriver("C:/Users/Brandon Danielski/Documents");
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

        public void link_items(int jama_id, int jira_id)
        {
            driver.FindElement(By.Id("itemid")).SendKeys(jama_id.ToString());
            driver.FindElement(By.Id("jiraid")).SendKeys(jira_id.ToString());
            driver.FindElement(By.Id("linkbutton")).Click();
            //driver.FindElement(By.Id("itemid")).Clear();
            //driver.FindElement(By.Id("jiraid")).Clear();
        }

        public void unlink()
        {
           driver.Url = "http://localhost:3000/unlink";
           driver.Navigate();
            //
            IWebElement container = driver.FindElement(By.ClassName("select_item_unlink-list"));
            IWebElement list = container.FindElement(By.TagName("ul"));
            List<IWebElement> raw_unlink_ids = list.FindElements(By.TagName("li")).ToList();
            for (int i = 0; i < raw_unlink_ids.Count; i++)
            {
                int id = int.Parse(raw_unlink_ids[i].Text.Split(':')[1]);
                driver.FindElement(By.Id("itemid")).SendKeys(id.ToString());
                driver.FindElement(By.Id("linkbutton")).Click();
                System.Threading.Thread.Sleep(3000);
                driver.FindElement(By.Id("itemid")).Clear();
            }
            driver.Navigate().Refresh();
            container = driver.FindElement(By.ClassName("select_item_unlink-list"));
            list = container.FindElement(By.TagName("ul"));
            raw_unlink_ids = list.FindElements(By.TagName("li")).ToList();
            Assert.IsTrue(raw_unlink_ids.Count == 0);
        }

        [Test]
        public void test_entire_linking_and_unlinking_procedure()
        {
            link_items(6807,10040);
            Assert.IsTrue(driver.Url.Equals("http://localhost:3000/linkFields"));
            unlink();
        }
    }
}
