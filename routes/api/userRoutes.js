const router = require('express').Router();
const {
  getAllUsers,
  createUser,
  getUser,  
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require('../../controllers/userController');

router.route('/').get(getAllUsers).post(createUser); //establishes route for get/post requests via /api/user

router.route('/:userId').get(getUser).put(updateUser).delete(deleteUser);  //allows access to requests via api/user/:userId

router.route('/:userId/friends/:friendsId').put(addFriend).delete(deleteFriend); //delete a friend from a user's list

module.exports = router;
