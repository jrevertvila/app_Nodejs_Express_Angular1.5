var router = require('express').Router();

router.use('/api', require('./api'));

router.use('/test', require('./test'));

router.use('/metrics', require('./metrics'));

module.exports = router;
