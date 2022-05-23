import React from "react";
import styles from "./MailButtons.module.sass";
import { ReactComponent as Spam } from "../../../../../assets/PrivateCabinet/mail/spam.svg";
import { ReactComponent as Inbox } from "../../../../../assets/PrivateCabinet/mail/inbox.svg";
import { ReactComponent as Share } from "../../../../../assets/PrivateCabinet/mail/share.svg";
import { ReactComponent as CartMail } from "../../../../../assets/PrivateCabinet/mail/cart-mail.svg";
import PropTypes from "prop-types";
import { ReactComponent as Folder } from "../../../../../assets/PrivateCabinet/mail/folder.svg";
import { ReactComponent as Postpone } from "../../../../../assets/PrivateCabinet/mail/postpone.svg";
import { ReactComponent as Print } from "../../../../../assets/PrivateCabinet/mail/print.svg";
import { ReactComponent as Note } from "../../../../../assets/PrivateCabinet/mail/note.svg";
import { CARD_MAIL, PREVIEW_MAIL } from "Store/types";
import { ReactComponent as ContextToggle } from "../../../../../assets/PrivateCabinet/mail/contextToggle.svg";

function MailButtons({ path }) {
  const buttonWrapper = (ico) => <div className={styles.button}>{ico}</div>;

  const renderCardMailButtons = () => {
    return (
      <>
        {buttonWrapper(<Spam />)}
        {buttonWrapper(<Inbox />)}
        {buttonWrapper(<Share />)}
        {buttonWrapper(<CartMail />)}
      </>
    );
  };

  const renderMailPreviewButtons = () => {
    return (
      <>
        {buttonWrapper(<Note />)}
        {buttonWrapper(<Inbox />)}
        {buttonWrapper(<Share />)}
        {buttonWrapper(<Folder />)}
        {buttonWrapper(<Postpone />)}
        {buttonWrapper(<Print />)}
        {buttonWrapper(<Spam />)}
        {buttonWrapper(<CartMail />)}
        {buttonWrapper(<ContextToggle />)}
      </>
    );
  };

  return (
    <>
      {path === CARD_MAIL && renderCardMailButtons()}
      {path === PREVIEW_MAIL && renderMailPreviewButtons()}
    </>
  );
}

export default MailButtons;

MailButtons.propTypes = {
  path: PropTypes.string
};
