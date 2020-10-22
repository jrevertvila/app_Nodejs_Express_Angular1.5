var router = require('express').Router();
var faker = require('faker');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Tweet = mongoose.model('Tweet');

faker.locale = 'es';

router.post('/users/:qty', async function (req, res, next) {
    let user;
    let msg = "";

    for (let y = 0; y < req.params.qty; y++) {
        user = new User();
        user.username = faker.internet.userName();
        console.log(user.username);
        user.type = 'client';
        user.provider = 'local';
        user.email = faker.internet.email();
        user.bio = faker.lorem.words();
        user.image = faker.internet.avatar();
        try {
            await user.save();
            msg = "Users inserted";
        } catch (e) {
            msg = e;
        }
        let rand = faker.random.number({ min: 0, max: 3 })
        createTweetsByEmail(rand,user.email,user.provider)
    }
    return res.send({ message: msg })
});

router.post('/tweets/:qty/:email/:type', function (req, res, next) {
    let msg = createTweetsByEmail(req.params.qty,req.params.email,req.params.type);
    return res.send({ message: msg })
});

async function createTweetsByEmail(qty,email,provider){
    let user = await User.findOne({ email: email, provider: provider })
    console.log(user);
    if (!user) { return res.send({ message: 'User not found' }); }
    let tweet;
    for (let x = 0; x < qty; x++) {
        tweet = new Tweet();
        tweet.body = faker.lorem.paragraph();
        tweet.replies = [];
        tweet.author = user;
        tweet.parent = null;
        try {
            await tweet.save();
            msg = "Tweets inserted";
        } catch (e) {
            msg = e;
        }
    }
    return msg;
}







module.exports = router;