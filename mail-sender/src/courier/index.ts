import {
  ICourierSendParameters,
  ICourierSendMessageParameters,
} from "@trycourier/courier/lib/types";
import config from "../config";
const courier = config.getCourierClient();

type ICourierMsgObject = ICourierSendParameters | ICourierSendMessageParameters;

export async function sendMail(
  recipients: Array<{ email: string; name?: string }>,
  subject: string,
  body: string,
  _attachments?: Array<string>
) {
  const courierMsgObj: ICourierMsgObject = {
    message: {
      to: [
        ...recipients.map((recipient) => ({
          data: { name: recipient.name },
          email: recipient.email,
        })),
      ],
      content: {
        title: subject,
        body: body,
      },
      routing: {
        method: "all",
        channels: ["email"],
      },
    },
  };
  const res = await courier.send(courierMsgObj);
  return res;
}

export async function sendSMS(
  recipients: Array<{ name?: string; phone_number?: string }>,
  title: string,
  body: string
) {
  const courierMsgObj: ICourierMsgObject = {
    message: {
      to: [
        ...recipients.map((recipient) => ({
          data: { name: recipient.name },
          phone_number: recipient.phone_number,
        })),
      ],
      content: {
        title: title,
        body: body,
      },
      routing: {
        method: "all",
        channels: ["sms"],
      },
    },
  };
  const res = await courier.send(courierMsgObj);
  return res;
}
