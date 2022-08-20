import { ICourierSendMessageResponse } from "@trycourier/courier/lib/types";
import { Router, Request, Response } from "express";
import { sendMail, sendSMS } from "../courier";

const router = Router();

router.post("/send-mail", async (req: Request, res: Response) => {
  try {
    const { recipients, subject, body, attachments } = req.body;
    const courierResponse: ICourierSendMessageResponse = await sendMail(
      recipients,
      subject,
      body,
      attachments
    );
    if (courierResponse.requestId) {
      res.status(200).json({
        message: "Emails sent successfully",
        msgId: courierResponse.requestId,
      });
      return;
    }
    res.status(500).json({ error: "Failed to send emails. Try again. " });
  } catch (err) {
    res.status(500).json({ error: "Failed to send emails. Try again. " });
  }
});

router.post("/send-sms", async (req: Request, res: Response) => {
  try {
    const { recipients, subject, body } = req.body;
    const courierResponse: ICourierSendMessageResponse = await sendSMS(
      recipients,
      subject,
      body
    );
    if (courierResponse.requestId) {
      res.status(200).json({
        message: "SMS sent successfully",
        msgId: courierResponse.requestId,
      });
      return;
    }
    res.status(500).json({ error: "Failed to send SMS. Try again. " });
  } catch (err) {
    res.status(500).json({ error: "Failed to send SMS. Try again. " });
  }
});

export default router;
