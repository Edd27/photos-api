import { Router } from 'express'
import {
  getPhotos,
  getPhoto,
  savePhoto,
  deletePhoto,
  updatePhoto
} from '../controllers/photo.controller'
import multer from '../libs/multer'

const router = Router()

router.get('/photos', getPhotos)
router.get('/photos/:id', getPhoto)
router.post('/photos', multer.single('image'), savePhoto)
router.delete('/photos/:id', deletePhoto)
router.put('/photos/:id', updatePhoto)

export default router
