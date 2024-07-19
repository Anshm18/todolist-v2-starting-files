const express = require('express');
const router = express.Router();

const controller = require('../controller/controller');

router.get('/',controller.home);

router.post('/',controller.homePost);

router.get('/:new',controller.paramNew);

router.get('/about',controller.about);

router.post('/delete',controller.PostDelete);

module.exports = router;