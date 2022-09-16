import Head from "next/head"
import styles from '../styles/Login.module.css'
import Image from "next/image"
import { useState } from "react"
import { useRouter } from "next/router"
import magic from '../lib/magic-client'
import { useEffect } from "react"

const Login = () => {
  const [email, setEmail] = useState('')
  const [userMsg, setUserMsg] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  useEffect(() => {
    const handleComplete = () => {
      setIsLoading(false)
    }

    router.events.on('routeChangeComplete', handleComplete)
    router.events.on('routeChangeError', handleComplete)
  
    return () => {
      router.events.off('routeChangeComplete', handleComplete)
      router.events.off('routeChangeError', handleComplete)
    }
  }, [router])
  

  const handleOnChangeEmail = (e) => {
    setUserMsg("")
    const email = e.target.value
    setEmail(email)  
  }
 
  const handleLoginWithEmail = async (e) => {
    e.preventDefault()
    

    if (email) {
      
        // log in a user by their email
        try {
          setIsLoading(true)
          const didToken = await magic.auth.loginWithMagicLink({ email, showUI: true });

          if (didToken) {

            const response = await fetch('/api/login', {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${didToken}`,
                'Content-Type': 'application/json'
              }
            })

            const loggedInResponse = await response.json()

            if (loggedInResponse.done) router.push('/')
            if (!loggedInResponse.done) {
              setIsLoading(false)
              setUserMsg("Something went wrong loggin in")
            }

            
          }
        } catch (error) {
          // Handle errors if required!
          console.error("something went wrong logging in", error)
          setIsLoading(false)
        }
        // router.push('/')
      } else {
        setIsLoading(false)
        setUserMsg('Something went wrong')
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
            <button onClick={handleLoginWithEmail} className={styles.loginBtn}>
              {isLoading ? "Loading..." : "Sign In"}
            </button>
          </div>
        </main>
      
    </div>
  )
}

export default Login