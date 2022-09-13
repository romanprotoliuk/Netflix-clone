import Head from "next/head"
import styles from '../styles/Login.module.css'
import Image from "next/image"
import { useState } from "react"
import { useRouter } from "next/router"

const Login = () => {
  const [email, setEmail] = useState('')
  const [userMsg, setUserMsg] = useState("")
  
  const router = useRouter()

  const handleOnChangeEmail = (e) => {
    setUserMsg("")
    const email = e.target.value
    console.log('change')
    setEmail(email)  
  }
 
  const handleLoginWithEmail = (e) => {
    e.preventDefault()
    console.log("hi button")

    if (email) {
      if (email === 'romanprotoliuk@gmail.com') {
        router.push('/')
      } else {
        setUserMsg('Something went wrong')
      }
    } else {
      setUserMsg("Enter a valid email address")
    }
  }


  return (
    <div className={styles.container}>
      <Head>
        <title>Netflix sign-in</title>
      </Head>

        <header className={styles.header}>
          <div className={styles.headerWrapper}>
            <a className={styles.logoLink} href="/">
              <div className={styles.logoWrapper}>
                <Image src={'/static/netflix.svg'} width="111px" height="30px" alt="netflix logo" />
              </div>
            </a>
          </div>
        </header>
        <main className={styles.main}>

          <div className={styles.mainWrapper}>
            <h1 className={styles.signinHeader}>Sign In</h1>

            <input
              type="text"
              placeholder="Email address"
              className={styles.emailInput}
              onChange={handleOnChangeEmail}
            />
            
            <p className={styles.userMsg}>{userMsg}</p>
            <button onClick={handleLoginWithEmail} className={styles.loginBtn}> Sign In </button>
          </div>
        </main>
      
    </div>
  )
}

export default Login