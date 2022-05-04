import {connect} from 'mongoose'

export async function startConnection() {
  await connect('mongodb://localhost/images-gallery-db')
  console.log('Database is connected')
}