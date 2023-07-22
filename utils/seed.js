const connection = require('../config/connection');
const { User, Thought } = require('../models');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  await User.deleteMany({});  //Reset existing Users

  await Thought.deleteMany({});   //Reset existing Thoughts

  const thoughts = [    //Seed thoughts of various users
    {
      thoughtText: "Why is grass green?",
      userName: 'Mr.X',
    },
    {
      thoughtText: 'Hello World',
      userName: 'Mr.Y',
    },
    {
      thoughtText: 'Nice day we`re having',
      userName: 'Mrs.C',
    },
    {
      thoughtText: 'Leave room for nature',
      userName: 'Mr.Z',
    },
  ];

  await Thought.collection.insertMany(thoughts);  //Adds thoughts to the current collection

  await User.collection.insertMany([    //Adds user to the collection
    {
      userName: 'Mr.X',
      email: 'mrx@gmail.com',
    },
    {
      userName: 'Mr.Y',
      email: 'mry@gmail.com',
    },
    {
      userName: 'Mr.Z',
      email: 'mrz@gmail.com',
    },
    {
      userName: 'Mrs.A',
      email: 'aaa@gmail.com',
    },
    {
      userName: 'Mrs.B',
      email: 'bbb@gmail.com',
    },
    {
      userName: 'Mrs.C',
      email: 'ccc@gmail.com',
    },
  ]);

  // Log out the seed data to indicate what should appear in the database
  console.table(thoughts);
  console.info('Seeds added');
  process.exit(0);
});
