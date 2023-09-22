const mongoose = require("mongoose");
const News = require("../models/newsModel");
const Author = require("../models/authorModel");

const path = require("path");
const fs = require("fs");

//change connection to mongoDB atlas
mongoose.connect("mongodb://localhost/unisecEthiopia");

//create a new post
const createNewsDb = async (title, body, authorId = null, imageName = null) => {
    const news = await News.create({
      title: title,
      body: body,
      author: authorId,
      imageName: imageName,
    });
    return news;
};

//update a post
const updateNewsDb = async (id, title, body, imageName = null) => {

    let news = await News.findById(id);

    if (!news) {
      let filePath = path.join("../client/public/images/", imageName);
      fs.unlink(filePath, () => {
        console.log("new image removed!");
      });
      throw new Error (`post with id ${id} not found.`);

    } else {
      let filePath = path.join("../client/public/images/", news.imageName);

      fs.unlink(filePath, () => {
        console.log("old image removed\n");
      });
      news.title = title;
      news.body = body;
      news.imageName = imageName;

      news = await news.save();
      return news;
    }
};

//delete a post
const deleteNewsDb = async (id) => {

    let news = await News.findById(id);
    if (!news) {
      throw new Error (`post with id ${id} was not found.`)
    } else {
      
      news = await News.findByIdAndDelete(id);
      if(news.imageName){
        let filePath = path.join("../client/public/images/", news.imageName);
        fs.unlink(filePath, () => {
          console.log("image deleted successfully");
        });
      }
      
      return `post with id ${id} deleted successfully.`;
      //make sure you change it to findOneAndRemove if you want mongoose middlewares
    }
};


//retrieve all posts ordered by publishDate
const getAllNewsDb = async () => {
    const news = await News.find().sort({ publishDate: -1 });
    // console.log(news[0])
    return news;
};

//retrieve a limited number of posts ordered by publishDate
const getNewsByLimitDb = async (limit) => {

    const news = await News.find().sort({ publishDate: -1 }).limit(limit);
    // console.log(news)
    return news;
};


//retrieve a post by id
const getNewsDb = async (id) => {

    const news = await News.findById(id).populate("author");
    if(!news){
        throw new Error(`record with id ${id} doesnt exist.`)
    }
    else{
        return news;
    }
};



//create author demo for checking new field: author
//to be preferably moved to another file
//no need for try catchs in dbHandler, just set up custom errors and 
//all will be handled on the try catch in the controllers
const createAuthor = async (name, position = "") => {
  try {
    const author = await Author.create({
      name: name,
      position: position,
    });
    console.log(author);
  } catch (e) {
    console.log(e.message)
  }
};

// createAuthor("Dr.Yeshurun", "Head")
// createNews('title 2', 'content 2 : two')

module.exports = {
  createNewsDb,
  getAllNewsDb,
  getNewsDb,
  getNewsByLimitDb,
  updateNewsDb,
  deleteNewsDb,
};
