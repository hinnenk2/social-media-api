const router = require('express').Router();
const {
  getAllThoughts,
  getThought,  
  createThought,  //createThought
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction,
} = require('../../controllers/thoughtController');

router.route('/').get(getAllThoughts).post(createThought);  //allows access to get/post requests for user thoughts via /api/thoughts


router    //extends from api/thoughts/:thoughtId
  .route('/:thoughtId')
  .get(getThought)
  .put(updateThought)
  .delete(deleteThought);

router.route('/:thoughtId/reactions').put(addReaction);

router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;
