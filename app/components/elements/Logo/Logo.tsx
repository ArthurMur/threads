import Image from 'next/image'
import Link from 'next/link'

export const Logo = () => (
  <Link className='logo' href='/'>
    <Image src='./img/logo.svg' alt='logo' width={197} height={50} />
  </Link>
)
