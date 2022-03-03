import { Router } from 'express'

const router = Router();

import { CreatePhoto, deletePhoto, getPhoto, getPhotos, indexPage, updatePhoto } from '../controllers/photo.controller'
import multer from '../libs/multer'

// index Page Get
router.get('/', indexPage)

// Photos 
router.route('/photos')
    .post(multer.single('image') , CreatePhoto)
    .get(getPhotos)
//

// Photo by Id
router.route('/photos/:id')
    .get( getPhoto )
    .delete( deletePhoto )
    .put( updatePhoto )
//

export default router;