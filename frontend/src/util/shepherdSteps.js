import history from "./history";

const shepherdSteps = [
	{
		id: "intro",
		beforeShowPromise: function () {
			return new Promise(function (resolve) {
				setTimeout(function () {
					window.scrollTo(0, 0);
					resolve();
				}, 500);
			});
		},
		buttons: [
			{
				classes: "shepherd-button-secondary",
				text: "Exit",
				type: "cancel",
			},
			{
				classes: "shepherd-button-primary",
				text: "Next",
				type: "next",
			},
		],
		scrollTo: false,
		cancelIcon: {
			enabled: true,
		},
		title: "Welcome to nost!",
		text: ["Let's get you on a tour of the app."],
	},
	{
		id: "new brief",
		attachTo: { element: "#new-brief-button", on: "bottom" },
		beforeShowPromise: function () {
			history.push("/list-briefs");
			return new Promise(function (resolve) {
				setTimeout(function () {
					window.scrollTo(0, 0);
					resolve();
				}, 500);
			});
		},
		buttons: [
			{
				classes: "shepherd-button-secondary",
				text: "Exit",
				type: "cancel",
			},
			{
				classes: "shepherd-button-primary",
				text: "Back",
				type: "back",
			},
			{
				classes: "shepherd-button-primary",
				text: "Next",
				type: "next",
			},
		],
		classes: "custom-class-name-1 custom-class-name-2",
		highlightClass: "highlight",
		scrollTo: false,
		cancelIcon: {
			enabled: true,
		},
		title: "Create a new brief!",
		text: [
			"Click here to get verified as a briefer and post brief on the plateform.",
		],
		// when: {
		// 	show: () => {
		// 		console.log("show step");
		// 	},
		// 	hide: () => {
		// 		console.log("hide step");
		// 	},
		// },
	},
	{
		id: "filters",
		attachTo: { element: "#list-brief-filters", on: "bottom" },
		beforeShowPromise: function () {
			return new Promise(function (resolve) {
				setTimeout(function () {
					window.scrollTo(0, 0);
					resolve();
				}, 500);
			});
		},
		buttons: [
			{
				classes: "shepherd-button-secondary",
				text: "Exit",
				type: "cancel",
			},
			{
				classes: "shepherd-button-primary",
				text: "Back",
				type: "back",
			},
			{
				classes: "shepherd-button-primary",
				text: "Next",
				type: "next",
			},
		],
		classes: "custom-class-name-1 custom-class-name-2",
		highlightClass: "highlight",
		scrollTo: false,
		cancelIcon: {
			enabled: true,
		},
		title: "Find the briefs you are looking for!",
		text: [
			"Use the filter boxes here to sort through the list of open briefs.",
		],
	},
	{
		id: "applications",
		//attachTo: { element: "#list-brief-filters", on: "bottom" },
		beforeShowPromise: function () {
			history.push("/list-applications");
			return new Promise(function (resolve) {
				setTimeout(function () {
					window.scrollTo(0, 0);
					resolve();
				}, 500);
			});
		},
		buttons: [
			{
				classes: "shepherd-button-secondary",
				text: "Exit",
				type: "cancel",
			},
			{
				classes: "shepherd-button-primary",
				text: "Back",
				type: "back",
			},
			{
				classes: "shepherd-button-primary",
				text: "Next",
				type: "next",
			},
		],
		classes: "custom-class-name-1 custom-class-name-2",
		highlightClass: "highlight",
		scrollTo: false,
		cancelIcon: {
			enabled: true,
		},
		title: "Your applications",
		text: [
			'Here you will find a list of all the briefs you have applied to. If your application was liked by the brief author, it will have a heart next to the logo. If your application was selected for a brief, you will find it under the tab "Selected Applications".',
		],
	},
	{
		id: "catalog",
		//attachTo: { element: "#list-brief-filters", on: "bottom" },
		beforeShowPromise: function () {
			history.push("/catalog");
			return new Promise(function (resolve) {
				setTimeout(function () {
					window.scrollTo(0, 0);
					resolve();
				}, 500);
			});
		},
		buttons: [
			{
				classes: "shepherd-button-secondary",
				text: "Exit",
				type: "cancel",
			},
			{
				classes: "shepherd-button-primary",
				text: "Back",
				type: "back",
			},
			{
				classes: "shepherd-button-primary",
				text: "Next",
				type: "next",
			},
		],
		classes: "custom-class-name-1 custom-class-name-2",
		highlightClass: "highlight",
		scrollTo: false,
		cancelIcon: {
			enabled: true,
		},
		title: "Music Catalog",
		text: [
			"This is where you can upload your tracks to nost in order to submit them in a brief application later on. You may be limited in the number of tracks you can store on nost at the same time based on your subscription plan.",
		],
	},
	{
		id: "notifications",
		attachTo: { element: "#notifications-button", on: "bottom" },
		beforeShowPromise: function () {
			//history.push("/catalog");
			return new Promise(function (resolve) {
				setTimeout(function () {
					window.scrollTo(0, 0);
					resolve();
				}, 500);
			});
		},
		buttons: [
			{
				classes: "shepherd-button-secondary",
				text: "Exit",
				type: "cancel",
			},
			{
				classes: "shepherd-button-primary",
				text: "Back",
				type: "back",
			},
			{
				classes: "shepherd-button-primary",
				text: "Next",
				type: "next",
			},
		],
		classes: "custom-class-name-1 custom-class-name-2",
		highlightClass: "highlight",
		scrollTo: false,
		cancelIcon: {
			enabled: true,
		},
		title: "Notifications Center",
		text: [
			"Here you will find the notifications center. You will be notified when artists submit applications to your brief, or when briefs authors liked your application.",
		],
	},
	{
		id: "settings",
		attachTo: { element: "#username-button", on: "bottom" },
		beforeShowPromise: function () {
			//history.push("/catalog");
			return new Promise(function (resolve) {
				setTimeout(function () {
					window.scrollTo(0, 0);
					resolve();
				}, 500);
			});
		},
		buttons: [
			{
				classes: "shepherd-button-secondary",
				text: "Exit",
				type: "cancel",
			},
			{
				classes: "shepherd-button-primary",
				text: "Back",
				type: "back",
			},
			{
				classes: "shepherd-button-primary",
				text: "Next",
				type: "next",
			},
		],
		classes: "custom-class-name-1 custom-class-name-2",
		highlightClass: "highlight",
		scrollTo: false,
		cancelIcon: {
			enabled: true,
		},
		title: "Settings",
		text: [
			"Click here to access your settings: Dark Mode toggle, Subscription Plans, Profile & Connections and LogOut.",
		],
	},
	{
		id: "subscription-plans",
		//attachTo: { element: "#username-button", on: "bottom" },
		beforeShowPromise: function () {
			history.push("/buy-tokens");
			return new Promise(function (resolve) {
				setTimeout(function () {
					window.scrollTo(0, 0);
					resolve();
				}, 500);
			});
		},
		buttons: [
			{
				classes: "shepherd-button-secondary",
				text: "Exit",
				type: "cancel",
			},
			{
				classes: "shepherd-button-primary",
				text: "Back",
				type: "back",
			},
			{
				classes: "shepherd-button-primary",
				text: "Next",
				type: "next",
			},
		],
		classes: "custom-class-name-1 custom-class-name-2",
		highlightClass: "highlight",
		scrollTo: false,
		cancelIcon: {
			enabled: true,
		},
		title: "Subscription Plans",
		text: ["Here you can select the right plan for you as a label or artist."],
	},
	{
		id: "Profile",
		//attachTo: { element: "#username-button", on: "bottom" },
		beforeShowPromise: function () {
			history.push("/profile");
			return new Promise(function (resolve) {
				setTimeout(function () {
					window.scrollTo(0, 0);
					resolve();
				}, 500);
			});
		},
		buttons: [
			{
				classes: "shepherd-button-secondary",
				text: "Exit",
				type: "cancel",
			},
			{
				classes: "shepherd-button-primary",
				text: "Back",
				type: "back",
			},
			{
				classes: "shepherd-button-primary",
				text: "Next",
				type: "next",
			},
		],
		classes: "custom-class-name-1 custom-class-name-2",
		highlightClass: "highlight",
		scrollTo: false,
		cancelIcon: {
			enabled: true,
		},
		title: "Profile Page",
		text: [
			"This is your profile page. Here you can see your information and do things like change your password or update your subscription plan.",
		],
	},
	{
		id: "Connections",
		attachTo: { element: "#connections", on: "bottom" },
		beforeShowPromise: function () {
			//history.push("/profile");
			return new Promise(function (resolve) {
				setTimeout(function () {
					window.scrollTo(0, 0);
					resolve();
				}, 500);
			});
		},
		buttons: [
			{
				classes: "shepherd-button-secondary",
				text: "Exit",
				type: "cancel",
			},
			{
				classes: "shepherd-button-primary",
				text: "Back",
				type: "back",
			},
			{
				classes: "shepherd-button-primary",
				text: "Next",
				type: "next",
			},
		],
		classes: "custom-class-name-1 custom-class-name-2",
		highlightClass: "highlight",
		scrollTo: false,
		cancelIcon: {
			enabled: true,
		},
		title: "Connections",
		text: [
			"Here you can search for other users email address, and connect with them. Once connected to another user, you will be able to see the private briefs they post. Private briefs are only visible to connections.",
		],
	},
	{
		id: "Ending",
		//attachTo: { element: "#connections", on: "bottom" },
		beforeShowPromise: function () {
			history.push("/list-briefs");
			return new Promise(function (resolve) {
				setTimeout(function () {
					window.scrollTo(0, 0);
					resolve();
				}, 500);
			});
		},
		buttons: [
			{
				classes: "shepherd-button-secondary",
				text: "Exit",
				type: "cancel",
			},
			{
				classes: "shepherd-button-primary",
				text: "Back",
				type: "back",
			},
			{
				classes: "shepherd-button-primary",
				text: "End",
				type: "next",
			},
		],
		classes: "custom-class-name-1 custom-class-name-2",
		highlightClass: "highlight",
		scrollTo: false,
		cancelIcon: {
			enabled: true,
		},
		title: "That's it!",
		text: [
			"Thank you for taking the tour. If you have any questions, please email us at hugo@nost.audio. We hope you will enjoy the platform!",
		],
	},
];

export default shepherdSteps;
