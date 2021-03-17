const { client } = require('nightwatch-api');
const { _ } = require('lodash');
const assert = require('assert');
const basePage = client.page.basePage();
const SIGNIN_PAGE = 'signInPage';

const signInCommands = {
    signInForm: async function () {
        let self = this;
        const jsonDataSignin = client.globals.jsonValues.auth;

        var insertCredetnials = async function (emailValue, passwordValue) {
            await basePage.insertValue(SIGNIN_PAGE, 'email', emailValue);
            await basePage.insertValue(SIGNIN_PAGE, 'password', passwordValue);
            await basePage.clickElement(SIGNIN_PAGE, 'signInBtn');
        }

        await insertCredetnials(jsonDataSignin.login.email, jsonDataSignin.login.password)
    }
}

module.exports = {
    url: function () {
        return this.api.launchUrl;

    },
    commands: [signInCommands],
    elements: [{
        email: 'input[id=\"email\"]',
        password: 'input[id=\"passwd\"]',
        signInBtn: 'button[id=\"SubmitLogin\"]',
    }],
    props: function () {
    }
};