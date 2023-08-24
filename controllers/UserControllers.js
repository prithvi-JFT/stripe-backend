const User = require('../models/User');
const stripe = require('stripe')(process.env.STRIPE_API_KEY);

const [basic, pro, business] = ['price_1NibqsSEkAPKYWnWmDW2oylj', 'price_1NibxOSEkAPKYWnWrFGZy229', 'price_1NibxjSEkAPKYWnWiJf73eSI'];

const createUser = async (req, res) => {
	const { name, email, password } = req.body;
	try {
		const user = await User.create({ name: name, email: email, password: password });
		console.log('test');
		return res.status(200).json(user);
	} catch (e) {
		console.error('Cannot Create User', e);
		return res.status(400).json({ error: e.message });
	}
};

const createCheckoutSession = async (req, res) => {
	const { plan, customerId } = req.body;
	let planId = null;
	if (plan.price == 99) planId = basic;
	else if (plan.price == 499) planId = pro;
	else if (plan.price == 999) planId = business;

	try {
		const session = await stripeSession(planId);
		const user = await User.findAll()
		console.log(user);
		return res.json({ session });
	} catch (e) {
		res.send(error);
	}

	return res.status(200).json({ plan, customerId });
};

const stripeSession = async (plan) => {
	try {
		const session = await stripe.checkout.sessions.create({
			mode: 'subscription',
			payment_method_types: ['card'],
			line_items: [{
				price:plan,
				quantity:1
			}],
			success_url: 'http://localhost:3000/success',
			cancel_url: 'http://localhost:3000/cancel',
		});
		return session;
	} catch (e) {
		console.error(e);
		return e;
	}
};

module.exports = {
	createUser,
	createCheckoutSession,
};
