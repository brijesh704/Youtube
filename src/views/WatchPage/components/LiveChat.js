import React, { useEffect, useState } from "react";
import ChatMessage from "./ChatMessage";
import { msg, namegenerator } from "../../../helper/helper";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../../../features/chatSlice";
import { IoIosSend } from "react-icons/io";

function LiveChat() {
  const [text, SetText] = useState("");
  const dispatch = useDispatch();

  const chatMessages = useSelector((store) => store.chat.messages);

  useEffect(() => {
    const i = setInterval(() => {
      dispatch(
        addMessage({
          name: namegenerator(),
          msg: msg(20) + " 🚀",
        })
      );
    }, 2500);

    return () => clearInterval(i);
  }, []);

  return (
    <>
      <div className="w-full h-[600px] ml-2 p-2 border border-black bg-slate-100 rounded-lg overflow-y-scroll flex flex-col-reverse">
        <div>
          {chatMessages.map((c, i) => (
            <ChatMessage key={i} name={c.name} message={c.msg} />
          ))}
        </div>
      </div>
      <div className=" flex items-center p-2 m-2 border bg-gray-100 w-full rounded-lg">
        <form
          className="flex items-center justify-around w-full"
          onSubmit={(e) => {
            e.preventDefault();
            dispatch(addMessage({ name: "brijesh", msg: text + " 🚀" }));
            SetText("");
          }}
        >
          <input
            value={text}
            onChange={(e) => SetText(e.target.value)}
            type="text"
            placeholder="Enter your comment here..."
            className="w-[280px]  bg-gray-100 outline-none  cursor-text"
            onFocus={() => {}}
          />
          <button className="align-content-center" type="submit">
            <IoIosSend className="text-3xl text-blue-500 ml-4" />
          </button>
        </form>
      </div>
    </>
  );
}

export default LiveChat;
