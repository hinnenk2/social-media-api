const { User, Thought } = require('../models');

module.exports = {
  getAllThoughts(req, res) {    //GET all thought
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  getThought(req, res) {    //GET thought by id
    Thought.findOne({ _id: req.params.thoughtId })
      .select('-__v')
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'Invalid id' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  async createThought(req, res) {    //POST a new thought
    try {
      const newThought = await Thought.create(req.body);
      const user = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $addToSet: { thoughts: newThought._id } }
      );
      !user
        ? res.status(404).json({ message: 'Invalid id' })
        : res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  updateThought(req, res) {   //PUT request to update a current thought 
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'Invalid id' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  deleteThought(req, res) {   //DELETE request to remove current thought
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) => {
        return User.findOneAndUpdate(
          { thought: req.params.thoughtId },
          { $pull: { thoughts: req.params.thoughtId } }
        );
      })
      .then((user) => {
        !user
          ? res.status(404).json({ message: 'Invalid id' })
          : res.json(user);
      })
      .catch((err) => res.status(500).json(err));
  },
  
  async addReaction(req, res) {   //create a new reaction
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } }
      );
      !thought
        ? res.status(404).json({ message: 'Invalid id' })
        : res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  
  async deleteReaction(req, res) {    //delete request for removing a reaction
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } }
      );
      !thought
        ? res.status(404).json({ message: 'Invalid id' })
        : res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
