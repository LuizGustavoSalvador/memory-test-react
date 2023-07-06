const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.methods.checkPassword = function (password) {
  const hashedPassword = Buffer.from(this.password, 'base64').toString('ascii');
  return bcrypt.compare(password, hashedPassword);
};

const User = mongoose.model('User', userSchema);

module.exports = User;