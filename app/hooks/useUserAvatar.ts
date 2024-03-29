import { useUnit } from 'effector-react'
import { useState, useEffect } from 'react'
import { $user } from '@/context/user'

// Кастомный хук для получения аватара пользователя
export const useUserAvatar = () => {
  const user = useUnit($user) // получение состояния пользователя из стора
  const [src, setSrc] = useState('') // Состояние для хранения источника изображения

  useEffect(() => {
    // Эффект, срабатывающий при изменении состояния пользователя
    if (user.image) {
      // Проверка наличия изображения пользователя
      setSrc(user.image) // Установка источника изображения из состояния пользователя
      return // Прерывание выполнения эффекта
    }

    // Получение аватара пользователя из хранилища, если отсутствует в состоянии пользователя
    const oauthAvatar = JSON.parse(
      localStorage.getItem(
        '@@earthoOnespajs@@::zYSRc2aOOsKguHfXwj38::default::undefined'
      ) as string
    )

    // Проверка наличия информации об аватаре в хранилище
    if (!oauthAvatar) {
      return // Прерывание выполнения эффекта
    }

    // Установка источника изображения из данных аватара OAuth
    setSrc(oauthAvatar.body.decodedToken.user.user.photoURL)
  }, [user.image]) // Зависимость от состояния изображения пользователя

  return { src, alt: user.name } // Возврат источника и альтернативного текста для изображения
}
