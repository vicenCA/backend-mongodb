const SocialMedia = require('../models/socialmedia.model');

const getAllSMbyUser = async (req, res) => {
    const { id_params } = req.params; // id user

    await SocialMedia.find({user_of: id_params}).then(socials => {
        if (!socials) {
            res.status(400).send({message: 'Social media not found.'});
        } else {
            res.status(200).send({socials});
        }
    }).catch(err => {
        console.log(err);
    });
};
 
const postSocialMedia = async (req, res) => {
    const request = req.body;
    const { id_params } = req.params;
    await SocialMedia.find({user_of: id_params}).then(async user => {
        if (!user) {
            res.status(404).send({message: 'Social Media not found'});
        } else {
            if (user.social != request.social) {
                const socialUser = new SocialMedia({
                    social: request.social,
                    nickname: request.nickname,
                    user_of: id_params
                });
                await socialUser.save().then(social => {
                    res.status(200).send(social);
                }).catch(err => {
                    res.status(500).send(err);
                })
            } else {
                res.status(200).send({message: 'Social Media busy.'});
            }
        }
    }).catch(err => {
        res.status(500).send(err);
    })
}

const updateSocialMedia = async (req, res) => {
    const { id_params } = req.params; // id social media
    let request = req.body;

    SocialMedia.findByIdAndUpdate(id_params, request, (err, socialMediaUpdate) => {
        if (err) {
            res.status(500).send({message: 'An error ocurred while searching.'});
        }
        if (!socialMediaUpdate) {
            res.status(404).send({message: 'Social not found.'});
        } else {
            res.status(200).send({request});
        }
    });
}

const deleteSocialMedia = async (req, res) => {
    const { id_params } = req.params;

    await SocialMedia.findByIdAndRemove({_id: id_params}, async (err, foodRemoved) => {
        if (err) {
            res.status(500).send({message: 'An error ocurred while searching.'});
        }
        if (!foodRemoved) {
            res.status(404).send({message: 'Food not found.'});
        } else {
            res.status(200).send({food: foodRemoved});
        }
    });
}

module.exports = {
    getAllSMbyUser,
    postSocialMedia,
    updateSocialMedia,
    deleteSocialMedia
}