import "../styles/ChatInput.scss";

// TODO: ChatInput needs to post to the database and also update state, checkout the useReducer function in "../hooks/useApplicationDat"

const ChatInput = (props) => {
  return (
    <form action="" className="input-form">
      <input type="text" className="text-field" />
    </form>
  );
};

export default ChatInput;
