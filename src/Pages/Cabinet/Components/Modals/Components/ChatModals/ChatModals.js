import React from "react";
import { CHAT_CALLROOM } from "../../../../../../generalComponents/globalVariables";
import CallRoom from "./CallRoom/CallRoom";
import { useSelector } from "react-redux";

function ChatModals() {
  const callRoom = useSelector((s) => s.Cabinet.chat.callRoom);

  return <>{callRoom.state !== CHAT_CALLROOM.NO_CALL ? <CallRoom /> : null}</>;
}

export default ChatModals;
