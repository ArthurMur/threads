'use client'
import { Effect, createDomain, createEffect, sample } from 'effector'
import { Gate, createGate } from 'effector-react'
import { getBestsellerProductsFx, getNewProductsFx } from '../../api/main-page'
import { IProduct } from '../../types/common'
import { loadOneProductFx } from '../../api/goods'
import {
  ILoadOneProductFx,
  ILoadProductsByFilterFx,
  IProducts,
} from '../../types/goods'
import toast from 'react-hot-toast'
import api from '../../api/apiInstance'

export const loadProductsByFilterFx = createEffect(
  async ({
    limit,
    offset,
    category,
    isCatalog,
    additionalParam,
  }: ILoadProductsByFilterFx) => {
    try {
      const { data } = await api.get(
        `/api/goods/filter?limit=${limit}&offset=${offset}&category=${category}&${additionalParam}${
          isCatalog ? '&catalog=true' : ''
        }`
      )
      console.log(data)

      return data
    } catch (error) {
      toast.error((error as Error).message)
    }
  }
)

// Создание домена для управления состоянием и эффектами связанными с товарами
const goods = createDomain()

// Создание ворот для главной страницы
export const MainPageGate = createGate()

// сетим продукт
export const setCurrentProduct = goods.createEvent<IProduct>()
// Загружаем один продукт
export const loadOneProduct = goods.createEvent<ILoadOneProductFx>()
// Загружаем продукт по фильтру
export const loadProductsByFilter = goods.createEvent<ILoadProductsByFilterFx>()

// Создание экземпляра хранилища для товаров
const goodsStoreInstance = (effect: Effect<void, [], Error>) =>
  goods
    .createStore([])
    // Обработка успешного завершения эффекта: обновление состояния хранилища
    .on(effect.done, (_, { result }) => result)
    // Обработка ошибки эффекта: вывод сообщения об ошибке в консоль
    .on(effect.fail, (_, { error }) => {
      console.log(error.message)
    })

// Создание экземпляра события выборки для товаров
const goodsSampleInstance = (
  effect: Effect<void, [], Error>,
  gate: Gate<unknown>
) =>
  sample({
    // Использование состояния ворота в качестве триггера выборки
    clock: gate.open,
    // Эффект, который будет запускаться при открытии ворот
    target: effect,
  })

// Создание сторов для новых и популярных товаров с использованием соответствующих эффектов
export const $newProducts = goodsStoreInstance(getNewProductsFx)
export const $bestsellerProducts = goodsStoreInstance(getBestsellerProductsFx)

// Настройка выборки для новых и популярных товаров по событиям открытия ворота
goodsSampleInstance(getNewProductsFx, MainPageGate)
goodsSampleInstance(getBestsellerProductsFx, MainPageGate)

// Получет продукты из эвента и добавляет их в стор
export const $currentProduct = goods
  .createStore<IProduct>({} as IProduct)
  .on(setCurrentProduct, (_, product) => product)
  .on(loadOneProductFx.done, (_, { result }) => result.productItem)

export const $products = goods
  .createStore<IProducts>({} as IProducts)
  .on(loadProductsByFilterFx.done, (_, { result }) => result)

sample({
  clock: loadOneProduct,
  source: $currentProduct,
  fn: (_, data) => data,
  target: loadOneProductFx,
})

sample({
  clock: loadProductsByFilter,
  source: $products,
  fn: (_, data) => data,
  target: loadProductsByFilterFx,
})
