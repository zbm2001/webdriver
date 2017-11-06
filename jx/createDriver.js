const webdriver = require('selenium-webdriver')
const chrome = require('selenium-webdriver/chrome')

let broswersConfig = {
  'chrome': {
    'mobileEmulation': {
      'deviceName': 'iPhone 6'
    },
    // 实验性的东西，弃用
    'experimental': {
      'mobileEmulation': {
        'deviceName': 'iPhone 6'
      }
    }
  }
}

module.exports = async function createDriver (broswers = broswersConfig, delay = 500) {
  let builder = new webdriver.Builder()
  for (let broswerName in broswers) {
    let broswerConfig = broswers[broswerName]
    builder.forBrowser(broswerName)

    switch (broswerName) {
      case 'chrome':
        let chromeOptions = new chrome.Options()
        chromeOptions.addArguments('disable-infobars')
        chromeOptions.setMobileEmulation(broswerConfig.mobileEmulation)
        builder.setChromeOptions(chromeOptions)
        break
      case 'firefox':
        break
    }
  }

  let driver = builder.build()

  await driver.sleep(delay)

  return driver
}
