const Users = require('../models/userModel')


const fetchCtrl = {
	getUsers : async (req, res) => {
		try {
			const user = await Users.find({})
			
			res.json({ user });
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	}
}

module.exports = fetchCtrl;