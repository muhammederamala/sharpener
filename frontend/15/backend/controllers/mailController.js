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

exports.getFetchMails = async (req, res) => {
  try {
    const userEmail = req.userEmail;

    const receivedMails = await Mail.find({ recipientEmail: userEmail });

    const unreadCount = receivedMails.filter((mail) => !mail.read).length;

    return res
      .status(200)
      .json({ receivedMails: receivedMails, unreadCount: unreadCount });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getFetchMailById = async (req, res) => {
  try {
    const { id } = req.query;

    const mail = await Mail.findById(id);

    if (!mail) {
      return res.status(404).json({ error: "Mail not found" });
    }

    mail.read = true;
    await mail.save();

    return res.status(200).json({ mail: mail });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.deleteMail = async (req, res, next) => {
  try {
    const { id } = req.query;

    // Using Mongoose's findOneAndDelete to find and delete the mail
    const deletedMail = await Mail.findOneAndDelete({ _id: id });

    if (!deletedMail) {
      return res.status(404).json({ error: "Mail not found" });
    }

    return res.status(204).end();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getFetchUserMails = async (req, res) => {
  try {
    const userEmail = req.userEmail;

    const receivedMails = await Mail.find({ senderEmail: userEmail });

    const unreadCount = receivedMails.filter((mail) => !mail.read).length;

    return res
      .status(200)
      .json({ receivedMails: receivedMails, unreadCount: unreadCount });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};