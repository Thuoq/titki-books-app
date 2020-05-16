const Trancations = require("../../models/trancation.model");
exports.getTrancations = async (req,res) => {
	const trancations = await Trancations.find();
	res.status(200).json(trancations)
}