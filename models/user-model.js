const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    googleId: String,
    twitterId: String,
    facebookId: String,
    githubId: String,
    spotifyId: String,
    thumbnail: String
});

const User = mongoose.model('user', userSchema);

module.exports = User;
