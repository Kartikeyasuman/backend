const { getRepository } = require('typeorm');
const { Request } = require('../entities/Request');
const { User } = require('../entities/User');
const { Software } = require('../entities/Software');

exports.createRequest = async (req, res) => {
  try {
    const { softwareId, accessType, reason } = req.body;
    const userId = req.user.id;

    const requestRepo = getRepository(Request);
    const softwareRepo = getRepository(Software);
    const userRepo = getRepository(User);

    const software = await softwareRepo.findOne({ where: { id: softwareId } });
    if (!software) return res.status(404).json({ message: 'Software not found' });

    const user = await userRepo.findOne({ where: { id: userId } });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const newRequest = requestRepo.create({
      user,
      software,
      accessType,
      reason,
      status: 'Pending',
    });

    await requestRepo.save(newRequest);
    res.status(201).json({ message: 'Request submitted successfully' });
  } catch (err) {
    console.error('Error in createRequest:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.getAllRequests = async (req, res) => {
  try {
    const status = req.query.status || 'Pending';

    const requestRepo = getRepository(Request);
    const requests = await requestRepo.find({
      where: { status },
      relations: ['user', 'software'],
    });

    res.json(requests);
  } catch (err) {
    console.error('Error fetching requests:', err);
    res.status(500).json({ error: err.message });
  }
};

// ✅ NEW FUNCTION FOR PATCH APPROVE/REJECT
exports.updateRequestStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const requestRepo = getRepository(Request);
    const request = await requestRepo.findOne({ where: { id } });

    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    request.status = status;
    await requestRepo.save(request);

    res.json({ message: `Request ${status}` });
  } catch (err) {
    console.error('Error updating request:', err);
    res.status(500).json({ error: err.message });
  }
};
