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
    class SyncFieldsOnCreateIssuePageTests
    {
        IWebDriver driver;

        [OneTimeSetUp]
        public void Setup()
        {
            driver = new ChromeDriver("C:/Users/Brandon Danielski/Documents");
            driver.Url = "http://localhost:3000/syncFieldsOnCreateIssue";
            driver.Navigate();
            driver.FindElement(By.Id("select_fields_to_sync_button")).Click();
        }

        [Test]
        public void push_all_buttons()
        {
            driver.FindElement(By.Id("Assignee_field_checkbox")).Click();
            driver.FindElement(By.Id("Attachment_field_checkbox")).Click();
            driver.FindElement(By.Id("Description_field_checkbox")).Click();
            driver.FindElement(By.Id("Fix versions_field_checkbox")).Click();
            driver.FindElement(By.Id("Flagged_field_checkbox")).Click();
            driver.FindElement(By.Id("Labels_field_checkbox")).Click();
            driver.FindElement(By.Id("Linked issues_field_checkbox")).Click();
            driver.FindElement(By.Id("Reporter_field_checkbox")).Click();
            driver.FindElement(By.Id("Sprint_field_checkbox")).Click();
            driver.FindElement(By.Id("Story point estimate_field_checkbox")).Click();
            driver.FindElement(By.Id("Summary_field_checkbox")).Click();
            Assert.IsTrue(driver.FindElement(By.Id("test_div")).Text.Equals("Assignee,Attachment,Description,Fix versions,Flagged,Labels,Linked issues,Reporter,Sprint,Story point estimate,Summary"));
            driver.FindElement(By.Id("Assignee_field_checkbox")).Click();
            driver.FindElement(By.Id("Attachment_field_checkbox")).Click();
            driver.FindElement(By.Id("Description_field_checkbox")).Click();
            driver.FindElement(By.Id("Fix versions_field_checkbox")).Click();
            driver.FindElement(By.Id("Flagged_field_checkbox")).Click();
            driver.FindElement(By.Id("Labels_field_checkbox")).Click();
            driver.FindElement(By.Id("Linked issues_field_checkbox")).Click();
            driver.FindElement(By.Id("Reporter_field_checkbox")).Click();
            driver.FindElement(By.Id("Sprint_field_checkbox")).Click();
            driver.FindElement(By.Id("Story point estimate_field_checkbox")).Click();
            driver.FindElement(By.Id("Summary_field_checkbox")).Click();
        }

        [Test]
        public void assignee_individual_test()
        {
            driver.FindElement(By.Id("Assignee_field_checkbox")).Click();
            Assert.IsTrue(driver.FindElement(By.Id("test_div")).Text.Equals("Assignee"));
            driver.FindElement(By.Id("Assignee_field_checkbox")).Click();
        }

        [Test]
        public void Attachment_individual_test()
        {
            driver.FindElement(By.Id("Attachment_field_checkbox")).Click();
            Assert.IsTrue(driver.FindElement(By.Id("test_div")).Text.Equals("Attachment"));
            driver.FindElement(By.Id("Attachment_field_checkbox")).Click();
        }

        [Test]
        public void Description_individual_test()
        {
            driver.FindElement(By.Id("Description_field_checkbox")).Click();
            Assert.IsTrue(driver.FindElement(By.Id("test_div")).Text.Equals("Description"));
            driver.FindElement(By.Id("Description_field_checkbox")).Click();
        }

        [Test]
        public void Fix_versions_individual_test()
        {
            driver.FindElement(By.Id("Fix versions_field_checkbox")).Click();
            Assert.IsTrue(driver.FindElement(By.Id("test_div")).Text.Equals("Fix versions"));
            driver.FindElement(By.Id("Fix versions_field_checkbox")).Click();
        }

        [Test]
        public void _individual_test()
        {
            driver.FindElement(By.Id("Linked issues_field_checkbox")).Click();
            Assert.IsTrue(driver.FindElement(By.Id("test_div")).Text.Equals("Linked issues"));
            driver.FindElement(By.Id("Linked issues_field_checkbox")).Click();
        }

        [Test]
        public void Flagged_individual_test()
        {
            driver.FindElement(By.Id("Flagged_field_checkbox")).Click();
            Assert.IsTrue(driver.FindElement(By.Id("test_div")).Text.Equals("Flagged"));
            driver.FindElement(By.Id("Flagged_field_checkbox")).Click();
        }

        [Test]
        public void Labels_individual_test()
        {
            driver.FindElement(By.Id("Labels_field_checkbox")).Click();
            Assert.IsTrue(driver.FindElement(By.Id("test_div")).Text.Equals("Labels"));
            driver.FindElement(By.Id("Labels_field_checkbox")).Click();
        }

        [Test]
        public void Reporter_individual_test()
        {
            driver.FindElement(By.Id("Reporter_field_checkbox")).Click();
            Assert.IsTrue(driver.FindElement(By.Id("test_div")).Text.Equals("Reporter"));
            driver.FindElement(By.Id("Reporter_field_checkbox")).Click();
        }

        [Test]
        public void Sprint_individual_test()
        {
            driver.FindElement(By.Id("Sprint_field_checkbox")).Click();
            Assert.IsTrue(driver.FindElement(By.Id("test_div")).Text.Equals("Sprint"));
            driver.FindElement(By.Id("Sprint_field_checkbox")).Click();
        }

        [Test]
        public void Story_point_estimate_individual_test()
        {
            driver.FindElement(By.Id("Story point estimate_field_checkbox")).Click();
            Assert.IsTrue(driver.FindElement(By.Id("test_div")).Text.Equals("Story point estimate"));
            driver.FindElement(By.Id("Story point estimate_field_checkbox")).Click();
        }

        [Test]
        public void Summary_individual_test()
        {
            driver.FindElement(By.Id("Summary_field_checkbox")).Click();
            Assert.IsTrue(driver.FindElement(By.Id("test_div")).Text.Equals("Summary"));
            driver.FindElement(By.Id("Summary_field_checkbox")).Click();
        }
    }
}
