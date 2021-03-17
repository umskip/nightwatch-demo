import { Given } from 'cucumber';
import { client } from 'nightwatch-api';
const { _ } = require('lodash');
const basePage = client.page.basePage();

Given('I open and navigate to the web page', async () => {
    //Open web page and check url
    await client.url(client.launch_url)
        .assert.urlContains(client.launch_url);
});
