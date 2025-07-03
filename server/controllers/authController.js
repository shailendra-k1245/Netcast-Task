const authService = require('../services/authService');

const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const result = await authService.registerUser(name, email, password);
    res.status(201).json(result);
  } catch (error) {
    res.status(error.status || 500).json({ msg: error.msg, err: error.err });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await authService.loginUser(email, password);
    res.json(result);
  } catch (error) {
    res.status(error.status || 500).json({ msg: error.msg });
  }
};

const getProfile = async (req, res) => {
  try {
    const profile = await authService.getUserProfile(req.user.id);
    res.json(profile);
  } catch (error) {
    res.status(error.status || 500).json({ msg: error.msg });
  }
};

module.exports = {
  register,
  login,
  getProfile,
};
