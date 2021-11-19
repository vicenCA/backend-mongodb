const Interaction = require('../models/interaction.model');



const generateInteractionUser = async (req, res) => {
    const request = req.body;
    /* SET THE REACTIONS OF THE POST */
    const interaction = new Interaction({user_of: request.user_of});


    /* SAVE REACTIONS */
    await interaction.save().then(interactionSaved => {
        res.status(200).send({interaction: interactionSaved});
    }).catch(err => {
        res.status(500).send({message: err});
    });
};

const updateInteraction = async (req, res) => {
    const { id_params } = req.params;
    const request = req.body;

    await Interaction.findByIdAndUpdate(id_params, request).then(interactionUpdate => {
        if (!interactionUpdate) {
            res.status(404).send({message: 'Interaction not found'});
        } else {
            res.status(200).send({interaction: interactionUpdate});
        }
    }).catch(err => {
        res.status(500).send({err});
    });
}

const getInteractionUser = async (req, res) => {
    const { id_params } = req.params;
    console.log(id_params);
    await Interaction.findOne({user_of: id_params}).then(interactionFound => {
        if (!interactionFound) {
            res.status(404).send({message: 'Interaction not found'});
        } else {
            res.status(200).send({interaction: interactionFound});
        }
    }).catch(err => {
        res.status(500).send({err});
    });
}

const deleteInteractionUser = async (req, res) => {
    const { id_params } = req.params;
    
    await Interaction.findOneAndRemove({user_of: id_params}).then(interactionRemoved => {
        if (!interactionRemoved) {
            res.status(404).send({message: 'Interaction not found'});
        } else {
            res.status(200).send({interaction: interactionRemoved});
        }
    }).catch(err => {
        res.status(500).send({err});
    })
}

module.exports = {
    generateInteractionUser,
    updateInteraction,
    getInteractionUser,
    deleteInteractionUser
};