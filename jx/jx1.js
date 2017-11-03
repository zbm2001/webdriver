import createDriver from './createDriver'
import guide from './guide'

// const Key = webdriver.Key
// const By = webdriver.By
// const Button = webdriver.Button
// const until = webdriver.until

createDriver().
then(openPage('http://192.168.1.91:8080')).
then(guide)



const webdriver = require('selenium-webdriver'),
    chrome = require('selenium-webdriver/chrome'),
    chromeOptions = new chrome.Options(),
    Key = webdriver.Key,
    By = webdriver.By,
    Button = webdriver.Button,
    until = webdriver.until,
    builder = new webdriver.Builder().forBrowser('chrome')

console.log(chromeOptions)
builder.setChromeOptions(chromeOptions)

let driver = builder.build(),
    driverActions = driver.actions()

console.log('driverActions', driverActions)

driver.get('http://192.168.1.91:8080')
var appGuidePage = driver.findElement(By.id('appGuidePage1'))
var myA = driver.findElement(By.partialLinkText('我的'))

// driverActions.mouseMove(appGuidePage, {x: 400, y: 100}).
// mouseDown().
// mouseMove(appGuidePage, {x: 0, y: 100}).
// mouseUp().
// perform()

Promise.all([appGuidePage, appGuidePage.getSize()]).then((resolveResults) => {
  var webElem = resolveResults[0],
      webElemSize = resolveResults[1]

  return Array.from({length: 4}).reduce((resultThenable) => {
    // console.log('resultThenable', resultThenable)
    return resultThenable ? resultThenable.then(() => returnThenable()) : returnThenable()
  })

  function returnThenable () {
    return driverActions.
    mouseMove(webElem, {x: 100, y: 100}).
    mouseDown().
    mouseMove(webElem, {
      x: 0,
      y: 100
    }).
    mouseUp().
    perform().
    then(wait(500))
  }
}).then((resultThenable) => {
  // console.log('resultThenable', resultThenable)
  return appGuidePage.
  findElement(By.css('.startCat')).
  click().
  then(wait(1000))
}).then(() => {
  return myA.click()
})

/**
 *
 * @param {Number} delay Uint
 * @param {Object} result Any type
 * @returns {function(): Promise}
 */
function wait (delay, result) {
  return () => new Promise((resolve, reject) => setTimeout(result ? () => resolve(result) : resolve, delay))
}

appGuidePage.then(function (resolveResult) { // WebElement
  // console.log('resolve result', resolveResult)
  var driverTouchActions = driver.touchActions()
  // driverTouchActions.flick({
  //   xspeed: 500, yspeed: 0
  // })
  // console.log(resolveResult.getSize())
  // setTimeout(function(){
  //   driverActions.mouseMove(resolveResult, {x: 400, y: 100}).
  //   mouseDown().
  //   mouseMove(appGuidePage, {x: 0, y: 100}).
  //   mouseUp().
  //   perform()
  //   // driverTouchActions.tapAndHold({
  //   //   x: 200, y: 100
  //   // }).
  //   // move({
  //   //   x: 100, y: 100
  //   // }).perform()
  //   // driverTouchActions.move({
  //   //   x: 200, y: 0
  //   // }).move({
  //   //   x: 100, y: 0
  //   // }).perform()
  // }, 3000)
  return myA
}, function (rejectResult) {
  // console.log('reject result', rejectResult)
  return myA
}).then(function (result) {
  // return myA.isDisplayed()
})

// myA.isDisplayed().then(function (data) {
//   console.log('myA.isDisplayed()', data)
// })

// var serviceBuilder = new chrome.ServiceBuilder()
//
// serviceBuilder.setPort(4000)
//
// var driverService = serviceBuilder.build()

// console.log('driver', driver)
// console.log('serviceBuilder', serviceBuilder.setPort)
// console.log('driverService', driverService)

// console.log('Object.keys(webdriver)', Object.keys(webdriver))
// console.log('Object.keys(driver)', Object.keys(driver))
// console.log('driverActions', Key.UP.charCodeAt())
// console.log('driverActions', Key.chord(webdriver.Key.F12))

// The keyDown action is only for modifier keys :
// key.CONTROL
// key.SHIFT
// key.ALT
// key.COMMAND
// To send the tab key, use .sendKeys()
// driverActions.sendKeys(Key.F12).perform().then(() => {
//
// })
// driver.get('https://www.baidu.com')
// driver.findElement(By.tagName('body')).sendKeys(Key.F12)
// driver.findElement(By.id('kw')).sendKeys('webdriver')
// driver.findElement(By.id('su')).click()
// driver.wait(until.titleIs('webdriver_百度搜索'), 1000)
// driver.quit()