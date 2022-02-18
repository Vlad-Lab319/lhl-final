import classNames from "classnames";
import { useEffect, useRef } from "react";
import "./MessageList.scss";
import MessageListItem from "./MessageListItem";

const MessageList = (props) => {
  const { messageList, channel } = props;
  const messageClass = classNames();

  const messages = messageList.map((message) => {
    return (
      <MessageListItem
        key={message.id}
        id={message.id}
        content={message.message}
        time={message.created_at}
        name={message.user.name}
        avatar={message.user.avatar}
      />
    );
  });

  // ----- Handle auto scroll behaviour ------
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [channel, messages]);
  // -----------------------------------------

  return (
    <section>
      <li className="message-container">
        {messages}
        <ul ref={messagesEndRef} />
      </li>
    </section>
  );
};

export default MessageList;
