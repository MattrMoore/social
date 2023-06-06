const { ObjectID } = require('mongoose').Types;
const { User, Thought } = require('../models');

module.exports = {
    async getAllThoughts(req, res) {
        try {
            const thoughtData = await Thought.find()
                .populate({
                    path: 'reactions',
                    select: '-__v'
                })
                .select('-__v')
                .sort({ _id: 1 });
            res.json(thoughtData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    async getThoughtById(req, res) {
        try {
            const thoughtData = await Thought.findOne({ _id: params.id })
                .populate({
                    path: 'reactions',
                    select: '-__v'
                })
                .select('-__v');
            if (!thoughtData) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            res.json(thoughtData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    async createThought(req, res) {
        try {
            const thoughtData = await Thought.create(req.body);
            const newThought = await User.findOneAndUpdate(
            { username: req.body.username },
            { $addToSet: { thoughts: thoughtData._id } },
            { new: true }
            );
            res.json(thoughtData);
        }   catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    async updateThought({ params, body }, res) {
        try {
                const thoughtData = await Thought.findOneAndUpdate({ _id: params.id }, body, {
                    new: true,
                    runValidators: true,
                    }
                    );
                if (!thoughtData) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }
                res.json(thoughtData);
            } catch (err) {
                console.log(err);
                res.status(500).json(err);
            }
        },

    async deleteThought(req, res) {
        try {
            const thoughtData = await Thought.findOneAndDelete({ _id: req.params.id });
            if (!thoughtData) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            res.json(thoughtData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    async addReaction({ params, body }, res) {
        try {
            const thoughtData = await Thought.findOneAndUpdate(
                { _id: params.thoughtId },
                { $push: { reactions: body } },
                { new: true, runValidators: true }
            );
            if (!thoughtData) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            res.json(thoughtData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    async deleteReaction(req, res) {
        try {
            const thoughtData = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { reactionId: req.params.reactionId } } },
                { new: true }
            );
            if (!thoughtData) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            res.json(thoughtData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }
};