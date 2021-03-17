const { client } = require('nightwatch-api');
const { _ } = require('lodash');
const assert = require('assert');
const basePage = client.page.basePage();
const CHECKOUT_PAGE = 'checkoutPage';

const checkoutItemsCommands = {
    checkoutItems: async function () {
        let self = this;
        const jsonDataCheckout = client.globals.jsonValues.checkout;

        await basePage.scrollToElement('css selector', '#header > div:nth-child(3) > div > div > div:nth-child(3) > div > a')
        await basePage.waitExplicitSeconds(1)
        await basePage.clickElementXpath('//*[@id="button_order_cart"]')
        await basePage.clickElement(CHECKOUT_PAGE, 'proceedBtn1')
        await basePage.insertValue(CHECKOUT_PAGE, 'commentField', jsonDataCheckout.comment)
        await basePage.clickElement(CHECKOUT_PAGE, 'proceedBtn2');
        await basePage.clickElement(CHECKOUT_PAGE, 'iAgreeCheckbox');
        await basePage.clickElement(CHECKOUT_PAGE, 'proceedBth3');
        await basePage.clickElement(CHECKOUT_PAGE, 'payByWire');
        await basePage.clickElement(CHECKOUT_PAGE, 'confirmOrderBtn');
        await basePage.validateText(CHECKOUT_PAGE, 'paymentValidation', jsonDataCheckout.paymentValidation )
    }
}

module.exports = {
    url: function () {
        return this.api.launchUrl;

    },
    commands: [checkoutItemsCommands],
    elements: [{
        checkoutBtn: '#header > div:nth-child(3) > div > div > div:nth-child(3) > div > div > div > div > p.cart-buttons',
        proceedBtn1: '#center_column > p.cart_navigation.clearfix > a.button.btn.btn-default.standard-checkout.button-medium > span', 
        commentField: '#ordermsg > textarea',
        proceedBtn2: '#center_column > form > p > button > span',
        iAgreeCheckbox: '#cgv',
        proceedBth3: '#form > p > button',
        payByWire: '#HOOK_PAYMENT > div:nth-child(1) > div > p > a',
        confirmOrderBtn: '#cart_navigation > button',
        paymentValidation: '#center_column > div > p > strong'
    }],
    props: function () {
    }
};