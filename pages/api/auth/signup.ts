import { hash } from 'bcryptjs'
import connectDB from '../../../db/utils/connect'

async function handler(req: any, res: any) {
   //only POST method is accepted
   if (req.method === 'POST') {
      // Getting email and password from body
      const { email, password } = req.body

      //validate
      if (!email || !email.includes('@') || !password) {
         res.status(422).json({ message: 'Invalid credentials' })
         return
      }

      //connect with database
      const client = await connectDB()
      const db = client.db()

      //Check if user already exist
      const checkExisting = await db.collection('users').findOne({ email })

      //Send error if duplicate user is found
      if (checkExisting) {
         res.status(422).json({ message: 'User already exists' })
         client.close()
         return
      }

      //Hash the password
      const status = await db.collection('users').insertOne({
         email,
         password: await hash(password, 12),
      })

      //send success response
      res.status(201).json({ message: 'User created', ...status })
      client.close()
   } else {
      //Response for other than POST method
      res.status(500).json({ message: 'Route not valid' })
   }
}

export default handler
