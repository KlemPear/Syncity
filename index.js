if (process.env.NODE_ENV !== "production") {
	require("dotenv").config();
}

const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
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
// mongo connection start mongoDb server
// sudo mongod --dbpath=/home/clem/Git/Syncity/data/db
const mongoDbSetUp = require("./config/mongo");

mongoDbSetUp.on("error", console.error.bind(console, "connection error:"));
mongoDbSetUp.once("open", () => {
	console.log("Database connected");
});

const port = process.env.PORT || "5000";
const frontendURL = process.env.FRONTEND_URL || "http://localhost:3000";
app.set("port", port);

//Configure CORS
var whitelist = [frontendURL];
var corsOptions = {
	origin: whitelist,
	credentials: true,
	allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// less easy for user to see that we are using express, less hacking
app.disable("x-powered-by");

//Session set up
// Set up session with Mongo
const secret = process.env.SECRET || "thisShouldBeASecret";
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
	resave: false,
	saveUninitialized: false,
	cookie: {
		sameSite: false,
		//secure: true, // session cookies can only be configured over HTTPS
		expires: Date.now() + 1000 * 60 * 60 * 24 * 7, // 1 week
		maxAge: 1000 * 60 * 60 * 24 * 7,
	},
};
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

/** catch 404 and forward to error handler */
app.use("*", (req, res) => {
	return res.status(404).json({
		success: false,
		message: "API endpoint does not exist",
	});
});

// Step 1:
app.use(express.static(path.resolve(__dirname, "./client/build")));
// Step 2:
app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

app.listen(port, () => {
	console.log(`Listening on port: ${port}`);
});