const Config = require('./Config')
const need2Login = require('./need2Login')
const webdriver = require('selenium-webdriver')
const By = webdriver.By

module.exports = function linkPage (matchesLinkText = '我的', delay = 500) {
  return async (driver) => {
    let $myA = await driver.findElement(By.css(matchesLinkText)).catch(() => {})
    if (!$myA) $myA = await driver.findElement(By.partialLinkText(matchesLinkText))

    // $myA.takeScreenshot() 暂不支持

    $myA.click()

    await driver.sleep(delay)

    let need2LoginDefer = await need2Login(driver, Config.userinfo)
    if (need2LoginDefer) return need2LoginDefer

    return driver
  }
}