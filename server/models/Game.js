const { Schema } = require('mongoose');

const gameSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  gameId: {
    type: Number,
    required: true,
  },
  background_image: {
    type: String,
  }
});

module.exports = gameSchema;