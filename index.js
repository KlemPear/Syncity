if (process.env.NODE_ENV !== "production") {
	require("dotenv").config();
}

const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");

// SSL Cert
// const fs = require("fs");
// const http = require("http");
// const https = require("https");
// const httpsPort = 443;
// const httpsOptions = {
// 	cert: fs.readFileSync("./ssl/nost_audio.crt"),
// 	ca: fs.readFileSync("./ssl/nost_audio.ca-bundle"),
// 	key: fs.readFileSync("./ssl/nost.audio.key"),
// };
// httpServer = http.createServer(app);
// httpsServer = https.createServer(httpsOptions, app);

// session
const session = require("express-session");
const MongoStore = require("connect-mongo");
// authentication
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/User");
//Routes
const userRouter = require("./routes/user");
const briefRouter = require("./routes/brief");
const applicationRouter = require("./routes/application");
const paymentsRouter = require("./routes/payments");
const trackRouter = require("./routes/track");
// mongo connection start mongoDb server
// sudo mongod --dbpath=/home/clem/Git/Syncity/data/db
const mongoDbSetUp = require("./config/mongo");

mongoDbSetUp.on("error", console.error.bind(console, "connection error:"));
mongoDbSetUp.once("open", () => {
	console.log("Database connected");
});

const port = process.env.PORT || "5000";
let frontendURL = ["http://localhost:3000", "https://dashboard.stripe.com/"];
if (process.env.FRONTEND_URL_1 && process.env.FRONTEND_URL_2) {
	frontendURL = [
		process.env.FRONTEND_URL_1,
		process.env.FRONTEND_URL_2,
		"https://dashboard.stripe.com/",
	];
}

app.set("port", port);

//Configure CORS
var whitelist = [].push(...frontendURL);
var corsOptions = {
	origin: whitelist,
	credentials: true,
	allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(
	express.json({
		// need this to use stripe webhook
		verify: function (req, res, buf) {
			var url = req.originalUrl;
			if (url.startsWith("/payments/webhook")) {
				req.rawBody = buf.toString();
			}
		},
	})
);
// less easy for user to see that we are using express, less hacking
app.disable("x-powered-by");

//Session set up
// Set up session with Mongo
const secret = process.env.SECRET || "MySecretIsThatILoveChocolate";
const store = MongoStore.create({
	mongoUrl: mongoDbSetUp._connectionString,
	secret: secret,
	touchAfter: 24 * 60 * 60, // lazy update sessions every 24 hours (writen here in seconds)
});

store.on("error", function (e) {
	console.log("Session store error", e);
});

const sessionConfig = {
	store: store,
	secret: secret,
	name: "SessionId",
	domain: process.env.NODE_ENV === "production" ? "https://app.nost.audio/" : null,
	resave: false,
	saveUninitialized: true,
	cookie: {
		sameSite: false,
		secure: process.env.NODE_ENV === "production", // session cookies can only be configured over HTTPS
		expires: Date.now() + 1000 * 60 * 60 * 24 * 7, // 1 week
		maxAge: 1000 * 60 * 60 * 24 * 7,
	},
};

if (process.env.NODE_ENV === "production") {
  app.set("trust proxy", 1); // trust first proxy
}

app.use(session(sessionConfig));

//Passport set up
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
// serialize and deserialize
passport.serializeUser(function (user, done) {
	done(null, user._id);
});
passport.deserializeUser(function (id, done) {
	User.findById(id, function (err, user) {
		if (!err) done(null, user);
		else done(err, null);
	});
});

app.use((req, res, next) => {
	res.locals.currentUser = req.user;
	next();
});

app.use("/users", userRouter);
app.use("/briefs", briefRouter);
app.use("/applications", applicationRouter);
app.use("/payments", paymentsRouter);
app.use("/tracks", trackRouter);

if (process.env.NODE_ENV === "production") {
	// Step 1: serve our static asset in production
	app.use(express.static(path.resolve(__dirname, "./frontend/build")));
	// Step 2: redirect all traffic outside of api routes to index.html
	app.get("*", function (req, res) {
		res.sendFile(path.resolve(__dirname, "./frontend/build", "index.html"));
	});
} else {
	/** catch 404 and forward to error handler */
	app.use("*", (req, res) => {
		return res.status(404).json({
			success: false,
			message: "API endpoint does not exist",
		});
	});
}

app.listen(port, () => {
	console.log(`Listening on port: ${port}`);
});

// app.use((req, res, next) => {
// 	if (req.protocol === "http") {
// 		res.redirect(301, `https://${req.headers.host}${req.url}`);
// 	}
// 	next();
// });

// httpsServer.listen(httpsPort, "www.nost.audio");
// httpServer.listen(port, "localhost");
