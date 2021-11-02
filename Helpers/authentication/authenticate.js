const User = require('../../Database/user/user-service');

const isAuthenticated = async (providedEmail,providedPassword)=>
{
	const user = await User.getByEmail(providedEmail);
	if(!user) return null;
	if(user.password === providedPassword) {
		return {
			name: user.name,
			email: user.email,
			type: user.type
		};
	}
	return null;
};
module.exports = isAuthenticated;
