const { Thought, User } = require('../models');

const thoughtController = {
    getAllThoughts(req, res) {
        Thought.find({})
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            })
    },

    //get one User by id
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.thoughtId})
            .then(dbThoughtData => {
                //if no User found, send 404
                if(!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id!'});
                    return;
                }
                res.json(dbThoughtData)
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            })
    },
    //add thought 
    addThought( { body }, res) {
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: body.userId },
                    { $push: { thoughts: _id }},
                    { new: true }
                )
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!'})
                    return;
                }
                res.json(dbUserData)
            })
            .catch(err => res.json(err))
    },

    updateThought({ params, body}, res) {
        Thought.findOneAndUpdate({ _id: params.thoughtId }, body, {new: true} )
            .then(dbThoughtData => {
                if(!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id!'})
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.status(400).json(err))
    },

    removeThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.thoughtId })
            .then(deletedThought => {
                if(!deletedThought) {
                    return res.status(404).json({ message: 'No thought with this Id found!'})
                }
            return User.findOneAndUpdate(
                { _id: params.userId },
                { $pull: { thoughts: params.thoughtId }},
                { new: true }
            )
            })
            .then(dbUserData => {
                if(!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!'})
                    return;
                }
                res.json(dbUserData)
            })
            .catch(err => res.json(err))
    }
}

module.exports = thoughtController