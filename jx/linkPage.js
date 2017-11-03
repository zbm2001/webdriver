const webdriver = require('selenium-webdriver')
const By = webdriver.By

module.exports = function linkPage (matchesLinkText = '我的', delay = 500) {
  return async (driver) => {
    let $myA = await driver.findElement(By.css(matchesLinkText)).catch(() => {})
    if (!$myA) $myA = await driver.findElement(By.partialLinkText(matchesLinkText))

    // $myA.takeScreenshot() 暂不支持

    $myA.click()

    delay && await driver.sleep(delay)

    return Promise.resolve(driver)
  }
}