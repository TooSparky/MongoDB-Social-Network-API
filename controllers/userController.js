const { User } = require('../models');

module.exports = {
    // get all users
    async getUsers(req, res) {
        try {
            const users = await User.find();

            const userObj = {
                users
            };

            res.json(userObj);
        } catch (err) {
            return res.status(500).json(err);
        }
    },

    // get single user by _id
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId });

            if (!user) {
                return res.status(404).json({ message: 'No user with that ID' });
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // create new user
    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // update by _id
    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if (!user) {
                return res.status(404).json({ message: 'No user found with this ID' });
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // delete by _id
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndRemove({ _id: req.params.userId });

            if (!user) {
                res.status(404).json({ message: 'No user with this ID '});
            }

            res.json({ message: 'User successfully deleted' });
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // add new friend to friends list
    async addFriend(req, res) {
        console.log('You are adding a friend');
        console.log(req.body);

        try {
            const friend = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: req.params.friendId } },
                { runValidators: true, new: true },
            );

            if (!friend) {
                return res.status(404).json({ message: 'No user found with that ID' });
            }

            res.json(friend);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // delete friend from friend list
    async deleteFriend(req, res) {
        try {
            const friend = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: { friendId: req.params.friendId } } },
                { runValidators: true, new: true },
            );

            if (!friend) {
                return res.status(404).json({ message: 'No user found with that ID' });
            }

            res.json(friend);
        } catch (err) {
            res.status(500).json(err);
        }
    },
};
