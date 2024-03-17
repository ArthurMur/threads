'use client'
import { useUnit } from 'effector-react'
import translationsJson from '../../public/translations.json'
import { $lang } from '../context/lang'

export const useLang = () => {
  const lang = useUnit($lang)
  const translations = translationsJson

  return { lang, translations }
}
