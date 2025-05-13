/** @format */

import React from "react";

const MessageCard = ({ name, message, email, notify, getMessages }) => {
  let deleteMessage = async () => {
    try {
      let res = await fetch("./api/deleteMessage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: message }),
      });
      let resp = await res.json();
      if(resp.status = 200){
        notify("message deleted!")
        getMessages();
      }else{
        notify("message could not be deleted!")
      }
    } catch {
      notify("internal server error!!!");
    }
  };

  return (
    <div className="w-full my-5 max-[640px]:my-2">
      <div className="mx-[10%] min-h-20 p-6 max-[640px]:p-3 max-[640px]:mx-2 glass-leaf-r">
        <h2 className="text-2xl max-[640px]:text-sm font-bold mb-6 max-[640px]:mb-2 gradient-text">
          {" "}
          <span className="text-white font-medium text-xl max-[640px]:text-sm">
            {" "}
            Sent by :
          </span>{" "}
          {name}
        </h2>
        <p className="max-[640px]:text-[12px]">{message}</p>
        <div className="flex flex-row justify-between mt-4 ">
          <button
            onClick={() => {
              deleteMessage();
            }}
            className="text-[12px] bg-amber-700 h-6 w-15 rounded-xl my-auto min-[640px]:text-lg min-[640px]:h-10 min-[640px]:w-24 hover:scale-110 transition-all"
          >
            Delete
          </button>
          <h2 className="text-xl max-[640px]:text-sm font-bold mt-5 max-[640px]:mt-3 text-center gradient-text">
            {" "}
            <span className="text-white text-lg max-[640px]:font-medium max-[640px]:text-sm">
              {" "}
              Email :
            </span>{" "}
            {email}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default MessageCard;
