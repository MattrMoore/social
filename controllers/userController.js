const { User, Thought } = require('../models');

module.exports = {
    async getAllUsers(req, res) {
        try {
            const userData = await User.find()
                .populate({
                    path: 'thoughts',
                    select: '-__v'
                })
                .select('-__v')
                .sort({ _id: 1 });
            res.json(userData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    async getUserById(req, res) {
        try {
            const userData = await User.findOne({ _id: req.params.id })
                .populate({
                    path: 'thoughts',
                    select: '-__v'
                })
                .select('-__v');
            if (!userData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(userData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    async createUser(req, res) {
        try {
            const userData = await User.create(req.body);
            res.json(userData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    async updateUser({ params, body }, res) {
        try {
            const userData = await User.findOneAndUpdate({ _id: params.id }, body, {
                new: true,
                runValidators: true,
            });
            if (!userData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(userData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    async deleteUser(req, res) {
        try {
            const userData = await User.findOneAndDelete({ _id: req.params.id });

            if (!userData) {
              return res.status(404).json({ message: 'No such user exists' });
            }
      
            await Thought.deleteMany({ username: userData.username });
            return res.json({ message: "User and their thoughts have been deleted" });
          } catch (err) {
            console.log(err);
            res.status(500).json(err);
            }
    },

    async addFriend(req, res) {
        try {
            const userData = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: req.params.friendId } },
                { new: true }
            );
            if (!userData) {
                return res.status(404).json({ message: 'No user found with this id!' });
            }
            res.json(userData);
        }
        catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    async deleteFriend(req, res) {
        try {
            const userData = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: req.params.friendId } },
                { new: true }
            );
            if (!userData) {
                return res.status(404).json({ message: 'No user found with this id!' });
            }
            res.json(userData);
        }
        catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
}