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

// 配置客户端
let broswersConfig = {
  'chrome': {
    'mobileEmulation': {
      'deviceName': 'iPhone 6'
    }
  }
}

createDriver(broswersConfig).
then(openUrl('http://192.168.1.91:8080')).
then(guide('立即体验')).
then(linkPage('我的')).
then(login({phone: '13552424310', password: '123456'}))

