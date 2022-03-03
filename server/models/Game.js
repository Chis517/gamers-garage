const { Schema } = require('mongoose');

const gameSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  released: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
  gameId: {
    type: Number,
    required: true,
  },
  background_image: {
    type: String,
  },
  website: {
    type: String,
  },
  rating: {
    type: Number,
  }
});

module.exports = gameSchema;