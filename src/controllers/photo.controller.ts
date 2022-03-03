import { Request, response, Response } from "express";
import Photo from '../models/Photo'
import fs from 'fs-extra'
import path from 'path'

// Index Page
export function indexPage(req: Request, res: Response): Response {
    return res.json({ 
        message: "List of methods",
        methods: {
            GetHome: "http://localhost:5000/api - Commands",
            Get: "http://localhost:5000/api/photos - All photos",
            Post: "/api/photos - Create a unique document mongodb",
            Delete: "/api/photos/:id - Delete the path and img of system",
            Put: "juju"
        }
    });
}

// Photo Controllers
export async function CreatePhoto(req: Request, res: Response): Promise <Response>{
    // console.log(req.file);
    const newPhoto = {
        title: req.body.title,
        description: req.body.description,
        imagePath: req.file?.path
    }
    const photo = await new Photo(newPhoto);
    photo.save();
    return res.json({ 
        message: "Photo saved successfully",
        photo
    });
}


export async function getPhotos(req:Request, res: Response): Promise <Response> {
    const photos = await Photo.find();
    return res.json({
        message: "All Photos in the next json.",
        photos
    })
}

export async function getPhoto(req:Request, res: Response): Promise <Response> {
    const {id} = req.params
    const photo = await Photo.findById(id);
    return res.json({
        message: "Search Succesfully.",
        photo
    })
}

export async function updatePhoto(req:Request, res: Response): Promise <Response> {
    const id = req.params.id
    const { title , description } = req.body
    const photo = await Photo.findByIdAndUpdate(id, {
        title,
        description
    }, {new: true} );
    return res.json({
        message: "Photo Updated succesfully.",
        photo
    })
}

export async function deletePhoto(req:Request, res: Response): Promise <Response> {
    const { id }= req.params
    const photo = await Photo.findByIdAndDelete(id);

    try {
        if (photo) {
            // const imgPath = path.resolve(photo.imagePath) 
            await fs.unlink(path.resolve(photo.imagePath))
        }
    } catch (error: any) {
        console.log(error.message);
    }

    return res.status(200).json({
        message: "Photo DELETED.",
        photo
    })
}
