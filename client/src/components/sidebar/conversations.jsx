import React from "react";
import Conversation from "./conversation";
import useGetConversations from "../../hooks/useGetConversations";
import { getRandomEmoji } from "../../utils/emoji";

const Conversations = () => {
  const { loading, conversations } = useGetConversations();

  console.log("conversations", conversations);

  return (
    <div className="py-2 flex flex-col overflow-auto">
      {loading ? (
        <span className="lading loading-spinner mx-auto"></span>
      ) : (
        conversations.map((item, index) => (
          <Conversation key={index} data={item} emoji={getRandomEmoji()}
          lastIdx={index === conversations.length - 1}
          />
        ))
      )}
    </div>
  );
};

export default Conversations;
