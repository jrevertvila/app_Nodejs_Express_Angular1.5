var router = require('express').Router();

router.use('/fake', require('./fake'));

module.exports = router;
