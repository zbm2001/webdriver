const Config = require('./Config')
const login = require('./login')

module.exports = async function atLogin (driver, userinfo = Config.userinfo) {
  let currentUrl = await driver.getCurrentUrl().catch(() => {})
  // console.log('currentUrl', currentUrl)
  return isLoginPath(currentUrl) ? login(userinfo)(driver) : driver
}

exports.isLoginPath = function isLoginPath (path) {
  return Config.loginPage.rPath.test(currentUrl)
}