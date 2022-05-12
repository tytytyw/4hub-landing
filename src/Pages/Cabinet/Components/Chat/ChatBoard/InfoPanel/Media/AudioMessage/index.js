import React from "react";
import styles from "./AudioMessage.module.sass";
import { useSelector } from "react-redux";
import CustomChatItem from "../../../../CustomChatItem";
import { imageSrc, SIZE_SMALL } from "../../../../../../../../generalComponents/globalVariables";
import PropTypes from "prop-types";
import VoiceMessagePlayer from "../../../Message/VoiceMessagePlayer";

const AudioMessage = ({ messageInfo }) => {
  const userId = useSelector((state) => state.Cabinet.chat.userId);
  const userInfo = useSelector((state) => state.user.userInfo);
  const id_company = useSelector((state) => state.user.id_company);
  const contactList = useSelector((state) =>
    id_company ? state.Cabinet.companyContactList : state.Cabinet.contactList
  );
  const sender =
    messageInfo.id_user === userId
      ? {
          name: userInfo.name ?? userInfo.fname,
          sname: userInfo.sname ?? "",
          is_online: false,
          avatar: userInfo.icon[0]
        }
      : contactList.find((contact) => contact.id_real_user === messageInfo.id_user);
  return (
    <div className={styles.wrapper}>
      <CustomChatItem
        chatItem={sender}
        disableActions={true}
        avatar={sender.avatar || `${imageSrc}assets/PrivateCabinet/profile-noPhoto.svg`}
        title={`${sender.sname} ${sender.name}`}
      />
      <div className={styles.playerWrapper}>
        <VoiceMessagePlayer src={messageInfo.link} histogramData={messageInfo.histogramData} size={SIZE_SMALL} />
      </div>
    </div>
  );
};

export default AudioMessage;

AudioMessage.propTypes = {
  messageInfo: PropTypes.exact({
    error: PropTypes.number,
    fid: PropTypes.string.isRequired,
    histogramData: PropTypes.arrayOf(PropTypes.number),
    id: PropTypes.string,
    id_user: PropTypes.string.isRequired,
    kind: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    size: PropTypes.number,
    tmp_name: PropTypes.string,
    type: PropTypes.string
  })
};
