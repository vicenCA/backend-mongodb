const Star = require('../models/star.model');

const generateStarsPost = async (req, res) => {
    const request = req.body; // value, post_of, user_of
    /* SET THE STARS OF THE POST */
    const stars = new Star({
        value: request.value,
        post_of: request.post_of,
        post_value: request.post_value,
        user_of: request.user_of
    });


    /* SAVE STARS */
    await stars.save().then(starsSaved => {
        res.status(200).send({stars: starsSaved});
    }).catch(err => {
        res.status(500).send({message: err});
    });
};

const updateStars = async (req, res) => {
    const { id_params } = req.params; // id stars
    const request = req.body;

    await Star.findByIdAndUpdate(id_params, request).then(starsUpdate => {
        if (!starsUpdate) {
            res.status(404).send({message: 'Stars not found'});
        } else {
            res.status(200).send({stars: starsUpdate});
        }
    }).catch(err => {
        res.status(500).send({err});
    });
}

const getStarsofUserPost = async (req, res) => {
    const { id_params, id_post } = req.params; // id user
    console.log(id_params, id_post);

    await Star.findOne({user_of: id_params, post_of: id_post}).then(starsFound => {
        if (!starsFound) {
            res.status(404).send({message: 'Stars not found'});
        } else {
            res.status(200).send({stars: starsFound});
        }
    }).catch(err => {
        res.status(500).send({message: err});
    });
}

const getStarsofPost = async (req, res) => {
    const { id_params } = req.params; // id post

    await Star.find({post_of: id_params}).then(starsFound => {
        if (!starsFound) {
            res.status(404).send({message: 'Stars not found'});
        } else {
            res.status(200).send({stars: starsFound});
        }
    }).catch(err => {
        res.status(500).send({message: err});
    });
}

const getStarsofUser = async (req, res) => {
    const { id_params } = req.params; // id user

    await Star.find({user_of: id_params}).then(starsFound => {
        if (!starsFound) {
            res.status(404).send({message: 'Stars not found'});
        } else {
            res.status(200).send({stars: starsFound});
        }
    }).catch(err => {
        res.status(500).send({message: err});
    });
}

const deleteStars = async (req, res) => {
    const { id_params } = req.params;
    
    await Star.findByIdAndRemove(id_params).then(starsRemoved => {
        if (!starsRemoved) {
            res.status(404).send({message: 'Stars not found'});
        } else {
            res.status(200).send({stars: starsRemoved});
        }
    }).catch(err => {
        res.status(500).send({err});
    })
}

module.exports = {
    getStarsofUserPost,
    getStarsofUser,
    getStarsofPost,
    generateStarsPost,
    updateStars,
    deleteStars
}