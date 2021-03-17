const chromedriver = require('chromedriver');
const geckodriver = require('geckodriver');

module.exports = {
  disable_colors: false,
  silent: !(/true/gi.test(process.env.NIGHTWATCH_VERBOSE)),
  test_workers: {
    enabled: process.env.NIGHTWATCH_TESTWORKERS_ENABLED || false,
    workers: process.env.NIGHTWATCH_TESTWORKERS || "auto"
  },
  parallel_process_delay: process.env.NIGHTWATCH_PARALLEL_PROCESS_DELAY || 10,
  output_folder: 'reports',
  custom_commands_path: ['./custom_commands'],
  custom_assertions_path: ['./custom_assertions'],
  page_objects_path: ['./page_objects'],
  globals_path: 'globals.js',
  test_settings: {
    default: {
      launch_url: process.env.NIGHTWATCH_LAUNCHURL || 'http://automationpractice.com',
      webdriver: {
        start_process: !Boolean(process.env.NIGHTWATCH_SELENIUM_GRID),
        port: process.env.NIGHTWATCH_SELENIUM_PORT || 4445
      },
      selenium_host: process.env.NIGHTWATCH_SELENIUM_HOST || "localhost",
      use_ssl: Boolean(process.env.NIGHTWATCH_SELENIUM_USE_SSL),
      screenshots: {
        enabled: true,
        on_failure: true,
        on_error: true,
        path: 'screenshots'
      },
      desiredCapabilities: {
        "zal:name": process.env.ZAL_TESTNAME,
        "zal:build": process.env.ZAL_BUILDNAME,
        javascriptEnabled: true,
        acceptSslCerts: true,
        acceptInsecureCerts: true,
        alwaysMatch: {
          acceptInsecureCerts: true
        }
      }
    },

    chromeHeadless: {
      webdriver: {
        server_path: chromedriver.path,
        cli_args: ['--port=4445'],
        log_path: 'logs/',
      },
      desiredCapabilities: {
        browserName: 'chrome',
        javascriptEnabled: true,
        acceptSslCerts: true,
        acceptInsecureCerts: true,
        "goog:chromeOptions": {
          w3c: false,
          args: ['window-size=1920,1080', 'headless', 'disable-gpu', 'disable-web-security', 'ignore-certificate-errors', '--no-sandbox']
        },
      }
    },

    chrome: {
      webdriver: {
        server_path: chromedriver.path,
        cli_args: ['--port=4445'],
        log_path: 'logs/',
      },
      desiredCapabilities: {
        browserName: 'chrome',
        javascriptEnabled: true,
        acceptSslCerts: true,
        acceptInsecureCerts: true,
        alwaysMatch: {
          acceptSslCerts: true,
          acceptInsecureCerts: true
        },
        "goog:chromeOptions": {
          w3c: false,
          args: ['window-size=1920,1080', 'disable-gpu', 'disable-web-security', 'ignore-certificate-errors', '--no-sandbox']
        },
      }
    },

    firefoxHeadless: {
      test_workers: false,
      webdriver: {
        server_path: geckodriver.path,
        cli_args: ['--port', '4444', '--log', 'debug'],
        log_path: 'logs/'
      },
      desiredCapabilities: {
        browserName: 'firefox',
        javascriptEnabled: true,
        acceptSslCerts: true,
        acceptInsecureCerts: true,
        marionette: true,
        'moz:firefoxOptions': {
          args: ['window-size=1920,1080', '--width=1920', '--height=1080', '--headless']
        }
      }
    },
    
    firefox: {
      test_workers: false,
      webdriver: {
        server_path: geckodriver.path,
        cli_args: ['--port', '4444', '--log', 'debug'],
        log_path: 'logs/'
      },
      desiredCapabilities: {
        browserName: 'firefox',
        javascriptEnabled: true,
        acceptSslCerts: true,
        acceptInsecureCerts: true,
        marionette: true,
        'moz:firefoxOptions': {
          args: ['window-size=1920,1080', '--width=1920', '--height=1080']
        }
      }
    }
  }
};
