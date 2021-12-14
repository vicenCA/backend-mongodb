const Lvl = require('../models/level.model');
const Exp = require('../models/experience.model');
const Achievement = require('../models/achievement.model');
const cloudinary = require('cloudinary');
const fs = require('fs');

/* ============================================================================ */
/* =============================== NIVELES  =================================== */
/* ============================================================================ */

const createLvl = async (req, res) => {
    const { statusName, levelNumber, minExp, maxExp } = req.body;

    const level = new Lvl({
        statusName,
        levelNumber,
        minExp,
        maxExp
    });

    await level.save().then(lvlSave => {
        res.status(200).send({lvlSave});
    }).catch(err => {
        res.status(500).send({err});
    });
}

const getLvls = async (req, res) => {
    await Lvl.find().then(LvlsFound => {
        if (!LvlsFound) {
            res.status(404).send({message: 'Levels not found'});
        } else {
            res.status(200).send({levels: LvlsFound});
        }
    }).catch(err => {
        res.status(500).send({err});
    });
}

const getLvl = async (req, res) => {
    const { id_params } = req.params;

    await Lvl.findById(id_params).then(LvlFound => {
        if (!LvlFound) {
            res.status(404).send({message: 'Level not found'});
        } else {
            res.status(200).send({level: LvlFound});
        }
    }).catch(err => {
        res.status(500).send({err});
    });
}

const updateLvl = async (req, res) => {
    const { id_params } = rq.params;
    const request = req.body;

    await Lvl.findByIdAndUpdate(id_params, request).then(LvlsUpdate => {
        if (!LvlsUpdate) {
            res.status(404).send({message: 'Level not found'});
        } else {
            res.status(200).send({level: request});
        }
    }).catch(err => {
        res.status(500).send({err});
    });
}

/* ============================================================================ */
/* ============================== EXPERIENCE  ================================= */
/* ============================================================================ */

const createExperience = async (req, res) => {
    const { user_of } = req.body;

    const experience = new Exp({
        user_of
    });

    await experience.save().then(expSave => {
        res.status(200).send({expSave});
    }).catch(err => {
        res.status(500).send({err});
    });
}

const getExpsByUsers = async (req, res) => {
    await Exp.find().then(ExpsFound => {
        if (!ExpsFound) {
            res.status(404).send({message: 'Experience of users not found'});
        } else {
            res.status(200).send({experience: ExpsFound});
        }  
    }).catch(err => { 
        res.status(500).send({err}); 
    }); 
}

const getExpByUser = async (req, res) => {
    const { id_params } = req.params;

    await Exp.findOne({user_of: id_params}).then(ExpFound => {
        if (!ExpFound) {
            res.status(404).send({message: 'Experience of user not found'});
        } else {
            res.status(200).send({experience: ExpFound});
        }
    }).catch(err => {
        res.status(500).send({err});
    });
}

const updateExpUser = async (req, res) => {
    const { id_params } = req.params;
    const request = req.body;
    console.log(request);

    await Exp.findByIdAndUpdate(id_params, request).then(ExpUpdate => {
        if (!ExpUpdate) {
            res.status(404).send({message: 'Experience not found'});
        } else {
            res.status(200).send({experience: request});
        }
    }).catch(err => {
        res.status(500).send({err});
    });
}

const deleteExperience = async (req, res) => {
    const { id_params } = req.params;

    Exp.findByIdAndRemove(id_params).then(experienceRemove => {
        if (!experienceRemove) {
            res.status(404).send({message: 'Experience not found'});
        } else {
            res.status(200).send({experience: experienceRemove});
        }
    }).catch(err => {
        res.status(500).send({err});
    });
}

/* ============================================================================ */
/* ============================= ACHIEVEMENT  ================================= */
/* ============================================================================ */

const createAchievement = async (req, res) => {
    console.log(req.body);
    const { name, description } = req.body;
    const file = req.file;

    let achievement = new Achievement({
        name,
        description
    });

    if (file) {
        const result = await cloudinary.v2.uploader.upload(file.path);
        fs.unlink(req.file.path, (err) => {
            if (err) throw err;
            console.log('path was deleted');
        });
        achievement.image = result.url;
    }
    
    await achievement.save().then(achievementSaved => {
        res.status(200).send({achievement: achievementSaved});
    }).catch(err => {
        res.status(500).send({err});
    });

}

const getAchievements = async (req, res) => {
    Achievement.find().then(achievementFound => {
        if (!achievementFound) {
            res.status(404).send({message: 'Achievements not found'});
        } else {
            res.status(200).send({achievements: achievementFound});
        }
    }).catch(err => {
        res.status(500).send({err});
    });
}

const getAchievementsById = async (req, res) => {

    const { id_params } = req.params;

    Achievement.findById(id_params).then(achievementFound => {
        if (!achievementFound) {
            res.status(404).send({message: 'Achievement not found'});
        } else {
            res.status(200).send({achievement: achievementFound});
        }
    }).catch(err => {
        res.status(500).send({err});
    });
}

const updateAchievement = async (req, res) => {
    const { id_params } = req.params;
    const request = req.body;

    Achievement.findByIdAndUpdate(id_params, request).then(achievementUpdate => {
        if (!achievementUpdate) {
            res.status(404).send({message: 'Achievement not found'});
        } else {
            res.status(200).send({achievement: achievementUpdate});
        }
    }).catch(err => {
        res.status(500).send({err});
    });
}

const deleteAchievement = async (req, res) => {
    const { id_params } = req.params;

    Achievement.findByIdAndRemove(id_params).then(achievementRemove => {
        if (!achievementUpdate) {
            res.status(404).send({message: 'Achievement not found'});
        } else {
            res.status(200).send({achievement: achievementUpdate});
        }
    }).catch(err => {
        res.status(500).send({err});
    });
}

module.exports = {
    /* CONTROLLER LEVEL */
    createLvl,
    getLvls,
    getLvl,
    updateLvl,
    /* CONTROLLER EXPERIENCE */
    createExperience,
    getExpsByUsers,
    getExpByUser,
    updateExpUser,
    deleteExperience,
    /* CONTROLLER ACHIEVEMENT */
    createAchievement,
    getAchievements,
    getAchievementsById,
    updateAchievement,
    deleteAchievement
}