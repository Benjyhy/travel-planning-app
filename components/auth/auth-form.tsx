import { useState, useRef } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'

async function createUser(email: string, password: string) {
   const response = await fetch('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: {
         'Content-Type': 'application/json',
      },
   })

   const data = await response.json()

   if (!response.ok) {
      throw new Error(data.message || 'Something went wrong!')
   }

   return data
}

function AuthForm() {
   const emailInputRef: any = useRef()
   const passwordInputRef: any = useRef()

   const [isLogin, setIsLogin] = useState(true)
   const router = useRouter()

   function switchAuthModeHandler() {
      setIsLogin((prevState) => !prevState)
   }

   async function submitHandler(event: any) {
      event.preventDefault()

      const enteredEmail = emailInputRef.current?.value
      const enteredPassword = passwordInputRef.current.value

      if (isLogin) {
         const result: any = await signIn('credentials', {
            redirect: false,
            email: enteredEmail,
            password: enteredPassword,
         })

         if (!result.error) {
            // set some auth state
            router.replace('/')
         }
      } else {
         try {
            const result = await createUser(enteredEmail, enteredPassword)
            switchAuthModeHandler()
            console.log(result)
         } catch (error) {
            console.log(error)
         }
      }
   }

   return (
      <div
         style={{
            borderRadius: '20px',
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            width: '100%',
            maxWidth: '1000px',
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
         }}
      >
         <p style={{ fontSize: '36px', fontWeight: 'bold' }}>Epic Road Trip</p>
         <form
            onSubmit={submitHandler}
            style={{
               backgroundColor: '#ffffff',
               border: 'none',
               borderRadius: '10px',
               paddingRight: '2em',
               boxShadow:
                  '0 2px 4px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(0, 0, 0, 0.1)',
               marginBottom: '30px',
               padding: '20px',
               width: '30em',
            }}
         >
            <p
               style={{
                  fontSize: '30px',
                  fontWeight: 'bold',
                  marginLeft: '6em',
               }}
            >
               {isLogin ? 'Login' : 'Sign Up'}
            </p>
            <div style={{ marginBottom: '1em' }}>
               <label
                  style={{
                     fontSize: '20px',
                     color: '#1d2129',
                     fontWeight: 'bold',
                  }}
                  htmlFor="email"
               >
                  Your Email
               </label>
               <input
                  style={{
                     width: '100%',
                     margin: '5px 0',
                     height: '45px',
                     verticalAlign: 'middle',

                     border: '1px solid #dddfe2',

                     padding: '0 8px',
                     outline: 'none',
                  }}
                  type="email"
                  id="email"
                  required
                  ref={emailInputRef}
               />
            </div>
            <div>
               <label
                  style={{
                     fontSize: '20px',
                     color: '#1d2129',
                     fontWeight: 'bold',
                  }}
                  htmlFor="password"
               >
                  Your Password
               </label>
               <input
                  style={{
                     width: '100%',
                     margin: '5px 0',
                     height: '45px',
                     verticalAlign: 'middle',
                     fontSize: '16px',
                     border: '1px solid #dddfe2',
                     color: '#1d2129',
                     padding: '0 8px',
                     outline: 'none',
                  }}
                  type="password"
                  id="password"
                  required
                  ref={passwordInputRef}
               />
            </div>
            <div>
               <button
                  style={{
                     width: '100%',
                     marginLeft: '0.5em',
                     marginTop: '0.5em',
                     marginBottom: '0.5em',
                     height: '45px',
                     verticalAlign: 'middle',
                     backgroundColor: '#1877f2',
                     border: 'none',
                     borderRadius: '6px',
                     fontSize: '20px',
                     padding: '0 16px',
                     color: '#ffffff',
                     fontWeight: 700,
                  }}
               >
                  {isLogin ? 'Login' : 'Create Account'}
               </button>
               <button
                  style={{
                     width: '100%',
                     marginLeft: '0.5em',
                     height: '45px',
                     backgroundColor: '#34D399',
                     border: 'none',
                     borderRadius: '6px',
                     fontSize: '17px',
                     lineHeight: '48px',
                     padding: '0 16px',
                     color: '#ffffff',
                     fontWeight: 700,
                     marginTop: '20px',
                  }}
                  type="button"
                  onClick={switchAuthModeHandler}
               >
                  {isLogin
                     ? 'Create new account'
                     : 'Login with existing account'}
               </button>
            </div>
         </form>
      </div>
   )
}

export default AuthForm
