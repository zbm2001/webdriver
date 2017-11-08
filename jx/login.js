const Config = require('./Config')
const analogKeyboardInput = require('../lib/analogKeyboardInput')
const webdriver = require('selenium-webdriver')
const By = webdriver.By
const Key = webdriver.Key

/**
 * 判断 url 是否为登录页面
 * @param {String} url
 * @returns {Boolean}
 */
function isLoginPath (url) {
  return Config.loginPage.rPath.test(url)
}

/**
 * 模拟键盘输入
 * @param {Object} userinfo
 * @returns {Function.<async>}
 */
function atLogin (userinfo = Config.userinfo) {
  return async (driver) => {
    let currentUrl = await driver.getCurrentUrl().catch(() => {})
    // console.log('currentUrl', currentUrl)
    isLoginPath(currentUrl) && await login(userinfo)(driver)
    return driver
  }
}

/**
 * 模拟键盘输入
 * @param {Object} userinfo
 * @param {Number.<uint>} delay
 * @returns {Function.<async>}
 */
function login (userinfo = Config.userinfo, delay = Config.globalDelay) {
  return async (driver) => {
    await driver.sleep(1000)

    let currentUrl = await driver.getCurrentUrl().catch(() => {})
    if (!isLoginPath(currentUrl)) return driver

    let $pageRoot = await driver.findElement(By.css('.page-user-login'))
    let $tabs = await $pageRoot.findElements(By.css('.tab'))
    let $tabsetPages = await $pageRoot.findElements(By.css('.art-tabset-page'))

    // 账户密码登录
    if (userinfo.password) {
      await $tabs[0].click()

      let $phone = $tabsetPages[0].findElement(By.css('input[type="tel"][placeholder="请输入手机号"]'))
      await analogKeyboardInput($phone, userinfo.phone)(driver)

      let $password = $pageRoot.findElement(By.css('input[type="password"]'))
      await analogKeyboardInput($password, userinfo.password)(driver)

      // 手机短信验证码登录
    } else if (userinfo.phoneVeriCode) {
      await $tabs[1].click()

      let $phone = $tabsetPages[1].findElement(By.css('input[type="tel"][placeholder="请输入手机号"]'))
      await analogKeyboardInput($phone, userinfo.phone)(driver)

      let $phoneVeriCode = $pageRoot.findElement(By.css('.art-phone-veri-code input'))
      await analogKeyboardInput($phoneVeriCode, userinfo.phoneVeriCode)(driver)
    }

    await driver.sleep(Math.random() * 1000)

    $pageRoot.findElement(By.linkText('登录')).click()

    await driver.sleep(delay)

    return driver
  }
}

exports = module.exports = login
exports.isLoginPath = isLoginPath
exports.atLogin = atLogin
