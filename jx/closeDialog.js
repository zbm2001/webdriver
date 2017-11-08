const Config = require('./Config')
const webdriver = require('selenium-webdriver')
const By = webdriver.By

module.exports = function closeDialog (delay = Config.globalDelay) {
  return async (driver) => {
    let $openedArtDialog, $artDialogPageMask
    do {
      await driver.sleep(1000)

      $openedArtDialog = await driver.findElement(By.css('.art-dialog.open')).catch(() => {})
      if ($openedArtDialog) {
        $artDialogPageMask = await $openedArtDialog.findElement(By.css('.page-mask')).catch(() => {})
        if ($artDialogPageMask) {
          await driver.mouseMove($artDialogPageMask, {x:1, y:1}).click()
        }
      }

    } while ($artDialogPageMask)

    await driver.sleep(delay)

    return driver
  }
}