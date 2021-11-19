const News = require('../models/news.model');
const cloudinary = require('cloudinary');
const fs = require('fs');

const getAllNews = async (req, res) => {
    await News.find().then(news => {
        if (!news) {
            res.status(400).send({message: 'News not found.'});
        } else {
            res.status(200).send({news});
        }
    }).catch(err => {
        console.log(err);
    });
};

const getNewsByID = async (req, res) => {
    const { id_params } = req.params;

    await News.findById(id_params).then(news => {
        if (!news) {
            res.status(404).send({message: 'News not found'});
        } else {
            res.status(200).send({news});
        }
    }).catch(err => {
        res.status(500).send({err}); 
    });
}
 
const postNews = async (req, res) => {
    const request = req.body;
    const errors = [];
    const file = req.file;

    if (!(request.name)) errors.push('Please, write any name correctly');
    if (!(request.body)) errors.push('Please, write any body name correctly');
    if (!(request.category)) errors.push('Please, write any category correctly');

    if (errors.length > 0) {
        res.status(200).send({errors: errors});
    }
    else {

        let news = new News({
            name: request.name,
            body: request.body,
            category: request.category,
            user_of: request.user_of
        });

        if (file) {
            const result = await cloudinary.v2.uploader.upload(file.path);
            fs.unlink(req.file.path, (err) => {
                if (err) throw err;
                console.log('path was deleted');
            }); 
            news.image = result.url;
        }

        await news.save().then(newsSaved => {
            res.status(200).send({news: newsSaved});
        }).catch(err => {
            res.status(500).send({err});
        })
    }
}

const updateNews = async (req, res) => {
    const { id_params } = req.params;
    const request = req.body;

    News.findByIdAndUpdate(id_params, request).then(newsUpdate => {
        if (!newsUpdate) {
            res.status(404).send({message: 'News not found.'});
        } else {
            res.status(200).send({news: request, newsBack: newsUpdate});
        }
    }).catch(err => {
        res.status(500).send({err});
    });
}

const updateNewsViews = async (req, res) => {
    const { id_params } = req.params;
    let request = req.body;
    
    request.views = request.views + 1;
    News.findByIdAndUpdate(id_params, {views: request.views}).then(newsUpdate => {
        if (!newsUpdate) {
            res.status(404).send({message: 'News not found'});
        } else {
            res.status(200).send({news: newsUpdate});
        }
    }).catch(err => {
        res.status(500).send({message: 'Ocurrió un error'});
    })
};

const deleteNews = async (req, res) => {
    const { id_params } = req.params;

    News.findByIdAndRemove(id_params).then(newsRemoved => {
        if (!newsRemoved) {
            res.status(404).send({message: 'News not found.'});
        } else {
            //ELIMINAR REFERENCIAS DE FOOD EN BOOKMARKS DE USUARIOS.
            res.status(200).send({news: newsRemoved});
        }
    }).catch(err => {
        res.status(500).send({err});
    });
}

module.exports = {
    getAllNews,
    getNewsByID,
    postNews,
    updateNews,
    updateNewsViews,
    deleteNews
}