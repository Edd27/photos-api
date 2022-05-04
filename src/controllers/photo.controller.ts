import { Request, Response } from 'express'
import path from 'path'
import fs from 'fs-extra'
import Photo from '../models/Photo'

export async function getPhotos(
  req: Request,
  res: Response
): Promise<Response> {
  const photos = await Photo.find({})
  return res.json(photos)
}

export async function getPhoto(req: Request, res: Response): Promise<Response> {
  const { id } = req.params
  const photo = await Photo.findById(id)
  if (!photo) {
    return res.status(404).json({ message: 'Photo not found' })
  }
  return res.json(photo)
}

export async function savePhoto(
  req: Request,
  res: Response
): Promise<Response> {
  const { title, description } = req.body

  const photo = new Photo({
    title,
    description,
    filePath: req.file?.path
  })

  await photo.save()

  return res.status(201).json(photo)
}

export async function deletePhoto(
  req: Request,
  res: Response
): Promise<Response> {
  const { id } = req.params
  const photo = await Photo.findByIdAndDelete(id)

  if (photo) {
    await fs.unlink(path.resolve(photo.filePath))
  }

  return res.json({ message: 'Photo deleted' })
}

export async function updatePhoto(
  req: Request,
  res: Response
): Promise<Response> {
  const { id } = req.params
  const { title, description } = req.body

  const updatedPhoto = await Photo.findByIdAndUpdate(
    id,
    { title, description },
    { new: true }
  )

  return res.json(updatedPhoto)
}
