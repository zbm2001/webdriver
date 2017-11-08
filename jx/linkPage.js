const Config = require('./Config')
const login = require('./login')
const webdriver = require('selenium-webdriver')
const By = webdriver.By

module.exports = function linkPage (matchesLinkText = '我的', delay = Config.globalDelay) {
  return async (driver) => {
    let $myA = await driver.findElement(By.css(matchesLinkText)).catch(() => {})
    if (!$myA) $myA = await driver.findElement(By.partialLinkText(matchesLinkText)).catch(() => {})

    // $myA.takeScreenshot() 暂不支持

    $myA && await $myA.click()

    await driver.sleep(delay)

    await login.atLogin(Config.userinfo)(driver)

    return driver
  }
}