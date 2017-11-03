const webdriver = require('selenium-webdriver')

module.exports = function guide (stepBranch = '立即体验', delay = 500) {
  return async (driver) => {
    let driverActions = driver.actions()
    let By = webdriver.By
    let $appGuidePage = await driver.findElement(By.id('appGuidePage'))

    if ($appGuidePage) {
      await Array.from({length: 4}).reduce((flickDefer) => {
        // console.log('flickDefer', flickDefer)
        return flickDefer ? flickDefer.then(() => flickAsync($appGuidePage)) : flickAsync($appGuidePage)
      })

      let selector = '.startCat'
      if (/[立即体验]/.test(stepBranch)) {
        selector = '.startCat'
      } else if (/[登录/注册]/.test(stepBranch)) {
        selector = '.register'
      }

      await $appGuidePage.
      findElement(By.css(selector)). // 立即体验
      click()
    }

    delay && await driver.sleep(delay)

    return Promise.resolve(driver)

    async function flickAsync ($elem) {
      await driverActions.
      mouseMove($elem, {x: 100, y: 100}).
      mouseDown().
      mouseMove($elem, {
        x: 0,
        y: 100
      }).
      mouseUp().
      perform()

      await driver.sleep(500)
    }
  }
}
