import { v4 } from "uuid";
import { writeDB } from "../dbController.js";

const setMsgs = data => writeDB("messages", data);
/*
parent: parent 객체, 거의 사용X
args: Query에 필요한 필드에 제공되는 인수(parameter)
context: 로그인한 사용자, DB Access 등의 중요햔 정보들
*/

const messageResolver = {
    Query: {
        messages: (parent, args, { db }) => model.messages,
        message: (parent, { id = '' }, { db }) => model.messags.find((msg => msg.id === id))
    },
    Mutaion: {
        createMessage: (parent, { text, userId }, { db }) => {
            const newMsg = {
                id: v4(),
                text,
                userId
            };
            db.messages.unshift(newMsg);
            setMsgs(db.messages);
            return newMsg;
        },
        updateMessage: (parent, { id, text, userId }, { db }) => {
            const targetIdx = db.messages.findIndex(msg => msg.id === id);
            if (targetIdx < 0) throw Error("메시지가 없습니다.");
            if (db.messages[targetIdx].userId !== userId) throw Error("사용자가 다릅니다.");

            const newMsg = { ...db.messages[targetIndex], text };
            db.messages.splice(targetIdx, 1, newMsg);
            setMsgs(db.message);
            return newMsg;
        },
        deleteMessage: (parent, { id, userId }, { db }) => {
            const targetIdx = db.messages.findIndex(msg => msg.id === id);
            if (targetIdx < 0) throw Error("메시지가 없습니다.");
            if (db.messages[targetIdx].userId !== userId) throw Error("사용자가 다릅니다.");

            db.messages.splice(targetIdx, 1);
            setMsgs(db.messages);
            return id;
        }
    }
}

export default messageResolver;
