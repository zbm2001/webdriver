const webdriver = require('selenium-webdriver')
const By = webdriver.By
const Key = webdriver.Key

module.exports = function login (userinfo = {phone: '13552424310', password: '123456'}, delay = 500) {
  return async (driver) => {
    await driver.sleep(1000)

    let $pageRoot = await driver.findElement(By.css('.page-user-login'))
    let $tabs = await $pageRoot.findElements(By.css('.tab'))
    let $tabsetPages = await $pageRoot.findElements(By.css('.art-tabset-page'))

    // 账户密码登录
    if (userinfo.password) {
      await $tabs[0].click()

      let $phone = $tabsetPages[0].findElement(By.css('input[type="tel"][placeholder="请输入手机号"]'))
      userinfo.phone.split('').reduce(async (result, n) => result ? (await driver.sleep(Math.random() * 400), $phone.sendKeys(n)) : $phone.sendKeys(n))
      await driver.sleep(Math.random() * 1000)
      $phone.sendKeys(Key.chord(Key.CONTROL, "a"))
      await driver.sleep(Math.random() * 1000)
      $phone.sendKeys(userinfo.phone)

      let $password = $pageRoot.findElement(By.css('input[type="password"]'))
      userinfo.password.split('').reduce(async (result, n) => result ? (await driver.sleep(Math.random() * 400), $password.sendKeys(n)) : $phone.sendKeys(n))
      await driver.sleep(Math.random() * 1000)
      $password.sendKeys(Key.chord(Key.CONTROL, "a"))
      await driver.sleep(Math.random() * 1000)
      $password.sendKeys(userinfo.password)

      // 手机短信验证码登录
    } else if (userinfo.phoneVeriCode) {
      await $tabs[1].click()

      let $phone = $tabsetPages[1].findElement(By.css('input[type="tel"][placeholder="请输入手机号"]'))
      userinfo.phone.split('').reduce(async (result, n) => result ? (await driver.sleep(Math.random() * 400), $phone.sendKeys(n)) : $phone.sendKeys(n))
      await driver.sleep(Math.random() * 1000)
      $phone.sendKeys(Key.chord(Key.CONTROL, "a"))
      await driver.sleep(Math.random() * 1000)
      $phone.sendKeys(userinfo.phone)

      let $phoneVeriCode = $pageRoot.findElement(By.css('.art-phone-veri-code input'))
      userinfo.phoneVeriCode.split('').reduce(async (result, n) => result ? (await driver.sleep(Math.random() * 400), $phoneVeriCode.sendKeys(n)) : $phoneVeriCode.sendKeys(n))
      await driver.sleep(Math.random() * 1000)
      $phoneVeriCode.sendKeys(Key.chord(Key.CONTROL, "a"))
      await driver.sleep(Math.random() * 1000)
      $phoneVeriCode.sendKeys(userinfo.phoneVeriCode)
    }

    await driver.sleep(Math.random() * 1000)

    $pageRoot.findElement(By.linkText('登录')).click()

    await driver.sleep(delay)

    return driver
  }
}