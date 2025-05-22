const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { getRepository } = require('typeorm');
const { User } = require('../entities/User');

exports.signup = async (req, res) => {
    const { username, password, role } = req.body; // ⬅️ take role from request
    try {
      const userRepo = getRepository(User);
      const existing = await userRepo.findOne({ where: { username } });
      if (existing) return res.status(400).json({ message: 'User already exists' });
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = userRepo.create({
        username,
        password: hashedPassword,
        role: role || 'Employee' // ⬅️ default fallback if not passed
      });
  
      await userRepo.save(user);
      res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  
  exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
      const userRepo = getRepository(User);
      const user = await userRepo.findOne({ where: { username } });
  
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET);
  
      console.log("Logged in user role:", user.role); // 👈 ✅ ADD THIS LINE
  
      res.json({ token, role: user.role });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  