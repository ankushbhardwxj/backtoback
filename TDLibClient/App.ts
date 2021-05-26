import { Airgram, ChatListUnion } from "@airgram/web";
import { Auth } from "airgram/components/Auth"; // We borrow the component only for demonstration purposes.
import {
  apiHash,
  apiId,
  jsLogVerbosityLevel,
  logVerbosityLevel,
} from "./config";

// logout action
const logOutBtn: any = document.getElementById("logout");
logOutBtn.onclick = () => {
  airgram.api
    .logOut()
    .then((r) => console.log(r, "Logged out successfully"))
    .catch((err) => console.log("Error", err));
};

// send message action
const sendMessageBtn: any = document.getElementById("send");
sendMessageBtn.onclick = () => {
  const fullName = (<HTMLInputElement>document.getElementById("fullName"))
    ?.value as any;
  const message = (<HTMLInputElement>document.getElementById("message"))
    ?.value as any;
  const [firstName, lastName] = fullName.split(" ");
  sendMessage(message, { firstName, lastName });
};

// get chats action
const getChatsBtn: any = document.getElementById("fetchChatBtn");
getChatsBtn.onclick = () => {
  const fullName = (<HTMLInputElement>document.getElementById("chatName"))
    ?.value as any;
  const [firstName, lastName] = fullName.split(" ");
  getChatHistory({ firstName, lastName });
};

const airgram = new Airgram({
  apiId,
  apiHash,
  jsLogVerbosityLevel,
  logVerbosityLevel,
});

airgram.use(
  new Auth({
    code: () => window.prompt("Please enter the secret code:") || "",
    phoneNumber: () => window.prompt("Please enter your phone number:") || "",
    password: () => window.prompt("Please enter your password:") || "",
  })
);

airgram.api
  .getContacts()
  .then((res) => {
    console.log("CONTACTS:", res);
  })
  .catch((err) => console.log(err));

type contact = {
  firstName: string;
  lastName: string;
};

type anotherContactObj = {
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
};

const getChats = async (chatList: ChatListUnion) => {
  const offsetOrder = "9223372036854775807";
  const offsetChatId = 0;
  let list = [] as any;
  await airgram.api
    .getChats({
      chatList,
      offsetChatId,
      offsetOrder,
      limit: 30,
    })
    .then(({ response }) => {
      let { chatIds } = response as any;
      list = chatIds;
      return chatIds;
    })
    .catch((err) => console.log(err));

  return list;
};

const sendActualTextMsg = async (id: number, textMsg: string) => {
  // Telegram: 777000
  await airgram.api
    .sendMessage({
      chatId: id,
      messageThreadId: 0,
      replyToMessageId: 0,
      inputMessageContent: {
        _: "inputMessageText",
        text: { _: "formattedText", text: textMsg },
      },
    })
    .then((r) => console.log("SENT", r))
    .catch((e) => console.log("ERROR", e));
};

const getProperFullName = (firstName: string, lastName: string) => {
  let fullName: string = "";
  if (firstName !== undefined && lastName !== undefined)
    fullName = firstName + " " + lastName;
  else if (lastName == undefined) fullName = firstName;
  return fullName;
};

// gets the chat Id and then sends message
const getChatId = async (
  chatIdsList: any,
  contactObj: contact,
  textMsg: string
) => {
  let { firstName, lastName } = contactObj;
  let fullName: string = getProperFullName(firstName, lastName);
  await chatIdsList.forEach(async (chatId: number) => {
    await airgram.api
      .getChat({ chatId: chatId })
      .then(({ response }) => {
        let { title, id } = response as any;
        if (title.startsWith(fullName)) {
          sendActualTextMsg(id, textMsg);
          return id;
        }
      })
      .catch((e) => console.log(e));
  });
};

// get chat history
const getChatHistory = async (contactObj: contact) => {
  const list: ChatListUnion = { _: "chatListMain" };
  const chatIdsList = await getChats(list);
  let { firstName, lastName } = contactObj;
  let fullName: string = getProperFullName(firstName, lastName);
  await chatIdsList.forEach(async (chatId: number) => {
    await airgram.api
      .getChat({ chatId: chatId })
      .then(async ({ response }) => {
        let { title, id } = response as any;
        if (title.startsWith(fullName)) {
          await airgram.api
            .getChatHistory({
              chatId: id,
              fromMessageId: 1,
              offset: -99,
              limit: 100,
              onlyLocal: false,
            })
            .then(({ response }) => {
              let { messages } = response as any;
              messages.forEach((msg: any) => {
                let { isOutgoing } = msg as any;
                if (
                  msg.content !== undefined &&
                  msg.content.text !== undefined
                ) {
                  let msgText = `${isOutgoing ? "YOU" : firstName} : ${
                    msg.content.text.text
                  }`;
                  addMessageToDOM(msgText);
                }
              });
            })
            .catch((err) => console.log("ERROR", err));
        }
      })
      .catch((e) => console.log(e));
  });
};

const sendMessage = async (textMsg: string, contactObj: contact) => {
  const list: ChatListUnion = { _: "chatListMain" };
  let chatIdsList = await getChats(list);
  await getChatId(chatIdsList, contactObj, textMsg);
};

const addContactsToDOM = (str: string) => {
  let list = document.getElementById("contacts") as HTMLElement;
  let newItem = document.createElement("li") as HTMLLIElement;
  newItem.textContent = str;
  list.appendChild(newItem);
};

const addMessageToDOM = (str: string) => {
  let list = document.getElementById("chatMessages") as HTMLElement;
  let newItem = document.createElement("li") as HTMLElement;
  newItem.textContent = str;
  list.appendChild(newItem);
};

airgram.use(async (ctx, next) => {
  if ("request" in ctx) {
    //console.log("🚀 [Airgram Request]:", ctx.request);
  } else if (ctx.update) {
    //   console.log("🚀 [Airgram Update]:", ctx.update);
    if (ctx.update._ === "updateUser") {
      let contact = ctx.update.user as any;
      let contactObj: anotherContactObj = {
        id: contact?.id,
        firstName: contact?.firstName,
        lastName: contact?.lastName,
        phoneNumber: contact?.phoneNumber,
      };
      // get the text message
      /*
      let textMessage = "A test message.";
      sendMessage(textMessage, contactObj);*/

      if (contactObj.phoneNumber !== "") {
        let contactString: string = `${contactObj.firstName} ${contactObj.lastName}:
        +${contactObj.phoneNumber}`;
        addContactsToDOM(contactString);
      }
    }
  }
  await next();
  if ("request" in ctx) {
    //console.log("🚀 [Airgram Response]:", ctx.request.method, ctx.response);
  }
});

export { airgram };
