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
		// tokens: { type: Number, default: 10 },
		connections: [
			{
				type: Schema.Types.ObjectId,
				ref: "User",
			},
		],
		status: {
			type: String,
			enum: ["Pending", "Active"],
			default: "Pending",
		},
		confirmationCode: {
			type: String,
			unique: true,
		},
		stripeCustomerId: String,
		stripeAccount: String,
		briefSubscriptionPlan: {
			type: String,
			enum: ["None", "Verified"],
			default: "None",
		},
		pitchSubscriptionPlan: { type: String, default: "freeTrial" },
		briefTokens: { type: Number, default: -1 },
		pitchTokens: { type: Number, default: 5 },
		prefersDarkMode: { type: Boolean, default: false },
		admin: { type: Boolean, default: false },
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
			}).populate("connections");
			return updatedUser;
		}
	} catch (error) {
		throw error;
	}
};

userSchema.statics.burnOneBriefTokenOfUser = async function (userId) {
	try {
		const user = await this.findById(userId);
		if (user.briefTokens === -1) {
			return user;
		}
		if (user.briefTokens === 0) {
			return false;
		} else {
			user.briefTokens += -1;
			const updatedUser = await this.findByIdAndUpdate(userId, user, {
				returnDocument: "after",
			}).populate("connections");
			return updatedUser;
		}
	} catch (error) {
		throw error;
	}
};

userSchema.statics.burnOnePitchTokenOfUser = async function (userId) {
	try {
		const user = await this.findById(userId);
		if (user.pitchTokens === -1) {
			return user;
		}
		if (user.pitchTokens === 0) {
			return false;
		} else {
			user.pitchTokens += -1;
			const updatedUser = await this.findByIdAndUpdate(userId, user, {
				returnDocument: "after",
			}).populate("connections");
			return updatedUser;
		}
	} catch (error) {
		throw error;
	}
};

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", userSchema);
module.exports = User;
