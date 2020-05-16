const cloudinary = require('cloudinary').v2;
const Users = require("../models/user.model");
cloudinary.config({ 
  cloud_name: 'cownut', 
  api_key: '155544378361913', 
  api_secret: process.env.SECRET_KEY_CLOUDINARY, 
});
const bcrypt = require('bcrypt');
const saltRounds = process.env.MY_SLAT_ROUND_PASSWORD *1;
const db = require("../db");
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.requiredAuth = async (req,res,next) => {
	try{
		if(!req.signedCookies.userId) {
			res.redirect("/auth");
			return;
		}
		let idUser = await Users.findById(req.signedCookies.userId,(err,adventure) => {
			console.log(err)
		})
		if(!idUser){
			res.redirect("/auth");
			return;
		}
		res.locals.user = idUser.id;
		next();
	} catch(err) {
		console.log(err)
	}
}

exports.verifyUser = async (req,res,next) => {
	let{email,name,password} = req.body;
	let userName = await Users.findOne({email: email});
	if(!userName) {
		res.render("authentication/signin",{
			errors: [
				"User does not exits"
			]
		})
		return;
	}
	if(userName.name !== name) {
		res.render("authentication/signin",{
			errors: [
				"User does not exits"
			]
		})
		return;
	}
	let hash = userName.password;
	await bcrypt.compare(password, hash, async function(err, result) {
			let errors = ["Wrong password !"];
			let count = userName.isPassword
			if(count >=4) {
				result = false;
				const msg = {
				  to: `${email}`,
				  from: `${process.env.MY_EMAIL_HOST}`,
				  subject: 'SECURITY',
				  text: 'Some one try hack your password',
				  html: '<strong>BE CAREfully</strong>',
				};
				sgMail.send(msg);
				errors[0] = "You have entered too many times";
				res.render("authentication/signin",{
						errors,
				})
				return;
			}else{
				   if(result) {
	   				res.cookie('userId', userName.id,{
	   					signed:true
	   				})
	   				await Users.findByIdAndUpdate(userName.id,{isPassword: 0});
	   				res.locals.user = {name:name}
	   				next();
	   			}else{
	   				await Users.findByIdAndUpdate(userName.id,{isPassword: count + 1 });
	   				res.render("authentication/signin",{
						errors,
					})
					return;
	   			}
			}	
	});
}

exports.isAdmin = async (req,res,next) => {
	let idUser  = req.signedCookies.userId;
	let {name,isAdmin} = await Users.findById(idUser);
	if(!isAdmin) {		
		res.redirect("/trancation");
		return; 
	}
	res.locals.admin = isAdmin;
	next();
}

exports.verifyUserSignUp = async (req,res,next) => {
	try{
		const {name,password,confirmPassword,email} = req.body;
		let errors = [];
		// VERIFY_USER_SIGNUP
		if(password !== confirmPassword) {
			errors.push("Don't match password. Please try again");
			
		}
		let isUser = await Users.findOne({name:name});
		if(isUser) {
			errors.push("Users have exits. Please try another nick name!");
		}
		let isEmail = await Users.findOne({email: email});
		if(isEmail) {
			errors.push("Users have exits. Please try another nick name!");
		}
		if(errors.length) {
			res.render('authentication/signup',{
				errors,
			})
			return;  
		}
		let avatarUrl = undefined;
		let avatarPath = undefined
		if(req.file) {
			const {file:{path: avatar}} = req;
			await cloudinary.uploader.upload(avatar,(err, result) => {
	   				avatarUrl = result.url;
	   			});
			avatarPath = avatar.split("\\").slice(1).join('/')
		}

		//SECURITY Create Security PassWord AND STORE IN DATA
		await bcrypt.hash(password, saltRounds, async function(err, hash) {
			try{
	   			 req.body.password = hash;
	   			 let newUserSignUp =  Object.assign({},{
	   			 		isAdmin:false,
	   			 		avatarUrl,
	   			 		avatarPath,
						isPassword:0,
						name,
						password: req.body.password,
						email});
	   			let userNew = await new Users(newUserSignUp).save();
	   			if(!avatarPath) {
	   				res.cookie('userId', userNew.id,{
		   					signed:true
		   				})
		   			res.locals.user = {name: name};
		   			next();
		   			return;
	   			}
	   			
	   			 res.cookie('userId', userNew.id,{
		   					signed:true
		   				})
	   			 res.locals.user = {name: name};
	   			 next();
			} catch (err) {
				console.log(err);
				res.render("errors")
			}
		});
	} catch(err) {
		console.log(err);
		res.render("errors")
	}
}