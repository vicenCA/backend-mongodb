const User = require('../models/user.model');
const jwt = require('../services/jwt');
const cloudinary = require('cloudinary');
const fs = require('fs');

const userProove = async (req, res) => {
    await User.find((err, users) => {
        if (err) {
            res.status(500).send({message: 'An error occurred while searching.'});
        }
        if (!users) {
            res.status(400).send({message: 'Users not found.'});
        } else {
            res.status(200).send({found_users: users});
        }
    });
}

const userNickName = async (req, res) => {
    const { nickname } = req.params;
    console.log(nickname);
    User.findOne({nickname}).then(user => {
        if (!user) {
            res.status(403).send({message: 'User not exist'});
        } else {
            res.status(200).send({user});
        }
    }).catch(err => {
        res.status(500).send({message: err});
    })
}

const userId = async (req, res) => {
    const { id_params } = req.params;
    console.log(id_params);
    User.findOne({_id: id_params}).then(user => {
        if (!user) {
            res.status(403).send({message: 'User not exist'});
        } else {
            res.status(200).send({user});
        }
    }).catch(err => {
        res.status(500).send({message: err});
    })
}

const postUser = async (req, res) => {
    const { name, surname, nickname, email, password } = req.body;
    const errors = [];

    if (!name) errors.push({text: 'Please, write a name'});
    if (!surname) errors.push({text: 'Please, write a surname'});
    if (!nickname) errors.push({text: 'Please, write a nickname'});
    if (!email) errors.push({text: 'Please, write a email'});
    if (!password) errors.push({text: 'Please, write a password'});

    if(errors.length > 0) {
        res.render('/', {
            errors
        });
    } else {
        const emailUser = await User.findOne({email: email});
        const nickUser = await User.findOne({nickname: nickname});
        if(emailUser) {
            res.status(200).send({message: 'Email already is busy'});
        }
        if (nickUser) {
            res.status(200).send({message: 'Nickname already is busy'}); 
        }
        else {
            const image = 'https://res.cloudinary.com/refooks/image/upload/v1632975505/blackieshoot-ZFuhiak1UV0-unsplash_cy2wza.jpg'
            const user = new User();
            
            user.name = name;
            user.surname = surname;
            user.nickname = nickname;
            user.email = email;
            user.image = image; 

            user.password = await user.encryptPassword(password);
            await user.save((err, userSaved) => {
                if (err) {
                    res.status(500).send({message: 'Error updating your data'});
                } else if (!userSaved) {
                    res.status(404).send({message: 'has not can update your user'});
                } else {
                    res.status(200).send({user: userSaved});
                }
            });
        }
    }
}

const loginUser = async (req, res) => {
    const { email, password, gethash } = req.body;
    console.log(req.body);
    User.findOne({email: email}, async (err, user) => {
        if (err) {
            res.send({message: 'Request Error'});
        }
        if (!user) {
            return res.status(404).send({message: "User doesn't exist"});
        }
        else {
            const match = await user.matchPassword(password);
            if (!match) {
                res.status(404).send({message: 'Password bad write'})
            } else {
                if (gethash) {
                    // TOKEN JWT
                    res.status(200).send({token: jwt.createToken(user)}); 
                }
                else { 
                    res.status(200).send({user});
                } 
            }
        }
    });
}

const updateUser = async (req, res) => {

    const { id_params } = req.params;
    let update_data = req.body;
    console.log(update_data);
    console.log(id_params);
    User.findByIdAndUpdate(id_params, update_data, (err, user_update) => {
        if (err) {
            res.status(500).send({message: 'Error updating your data'});
        } else if (!user_update) {
            res.status(404).send({message: 'has not can update your user'});
        } else {
            /* MUESTRA EL USUARIO AL QUE FUE AFECTADO PERO SIN EL CAMBIO */
            res.status(200).send({update_data});
        }
    });
}

const updatePictureProfile = async (req, res) => {
    const { id_params } = req.params;

    if (!req.file) {
        res.status(404).send({message: 'Please upload a file'})
    }
    const result = await cloudinary.v2.uploader.upload(req.file.path);
    fs.unlink(req.file.path, (err) => {
        if (err) throw err;
        console.log('path was deleted');
    });

    User.findByIdAndUpdate(id_params, {image: result.url}, (err, user_update) => {
        if (err) {
            res.status(500).send({message: 'Error updating your data'});
        } else if (!user_update) {
            res.status(404).send({message: 'has not can update your user'});
        } else {
            /* MUESTRA EL USUARIO AL QUE FUE AFECTADO PERO SIN EL CAMBIO */
            res.status(200).send({image: result.url});
        }
    });
}

const deleteProfileUser = async (req, res) => {

}

const addFollowUser = async (req, res) => {
    const { id_params } = req.params;
    let update_data = req.body;
    console.log(update_data);
    console.log(id_params);
    User.findByIdAndUpdate(id_params, update_data, (err, user_update) => {
        if (err) {
            res.status(500).send({message: 'Error updating your data'});
        } else if (!user_update) {
            res.status(404).send({message: 'has not can update your user'});
        } else {
            /* MUESTRA EL USUARIO AL QUE FUE AFECTADO PERO SIN EL CAMBIO */
            res.status(200).send({update_data}); 
        }
    });
}

const removeFollowUser = async (req, res) => {
    const { _id } = req.body; // Usuario al que siguen
    const { id_params } = req.params; // Usuario que sigue

    await User.findByIdAndUpdate(_id, {$pull: {
        followers: id_params
    }}, async (err, user_updateOne) => {
        if (err) {
            res.status(500).send({message: 'An error occurred while upgrading.'});
        } else {
            await User.findByIdAndUpdate(id_params, {$pulls: {
                following: _id
            }}, async (err, user_updateTwo) => {
                if (err) {  
                    res.status(500).send({message: 'An error occurred while upgrading.'});
                }
                else {
                    res.status(200).send({user_1: user_updateOne, user_2: user_updateTwo});
                }
            });
        }
    });
}

module.exports = {
    userProove,
    userId,
    userNickName,
    postUser,
    loginUser, 
    updateUser,
    updatePictureProfile,
    deleteProfileUser,
    addFollowUser,
    removeFollowUser
}