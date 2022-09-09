import styles from './navbar.module.css'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useState } from 'react'
import Image from 'next/image'

const NavBar = (props) => {

  const [showDropdown, setShowDropdown] = useState(false)
  const { username } = props

  const router = useRouter()

  const handleOnClickHome = (e) => {
    e.preventDefault()
    router.push('/')
    console.log('go home')
  }

  const handleOnClickMyList = (e) => {
    e.preventDefault()
    router.push("/browse/my-list")
    console.log('my list')
  }

  const handleOnClickShowDropdown = (e) => {
    e.preventDefault()
    setShowDropdown(!showDropdown)
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <a className={styles.logoLink} href="/">
          <div className={styles.logoWrapper}>
            <Image src={'/static/netflix.svg'} width="111px" height="30px" alt="netflix logo" />
          </div>
        </a>
      
      <ul className={styles.navItems}>
        <li className={styles.navItem} onClick={handleOnClickHome}>Home</li>
        <li className={styles.navItem2} onClick={handleOnClickMyList}>My list</li>
      </ul>

        <nav className={styles.navContainer}>
          <div>
            <button className={styles.usernameBtn} onClick={handleOnClickShowDropdown}>
              <p className={styles.username}>{username}</p>
              {/* expand more icon */}
              <Image src={'/static/expand_more.svg'} width="24px" height="24px" alt="Expand more" />
            </button>
            { showDropdown &&  <div className={styles.navDropdown}>
              <div>
                <Link href="/login">
                  <a className={styles.linkName}>Sign out</a>
                </Link>
                <div className={styles.lineWrapper}></div>
              </div>
            </div>
            }
          </div>
        </nav>
      </div>
    </div>
  )
}

export default NavBar