# Разбор проекта на React + Redux + Saga, на примере [VK Music Player](http://vkmsc.com/)

## Содержание
* [package.json](#packagejson)
	* [scripts](#scripts)
	* [dependencies](#dependencies)
	* [devDependencies](#devDependencies)

## package.json
Грубо говоря package.json это файл с информацией о вашем проекте, его зависимостях и прочих вещах.
Полный разбор можно посмотреть на [официальном сайте](https://docs.npmjs.com/files/package.json).
А пока что давайте разберём то, что содержится в нашем package.json:

* `name` - имя
* `version` - версия
* `description` - описание
* `main` - точка входа
* `scripts` - объект содержащий [команды-хэлперы](#scripts)
* `dependencies` - объект содержащий [прямые зависимости](#dependencies)
* `devDependencies` - объект содержащий [косвенные зависимости](#devDependencies)

### scripts
В объекте scripts  перечисляются команды-хэлперы упрощающие разработку, запуск тестов и всего того, что вашей душе угодно)

Наш scripts содержит следующее:
```
{
	"loc": "rm -rf ./dist && webpack-dev-server --env=loc",
	"dev": "rm -rf ./dist && webpack --env=dev",
	"prod": "rm -rf ./dist && webpack --env=prod",
	"lint": "eslint ./src/**/*.js && stylelint ./src/**/*.scss"
}
```

Ключи (loc, dev, prod, lint) являются названиями команд, которые можно вызвать при помощи `npm run имя-команды`.
Т.е. исходя из примера выше, если мы напишем в консоле `npm run loc`, то на самом деле выполнится `rm -rf ./dist && webpack-dev-server --env=loc`.
Согласитесь, вариант с `npm run` намного короче и проще.
Более того, в `scripts` также можно использовать `npm run` команды.
Для примера можно вынести повторяющийся кусок `rm -rf ./dist` в отдельный скрипт `clear`, в итоге получим:

```
{
	"loc": "npm run clear && webpack-dev-server --env=loc",
	"dev": "npm run clear && webpack --env=dev",
	"prod": "npm run clear && webpack --env=prod",
	"lint": "eslint ./src/**/*.js && stylelint ./src/**/*.scss",
	"clear": "rm -rf ./dist"
}
```

Так же в скрипты можно передавать аргументы используя следующий синтаксис: `npm run имя-команды -- аргументы`.
Например `npm run dev -- --progress` выполнит `npm run clear && webpack --env=dev --progress`.
Все аргументы будут добавлены в конец исходного скрипта.
