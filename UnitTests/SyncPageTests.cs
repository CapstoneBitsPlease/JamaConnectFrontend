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
    class SyncPageTests
    {
        IWebDriver driver;

        [OneTimeSetUp]
        public void setup()
        {
            driver = new ChromeDriver("C:/Users/Brandon Danielski/Documents");
            driver.Url = "http://localhost:3000/syncSettings";
            driver.Navigate();
        }

        [Test]
        public void sync_happy_path()
        {
            Assert.Pass();
        }

        [Test]
        public void sync_happy_path_seconds()
        {
            new SelectElement(driver.FindElement(By.Id("dropdown_list_selection"))).SelectByText("seconds");
            driver.FindElement(By.Id("select_input_text_field")).SendKeys("5");
            driver.FindElement(By.Id("apply_button")).Click();
            driver.FindElement(By.Id("select_input_text_field")).SendKeys(Keys.Backspace);
        }

        [Test]
        public void sync_happy_path_minutes()
        {
            new SelectElement(driver.FindElement(By.Id("dropdown_list_selection"))).SelectByText("minutes");
            driver.FindElement(By.Id("select_input_text_field")).SendKeys("5");
            driver.FindElement(By.Id("apply_button")).Click();
            driver.FindElement(By.Id("select_input_text_field")).SendKeys(Keys.Backspace);
        }

        [Test]
        public void sync_happy_path_hours()
        {
            new SelectElement(driver.FindElement(By.Id("dropdown_list_selection"))).SelectByText("hours");
            driver.FindElement(By.Id("select_input_text_field")).SendKeys("5");
            driver.FindElement(By.Id("apply_button")).Click();
            driver.FindElement(By.Id("select_input_text_field")).SendKeys(Keys.Backspace);
        }

        [Test]
        public void sync_bad_input_seconds()
        {
            new SelectElement(driver.FindElement(By.Id("dropdown_list_selection"))).SelectByText("seconds");
            driver.FindElement(By.Id("select_input_text_field")).SendKeys("bad");
            driver.FindElement(By.Id("apply_button")).Click();
            driver.FindElement(By.Id("select_input_text_field")).SendKeys(Keys.Backspace);
            driver.FindElement(By.Id("select_input_text_field")).SendKeys(Keys.Backspace);
            driver.FindElement(By.Id("select_input_text_field")).SendKeys(Keys.Backspace);
        }

        [Test]
        public void sync_bad_input_minutes()
        {
            new SelectElement(driver.FindElement(By.Id("dropdown_list_selection"))).SelectByText("minutes");
            driver.FindElement(By.Id("select_input_text_field")).SendKeys("bad");
            driver.FindElement(By.Id("apply_button")).Click();
            driver.FindElement(By.Id("select_input_text_field")).SendKeys(Keys.Backspace);
            driver.FindElement(By.Id("select_input_text_field")).SendKeys(Keys.Backspace);
            driver.FindElement(By.Id("select_input_text_field")).SendKeys(Keys.Backspace);
        }

        [Test]
        public void sync_bad_input_hours()
        {
            new SelectElement(driver.FindElement(By.Id("dropdown_list_selection"))).SelectByText("hours");
            driver.FindElement(By.Id("select_input_text_field")).SendKeys("bad");
            driver.FindElement(By.Id("apply_button")).Click();
            driver.FindElement(By.Id("select_input_text_field")).SendKeys(Keys.Backspace);
            driver.FindElement(By.Id("select_input_text_field")).SendKeys(Keys.Backspace);
            driver.FindElement(By.Id("select_input_text_field")).SendKeys(Keys.Backspace);
        }

        [Test]
        public void no_input_seconds()
        {
            new SelectElement(driver.FindElement(By.Id("dropdown_list_selection"))).SelectByText("seconds");
            driver.FindElement(By.Id("apply_button")).Click();
        }

        [Test]
        public void no_input_minutes()
        {
            new SelectElement(driver.FindElement(By.Id("dropdown_list_selection"))).SelectByText("minutes");
            driver.FindElement(By.Id("apply_button")).Click();
        }

        [Test]
        public void no_input_hours()
        {
            new SelectElement(driver.FindElement(By.Id("dropdown_list_selection"))).SelectByText("hours");
            driver.FindElement(By.Id("apply_button")).Click();
        }
    }
}
