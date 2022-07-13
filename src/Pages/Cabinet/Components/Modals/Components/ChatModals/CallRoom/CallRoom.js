import React from "react";
import PopUp from "../../../../../../../generalComponents/PopUp";
import { useDispatch, useSelector } from "react-redux";
import { setCallRoom } from "../../../../../../../Store/actions/CabinetActions";
import { initialCallRoomState } from "../../../../../../../Store/reducers/Cabinet";
import styles from "./CallRoom.module.sass";
import { useLocales } from "react-localized";
import { BUTTON_TYPES, imageSrc } from "../../../../../../../generalComponents/globalVariables";
import Button from "../../../../../../../generalComponents/CustomableButton/CustomableButton";
import { ReactComponent as AddUserIcon } from "assets/PrivateCabinet/chat/addUser.svg";
import { ReactComponent as VideoIcon } from "assets/PrivateCabinet/film.svg";
import { ReactComponent as HangUpIcon } from "assets/PrivateCabinet/chat/hangUp.svg";
import { ReactComponent as PhoneIcon } from "assets/PrivateCabinet/chat/phone.svg";
import { ReactComponent as RadioIcon } from "assets/PrivateCabinet/radio-3.svg";
import { useWebRTC } from "../../../../../../../generalComponents/Hooks";

function CallRoom() {
  const { __ } = useLocales();
  const { contact, socket } = useSelector((s) => s.Cabinet.chat.callRoom);
  const dispatch = useDispatch();
  const { clients, provideMediaRef } = useWebRTC(socket);
  console.log(clients);

  const closeCallRoom = () => dispatch(setCallRoom(initialCallRoomState()));
  return (
    <PopUp set={closeCallRoom}>
      <div className={styles.callRoom}>
        <div className={styles.backgroundImage} style={{ backgroundImage: `url(${contact?.icon[0]})` }} />
        <span className={styles.cross} onClick={closeCallRoom} />
        <div className={styles.receiver}>
          {__("Вызов")} {contact.name} {contact.sname}
        </div>
        <img
          className={styles.avatar}
          src={contact?.icon[0] ?? `${imageSrc}/assets/PrivateCabinet/profile-noPhoto.svg`}
          alt="img"
        />
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
        <video ref={(instance) => provideMediaRef("LOCAL_CLIENT", instance)} autoPlay playsInline muted={true} />
      </div>
    </PopUp>
  );
}

export default CallRoom;
