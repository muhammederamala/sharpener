const Mail = require("../models/Mail");

exports.postSendMail = async (req, res) => {
  try {
    const { recipientEmail, subject, body } = req.body;
    const senderEmail = req.userEmail;

    const newMail = new Mail({
      senderEmail,
      recipientEmail,
      subject,
      body: JSON.stringify(body.blocks[0].text),
    });

    await newMail.save();

    return res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// GET /api/fetch-mails/:userEmail
exports.getFetchMails = async (req, res) => {
  try {
    const userEmail = req.params.userEmail;

    // Find all emails where the user is a recipient
    const receivedMails = await Mail.find({ receiverEmail: userEmail });

    return res.status(200).json(receivedMails);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getFetchMailById = async (req, res) => {
  try {
    const mailId = req.params.mailId;

    // Find the email by its ID
    const mail = await Mail.findById(mailId);

    if (!mail) {
      return res.status(404).json({ error: "Mail not found" });
    }

    return res.status(200).json(mail);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
