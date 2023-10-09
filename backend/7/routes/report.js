const path = require('path');

const express = require('express');

const reportController = require('../controllers/report');

const authenticationMiddleware = require('../middleware/authentication');

const router = express.Router();

router.get('/get-all-reports',authenticationMiddleware,reportController.getAllReports)

router.get('/upload-csv',authenticationMiddleware,reportController.uploadCSV)

router.get('/get-recently-downloaded',authenticationMiddleware,reportController.getAllDownloads)

router.get('/recently-downloaded',reportController.getDownloadPage)


module.exports = router