const webdriver = require('selenium-webdriver')
const chrome = require('selenium-webdriver/chrome')

// https://sites.google.com/a/chromium.org/chromedriver/mobile-emulation
// 实验性的东西，node 弃用，java ruby pythin 可用
// 'experimental': {
//   'mobileEmulation': {
//     'deviceName': 'iPhone 6'
//   }
// }
const mobileEmulation = {
  'iPhone 6': {
    // 'deviceName': 'iPhone 6',
    'deviceMetrics': {"width": 375, "height": 667, "pixelRatio": 2},
    'userAgent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1'
  }
}

// 配置客户端
let broswersConfig = {
  'chrome': {
    'mobileEmulation': mobileEmulation['iPhone 6'],
    'args': ['disable-infobars', '--args', '--disable-web-security', '--user-data-dir']
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
