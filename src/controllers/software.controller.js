const { getRepository } = require('typeorm');
const { Software } = require('../entities/Software');

// ✅ Create Software
exports.createSoftware = async (req, res) => {
  const { name, description, accessLevels } = req.body;
  try {
    const softwareRepo = getRepository(Software);
    const software = softwareRepo.create({ name, description, accessLevels });
    await softwareRepo.save(software);
    res.status(201).json({ message: 'Software created successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Get All Software
exports.getAllSoftware = async (req, res) => {
  try {
    const softwareRepo = getRepository(Software);
    const softwareList = await softwareRepo.find();
    res.json(softwareList);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
