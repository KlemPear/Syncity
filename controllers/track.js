const Track = require("../models/Track");
const User = require("../models/User");
const s3 = require("../utils/s3");

module.exports.onGetAllTracks = async (req, res, next) => {
	try {
		const tracks = await Track.find(req.query);
		return res.status(200).json(tracks);
	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
};

module.exports.onGetTrackById = async (req, res, next) => {
	try {
		const track = await Track.findById(req.params.id);
		return res.status(200).json(track);
	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
};

module.exports.onCreateTrack = async (req, res, next) => {
	try {
		const newTrack = new Track(req.body);
		await newTrack.save();
		return res.status(200).json(newTrack);
	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
};

module.exports.onEditTrackById = async (req, res, next) => {
	try {
		const { id } = req.params;
		const track = await Track.findByIdAndUpdate(id, req.body, {
			returnDocument: "after",
		}).populate("author");
		console.log(track.author._id);
		await s3.pruneAudioFilesByUserId(track.author._id);
		return res.status(200).json(track);
	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
};

module.exports.onDeleteTrackById = async (req, res, next) => {
	try {
		const { id } = req.params;
		const deleteTrack = await Track.findByIdAndRemove(id);
		const deletedAudioFile = await s3.deleteFileByKey(
			deleteTrack.audioFile?.key
		);
		return res.status(200).json(deleteTrack);
	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
};
