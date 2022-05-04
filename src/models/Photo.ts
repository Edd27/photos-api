import { Schema, model, Document } from 'mongoose'

const PhotoSchema = new Schema({
  title: String,
  filePath: String,
  description: String
})

interface IPhoto extends Document {
  title: string
  filePath: string
  description: string
}

PhotoSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

export default model<IPhoto>('Photo', PhotoSchema)
