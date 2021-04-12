const { Thought, User } = require('../models');

const thoughtController = {
    getAllThought(req, res){
        Thought.find({})
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => res.json(err));
    },

    getThoughtById({ params }, res){
        Thought.findOne({ _id: params.id })
        .select('-__v')
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with this ID'});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    addThought({ params, body }, res){
        console.log(body);
        Thought.create(body)
            .then(({_id}) => {
                return User.findOneandUpdate(
                    { _id: params.userId },
                    { $push: { thoughts: _id } },
                    { new: true }
                );
            })
                .then(dbUserData => {
                    if(!dbUserData) {
                        res.status(404).json({ message: 'No user found with that ID'});
                        return;
                    }
                    res.json(dbUserData);
                })
                .catch(err => res.json(err));
    },

    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true })
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with that ID'});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.json(err));
    },

    removeThought({ params }, res){
        Thought.findOneAndDelete({ _id: params.id })
            .then(deletedThought => {
                if(!deletedThought) {
                    return res.status(404).json({ message: 'No thought found with that ID'});
                }
                return User.findByIdAndUpdate(
                    { _id: params.userId },
                    { $pull: { thoughts: params.id }},
                    { new: true }
                );
            })
                .then(dbUserData => {
                    if(!dbUserData){
                        res.status(404).json({ message: 'No thought found with that ID'});
                        return;
                    }
                    res.json(dbUserData);
                })
                    .catch(err => res.json(err));
    },

    addReaction({ params, body}, res){
        Thought.findOneAndUpdate(
            { _id: params.id },
            { $push: {reactions: body} },
            { new: true}
        )
        .then(dbUserData => {
            if(!dbUserData){
                res.status(404).json({ message: 'No thought found with that ID'});
                return;
            }
            res.json(dbUserData);
        })
            .catch(err => res.json(err));
    },

    removeReaction({params}, res) {
        Thought.findOneAndUpdate(
            { _id: params.id },
            { $pull: {thoughts: params.reactionId }},
            { new:true }
        )
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => res.json(err));
    }
};

module.exports = thoughtController;