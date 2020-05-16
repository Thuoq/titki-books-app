require('dotenv').config();
const mongoose = require('mongoose');
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
/*CONNECT DATABASE*/
const DB = process.env.DATABASE.replace('<PASSWORD>',process.env.DATABASE_PASSWORD)
mongoose.connect(DB,{
	useNewUrlParser: true,
	useCreateIndex: true, 
	useFindAndModify: false,
	useUnifiedTopology: true
}).then( () => { 
	console.log("DB connections succesfully")
}) 

const userRouter = require("./routers/user.router");
const bookRouter  = require("./routers/book.router");
const trancationRouter = require("./routers/transcaction.router");
const authRouter = require("./routers/auth.router");
const profileRouter = require("./routers/profile.router");
const middlewareSession = require("./middlewares/session.middleware");
const middlewareUser = require("./middlewares/auth.middleware");
const getCountItem  = require("./utilis/book.utilis");
const checkoutRouter = require("./routers/checkout.router");
const signInApiRouter = require("./api/router/signin.router");
const trancationApiRouter = require("./api/router/trancation.router");
const bookApiRouter = require("./api/router/book.router");
const Books = require("./models/book.model");
const ownShopRouter = require("./routers/ownshop.router");
const app = express();
app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(process.env.SECRET_KEY))
app.use(middlewareSession);


app.get("/",async (req,res) => {
	try{
		res.render("index")
	}catch(err) {
		console.log(err)
	}
})
app
   .use("/api",signInApiRouter)

app
	.use("/api",trancationApiRouter)
app
	.use("/api",bookApiRouter)
app.	
	use("/users",
		express.static('public'),
	middlewareUser.requiredAuth,
	middlewareUser.isAdmin,
	userRouter);
app.
	use("/books",
	bookRouter);
app.
	use("/trancation",
	middlewareUser.requiredAuth,
	trancationRouter);
app.
	use("/auth",
	authRouter)
app.
	use("/profile",
		express.static('public'),
		middlewareUser.requiredAuth,
		profileRouter
		) 
app.
	use("/checkout",checkoutRouter)
app.
	use("/shop",
		middlewareUser.requiredAuth,
		express.static('public'),
		ownShopRouter)
app.listen(process.env.PORT ,(req,res)=> {
	console.log("Server is Runing on PORT: ",process.env.PORT)
})
 