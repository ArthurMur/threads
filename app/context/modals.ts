import { createDomain } from 'effector'

// Создание домена для модальных окон
const modals = createDomain()

// Создание событий открытия и закрытия меню
export const openMenu = modals.createEvent()
export const closeMenu = modals.createEvent()

// Создание переменной состояния для отслеживания состояния меню
export const $menuIsOpen = modals
  .createStore(false) // Изначально меню закрыто
  .on(openMenu, () => true) // При событии открытия меню устанавливается значение true
  .on(closeMenu, () => false) // При событии закрытия меню устанавливается значение false
