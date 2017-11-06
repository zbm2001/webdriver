const Config = require('./Config')
const need2Login = require('./need2Login')
const webdriver = require('selenium-webdriver')
const By = webdriver.By
const Key = webdriver.Key

module.exports = function login (userinfo = Config.userinfo, delay = 500) {
  return async (driver) => {
    await driver.sleep(1000)

    let need2LoginDefer = await need2Login(driver, userinfo).catch(() => {})
    if (!need2LoginDefer) return driver

    let $pageRoot = await driver.findElement(By.css('.page-user-login'))
    let $tabs = await $pageRoot.findElements(By.css('.tab'))
    let $tabsetPages = await $pageRoot.findElements(By.css('.art-tabset-page'))

    // 账户密码登录
    if (userinfo.password) {
      await $tabs[0].click()

      let $phone = $tabsetPages[0].findElement(By.css('input[type="tel"][placeholder="请输入手机号"]'))
      await analogKeyboardInput($phone, userinfo.phone)

      let $password = $pageRoot.findElement(By.css('input[type="password"]'))
      await analogKeyboardInput($password, userinfo.password)

      // 手机短信验证码登录
    } else if (userinfo.phoneVeriCode) {
      await $tabs[1].click()

      let $phone = $tabsetPages[1].findElement(By.css('input[type="tel"][placeholder="请输入手机号"]'))
      await analogKeyboardInput($phone, userinfo.phone)

      let $phoneVeriCode = $pageRoot.findElement(By.css('.art-phone-veri-code input'))
      await analogKeyboardInput($phoneVeriCode, userinfo.phoneVeriCode)
    }

    await driver.sleep(Math.random() * 1000)

    $pageRoot.findElement(By.linkText('登录')).click()

    await driver.sleep(delay)

    return driver

    /**
     * 模拟键盘输入
     * @param {Object.<WebElement>} $elem WebDriver 获取的 WebElement
     * @param {String} characters 输入字符
     * @returns {Promise.<*>}
     */
    async function analogKeyboardInput ($elem, characters) {
      await analogKeyboardSpiteInput($elem, characters)
      await driver.sleep(Math.random() * 1000)
      await $elem.sendKeys(Key.chord(Key.CONTROL, "a"))
      await driver.sleep(Math.random() * 1000)
      await $elem.sendKeys(characters)
    }

    /**
     * 键盘分解字符输入
     * @param {Object.<WebElement>} $elem WebDriver 获取的 WebElement
     * @param {String} characters 输入字符
     * @returns {Promise.<*>}
     */
    async function analogKeyboardSpiteInput ($elem, characters) {
      // reduce() 若未设置 this 参与求值，则数组的第一位不参与函数执行
      return ('_' + characters).split('').reduce(async (sendKeysDefer, n, i) => {
        // console.log('result, n, i', result, n, i)
        await (i > 1 ? sendKeysDefer : $elem.sendKeys(sendKeysDefer))
        await driver.sleep(Math.random() * 400)
        return $elem.sendKeys(n)
      })
    }
  }
}