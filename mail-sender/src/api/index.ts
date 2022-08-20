import { Router, Request, Response } from "express";
import { sendMail, sendSMS } from "src/courier";

const router = Router();

router.post("/send-mail", async (req: Request, res: Response) => {
  try {
    const recipients = req.body.recipients;
    const subject = req.body.subject;
    const body = req.body.emailBody;
    const attachments = req.body.attachments;
    const courierResponse = await sendMail(
      recipients,
      subject,
      body,
      attachments
    );
    if (courierResponse.requestId) {
      res.status(200).json({ message: "Emails sent successfully" });
      return;
    }
    res.status(500).json({ error: "Failed to send emails. Try again. " });
  } catch (err) {
    res.status(500).json({ error: "Failed to send emails. Try again. " });
  }
});

router.post("/send-sms", async (req: Request, res: Response) => {
  try {
    const recipients = req.body.recipients;
    const subject = req.body.subject;
    const body = req.body.emailBody;
    const courierResponse = await sendSMS(recipients, subject, body);
    if (courierResponse.requestId) {
      res.status(200).json({ message: "SMS sent successfully" });
      return;
    }
    res.status(500).json({ error: "Failed to send SMS. Try again. " });
  } catch (err) {
    res.status(500).json({ error: "Failed to send SMS. Try again. " });
  }
});

export default router;
