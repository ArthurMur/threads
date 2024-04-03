import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faGithub,
  faGoogle,
  faVk,
  faYandex,
} from '@fortawesome/free-brands-svg-icons'

const AuthPopupSocials = ({
  handleSignupWithOAuth,
}: {
  handleSignupWithOAuth: VoidFunction
}) => (
  <div className='cart-body__socials'>
    <button
      className='btn-reset socials__btn gh-color'
      onClick={handleSignupWithOAuth}
      aria-label='Github'
    >
      <FontAwesomeIcon icon={faGithub} beat />
    </button>
    <button
      className='btn-reset socials__btn g-color'
      onClick={handleSignupWithOAuth}
      aria-label='Google'
    >
      <FontAwesomeIcon icon={faGoogle} shake />
    </button>
    <button
      className='btn-reset socials__btn y-color'
      onClick={handleSignupWithOAuth}
      aria-label='Yandex'
    >
      <FontAwesomeIcon icon={faYandex} bounce />
    </button>
    <button
      className='btn-reset socials__btn vk-color'
      onClick={handleSignupWithOAuth}
      aria-label='Vk'
    >
      <FontAwesomeIcon icon={faVk} shake />
    </button>
  </div>
)

export default AuthPopupSocials
