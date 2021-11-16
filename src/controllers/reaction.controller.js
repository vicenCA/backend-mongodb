const Reaction = require('../models/reactions.model');
const Post = require('../models/post.model');
const User = require('../models/user.model');


const generateReactionPost = async (req, res) => {
    const request = req.body;
    console.log(request);
    /* SET THE REACTIONS OF THE POST */
    const reaction = new Reaction({post_of: request.post_of});


    /* SAVE REACTIONS */
    await reaction.save().then(reactionSaved => {
        res.status(200).send({reactions: reactionSaved});
    }).catch(err => {
        res.status(500).send({message: err});
    });
};

const updateReaction = async (req, res) => {
    const { id_params } = req.params;
    const request = req.body;

    await Reaction.findByIdAndUpdate(id_params, request).then(reactionUpdate => {
        if (!reactionUpdate) {
            res.status(404).send({message: 'Reactions not found'});
        } else {
            res.status(200).send({reactions: reactionUpdate});
        }
    }).catch(err => {
        res.status(500).send({err});
    });
}

const getReacionOfPost = async (req, res) => {
    const { id_params } = req.params;

    await Reaction.findOne({post_of: id_params}).then(reactionFound => {
        if (!reactionFound) {
            res.status(404).send({message: 'Reactions not found'});
        } else {
            res.status(200).send({reaction: reactionFound});
        }
    }).catch(err => {
        res.status(500).send({message: err});
    });
}

const deleteReactionOfPost = async (req, res) => {
    const { id_params } = req.params;
    
    await Reaction.findOneAndRemove({post_of: id_params}).then(reactionRemoved => {
        if (!reactionRemoved) {
            res.status(404).send({message: 'Reaction not found'});
        } else {
            res.status(200).send({reaction: reactionRemoved});
        }
    }).catch(err => {
        res.status(500).send({err});
    })
}

module.exports = {
    generateReactionPost,
    updateReaction,
    getReacionOfPost,
    deleteReactionOfPost
};