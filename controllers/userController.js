const { User } = require('../models');
//   addFriend,
//   deleteFriend;
module.exports = {
  getAllUsers(req, res) {   //GET request for all users
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  getUser(req, res) {    //GET a user by id
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .then((user) => {
        !user
          ? res.status(404).json({ message: 'Invalid ID' })
          : res.json(user);
      })
      .catch((err) => res.status(500).json(err));
  },

  createUser(req, res) {    //POST request for new user
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  updateUser(req, res) {    //PUT request to update user info
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { new: true }
    )
      .then((user) => {
        !user
          ? res.status(404).json({ message: 'Invalid id' })
          : res.json(user);
      })
      .catch((err) => res.status(500).json(err));
  },

  deleteUser(req, res) {    //DELETE request for deleting user
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) => {
        !user
          ? res.status(404).json({ message: 'Invalid id' })
          : User.deleteMany({ _id: { $in: User.thought } });
      })
      .then(() => {
        res.json({ message: 'User has been deleted' });
      })
      .catch((err) => res.status(500).json(err));
  },
  
  addFriend(req, res) {   //add friend to user
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendsId } }
    )
      .then((user) => {
        !user
          ? res.status(404).json({ message: 'Invalid id!' })
          : res.json(user);
      })
      .catch((err) => res.status(500).json(err));
  },

  deleteFriend(req, res) {    //delete friend from user
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendsId } }
    )
      .then((user) => {
        !user
          ? res.status(404).json({ message: 'Invalid id!' })
          : res.json(user);
      })
      .catch((err) => res.status(500).json(err));
  },
};
