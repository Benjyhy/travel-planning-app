import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { compare } from 'bcryptjs'
import connectDB from '../../../db/utils/connect'

export default NextAuth({
   //configure JWT
   session: {
      strategy: 'jwt',
   },
   //specify Provider
   providers: [
      CredentialsProvider({
         name: 'signin',
         credentials: {
            email: { label: 'email', type: 'text', placeholder: 'email' },
            password: { label: 'Password', type: 'password' },
         },
         async authorize(credentials: any) {
            //Connect to db
            const client = await connectDB()
            //Get users
            const users = await client.db().collection('users')
            //Find user with the email
            const result = await users.findOne({
               email: credentials.email,
            })
            //If not foud send error
            if (!result) {
               client.close()
               throw new Error('No user found with this email')
            }
            //Check hashed password
            const checkPassword = await compare(
               credentials.password,
               result.password,
            )
            if (!checkPassword) {
               client.close()
               throw new Error('Password doesnt match')
            }
            client.close()
            return { email: result.email }
         },
      }),
   ],
   secret: process.env.JWT_SECRET
})
