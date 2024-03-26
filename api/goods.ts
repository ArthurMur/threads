import { createEffect } from 'effector'
import { toast } from 'react-hot-toast'
import api from './apiInstance'
import { ILoadOneProductFx } from '../types/goods'

// Функция для получения одного товара
export const loadOneProductFx = createEffect(
  async ({ productId, category }: ILoadOneProductFx) => {
    try {
      // получаем данные из тела запроса
      const { data } = await api.post('/api/goods/one', { productId, category })

      // если данные некорректные, возвращаем ошибку
      if (data?.message === 'Wrong product id') {
        return { productItem: { errorMessage: 'Wrong product id' } }
      }

      return data
    } catch (error) {
      toast.error((error as Error).message)
    }
  }
)
