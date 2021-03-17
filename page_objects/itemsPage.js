const { client } = require('nightwatch-api');
const { _ } = require('lodash');
const assert = require('assert');
const basePage = client.page.basePage();
const ITEMS_PAGE = 'itemsPage';

const itemsCommands = {
    addItem1ToCart: async function () {
        let self = this;
        const jsonDataItems = client.globals.jsonValues.login;

        await basePage.scrollToElement('css selector', 'ul[class="sf-menu clearfix menu-content sf-js-enabled sf-arrows"] a[title="Women"]')
        await basePage.waitElement(ITEMS_PAGE, 'tShirtsItem')
        await basePage.waitExplicitSeconds(0.5)
        await basePage.clickElement(ITEMS_PAGE, 'tShirtsItem');
        await basePage.waitExplicitSeconds(1)
        await basePage.scrollToElement('css selector', '#center_column > ul > li > div')
        await basePage.waitExplicitSeconds(1)
        await basePage.clickElement(ITEMS_PAGE, 'moreBtn');
        await basePage.waitExplicitSeconds(1)
        await basePage.clearAndInsertValue(ITEMS_PAGE, 'quantityField', '2')
        await basePage.clickAndSelectAvailableElement(ITEMS_PAGE, 'sizeDropdown', 'selectSize1');
        await basePage.clickElement(ITEMS_PAGE, 'colorSelect1');
        await basePage.clickElement(ITEMS_PAGE, 'addToCartBtn');
        await basePage.waitExplicitSeconds(2);
        await basePage.clickElement(ITEMS_PAGE, 'continueShoppingBtn');
    },

    addItem2ToCart: async function () {
        let self = this;
        const jsonDataItems = client.globals.jsonValues.login;

        await basePage.scrollToElement('css selector', '#block_top_menu > ul > li:nth-child(2) > a')
        await basePage.waitElement(ITEMS_PAGE, 'casualDressesItem')
        await basePage.waitExplicitSeconds(0.5)
        await basePage.clickElement(ITEMS_PAGE, 'casualDressesItem');
        await basePage.scrollToElement('css selector', '#center_column > ul > li > div')
        await basePage.waitExplicitSeconds(1)
        await basePage.clickElement(ITEMS_PAGE, 'moreBtn');
        await basePage.waitExplicitSeconds(1)
        await basePage.clearAndInsertValue(ITEMS_PAGE, 'quantityField', '5')
        await basePage.clickAndSelectAvailableElement(ITEMS_PAGE, 'sizeDropdown', 'selectSize2');
        await basePage.clickElement(ITEMS_PAGE, 'colorSelect2');
        await basePage.clickElement(ITEMS_PAGE, 'addToCartBtn');
        await basePage.waitExplicitSeconds(2)
        await basePage.clickElement(ITEMS_PAGE, 'continueShoppingBtn')
    },
}

module.exports = {
    url: function () {
        return this.api.launchUrl;

    },
    commands: [itemsCommands],
    elements: [{
        //General
        addToCartBtn: '#add_to_cart > button',
        continueShoppingBtn: '#layer_cart > div.clearfix > div.layer_cart_cart.col-xs-12.col-md-6 > div.button-container > span > span',
        moreBtn: '#center_column > ul > li > div > div.right-block > div.button-container > a.button.lnk_view.btn.btn-default > span',
        quantityField: 'input[name="qty"]',
        sizeDropdown: '#group_1',

        // Item 1
        tShirtsItem: '#block_top_menu > ul > li:nth-child(1) > ul > li:nth-child(1) > ul > li:nth-child(1) > a',
        selectSize1: '#group_1 > option:nth-child(2)',
        colorSelect1: '#color_14',
        
        //Item 2
        casualDressesItem: '#block_top_menu > ul > li:nth-child(2) > ul > li:nth-child(1) > a[title="Casual Dresses"]',
        selectSize2: '#group_1 > option:nth-child(3)',
        colorSelect2: '#color_13',
    }],
    props: function () {
    }
};
