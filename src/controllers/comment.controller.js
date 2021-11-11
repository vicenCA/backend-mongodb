const Comment = require('../models/comentario.model');
const Post = require('../models/post.model');

const addComment = async (req, res) => {
    const request = req.body;

    /* SEARCH POST IF EXISTS */
    await Post.findOne({post_of: request.post_of}).then(async postFound => {
        if (!postFound) {
            res.status(404).send({message: 'Posts not found'});
        } else {
            /* SAVED COMMENT UPDATE */
            let comment = new Comment({
                body: request.body,
                post_of: request.post_of,
                user_of: request.user_of
            });
            await comment.save().then(commentSaved => {
                res.status(200).send({comment: commentSaved});
            }).catch(err => {
                res.status(500).send(err);
            });
        }
    }).catch(err => {
        res.status(500).send({message: err});
    });
};

const updateComment = async (req, res) => {
    const request = req.body;
    const { id_params } = req.params;
    console.log(request);
    console.log(id_params);

    Comment.findByIdAndUpdate(id_params, request).then(commentUpdate =>  {
        if (!commentUpdate) {
            res.status(404).send({message: 'Comment not found'});
        } else {
            res.status(200).send({comment: request});
        }
    }).catch(err => {
        res.status(500).send({err});
    })
    
};

const removeComment = async (req, res) => {
    const { id_params } = req.params;
    const { body } = req.body;

    let comment = new Comment();

    /* SEARCH COMMENTS OF THE POST */
    await Comment.findOne({post_of: id_params}).then(commentFound => {
        if (!commentFound) {
            res.status(404).send({message: 'Comment not found'});
        } else {
            comment = commentFound;
        }
    }).catch(err => {
        res.status(500).send({message: err});
    });

    /* SAVED COMMENTS UPDATE */
    await Comment.findByIdAndUpdate(comment._id, comment).then(commentUpdate => {
        if (!commentUpdate) {
            res.status(404).send({message: 'Comments not found'});
        } else {
            res.status(200).send({comment: commentUpdate});
        }
    }).catch(err => {
        res.status(500).send({message: err});
    });
};

const getCommentOfPost = async (req, res) => {
    const { id_params } = req.params;

    await Comment.find({post_of: id_params}).then(commentFound => {
        if (!commentFound) {
            res.status(404).send({message: 'Comment not found'});
        } else {
            res.status(200).send({comments: commentFound});
        }
    }).catch(err => {
        res.status(500).send({message: err});
    });
}

module.exports = {
    addComment,
    updateComment,
    removeComment,
    getCommentOfPost
};