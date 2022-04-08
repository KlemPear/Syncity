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
		tokens: { type: Number, default: 10 },
		connections: [
			{
				type: Schema.Types.ObjectId,
				ref: "User",
				unique: true,
			},
		],
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

userSchema.statics.updateTokensOfUser = async function (userId, nbrOfTokens) {
	try {
		const user = await this.findById(userId);
		user.tokens += nbrOfTokens;
		if (user.tokens < 0) {
			return false;
		} else {
			const updatedUser = await this.findByIdAndUpdate(userId, user, {
				returnDocument: "after",
			});
			return updatedUser;
		}
	} catch (error) {
		throw error;
	}
};

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", userSchema);
module.exports = User;
