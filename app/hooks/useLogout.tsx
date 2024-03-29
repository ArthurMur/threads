import { useEarthoOne } from '@eartho/one-client-react'
import { useRouter } from 'next/navigation'
import { setIsAuth } from '@/context/auth'

// Кастомный хук для выхода пользователя из системы
export const useUserLogout = () => {
  const router = useRouter() // Использование хука useRouter для работы с маршрутизацией
  const { logout } = useEarthoOne() // Использование хука useEarthoOne для работы с Eartho One

  // Функция для выполнения действий по выходу пользователя из системы
  return () => {
    // Выход пользователя с указанием идентификатора клиента для OAuth
    logout({ client_id: `${process.env.NEXT_PUBLIC_OAUTH_CLIENT_ID}` })
    localStorage.removeItem('auth') // Удаление данных аутентификации из локального хранилища
    setIsAuth(false) // Установка состояния аутентификации в false
    router.push('/') // Перенаправление пользователя на главную страницу
    window.location.reload() // Обновление текущей страницы для применения изменений
  }
}
