import React from "react";
import PopUp from "../../../../../../../generalComponents/PopUp";
import { useDispatch, useSelector } from "react-redux";
import { setCallRoom } from "../../../../../../../Store/actions/CabinetActions";
import { initialCallRoomState } from "../../../../../../../Store/reducers/Cabinet";
import styles from "./CallRoom.module.sass";
import { useLocales } from "react-localized";
import {
  BUTTON_TYPES,
  CHAT_CALLROOM,
  imageSrc,
  LOCAL_CLIENT
} from "../../../../../../../generalComponents/globalVariables";
import Button from "../../../../../../../generalComponents/CustomableButton/CustomableButton";
import { ReactComponent as AddUserIcon } from "assets/PrivateCabinet/chat/addUser.svg";
import { ReactComponent as VideoIcon } from "assets/PrivateCabinet/film.svg";
import { ReactComponent as HangUpIcon } from "assets/PrivateCabinet/chat/hangUp.svg";
import { ReactComponent as PhoneIcon } from "assets/PrivateCabinet/chat/phone.svg";
import { ReactComponent as RadioIcon } from "assets/PrivateCabinet/radio-3.svg";
import { ReactComponent as PhoneAcceptIcon } from "assets/PrivateCabinet/phone-5.svg";
import { useWebRTC } from "generalComponents/Hooks";

function CallRoom() {
  const { __ } = useLocales();
  const { contacts, socket, user_id, state, icon, callType } = useSelector((s) => s.Cabinet.chat.callRoom);
  const selectedContact = useSelector((s) => s.Cabinet.chat.selectedContact);
  const dispatch = useDispatch();
  const { clients, provideMediaRef, handleNewPeer } = useWebRTC(socket, {
    contacts: contacts,
    from: user_id,
    state,
    callType
  });
  console.log(clients);

  const acceptCall = () => {
    handleNewPeer({ peerID: user_id, createOffer: true });
  };

  //eslint-disable-next-line
  const renderCallOngoing = () => (
    <>
      <div className={styles.backgroundImage} style={{ backgroundImage: `url(${icon})` }} />
      <span className={styles.cross} onClick={closeCallRoom} />
      <div className={styles.receiver}>
        {__("Вызов")} {contacts.length === 1 ? `${selectedContact.name} ${selectedContact.sname}` : ""}
      </div>
      <img className={styles.avatar} src={icon ?? `${imageSrc}/assets/PrivateCabinet/profile-noPhoto.svg`} alt="img" />
      <div className={styles.stopwatch}>00:00:00</div>
      <div className={styles.buttonsPanel}>
        <Button style={BUTTON_TYPES.ROUND_GREY}>
          <AddUserIcon />
        </Button>
        <Button style={BUTTON_TYPES.ROUND_GREY}>
          <VideoIcon className={styles.camaraIcon} />
        </Button>
        <Button style={BUTTON_TYPES.ROUND_GREY}>
          <RadioIcon />
        </Button>
        <Button style={BUTTON_TYPES.ROUND_GREY}>
          &#62;
          <PhoneIcon className={styles.phoneIcon} />
        </Button>
        <Button style={BUTTON_TYPES.ROUND_RED}>
          <HangUpIcon />
        </Button>
      </div>
      {state === CHAT_CALLROOM.VIDEO_CALL ? (
        <video ref={(instance) => provideMediaRef("LOCAL_CLIENT", instance)} autoPlay playsInline muted={true} />
      ) : null}
    </>
  );

  const renderIncomingCall = () => (
    <>
      <div className={styles.backgroundImage} style={{ backgroundImage: `url(${icon})` }} />
      <span className={styles.cross} onClick={closeCallRoom} />
      <div className={styles.receiver}>
        {__("Входящий звонок")} {contacts.length === 1 ? `${contacts.name} ${contacts.sname}` : ""}
      </div>
      <img className={styles.avatar} src={icon ?? `${imageSrc}/assets/PrivateCabinet/profile-noPhoto.svg`} alt="img" />
      <div className={styles.buttonsPanelIncomingCall}>
        <Button style={BUTTON_TYPES.ROUND_GREEN} onClick={acceptCall}>
          <PhoneAcceptIcon className={styles.phoneAcceptIcon} />
        </Button>
        <Button style={BUTTON_TYPES.ROUND_RED}>
          <HangUpIcon />
        </Button>
      </div>
    </>
  );

  const closeCallRoom = () => dispatch(setCallRoom(initialCallRoomState()));
  return (
    <PopUp set={closeCallRoom}>
      <div className={styles.callRoom}>
        {state === CHAT_CALLROOM.INCOMING_CALL ? renderIncomingCall() : renderCallOngoing()}
        {clients.map((clientID, i) => {
          return (
            <div key={i} id={clientID}>
              <video
                ref={(instance) => {
                  provideMediaRef(clientID, instance);
                }}
                autoPlay
                playsInline
                muted={clientID === LOCAL_CLIENT}
              />
            </div>
          );
        })}
      </div>
    </PopUp>
  );
}

export default CallRoom;
