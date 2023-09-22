const express = require('express');
const router = express.Router();
const { getAllNews, createNews, getNews, getNewsBylimit, updateNews, deleteNews } 
        = require('../controllers/news.js')
const uploadImage = require('../config/news-multer.js')


//handle route for query parameters prior to fetching all news
router.get('/query', getNewsBylimit,getAllNews )

//GET
router.get('/', getAllNews)
router.get('/:id', getNews)
//POST -admin only
router.post('/', uploadImage.single("image"), createNews)
//PUT [update]
router.put('/:id', uploadImage.single("image"), updateNews)
//DELETE
router.delete('/:id', deleteNews)




module.exports = router;