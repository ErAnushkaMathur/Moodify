const songs = require("../data/songs.data");

async function getSongsByMood(req, res) {
    const mood = req.params.mood.toLowerCase();
    const moodData = songs[mood];

    if (!moodData || moodData.tracks.length === 0) {
        return res.status(404).json({ message: "No songs found for this mood" });
    }

    const baseUrl = `${req.protocol}://${req.get("host")}`;

    const coverUrl = `${baseUrl}/songs/${moodData.cover}`;

    const songList = moodData.tracks.map((track) => ({
        title: track.title,
        artist: track.artist,
        url: `${baseUrl}/songs/${track.file}`,
        cover: coverUrl,
    }));

    res.status(200).json({ mood, songs: songList });
}

module.exports = { getSongsByMood };