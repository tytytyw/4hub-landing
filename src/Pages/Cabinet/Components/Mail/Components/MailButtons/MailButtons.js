import React from "react";
import { ANSWEAR_MAIL_PATH, CARD_MAIL_PATH, PREVIEW_MAIL_PATH } from "Store/types";

import { ReactComponent as Spam } from "../../../../../../assets/PrivateCabinet/mail/spam.svg";
import { ReactComponent as Inbox } from "../../../../../../assets/PrivateCabinet/mail/inbox.svg";
import { ReactComponent as Share } from "../../../../../../assets/PrivateCabinet/mail/share.svg";
import { ReactComponent as CartMail } from "../../../../../../assets/PrivateCabinet/mail/cart-mail.svg";
import PropTypes from "prop-types";
import { ReactComponent as Folder } from "../../../../../../assets/PrivateCabinet/mail/folder.svg";
import { ReactComponent as Postpone } from "../../../../../../assets/PrivateCabinet/mail/postpone.svg";
import { ReactComponent as Print } from "../../../../../../assets/PrivateCabinet/mail/print.svg";
import { ReactComponent as Note } from "../../../../../../assets/PrivateCabinet/mail/note.svg";
import { ReactComponent as Pencil } from "../../../../../../assets/PrivateCabinet/mail/pencil.svg";
import { ReactComponent as ClipVertical } from "../../../../../../assets/PrivateCabinet/mail/clip-vertical.svg";
import { ReactComponent as Image } from "../../../../../../assets/PrivateCabinet/mail/image.svg";
import { ReactComponent as Emoji } from "../../../../../../assets/PrivateCabinet/mail/emoji.svg";
import ThreeDots from "generalComponents/ThreeDots/ThreeDots";
import Button from "generalComponents/CustomableButton/CustomableButton";
import { BUTTON_TYPES } from "generalComponents/globalVariables";

function MailButtons({ path }) {
  const renderMailAnswerButtons = () => {
    return (
      <>
        <Button style={BUTTON_TYPES.ICON}>
          <Pencil />
        </Button>
        <Button style={BUTTON_TYPES.ICON}>
          <ClipVertical />
        </Button>
        <Button style={BUTTON_TYPES.ICON}>
          <Image />
        </Button>
        <Button style={BUTTON_TYPES.ICON}>
          <Emoji />
        </Button>
      </>
    );
  };

  const renderCardMailButtons = () => {
    return (
      <>
        <Button style={BUTTON_TYPES.ICON}>
          <Spam />
        </Button>
        <Button style={BUTTON_TYPES.ICON}>
          <Inbox />
        </Button>
        <Button style={BUTTON_TYPES.ICON}>
          <Share />
        </Button>
        <Button style={BUTTON_TYPES.ICON}>
          <CartMail />
        </Button>
      </>
    );
  };

  const renderMailPreviewButtons = () => {
    return (
      <>
        <Button style={BUTTON_TYPES.ICON}>
          <Note />
        </Button>
        <Button style={BUTTON_TYPES.ICON}>
          <Inbox />
        </Button>
        <Button style={BUTTON_TYPES.ICON}>
          <Share />
        </Button>
        <Button style={BUTTON_TYPES.ICON}>
          <Folder />
        </Button>
        <Button style={BUTTON_TYPES.ICON}>
          <Postpone />
        </Button>
        <Button style={BUTTON_TYPES.ICON}>
          <Print />
        </Button>
        <Button style={BUTTON_TYPES.ICON}>
          <Spam />
        </Button>
        <Button style={BUTTON_TYPES.ICON}>
          <CartMail />
        </Button>
        <ThreeDots />
      </>
    );
  };

  return (
    <>
      {path === CARD_MAIL_PATH && renderCardMailButtons()}
      {path === PREVIEW_MAIL_PATH && renderMailPreviewButtons()}
      {path === ANSWEAR_MAIL_PATH && renderMailAnswerButtons()}
    </>
  );
}

export default MailButtons;

MailButtons.propTypes = {
  path: PropTypes.string
};
