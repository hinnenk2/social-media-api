const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const dayjs = require('dayjs');

const thoughtSchema = new Schema(   //Create a Thought schema model
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdDate) => {
        try {
          return dayjs(createdDate).format('MM/DD/YYYY');
        } catch (err) {
          console.log(err);
        }
      },
    },
    userName: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  },
  { timestamps: true }
);

thoughtSchema.virtual('reactionCount').get(function () {    //virtual that counts the length of the thought's reactions array field on query.
  return this.reactions.length;
});

const Thought = model('thought', thoughtSchema);

module.exports = Thought;
