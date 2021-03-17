import { When } from 'cucumber';
import { client } from 'nightwatch-api';
const basePage = client.page.basePage();
const signInPage = client.page.signInPage();
const registerPage = client.page.registerPage();

When('Make successful login', async () => {
    await signInPage.signInForm();
});

When('I Create New Account', async () => {
    await registerPage.registerForm();
});

