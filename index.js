const { Builder, By, Key, until } = require('selenium-webdriver');
const config = require('./config.json');

const args = process.argv.slice(2);

const username = args[1];

async function example() {
  const driver = await new Builder().forBrowser('chrome').build();
  try {
    // Устанавливаем максимальный размер окна
    await driver.manage().window().maximize();

    // Переход на страницу логина
    await driver.get(
      `https://www.instagram.com/accounts/login/?next=%2F${username}%2F&source=desktop_nav`
    );

    // Ждем пока зарендерится элемент username
    await driver.wait(until.elementLocated(By.name('username')));

    // Записываем значение в username
    await driver.findElement(By.name('username')).sendKeys(config.username);

    // Записываем значение в password
    await driver.findElement(By.name('password')).sendKeys(config.password);

    // Сабмитим
    await driver
      .findElement(
        By.xpath(
          '/html/body/div[2]/div/div/div[2]/div/div/div[1]/section/main/div/div/div[1]/div[2]/form/div/div[3]/button'
        )
      )
      .click();

    // Ждем переход на другую страницу
    await driver.wait(
      until.urlIs(
        `https://www.instagram.com/accounts/onetap/?next=%2F${username}%2F`
      )
    );

    const notNow =
      '/html/body/div[2]/div/div/div[2]/div/div/div[1]/div[1]/div[2]/section/main/div/div/div/div/div';

    // Ждем пока зарендерится элемент not now
    await driver.wait(until.elementLocated(By.xpath(notNow)));

    // Кликаем по нему (not now)
    await driver.findElement(By.xpath(notNow)).click();

    // Ждем переход на другую страницу
    await driver.wait(until.urlIs(`https://www.instagram.com/${username}/`));

    const report =
      '/html/body/div[2]/div/div/div[2]/div/div/div[1]/div[1]/div[2]/div[2]/section/main/div/header/section/div[1]/div[2]/div/div';

    const complain =
      '/html/body/div[6]/div[1]/div/div[2]/div/div/div/div/div[2]/div/div/div/button[3]';

    const reportAcc =
      '/html/body/div[6]/div[1]/div/div[2]/div/div/div/div/div/div/div[2]/div/div/div/div[3]/button[2]';

    const imperson =
      '/html/body/div[6]/div[1]/div/div[2]/div/div/div/div/div/div/div[2]/div/div/div/div[1]/button[2]';

    const me =
      '/html/body/div[6]/div[1]/div/div[2]/div/div/div/div/div/div/div[2]/div/div/div/fieldset/div[1]';

    const send =
      '/html/body/div[6]/div[1]/div/div[2]/div/div/div/div/div/div/div[2]/div/div/div/div[6]/button';

    const close =
      '/html/body/div[6]/div[1]/div/div[2]/div/div/div/div/div/div/div/div/div/div[4]/button';

    // Ждем пока зарендерится элемент report
    await driver.wait(until.elementLocated(By.xpath(report)));

    // Основная часть
    while (true) {
      // Кликаем по нему (report)
      await driver.findElement(By.xpath(report)).click();

      // Ждем пока зарендерится complain
      await driver.wait(until.elementLocated(By.xpath(complain)));

      // Кликаем по нему (complain)
      await driver.findElement(By.xpath(complain)).click();

      // Ждем пока зарендерится report account
      await driver.wait(until.elementLocated(By.xpath(reportAcc)));

      // Кликаем по нему (report account)
      await driver.findElement(By.xpath(reportAcc)).click();

      // Ждем пока зарендерится imperson
      await driver.wait(until.elementLocated(By.xpath(imperson)));

      // Кликаем по нему (imperson)
      await driver.findElement(By.xpath(imperson)).click();

      // Ждем пока зарендерится me
      await driver.wait(until.elementLocated(By.xpath(me)));

      // Кликаем по нему (me)
      await driver.findElement(By.xpath(me)).click();

      // Ждем пока зарендерится send
      await driver.wait(until.elementLocated(By.xpath(send)));

      // Сабмитим
      await driver.findElement(By.xpath(send)).click();

      // Ждем пока зарендерится close
      await driver.wait(until.elementLocated(By.xpath(close)));

      // Кликаем по нему (close)
      await driver.findElement(By.xpath(close)).click();
    }
  } finally {
    // await driver.quit();
  }
}

example();
