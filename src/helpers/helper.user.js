const addFollowUser = async (req, res) => {
    const { _id } = req.body; // Usuario al que siguen
    const { id_params } = req.params; // Usuario que sigue

    console.log(req.body);
    try {
        await User.findOne({_id: _id}, async (err, user) => {
            if (err) {
                res.status(500).send({message: 'Happened some error looking for.'});
            }
            if (!user) {
                res.status(404).send({message: 'User followed not found.'});
            } else {
                await User.findByIdAndUpdate({_id: user._id},{$push: {followers: [id_params]}});  
                await user.save((err) => {
                    if (err) {
                        res.status(500).send({message: 'An error occurred on saving.'});
                    } else {
                        User.findOne({_id: id_params}, (err, user) => {
                            if (err) {
                                res.status(500).send({message: 'Happened some error looking for.'});
                            }
                            if (!user) {
                                res.status(404).send({message: 'User follower not found.'});
                            } else {
                                user.following.push(_id);
                                user.save(async (err) => {  
                                    if (err) {
                                        res.status(500).send({message: 'An error occurred on saving.'});
                                    } else {
                                        res.status(200).send({user: user});
                                    }
                                });
                            }
                        });
                    }     
                });
            }
        });
    } catch (error) {
        console.log(error);
    }
}


const addReaction = async (req, res) => {
    const { id_params } = req.params;
    const { id_user, reaction_tag } = req.body;

    let reaction = new Reaction();

    /* SEARCH REACTIONS OF THE POST */
    await Reaction.findOne({post_of: id_params}).then(reactionFound => {
        if (!reactionFound) {
            res.status(404).send({message: 'Reactions not found'});
        } else {
            reaction = reactionFound;
        }
    }).catch(err => {
        res.status(500).send({message: err});
    });

    /* UPDATE DATES OF THE POST */
    let reaction_person = {_id: id_user};

    if (reaction_tag == 'REACTION_LOVE') {
        reaction.amount_love++;
        reaction.reaction_love.push(reaction_person);
    }
    if (reaction_tag == 'REACTION_AMAZING') {
        reaction.amount_amazing++;
        reaction.reaction_amazing.push(reaction_person);
    }
    if (reaction_tag == 'REACTION_SAD') {
        reaction.amount_sad++;
        reaction.reaction_sad.push(reaction_person);
    }

    reaction.amount_total++;

    /* SAVED REACTIONS UPDATE */
    await Reaction.findByIdAndUpdate(reaction._id, reaction).then(reactionUpdate => {
        if (!reactionUpdate) {
            res.status(404).send({message: 'Reactions not found'});
        } else {
            res.status(200).send({reactions: reactionUpdate});
        }
    }).catch(err => {
        res.status(500).send({message: err});
    });
};

const removeReaction = async (req, res) => {
    const { id_params } = req.params;
    const { id_user, reaction_tag } = req.body;

    let reaction = new Reaction();

    /* SEARCH REACTIONS OF THE POST */
    await Reaction.findOne({post_of: id_params}).then(reactionFound => {
        if (!reactionFound) {
            res.status(404).send({message: 'Reactions not found'});
        } else {
            reaction = reactionFound;
        }
    }).catch(err => {
        res.status(500).send({message: err});
    });

    /* UPDATE DATES OF THE POST */
    let reaction_person = {_id: id_user};

    if (reaction_tag == 'REACTION_LOVE') {
        reaction.amount_love--;
        reaction.reaction_love.pull(reaction_person);
    }
    if (reaction_tag == 'REACTION_AMAZING') {
        reaction.amount_amazing--;
        reaction.reaction_amazing.pull(reaction_person);
    }
    if (reaction_tag == 'REACTION_SAD') {
        reaction.amount_sad--;
        reaction.reaction_sad.pull(reaction_person);
    }

    reaction.amount_total--;

    /* SAVED REACTIONS UPDATE */
    await Reaction.findByIdAndUpdate(reaction._id, reaction).then(reactionUpdate => {
        if (!reactionUpdate) {
            res.status(404).send({message: 'Reactions not found'});
        } else {
            res.status(200).send({reactions: reactionUpdate});
        }
    }).catch(err => {
        res.status(500).send({message: err});
    });
};
