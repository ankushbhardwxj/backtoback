import config from "../config";
const courier = config.getCourierClient();

export async function sendMail(
  recipients: Array<{ email: string; name?: string }>,
  subject: string,
  body: string,
  _attachments?: Array<string>
) {
  console.log(recipients);
  const courierMsgObj: any = {
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
  console.log(JSON.stringify(courierMsgObj, null, 4));
  const res = await courier.send(courierMsgObj);
  return res;
}

export async function sendSMS(
  recipients: Array<{ name?: string; phone_number?: string }>,
  title: string,
  body: string
) {
  const courierMsgObj: any = {
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
