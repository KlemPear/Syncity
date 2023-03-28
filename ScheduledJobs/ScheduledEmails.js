const baseUrl =
	process.env.NODE_ENV === "production"
		? "https://app.nost.audio"
		: "http://localhost:3000";

const Brief = require("../models/Brief");
const { sendEmail } = require("../emails/mail");
const { briefDeadlineExpired } = require("../emails/emailTemplates");

const getNumberOfDays = (start, end) => {
	const date1 = new Date(start);
	const date2 = new Date(end);

	// One day in milliseconds
	const oneDay = 1000 * 60 * 60 * 24;

	// Calculating the time difference between two dates
	const diffInTime = date2.getTime() - date1.getTime();

	// Calculating the no. of days between two dates
	const diffInDays = Math.round(diffInTime / oneDay) + 1;

	return diffInDays;
};

module.exports.UpdateClosedBriefsAndSendBriefDeadlineExpiredEmails =
	async () => {
		const openBriefs = await Brief.find({ open: true });
		const emailList = [];
		openBriefs.forEach(async (brief) => {
			if (getNumberOfDays(new Date(Date.now()), brief.dueDate) < 0) {
				brief.open = false;
				const updatedBrief = await Brief.findByIdAndUpdate(brief._id, brief, {
					returnDocument: "after",
				});
				brief = updatedBrief;
				emailList.push({
					briefTitle: brief.title,
					firstName: brief?.author?.firstName,
					url: `${baseUrl}/show-brief/${brief._id}/applications`,
					email: brief?.author?.email,
				});
			}
		});
		emailList.forEach(async (item) => {
			const options = briefDeadlineExpired(
				item.firstName,
				item.url,
				item.briefTitle,
				item.email
			);
			sendEmail(options);
		});
	};
