import { Then } from 'cucumber';
import { client } from 'nightwatch-api';
const basePage = client.page.basePage();
const itemsPage = client.page.itemsPage();
const checkoutPage = client.page.checkoutPage();

Then('I navigate to {string} page', async (text) => {
    switch ((text).toLowerCase().trim()) {
        case "authentication":
            await basePage.clickElementXpath('//a[@class="login"]');
            break;

        case "home":
            await basePage.clickElementXpath('//img[@class="logo img-responsive"]');
            break;

        case "profile":
            await basePage.clickElementXpath('//a[@class="account"]');
            break;
    }
}),

Then('I Add Item {string} to Cart', async (text) => {
    switch ((text).toLowerCase().trim()) {
        case "1":
            await itemsPage.addItem1ToCart();
            break;

        case "2":
            await itemsPage.addItem2ToCart();
            break;
    }
}),

Then('I Checkout and Pay the Items', async () => {
    await checkoutPage.checkoutItems();
});

Then('I Sign Out', async () => {
    await basePage.clickElementXpath('//a[@class="logout"]');
});

