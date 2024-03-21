import { AnimatePresence, motion } from 'framer-motion'
import React, { useState } from 'react'
import { IAccordionProps } from '@/../types/modules'

const Accordion = ({
  children, // Контент, который будет отображаться внутри аккордеона
  title, // Заголовок аккордеона
  titleClass, // Дополнительный CSS-класс для заголовка
  rotateIconClass, // CSS-класс для иконки, которая будет вращаться при открытии/закрытии аккордеона
}: IAccordionProps) => {
  const [expanded, setExpanded] = useState(false) // Состояние, отвечающее за открытие/закрытие аккордеона

  const toggleAccordion = () => setExpanded(!expanded) // Функция-обработчик нажатия на заголовок аккордеона

  return (
    <>
      <motion.button // Кнопка-заголовок аккордеона
        initial={false}
        onClick={toggleAccordion}
        className={`btn-reset ${titleClass} ${
          // CSS-классы для кнопки
          rotateIconClass ? (expanded ? rotateIconClass : '') : ''
        }`}
      >
        {title}
      </motion.button>
      <AnimatePresence initial={false}>
        {expanded && ( // Если аккордеон открыт, отображаем контент
          <motion.div // Контейнер для контента аккордеона
            key='content'
            initial='collapsed'
            animate='open'
            exit='collapsed'
            variants={{
              // Варианты анимации
              open: { opacity: 1, height: 'auto' }, // Анимация открытия
              collapsed: { opacity: 0, height: 0 }, // Анимация закрытия
            }}
            style={{ overflow: 'hidden' }} // Скрываем контент, выходящий за пределы контейнера
            transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }} // Настройки анимации
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Accordion
