const { client } = require('nightwatch-api');
const { _ } = require('lodash');
const assert = require('assert');
const basePage = client.page.basePage();

const basePageCommands = {
    waitElement: async function (pageObjectName, element) {
        await _.get(client.page, pageObjectName)()
            .waitForElementPresent(`@${element}`, client.globals.waitTime)
            .assert.elementPresent(`@${element}`)
    },

    clickElement: async function (pageObjectName, element) {
        await _.get(client.page, pageObjectName)()
            .waitForElementPresent(`@${element}`, client.globals.waitTime)
            .assert.elementPresent(`@${element}`)
            .click(`@${element}`);
    },

    clickAndSelectAvailableElement: async function (pageObjectName, element, element2) {
        await _.get(client.page, pageObjectName)()
            .waitForElementPresent(`@${element}`, client.globals.waitTime)
            .assert.elementPresent(`@${element}`)
            .click(`@${element}`)
            .pause(200)
            .waitForElementPresent(`@${element2}`, client.globals.waitTime)
            .assert.elementPresent(`@${element2}`)
            .click(`@${element2}`);
    },

    clickElementXpath: async function (element) {
        let self = this;

        await client.click('xpath', element);
    },

    insertValue: async function (pageObjectName, element, value) {
        await _.get(client.page, pageObjectName)()
            .waitForElementPresent(`@${element}`, client.globals.waitTime)
            .assert.elementPresent(`@${element}`)
            .setValue(`@${element}`, value);
    },

    clearAndInsertValue: async function (pageObjectName, element, value) {
        await _.get(client.page, pageObjectName)()
            .waitForElementPresent(`@${element}`, client.globals.waitTime)
            .assert.visible(`@${element}`)
            .clearValue(`@${element}`)
            .setValue(`@${element}`, value);
    },

    validateText: async function (pageObjectName, element, text) {
        await _.get(client.page, pageObjectName)()
            .waitForElementPresent(`@${element}`, client.globals.waitTime)
            .expect.element(`@${element}`).to.have.text.to.contain(text);
    },

    waitExplicitSeconds: async function (value) {
        await client.pause((value * 1000));
    },

    scrollToElement: async function (selector, locator) {
        let self = this;

        await self.api.element(selector, locator, (res) => {
            self.api.moveTo(res.value.ELEMENT, 0, 0);
        });
    },

    clearAndInsertData: async function (pageObjectName, elementsArray, valuesArray) {
        for (var numb = 0; numb < elementsArray.length; numb++) {
            await basePage.clearAndInsertValue(pageObjectName, elementsArray[numb], valuesArray[numb]);
        }
    },

    populateData: async function (pageObjectName, elementsArray, valuesArray) {
        for (var numb = 0; numb < elementsArray.length; numb++) {
            await basePage.insertValue(pageObjectName, elementsArray[numb], valuesArray[numb]);
        }
    },
}

module.exports = {
    url: function () {
        return this.api.launchUrl;

    },
    commands: [basePageCommands],
    elements: [{
        // Elements Here
    }],
    props: function () {
    }
};
