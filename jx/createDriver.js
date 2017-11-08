const Config = require('./Config')
const webdriver = require('selenium-webdriver')
const chrome = require('selenium-webdriver/chrome')

module.exports = async function createDriver (broswers = Config.broswersConfig, delay = Config.globalDelay) {
  let builder = new webdriver.Builder()
  for (let broswerName in broswers) {
    let broswerConfig = broswers[broswerName]
    builder.forBrowser(broswerName)

    switch (broswerName) {
      case 'chrome':
        let chromeOptions = new chrome.Options()
        await broswerConfig.args.reduce(async (defer, arg, i) => {
          await (i > 1 ? defer : chromeOptions.addArguments(defer))
          return chromeOptions.addArguments(arg)
        })
        // chromeOptions.addArguments('disable-infobars')
        await chromeOptions.setMobileEmulation(broswerConfig.mobileEmulation)
        await builder.setChromeOptions(chromeOptions)
        break
      case 'firefox':
        break
    }
  }

  let driver = builder.build()

  await driver.sleep(delay)

  return driver
}
