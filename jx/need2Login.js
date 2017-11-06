const Config = require('./Config')
const login = require('./login')

module.exports = async function need2Login (driver, userinfo = Config.userinfo) {
  let currentUrl = await driver.getCurrentUrl().catch(() => {})
  console.log('currentUrl', currentUrl)
  if (currentUrl === '/user/login') return login(userinfo)(driver)
}