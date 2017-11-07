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

createDriver(Config.broswersConfig).
then(openUrl('http://192.168.1.91:8080')).
then(guide('立即体验')).
then(linkPage('我的')).
then(login(Config.userinfo)).
then((driver) => driver.sleep(Infinity))

