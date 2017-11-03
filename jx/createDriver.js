const webdriver = require('selenium-webdriver')
const chrome = require('selenium-webdriver/chrome')

module.exports = async function createDriver (broswerName = 'chrome', delay = 500) {
  let builder = new webdriver.Builder().forBrowser(broswerName)

  switch (broswerName) {
    case 'chrome':
      let chromeOptions = new chrome.Options()
      chromeOptions.addArguments('disable-infobars')
      builder.setChromeOptions(chromeOptions)
      break
  }

  let driver = builder.build()

  delay && await driver.sleep(delay)

  return Promise.resolve(driver)
}