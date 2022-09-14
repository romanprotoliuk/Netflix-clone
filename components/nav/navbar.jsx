import styles from './navbar.module.css'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useState } from 'react'
import Image from 'next/image'
import { useEffect } from 'react'
import magic from '../../lib/magic-client'

const NavBar = () => {

  const [showDropdown, setShowDropdown] = useState(false)
  const [username, setUsername] = useState("")

  useEffect(() => {
    async function getUsername() {
      try {
        const { email } = await magic.user.getMetadata();
        if (email) {
          setUsername(email);
        }
      } catch (error) {
        console.error("Error retrieving email:", error);
      }
    }
    getUsername();
  }, [])

  console.log({username})
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

  const handleSignout = async (e) => {
    e.preventDefault()
    try {
      await magic.user.logout()
      console.log(await magic.user.isLoggedIn())
      router.push('/login')
    } catch (error) {
      console.error('Error logging out', error)
      router.push('/login')
    }
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
                <a className={styles.linkName} onClick={handleSignout}>Sign out</a>
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