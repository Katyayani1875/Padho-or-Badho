// @desc    Get user profile
// @route   GET /api/v1/users/profile
// @access  Private
const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      // ... send other profile data as needed
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
};

module.exports = { getUserProfile };