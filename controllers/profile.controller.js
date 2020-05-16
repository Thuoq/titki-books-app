const cloudinary = require('cloudinary').v2;
const Users = require("../models/user.model");
const Trancations = require("../models/trancation.model");
cloudinary.config({ 
  cloud_name: 'cownut', 
  api_key: '155544378361913', 
  api_secret: process.env.SECRET_KEY_CLOUDINARY, 
});
exports.indexProfile = async (req,res)=> {
		let {userId} = req.signedCookies;
		let inFormationUser = await Users.findById(userId);
		res.render("profile/profile",{
			inFormationUser,
		srcImg: inFormationUser.avatarUrl,
		user: inFormationUser
	})
} 

exports.postEditProfile = async (req,res) => {
	let {userId} = req.signedCookies;
	const{email, name } = req.body;
	let inFormationUser = await Users.findById(userId);
	inFormationUser.name = name
	inFormationUser.email = email
	await Trancations.find({idUser: userId}).updateMany({name:name,email:email })
	if(!req.file){
		await Users.findByIdAndUpdate(userId,{email,name})
			res.render("profile/profile",{
			inFormationUser,
			sucess: true
		})
			return;
		
	}else{
		let {file:{path: avatar}} = req;
		let avatarUrl  = undefined;
		let avatarPath = undefined;
		await cloudinary.uploader.upload(avatar,(err, result) => {
	   				avatarUrl = result.url;
	   				avatarPath = avatar.split("\\").slice(1).join('/');
	   	});

		
		inFormationUser.avatarUrl = avatarUrl;
		await Users.findByIdAndUpdate(userId,{name,email,avatarUrl,avatarPath})
			res.render("profile/profile",{
			inFormationUser,
			srcImg: avatarUrl,
			sucess: true,
			user: inFormationUser
		})
		return;
	}

}