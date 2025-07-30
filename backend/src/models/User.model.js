const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['student', 'parent', 'admin'], default: 'student' },
  avatar: { type: String, default: 'default-avatar.png' },
  language: { type: String, default: 'en' },
  studentProfile: {
    grade: Number,
    xpPoints: { type: Number, default: 0 },
    dailyStreak: { type: Number, default: 0 },
    lastLogin: { type: Date },
    parent: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  parentProfile: {
    children: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
  }
}, { timestamps: true });

// Password hashing middleware
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Password comparison method
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;