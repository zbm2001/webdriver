const webdriver = require('selenium-webdriver')
const Key = webdriver.Key

/**
 * 模拟键盘输入
 * @param {Object.<WebDriver>} driver
 * @param {Object.<WebElement>} $inputElem WebDriver 获取的 WebElement，对应输入框元素
 * @param {String} characters 输入字符
 * @returns {Promise.<*>}
 */
function analogKeyboardInput ($inputElem, characters) {
  return async (driver) => {
    await analogKeyboardSpiteInput($inputElem, characters)(driver)
    await driver.sleep(Math.random() * 1000)
    await $inputElem.sendKeys(Key.chord(Key.CONTROL, "a"))
    await driver.sleep(Math.random() * 1000)
    await $inputElem.sendKeys(characters)
  }
}

/**
 * 键盘分解字符输入
 * @param {Object.<WebDriver>} driver
 * @param {Object.<WebElement>} $elem WebDriver 获取的 WebElement
 * @param {String} characters 输入字符
 * @returns {Promise.<*>}
 */
function analogKeyboardSpiteInput ($elem, characters) {
  return async (driver) => {
    // reduce() 若未设置 this 参与求值，则数组的第一位不参与函数执行
    return ('_' + characters).split('').reduce(async (sendKeysDefer, character, index) => {
      // console.log('result, character, index', result, character, index)
      await (index > 1 ? sendKeysDefer : $elem.sendKeys(sendKeysDefer))
      await driver.sleep(Math.random() * 400)
      return $elem.sendKeys(character)
    })
  }
}

exports = module.exports = analogKeyboardInput
exports.analogKeyboardSpiteInput = analogKeyboardSpiteInput
