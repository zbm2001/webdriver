exports.globalDelay = 500

    exports.loginPage = {
  path: '/user/login',
  rPath: /\/user\/login(?=[#?]|$)/
}

exports.userinfo = {
  phone: '13552424313',
  password: 'baoer123'
}

// https://sites.google.com/a/chromium.org/chromedriver/mobile-emulation
// 实验性的东西，node 弃用，java ruby pythin 可用
// 'experimental': {
//   'mobileEmulation': {
//     'deviceName': 'iPhone 6'
//   }
// }
const mobileEmulation = {
  'iPhone 6': {
    'deviceName': 'iPhone 6',
    // 'deviceMetrics': {"width": 375, "height": 667, "pixelRatio": 2},
    // 'userAgent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1'
  }
}

// 配置客户端
exports.broswersConfig = {
  'chrome': {
    'mobileEmulation': mobileEmulation['iPhone 6'],
    'args': ['disable-infobars', '--args', '--disable-web-security', '--user-data-dir']
  }
}