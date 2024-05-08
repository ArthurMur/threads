<div align="center">
  <a href="https://github.com/ArthurMur/threads">
    <img src="/app/favicon.ico" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">thread</h3>

  <p align="center">
    Онлайн магазин одежды
    <br />
    <br />
    <a href="https://thread-woad.vercel.app/">Сайт</a>
  </p>
</div>

## Описание проекта
Проект "thread" представляет собой онлайн магазин одежды со своей админкой, который находится в стадии разработки. В настоящее время реализованы базовые функциональности, такие как авторизация и регистрация пользователей через пароль и почту, а также возможность входа с использованием аккаунтов в социальных сетях. Пользователи могут добавлять товары в корзину, удалять их, а также выбирать необходимые размеры. В админке также можно увидеть все товары и удалить выбранные.

![homepage](https://github.com/ArthurMur/threads/assets/122103695/42b5fe29-47e2-4728-b401-608d451c8a51)


## Стек:

<div>
<img src="https://github.com/devicons/devicon/blob/master/icons/nextjs/nextjs-original.svg" title="nextjs" alt="nextjs" width="40" height="40"/>
<img src="https://github.com/ArthurMur/threads/assets/122103695/4b6a622f-6231-48f4-abe1-a57f7a0d9ee2" title="turbopack" alt="turbopack" width="35" height="40"/>
<img src="https://github.com/devicons/devicon/blob/master/icons/react/react-original.svg" title="reactjs" alt="reactjs" width="40" height="40"/>
<img src="https://github.com/devicons/devicon/blob/master/icons/typescript/typescript-original.svg" title="typescript" alt="typescript" width="40" height="40"/>
<img src="https://github.com/devicons/devicon/blob/master/icons/mongodb/mongodb-original.svg" title="mongodb" alt="mongodb" width="40" height="40"/>
<img src="https://github.com/devicons/devicon/blob/master/icons/mongoose/mongoose-original.svg" title="mongoose" alt="mongoose" width="40" height="40"/>
<img src="https://github.com/ArthurMur/threads/assets/122103695/718b60ba-1f8f-4f8e-8d99-04003eac6ec5" title="effector" alt="effector" width="40" height="40"/>
<img src="https://github.com/devicons/devicon/blob/master/icons/axios/axios-plain.svg" title="axios" alt="axios" width="40" height="40"/>
<img src="https://raw.githubusercontent.com/nodemailer/nodemailer/master/assets/nm_logo_200x136.png" title="nodemailer" alt="nodemailer" width="60" height="40"/>
<img src="https://github.com/ArthurMur/threads/assets/122103695/e500fbdc-0f55-40a6-bc54-2f9b39e6e104" title="jwt" alt="jwt" width="40" height="40"/>
<img src="https://brandeps.com/icon-download/P/Prettier-icon-vector-02.svg" title="prettier" alt="prettier" width="60" height="40"/>
<img src="https://brandeps.com/icon-download/E/Eslint-icon-vector-02.svg" title="eslint" alt="eslint" width="60" height="40"/>
<img src="https://brandeps.com/logo-download/S/Stylelint-logo-vector-01.svg" title="stylelint" alt="stylelint" width="60" height="40"/>
<img src="https://github.com/devicons/devicon/blob/master/icons/framermotion/framermotion-original.svg" title="framermotion" alt="framermotion" width="40" height="40"/>
<img src="https://github.com/devicons/devicon/blob/master/icons/swiper/swiper-original.svg" title="swiper" alt="swiper" width="60" height="40"/>
<img src="https://github.com/devicons/devicon/blob/master/icons/sass/sass-original.svg" title="sass/scss" alt="sass/scss" width="40" height="40"/>

 
</div>
</br>

- [Next.js](https://nextjs.org/) - фреймворк React для создания SSR и статических веб-приложений.
- [Turbopack](https://turbo.build/pack) - преемник Webpack на основе Rust
- [React](https://reactjs.org/) - библиотека для создания пользовательских интерфейсов.
- [TypeScript](https://www.typescriptlang.org/) - ЯП с сильной типизацией, созданный на основе JavaScript и предоставляющий более совершенные инструменты.
- [MongoDB](https://www.mongodb.com/) - NoSQL база данных.
- [Mongoose](https://mongoosejs.com/) - инструмент моделирования объектов MongoDB для Node.js.
- [Effector](https://effector.dev/) - библиотека для управления состоянием приложения.
- [Axios](https://axios-http.com/) - библиотека для выполнения HTTP запросов.
- [Nodemailer](https://nodemailer.com/) - модуль Node.js для отправки электронной почты.
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) - библиотека для создания и проверки JWT.
- [ESLint](https://eslint.org/) - инструмент статического анализа кода для идентификации проблемных образцов в коде.
- [Prettier](https://prettier.io/) - инструмент форматирования кода, который автоматически приводит код к единообразному стилю.
- [Stylelint](https://stylelint.io/) - инструмент для проверки CSS на соответствие стандартам и синтаксису, а также для поиска ошибок в коде стилей.
- [Framer Motion](https://www.framer.com/motion/) - библиотека анимаций для React.
- [Swiper](https://swiperjs.com/) - библиотека для создания слайдеров с поддержкой сенсорных жестов.
- [Sass](https://sass-lang.com/) - препроцессор CSS.

## Установка и запуск
1. Установите зависимости с помощью команды:
```sh
yarn install
```
2. Создайте файл `.env` на основе `.env.example` и заполните необходимые переменные.
3. Для создания миграций MongoDB используйте команду:
```sh
mongo-migrate up
```
4. Запустите проект в режиме разработки с помощью команды:
```sh
yarn run dev
```
5. Для сборки проекта используйте:
```sh
yarn run build
```
6. Для запуска собранного проекта используйте:
```sh
yarn start
```
