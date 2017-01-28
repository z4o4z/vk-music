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
В объекте scripts  перечисляются команды-хэлперы упрощающие разработку, запуск тестов и всё то, что вы хотите оптимизировать и не только)

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

### dependencies

Прямые зависимости вашего проекта, т.е. те зависимости которые используются вашим проектом.
Что бы зависимость попала в этот объект, при установке необходимо указать флаг `--save` или `-S`.

`npm install react --save` тоже самое что и `npm i react -S`.

Конечно, никто не заприщает все зависимости проекта класть в `dependencies`, ниважно будь то какая-то библиотека используемая вашим проектом или Webpack.
Но хорошим тоном считается разграничивать такие вещи.

Разберём зависимости нашего приложения:

* `babel-polyfill` - [Полифил](https://babeljs.io/docs/usage/polyfill/) позволяющий использовать фичи стандарта ES2015 (Promise, WeakMap, Array.from, Object.assign, ...)
* `classnames` - [Утилита](https://github.com/JedWatson/classnames) для удобной склейки классов
	```
	classNames('foo', 'bar'); // => 'foo bar'
	classNames('foo', { bar: true }); // => 'foo bar'
	classNames({ 'foo-bar': true }); // => 'foo-bar'
	classNames({ 'foo-bar': false }); // => ''
	classNames({ foo: true }, { bar: true }); // => 'foo bar'
	```
* `lodash` - [Библиотека](https://lodash.com/docs/4.17.4) в функциональном стиле обладающая богатым функционалом для работы с массивами, объектами, строками и т.д.
* `raf` - [Полифил](http://html5.by/blog/what-is-requestanimationframe/)
```
{
	"babel-polyfill": "^6.16.0",
	"classnames": "",
	"lodash": "^4.17.2",
	"raf": "^3.3.0",
	"react": "^15.4.1",
	"react-addons-shallow-compare": "^15.4.1",
	"react-dom": "^15.4.1",
	"react-icons": "^2.2.1",
	"react-redux": "^5.0.2",
	"react-router": "^3.0.0",
	"react-router-redux": "^4.0.7",
	"react-slider": "^0.7.0",
	"react-tooltip": "^3.2.2",
	"redux": "^3.6.0",
	"redux-actions": "^1.1.0",
	"redux-localstorage": "^0.4.1",
	"redux-saga": "^0.14.3"
}
```
