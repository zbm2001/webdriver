module.exports = function openUrl (url = 'http://localhost:8080', delay = 500) {
  return async (driver) => {
    if (/(?:l(?:ocal(?:host)?)?|本地?|本机?)[-:\s]*(?:8080|app)/i.test(url)) {
      // 本地 app
      url = 'http://localhost:8080'
    } else if (/(?:l(?:ocal(?:host)?)?|本地?|本机?)[-:\s]*(?:3000|m站?|[微信])/i.test(url)) {
      // 本地 m 站
      url = 'http://localhost:3000'
    } else if (/(?:t(?:est)?|测试?)[-:\s]*(?:3000|m站?|[微信])/i.test(url)) {
      // 测试 m 站
      url = 'http://testm.zhuaqianmao.com:3000'
    } else if (/(?:s(?:est)?|正式?)[-:\s]*(?:3000|m站?|[微信])/i.test(url)) {
      // 正式 m 站
      url = 'http://m.zhuaqianmao.com'
    }

    typeof url === 'string' && driver.get(url)

    await driver.sleep(delay)

    return driver
  }
}