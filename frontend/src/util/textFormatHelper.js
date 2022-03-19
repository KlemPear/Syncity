export const moneyFormatter = new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "USD",
	maximumFractionDigits: 0,
});

export const dateFormatter = (date) => {
	return new Date(date).toLocaleDateString("en-Us");
};
