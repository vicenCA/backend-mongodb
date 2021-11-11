const Post = require('../models/post.model');
const cloudinary = require('cloudinary');

const getPosts = async (req, res) => {
    await Post.find().then(posts => {
        if (!posts) {
            res.status(404).send({message: 'Posts not found'});
        } else {
            res.status(200).send({posts: posts});
        }
    }).catch(err => {
        res.status(500).send({message: 'An error ocurred while searching'});
    });
};

const getPostsByUser = async (req, res) => {
    const { id_params } = req.params;
    console.log(id_params);
    await Post.find({user_of: id_params}).then(posts => {
        if (!posts) {
            res.status(404).send({message: 'Posts not found'});
        } else {
            res.status(200).send({posts});
        }
    }).catch(err => {
        res.status(500).send({message: 'An error ocurred while searching'});
    });
};

const getPostByID = async (req, res) => { 
    const { id_params } = req.params;

    await Post.findOne({_id: id_params}).then(post => {
        if (!post) {
            res.status(404).send({message: 'Posts not found'});
        } else {
            res.status(200).send({post: post});
        }
    }).catch(err => {
        res.status(500).send({message: 'An error ocurred while searching'});
    });
};

const updatePostByID = async (req, res) => {
    const { id_params } = req.params;
    const request = req.body;

    await Post.findOneAndUpdate({_id: id_params}, request).then(postUpdate => {
        if (!postUpdate) {
            res.status(404).send({message: 'Posts not found'});
        } else {
            res.status(200).send({post: postUpdate});
        }
    }).catch(err => {
        res.status(500).send({message: 'An error ocurred while searching'});
    })
};

const postPost = async (req, res) => {
    const { description, nametags } = req.body;
    const { id_params } = req.params;
    const file = req.file;
    console.log(req.body);
    if (!file) {
        res.status(200).send({message: 'Fill the image'}); 
    }

    const result_file = await cloudinary.v2.uploader.upload(file.path);

    const post = new Post({description, image: result_file.url, user_of: id_params, nametags});
    console.log(post);
    await post.save().then(postSaved => {
        res.status(200).send({post: postSaved});
    }).catch(err => {
        res.status(500).send({error: err});
    });
};

const deletePost = async (req, res) => {
    const { id_params } = req.params;

    await Post.findByIdAndDelete(id_params).then(postRemove => {
        if (!postRemove) {
            res.status(404).send({message: 'Post not found'});
        } else {
            res.status(200).send({post: postRemove});
        }
    }).catch(err => {
        res.status(500).send({error: err});
    });
}

module.exports = {
    getPosts,
    getPostsByUser,
    getPostByID,
    updatePostByID,
    postPost,
    deletePost
}