const Config = require('./Config')
const webdriver = require('selenium-webdriver')
const createDriver = require('./createDriver')
const openUrl = require('./openUrl')
const guide = require('./guide')
const linkPage = require('./linkPage')
const login = require('./login')

// const Key = webdriver.Key
// const By = webdriver.By
// const Button = webdriver.Button
// const until = webdriver.until

const mobileEmulation = {
  'iPhone 6': {
    // 'deviceName': 'iPhone 6',
    'deviceMetrics': {"width": 375, "height": 667, "pixelRatio": 2},
    'userAgent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1'
  }
}

// 配置客户端
let broswersConfig = {
  'chrome': {
    'mobileEmulation': mobileEmulation['iPhone 6'],
    'args': ['disable-infobars', '--args', '--disable-web-security', '--user-data-dir']
  }
}

createDriver(broswersConfig).
then(openUrl('http://192.168.1.91:8080')).
then(guide('立即体验')).
then(linkPage('我的')).
then(login(Config.userinfo)).
then((driver) => driver.sleep(Infinity))

