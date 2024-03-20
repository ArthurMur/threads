import { useLang } from '@/hooks/useLang' // Импорт хука для работы с языком
import { handleCloseSearchModal } from '@/lib/utils/common' // Импорт функции для закрытия модального окна поиска

const SearchModal = () => {
  // Объявление компонента SearchModal
  const { lang, translations } = useLang() // Получение текущего языка и переводов

  const handleInputFocus = (
    // Обработчик фокуса на поле ввода
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) => {
    e.target.classList.add('with_value') // Добавление класса при фокусе
  }

  const handleInputBlur = (
    // Обработчик потери фокуса на поле ввода
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) => {
    if (e.target.value) {
      // Проверка на наличие значения
      return // Возвращение, если поле не пустое
    }

    e.target.classList.remove('with_value') // Удаление класса при пустом поле
  }

  return (
    <div className='search-modal'>
      {/* Элемент контейнера модального окна поиска */}
      <button
        className='btn-reset search-modal__close' // Кнопка закрытия модального окна
        onClick={handleCloseSearchModal} // Обработчик клика для закрытия окна
      />
      <h3 className='search-modal__title'>
        {translations[lang].header.search_products}{' '}
        {/* Заголовок модального окна */}
      </h3>
      <div className='search-modal__top'>
        {/* Верхняя часть модального окна */}
        <label className='search-modal__label'>
          {/* Метка для поля ввода */}
          <input
            type='text'
            className='search-modal__input' // Поле ввода
            onFocus={handleInputFocus} // Обработчик фокуса на поле ввода
            onBlur={handleInputBlur} // Обработчик потери фокуса на поле ввода
          />
          <span className='search-modal__floating_label'>
            {translations[lang].header.search_infos} {/* Подпись поля ввода */}
          </span>
        </label>
      </div>
    </div>
  )
}

export default SearchModal // Экспорт компонента SearchModal
