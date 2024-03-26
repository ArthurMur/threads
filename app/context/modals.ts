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
export const closeQuickViewModal = modals.createEvent()
export const showQuickViewModal = modals.createEvent()
export const closeSizeTable = modals.createEvent()
export const showSizeTable = modals.createEvent()

// Состояние для отслеживания меню
export const $menuIsOpen = modals
  .createStore(false) // Изначально меню закрыто
  .on(openMenu, () => true)
  .on(closeMenu, () => false)

// Cостояние для отслеживания меню
export const $catalogMenuIsOpen = modals
  .createStore(false) // Изначально меню закрыто
  .on(openCatalogMenu, () => true)
  .on(closeCatalogMenu, () => false)

// Cостояние для отслеживания поиска
export const $searchModal = modals
  .createStore(false) // Изначально закрыто
  .on(openSearchModal, () => true)
  .on(closeSearchModal, () => false)

// Cостояние для отслеживания окна быстрого просмотра
export const $showQuickViewModal = modals
  .createStore(false)
  .on(showQuickViewModal, () => true)
  .on(closeQuickViewModal, () => false)

// Cостояние для отслеживания окна размеров
export const $showSizeTable = modals
  .createStore(false)
  .on(closeSizeTable, () => false)
  .on(showSizeTable, () => true)
