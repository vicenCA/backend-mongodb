const Community = require('../models/community.model');


const addCommunityQuestion = async (req, res) => {
    const request = req.body;
    console.log(request);
    const question = new Community({
        question: request.question,
        description: request.description,
        user_of: request.user_of,
        nametags: request.nametags,
    });

    await question.save().then(questionSaved => {
        res.status(200).send({question: questionSaved});
    }).catch(err => {
        res.status(500).send({error: err});
    });
};

const updateCommunityQuestion = async (req, res) => {
    const { id_params } = req.params;
    const request = req.body;
    console.log(request);
    await Community.findOneAndUpdate(id_params, request).then(communityUpdate => {
        if (!communityUpdate) {
            res.status(404).send({message: 'Community question not found'});
        } else {
            res.status(200).send({question: communityUpdate});
        }
    }).catch(err => {
        res.status(500).send({message: err});
    })
};

const removeComunnityQuestion = async (req, res) => {
    const { id_params } = req.params;

    await Community.findByIdAndDelete(id_params).then(communityUpdate => {
        if (!communityUpdate) {
            res.status(404).send({message: 'Community question not found'});
        } else {
            res.status(200).send({question: communityUpdate});
        }
    }).catch(err => {
        res.status(500).send({message: err});
    });
};

const getCommunityQuestions = async (req, res) => {

    await Community.find().then(questions => {
        if (!questions) {
            res.status(404).send({message: 'Community questions not found'});
        } else {
            res.status(200).send({questions});
        }
    }).catch(err => {
        res.status(500).send({err});
    });
}

const getCommunityQuestionById = async (req, res) => {
    const { id_params } = req.params;

    await Community.findById(id_params).then(questionFound => {
        if (!questionFound) {
            res.status(404).send({message: 'Question not found'});
        } else {
            res.status(200).send({question: questionFound});
        }
    }).catch(err => {
        res.status(500).send({err});
    });
}

module.exports = {
    addCommunityQuestion,
    getCommunityQuestionById,
    getCommunityQuestions,
    updateCommunityQuestion,
    removeComunnityQuestion
};