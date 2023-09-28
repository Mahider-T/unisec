// const mongoose = require('mongoose');
// const multer = require("multer")
const path = require("path")

const {createNewsDb, getAllNewsDb, getNewsDb, getNewsByLimitDb, updateNewsDb, deleteNewsDb, deleteImage } 
        = require('../dbHandler/news')

const asyncHandler = fn => (req, res, next) =>
  Promise
    .resolve(fn(req, res, next))
    .catch(next)


const getAllNews = asyncHandler(async (req, res) => {
    try{
        res.status(200).json({success: true, data: await getAllNewsDb()})
    }catch(e){
        res.status(404).json({success: false, message: e.message})
    }
});

const getNewsBylimit = asyncHandler(async (req, res, next) => {
    try{
        const { limit } = req.query
        if(limit){
            const data = await getNewsByLimitDb(limit);
            if(data){
                res.status(200).json({success: true, data: await getNewsByLimitDb(limit)})
            }
            else{
                next();
            }
        }
    }catch(e){
        res.status(404).json({success: false, message: e.message})
    }
});

const getNews = asyncHandler(async (req, res) => {
    try{
        const {id} = req.params
        res.status(200).json({success: true, data: await getNewsDb(id)})
    }catch(e){
        if(e.name == "CastError"){
            res.status(400).json({success: false, message: e.message})
        }
        else{
            res.status(404).json({success: false, message: e.message})
        }
    }
});

const createNews = asyncHandler(async (req, res) => {
    let  imageName = null;
    try{
        const {title, body , authorId } = req.body;
        const image  = req.file;
        if(image){
            imageName = image.filename;
        }
        // console.log(title, body)
        res.status(201).json({success: true, data: await createNewsDb(title, body, authorId, imageName)})
    }
    catch(e){
        deleteImage(imageName)
        res.status(400).json({success: false, message: e.message})
    }
})

const updateNews = asyncHandler(async (req, res) => {

    try{
        const {id} = req.params
        // const data = await getNewsDb(id);
        const {title, body } = req.body;
        // console.log(`at the controller ${title}`);
        const image  = req.file;
        let  imageName = null;
        if(image){
            imageName = image.filename;
            
        }
        // console.log(title, body)
        res.status(200).json({success: true, data: await updateNewsDb(id, title, body, imageName)})
    }
    catch(e){
        if(e.name == "CastError"){
            res.status(400).json({success: false, message: e.message})
        }
        else{
            res.status(404).json({success: false, message: e.message})
        }
    }
})

const deleteNews = asyncHandler(async (req, res) => {
    try{
        const {id} = req.params
        res.status(200).json({success: true, message: await deleteNewsDb(id)})
    }
    catch(e){
        if(e.name == "CastError"){
            res.status(400).json({success: false, message: e.message})
        }
        else{
            res.status(404).json({success: false, message: e.message})
        }
    }
})

module.exports = {
    asyncHandler, getAllNews, getNews, createNews, getNewsBylimit, updateNews, deleteNews
}

