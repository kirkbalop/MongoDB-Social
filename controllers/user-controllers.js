const { User, Thought } = require('../models')

const userController = {
    getAllUsers(req, res) {
        User.find({})
        // .populate({
        //     select: ('_id'),
        // })
        .select('-__v')
        .sort({ _id: -1 })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err)
        });
    },

    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
        .populate({
            path: 'friends',
            select: ('-__v')
        })
        .select('-__v')
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({message: 'No user found with that ID'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    createUser({body}, res) {
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.status(400).json(err));
    },

    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true })
            .then(dbUserData => {
                if(!dbUserData) {
                    res.status(404).json({ message: 'No user found with this ID'});
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    },

    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then(dbUserData => {
                if(!dbUserData) {
                    res.status(404).json({ message: 'No user found with this ID'});
                    return;
                }
                res.json(dbUserdata);
            })
            .catch(err => res.status(400).json(err));
    },

    addFriend({ params, body }, res) {
        User.findByIdAndUpdate(
            { _id: params.id },
            { $push: { friends: params.id } },
            { new: true }
        )
        .then(dbFriendData => {
            if(!dbFriendData){
                res.status(404).json({ message: 'No user found with this ID'});
                return;
            }
            res.json(dbFriendData);
        })
        .catch(err => res.json(err));
    },

    removeFriend({params}, res) {
        User.findByIdAndUpdate(
            { _id: params.id },
            { $pull: {friends: params.friendId}},
            { new: true }
        )
        .then(dbFriendData => res.json(dbFriendData))
        .catch(err => res.json(err));
    }
};

module.exports = userController;