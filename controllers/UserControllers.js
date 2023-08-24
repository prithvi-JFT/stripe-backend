const User = require('./models/User');

const createUser = async (req, res) => {
	const { name, email, password } = req.body;
	try {
		const user = await User.create({ name: name, email: email, password: password });
        console.log('test')
		return res.status(200).json(user);
	} catch (e) {
		console.error('Cannot Create User', e);
		return res.status(400).json({ error: e.message });
	}
};

module.exports={
    createUser
}