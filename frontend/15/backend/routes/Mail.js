const path = require("path");

const express = require("express");

const router = express.Router();

const mailController = require("../controllers/mailController");
const authentication = require("../middleware/authentication");

router.post("/send-mail", authentication, mailController.postSendMail);

router.get("/fetch-all-mails", authentication, mailController.getFetchMails);

router.get("/get-mail-by-id", authentication, mailController.getFetchMailById);

router.delete("/delete-mail", authentication, mailController.deleteMail);

router.get("/fetch-user-mails", authentication, mailController.getFetchUserMails);

module.exports = router;
