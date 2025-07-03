const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const queryAsync = require('../utils/queryAsync');

const SECRET_KEY = 'jwt_secret';

const registerUser = async (name, email, password) => {
  try {
    const users = await queryAsync('SELECT * FROM users WHERE email = ?', [email]);
    if (users.length > 0) {
      throw { status: 400, msg: 'Email already exists' };
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    await queryAsync(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, hashedPassword]
    );

    return { msg: 'User Registered' };
  } catch (err) {
    throw err.status ? err : { status: 500, msg: 'DB Error', err };
  }
};

const loginUser = async (email, password) => {
  try {
    const users = await queryAsync('SELECT * FROM users WHERE email = ?', [email]);
    if (users.length === 0) {
      throw { status: 401, msg: 'Invalid email or password' };
    }

    const user = users[0];
    const match = bcrypt.compareSync(password, user.password);
    if (!match) {
      throw { status: 401, msg: 'Invalid email or password' };
    }

    const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1h' });

    return {
      token,
      user: { id: user.id, name: user.name, email: user.email }
    };
  } catch (err) {
    throw err.status ? err : { status: 500, msg: 'DB Error', err };
  }
};

const getUserProfile = async (userId) => {
  try {
    const users = await queryAsync('SELECT id, name, email FROM users WHERE id = ?', [userId]);
    if (users.length === 0) {
      throw { status: 404, msg: 'User not found' };
    }

    return users[0];
  } catch (err) {
    throw err.status ? err : { status: 500, msg: 'DB Error', err };
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
};
