const { Schema } = require('mongoose');

const gameSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  id: {
    type: Number,
    required: true,
  },
  background_image: {
    type: String,
  },
  rating: {
    type: Number,
  }
});

module.exports = gameSchema;