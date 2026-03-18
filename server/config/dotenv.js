// this file allows users to access [procces] environment vars 
import dotenv from 'dotenv'
dotenv.config({path: '../.env'})
console.log('DB PASSWORD:', process.env.PGPASSWORD)

