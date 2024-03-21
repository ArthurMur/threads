import { createDomain } from 'effector'

// Создание домена для модальных окон
const modals = createDomain()

// Создание событий открытия и закрытия меню
export const openMenu = modals.createEvent()
export const closeMenu = modals.createEvent()
export const openCatalogMenu = modals.createEvent()
export const closeCatalogMenu = modals.createEvent()
export const openSearchModal = modals.createEvent()
export const closeSearchModal = modals.createEvent()

// Состояние для отслеживания меню
export const $menuIsOpen = modals
  .createStore(false) // Изначально меню закрыто
  .on(openMenu, () => true) // При событии открытия меню устанавливается значение true
  .on(closeMenu, () => false) // При событии закрытия меню устанавливается значение false

// Cостояние для отслеживания меню
export const $catalogMenuIsOpen = modals
  .createStore(false) // Изначально меню закрыто
  .on(openCatalogMenu, () => true) // При событии открытия меню устанавливается значение true
  .on(closeCatalogMenu, () => false) // При событии закрытия меню устанавливается значение false

// Cостояние для отслеживания поиска
export const $searchModal = modals
  .createStore(false) // Изначально закрыто
  .on(openSearchModal, () => true) // При событии открытия устанавливается значение true
  .on(closeSearchModal, () => false) // При событии закрытия устанавливается значение false
