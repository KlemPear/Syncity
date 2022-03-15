const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema(
	{
		firstName: String,
		lastName: String,
		email: {
			type: String,
			validate: {
				validator: (email) => User.doesNotExist({ email }),
				message: "email already exists",
			},
		},
		bio: String,
	},
	{
		timestamps: true,
		collection: "users",
	}
);

userSchema.statics.doesNotExist = async function (field) {
	return (await this.where(field).countDocuments()) === 0;
};

userSchema.statics.findUsersByIds = async function (usersId) {
	try {
		const users = [];
		for (const id of usersId) {
			const user = await this.findById(id);
			users.push(user);
		}
		return users;
	} catch (error) {
		throw error;
	}
};

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", userSchema);
module.exports = User;

