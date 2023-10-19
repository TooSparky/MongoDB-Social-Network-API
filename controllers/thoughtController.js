const { Thought } = require('../models');

module.exports = {
    // get all thoughts
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
    
            const thoughtObj = {
                thoughts
            };
    
            res.json(thoughtObj);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    // get single thought by _id
    async singleThought(req, res) {
        try {
            const thoughts = await Thought.findOne({ _id: req.params.thoughtId });

            if (!thoughts) {
                return res.status(404).json({ message: 'No thought with that ID' });
            }

            res.json(thoughts);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // create new thought
    async createThought(req, res) {
        try {
            const thoughts = await Thought.create(req.body);
            res.json(thoughts);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // update thought by _id
    async updateThought(req, res) {
        try {
            const thoughts = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if (!thoughts) {
                res.status(404).json({ message: 'No thought with this ID' });
            }

            res.json(thoughts);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // delete thought by _id
    async deleteThought(req, res) {
        try {
            const thoughts = await Thought.findOneAndRemove({ _id: req.params.thoughtId });

            if (!thoughts) {
                res.status(404).json({ message: 'No thought with that ID' });
            }

            res.json({ message: 'Thought deleted' });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // post reaction stored in single thoughts reactions array
    async createReaction(req, res) {
        console.log('You are adding a reacton');
        console.log(req.body);

        try {
            const reaction = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body } },
                { runValidators: true, new: true },
            );

            if (!reaction) {
                return res.status(404).json({ message: 'No reaction found with that ID' });
            }

            res.json(reaction);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // delete reaction by reactionId
    async deleteReaction(req, res) {
        try {
            const reaction = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { reactionId: req.params.reactionId } } },
                { runValidators: true, new: true },
            );

            if (!reaction) {
                return res.status(404).json({ message: 'No reaction found with that ID' });
            }

            res.json(reaction);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
};
