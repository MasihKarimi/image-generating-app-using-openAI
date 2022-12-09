// this route is responsible for post call to the app

const express = require('express');
const {generateImage} = require('../controllers/openAIController')
const router = express.Router();

router.post('/generate-image', generateImage
);

module.exports = router;