# <p align="center">general-nightwatch-project</p>

This project is made in nightwatch-cucumber framework and is used for UI end-to-end testing.

Nightwatch.js - is an integrated, easy to use End-to-End testing solution for web applications and websites, written in Node.js. It uses the W3C WebDriver API to drive browsers in order to perform commands and assertions on DOM elements.

Cucumber - It’s simple. Whether open source or commercial, our collaboration tools will boost your engineering team's performance by employing Behavior-Driven Development (BDD). And with our world-class training, take it to places it’s never been. 

### :wrench: Installation steps

1. First if you do not have git installed, please install.

2. Install Node.js - [Download Node.js](https://nodejs.org/en/) and make an install. For more information about Node.js istallation, please follow this [link.](https://wsvincent.com/install-node-js-npm-windows/)

3. Create an empty 'Development' folder at the following location:
```
C:\Development
```

4. Clone the project in the previously created 'Development' folder:
```
> git clone 'repository'
```

5. Open Command Propmt as adminsitrator, navigate to 'C:\Development\general-nightwatch-project' file and then make:
```
> npm install
```

### :running: Run tests

**IMPORTANT:** Before first test run check your chromeDriver version and your local chrome version (they need to be same). If the versions are different, then:
- Update your local chrome version and remember the version number
- Go and download current [chromeDriver](https://chromedriver.chromium.org/downloads) version 
- Grab downloaded file and extract to the following location 'C:\Development\general-nightwatch-project\node_modules\chromedriver\lib\chromedriver'

Specify a feature file:
```
> npm run test:chrome .\features\my_feature.feature
```

Specify a glob pattern:
```
> npm run test:chrome .\features\*.feature
```

Only Tags:
```
> npm run test:chrome -- -- --tags '@Folders'
```

### :page_facing_up: Reports

Тhe report is created as 'index.html' file in .\general-nightwatch-project\report


###### <p align="center">Created by: Darko Velkovski</p>