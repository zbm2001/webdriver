const webdriver = require('selenium-webdriver')
const By = webdriver.By
const Key = webdriver.Key

const userinfoData = {
  phone: '13552424310',
  password: '123456'
}

module.exports = function guide2Home (userinfo = userinfoData, delay = 500) {
  return async (driver) => {
    do {
      await driver.sleep(1000)

      let $artDialog = await driver.findElement(By.css('.art-dialog.open'))
      let $artDialogPageMask = await $artDialog.findElement(By.css('.page-mask')).catch(() => {})
      if ($artDialogPageMask) await $artDialogPageMask.click()
    } while ($artDialogPageMask)

    await driver.sleep(delay)

    return driver
  }
}