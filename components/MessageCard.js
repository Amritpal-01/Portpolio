/** @format */

import React from "react";

const MessageCard = ({name , message , email}) => {
  return (
    <div className="w-full my-5">
      <div className="w-4xl min-h-20 p-6 mx-auto glass-leaf-r">
        <h2 className="text-2xl font-bold mb-6 gradient-text">
          {" "}
          <span className="text-white text-xl"> Sent by :</span> {name}
        </h2>
        <p>
          {message}
        </p>
        <h2 className="text-xl font-bold my-5 text-center gradient-text">
          {" "}
          <span className="text-white text-lg"> Email :</span> {email}
        </h2>
      </div>
    </div>
  );
};

export default MessageCard;
