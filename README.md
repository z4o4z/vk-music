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

Ключи (loc, dev, prod, lint) являются названиями команд, которые можно вызвать при помощи `npm run name-of-command`.
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

Так же в скрипты можно передавать аргументы используя следующий синтаксис: `npm run name-of-command -- arguments`.
Например `npm run dev -- --progress` выполнит `npm run clear && webpack --env=dev --progress`.
Все аргументы будут добавлены в конец исходного скрипта.

### dependencies

Прямые зависимости вашего проекта, т.е. те зависимости которые используются вашим проектом.

Что бы зависимость попала в этот объект, при установке необходимо указать флаг `--save` или `-S`.

`npm install react --save` тоже самое, что и `npm i react -S`.

Конечно, никто не заприщает все зависимости проекта класть в `dependencies`, ниважно, будь то какая-то библиотека используемая вашим проектом или Webpack/Gulp.
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

* `raf` - [Полифил](https://github.com/chrisdickinson/raf) для [requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame)

* `react-icons` - [Набор паков](http://gorangajic.github.io/react-icons/) с SVG иконками. Доступны следующие паки:
	* Material Design Icons
	* FontAwesome
	* Typicons
	* Github Octicons
	* Ionicons

* `react-redux` - [Утилита](https://github.com/reactjs/react-redux) для связи Redux хранилища с React'ом

* `react-router` - [Роутер](https://github.com/ReactTraining/react-router) в декларативном стиле для React'а

* `react-router-redux` - [Утилита](https://github.com/reactjs/react-router-redux) для синхронизации ReactRouter'a с Redux'ом хранилищем. 
	Т.е. в Redux хранилище будет находитсья состояние роутера (текущая страница, параметры, и т.д.)

* `react-slider` - [Слайдер](https://github.com/mpowaga/react-slider) компонент

* `react-tooltip` - Компонент [тултипов](https://github.com/wwayne/react-tooltip)

* `redux` - [Библиотека](http://redux.js.org/) для управления состоянием приложения. 
	> Redux является предсказуемым контейнером состояния для JavaScript приложений.
	>
	> Это позволяет вам создавать приложения, которые ведут себя одинаково в различных окружениях (клиент, сервер и нативные приложения), а также просто тестируются. 
	> Кроме того, это обеспечивает большой опыт отладки, например редактирование кода в реальном времени в сочетании с time traveling.

* `redux-actions` - Вспомогательная [утилита](https://github.com/acdlite/redux-actions) которая упращает создание action'ов и reducer'ов.
	
	```
	let increment = amount => ({
		type: 'INCREMENT',
		payload: amount
	});
	increment = createAction('INCREMENT', amount => amount);
	increment = createAction('INCREMENT');
	```

	Последние две строчки делают абсолютно тоже самое, что и первая, однако последний вариант намного удобнее, и избавляет нас от кучи лишнего кода

* `redux-localstorage` - [Библиотека](https://github.com/elgerlambert/redux-localstorage) для полного или частичного сохранения redux-store в localstorage

* `redux-saga` - [Библиотека](https://redux-saga.github.io/redux-saga/) цель которой сделать сайд эффекты (AJAX, setTimeout, доступ к localstorage и т.д.) в React/Redux приложениях легче и лучше.
	Представте что Saga - это самостоятльный поток в вашем приложении, который отвечает только за сайд эффекты. 
	Саги имеют полный доступ к Redux-состоянию. 
	Они могут наблюдать за action'ами отправяемыми в Redux, реагировать на них, отправлять новые action'ы.
	А также порождать новые саги, при этом имея полный контроль над ними.  