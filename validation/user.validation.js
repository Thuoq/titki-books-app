exports.validationUser = (req,res,next) => {
	let query = {...req.body};
	if(query.name.length > 30 ) {
		res.render("users/createUser",query);
		return;
	}
	next();
}