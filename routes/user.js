const express = require('express');
const router = express.Router();
const { UserFactory } = require('../src/users');
const db = require('../initDB');
//const UserDatabase = require('../userDatabase');

router.get('/users', async (_req, res) => {
  try {
    const users = await db.getAllUsersRole();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

router.get('/:id', async (req, res) => {
  const user = await db.getUserById(req.params.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

router.post('/', async (req, res) => {
  const { type, name, email, password } = req.body;
  try {
    const factory = new UserFactory();
    const newUser = factory.createUser(type, name, email, password);
    const saved = await db.createUser({
      name: newUser.name,
      email: newUser.email,
      role: newUser.getRole(),
    });
    res.json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  const updated = await db.updateUser(req.params.id, req.body);
  res.json(updated);
});

router.delete('/:id', async (req, res) => {
  const deleted = await db.deleteUser(req.params.id);
  res.json(deleted);
});

module.exports = router;
