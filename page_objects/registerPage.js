const { client } = require('nightwatch-api');
const { _ } = require('lodash');
const assert = require('assert');
const { title } = require('process');
const basePage = client.page.basePage();
const REGISTER_PAGE = 'registerPage';

const registerCommands = {
    registerForm: async function () {
        let self = this;
        const jsonDataRegister = client.globals.jsonValues.auth;

        // First Page
       await basePage.insertValue(REGISTER_PAGE, 'email', jsonDataRegister.login.email)
       await basePage.clickElement(REGISTER_PAGE, 'submitBtn')

       // Form Page
       await basePage.waitExplicitSeconds(2)
       await basePage.clickElement(REGISTER_PAGE, 'title')
       await basePage.waitExplicitSeconds(0.5)
       
       let registerElementsFieldsArray = ['firstName', 'lastName', 'password', 'addressFirstName', 'addressLastName', 'company', 'address', 'address2', 'city', 'zip', 'additionalInfo', 'homePhone', 'mobilePhone', 'alias'];
       let registerValuesFieldsArray = [jsonDataRegister.register.firstName, jsonDataRegister.register.lastName, jsonDataRegister.login.password, jsonDataRegister.register.addressFirstName, jsonDataRegister.register.addressLastName, jsonDataRegister.register.company, jsonDataRegister.register.address, jsonDataRegister.register.address2, jsonDataRegister.register.city, jsonDataRegister.register.zip, jsonDataRegister.register.additionalInfo, jsonDataRegister.register.homePhone, jsonDataRegister.register.mobilePhone, jsonDataRegister.register.alias];
       await basePage.clearAndInsertData(REGISTER_PAGE, registerElementsFieldsArray, registerValuesFieldsArray);

       let registerElementsDropdownsArray = ['dayOfBirth', 'monthOfBirth', 'yearOfBirth', 'state', 'country'];
       let registerValuesDropdownsArray = [jsonDataRegister.register.dayOfBirth, jsonDataRegister.register.monthOfBirth, jsonDataRegister.register.yearOfBirth, jsonDataRegister.register.state, jsonDataRegister.register.country];
       await basePage.populateData(REGISTER_PAGE, registerElementsDropdownsArray, registerValuesDropdownsArray);

       await basePage.clickElement(REGISTER_PAGE, 'newsletterCheckbox')
       await basePage.clickElement(REGISTER_PAGE, 'specialOffersCheckbox')

       await basePage.clickElement(REGISTER_PAGE, 'registerBtn')
    }
}

module.exports = {
    url: function () {
        return this.api.launchUrl;

    },
    commands: [registerCommands],
    elements: [{
        // General
        email: "input[id=\"email_create\"]",
        password: 'input[id=\"passwd\"]',
        submitBtn: 'button[id=\"SubmitCreate\"]',

        // Register Form
        title: 'input[id="id_gender1"]',
        firstName: 'input[id=\"customer_firstname\"]',
        lastName: 'input[id=\"customer_lastname\"]',
        dayOfBirth: 'select[id=\"days\"]',
        monthOfBirth: 'select[id=\"months\"]',
        yearOfBirth: 'select[id=\"years\"]',
        newsletterCheckbox: 'input[id=\"newsletter\"]',
        specialOffersCheckbox: 'input[id=\"newsletter\"]',
        addressFirstName: 'input[id=\"firstname\"]',
        addressLastName: 'input[id=\"lastname\"]',
        company: 'input[id=\"company\"]',
        address: 'input[id=\"address1\"]',
        address2: 'input[id=\"address2\"]',
        city: 'input[id=\"city\"]',
        state: 'select[id=\"id_state\"]', 
        zip: 'input[id=\"postcode\"]',
        country: 'select[id=\"id_country\"]', 
        additionalInfo: 'textarea[id=\"other\"]',
        homePhone: 'input[id=\"phone\"]',
        mobilePhone: 'input[id=\"phone_mobile\"]',
        alias: 'input[id=\"alias\"]',
        registerBtn: 'button[id=\"submitAccount\"]',
    }],
    props: function () {
    }
};
