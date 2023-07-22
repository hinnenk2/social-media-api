const { Schema, model } = require('mongoose');

const userSchema = new Schema(    //Create new user model
  {
    userName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Email address does not match!'],
    },
    
    thoughts: [   
      {
        type: Schema.Types.ObjectId,   //Array of id values referencing from thought model
        ref: 'thought',
      },
    ],
    
    friends: [
      {
        type: Schema.Types.ObjectId,  //Array of _id values referencing the User model (self-reference)
        ref: 'user',
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

https: userSchema.virtual('friendCount').get(function () {  //'friendCount` that retrieves the length of the user's friends array field on query
  return this.friends.length;
});

const User = model('user', userSchema);

module.exports = User;
