import React, { useState, useRef, useEffect } from "react";
import TextButton from "../../../../../../generalComponents/TextButton";
import Button from "./Button";
import styles from "./Buttons.module.sass";
import { ReactComponent as VideoIcon } from "../../../../../../assets/PrivateCabinet/film.svg";
import { ReactComponent as CameraIcon } from "../../../../../../assets/PrivateCabinet/camera.svg";
import { ReactComponent as MessageIcon } from "../../../../../../assets/PrivateCabinet/chat/message.svg";
import { ReactComponent as PencilIcon } from "../../../../../../assets/PrivateCabinet/chat/pencil.svg";
import { ReactComponent as RotateIcon } from "../../../../../../assets/PrivateCabinet/chat/rotate.svg";
import { ReactComponent as MirrorIcon } from "../../../../../../assets/PrivateCabinet/chat/mirror.svg";
import { ReactComponent as SettingsIcon } from "../../../../../../assets/PrivateCabinet/chat/settings.svg";
import { ReactComponent as CropIcon } from "../../../../../../assets/PrivateCabinet/chat/crop.svg";
import { ReactComponent as CheckIcon } from "../../../../../../assets/PrivateCabinet//check-mark.svg";
import { ducationTimerToString } from "../../../../../../generalComponents/chatHelper";
import { imageSrc } from "../../../../../../generalComponents/globalVariables";
import FilterSettings from "./FilterSettings";
import TextArea from "../../ChatBoard/TextArea";
import classNames from "classnames";
import { useLocales } from "react-localized";
import PropTypes from "prop-types";

const Buttons = ({
  state,
  nullifyAction,
  contentType,
  setContentType,
  onActionBtnHandler,
  isRecording,
  videoRecordStop,
  takePicture,
  ducationTimer,
  setInitialState,
  stream,
  visualEffects,
  setVisualEffects,
  onRotateClick,
  onMirrorClick,
  onSendFile,
  textMessage,
  setTextMessage,
  saveImageChanges,
  cancelImageChanges,
  setOpenCropImage,
  openCropImage
  // setImageFinal
}) => {
  const { __ } = useLocales();
  const [activeOption, setActiveOption] = useState(null);
  const [activeButton, setActiveButton] = useState(null);
  const saveTextButtonRef = useRef();

  const [centralButtons] = useState([
    {
      name: "addText",
      clickCallback: () => setActiveOption("addText"),
      icon: <MessageIcon />,
      subButtons: []
    },
    {
      name: "addСaption",
      clickCallback: () => {
        setActiveOption(prevState =>
          prevState === "addСaption" ? null : "addСaption"
        );
      },
      icon: <PencilIcon strole="none" />
    },
    {
      name: "transformOptions",
      clickCallback: () => setActiveOption("transformOptions"),
      icon: <RotateIcon />,
      subButtons: [
        {
          name: "rotate",
          clickCallback: onRotateClick,
          icon: <RotateIcon />
        },
        {
          name: "mirror",
          clickCallback: onMirrorClick,
          icon: <MirrorIcon />
        },
        {
          name: "crop",
          clickCallback: () => {
            setOpenCropImage(true);
            setActiveButton(activeButton =>
              activeButton === "crop" ? "" : "crop"
            );
          },
          icon: <CropIcon />
        }
      ]
    },
    {
      name: "filterSettings",
      clickCallback: () => {
        setActiveOption(prevState =>
          prevState === "filterSettings" ? null : "filterSettings"
        );
      },
      icon: <SettingsIcon />,
      subButtons: []
    }
  ]);

  const onClickHandler = () => {
    if (contentType === "video") return videoRecordStop();
    if (contentType === "image") return takePicture();
  };

  const onBackButtonhandler = () =>
    activeOption
      ? activeOption === "transformOptions"
        ? cancelImageChanges(() => setActiveOption(null))
        : setActiveOption(null)
      : setInitialState();

  const renderCentralBtns = () => {
    if (isRecording)
      return (
        <Button
          width={64}
          height={34}
          borderRadius="2px"
          childrenColor="white"
          backgroundColor="#EB1F1F"
        >
          {ducationTimerToString(ducationTimer)}
        </Button>
      );
    if (state === "init")
      return (
        <Button
          clickCallback={() =>
            setContentType(state => (state === "image" ? "video" : "image"))
          }
          width={48}
          height={48}
          borderRadius="50%"
          childrenColor="white"
        >
          {contentType === "video" && <CameraIcon />}
          {contentType === "image" && <VideoIcon />}
        </Button>
      );

    if (state === "readyToSend") {
      const buttons =
        centralButtons.filter(btn => btn?.name === activeOption)[0]
          ?.subButtons || centralButtons;
      if (!buttons?.length) return null;

      return buttons.map(btn =>
        contentType === "video" &&
        (btn?.name === "crop" || btn?.name === "addСaption") ? (
          ""
        ) : (
          <Button
            clickCallback={btn.clickCallback}
            width={54}
            height={34}
            borderRadius="2px"
            childrenColor="black"
            backgroundColor="#fff"
            boxShadow="0px 2px 4px #DEDEDE"
            hoverEffect={
              activeButton === "crop" ? activeButton === btn.name : true
            }
            key={btn.name}
            active={btn.name === activeButton}
          >
            {btn.icon}
          </Button>
        )
      );
    }
  };

  const renderRightBtns = () => {
    if (state === "init" && !isRecording)
      return (
        <TextButton
          text={__("Отмена")}
          type="cancel"
          callback={nullifyAction}
          style={{ width: 116, height: 34 }}
        />
      );
    if (activeOption === "addText")
      return (
        <Button
          clickCallback={() => saveTextButtonRef.current?.click()}
          width={38}
          height={38}
          borderRadius="50%"
          childrenColor="white"
          backgroundColor="#4086F1"
        >
          <CheckIcon title={__("Сохранить")} height={14} width={19} />
        </Button>
      );
    if (activeOption === "transformOptions")
      return (
        <Button
          clickCallback={() => {
            saveImageChanges();
            activeButton !== "crop" && setActiveOption(null);
          }}
          width={38}
          height={38}
          borderRadius="50%"
          childrenColor="white"
          backgroundColor="#4086F1"
        >
          <CheckIcon title={__("Сохранить")} height={14} width={19} />
        </Button>
      );
    if (state === "readyToSend")
      return (
        <Button
          clickCallback={onSendFile}
          width={38}
          height={38}
          borderRadius="50%"
          childrenColor="white"
          backgroundColor="#4086F1"
        >
          <img
            alt="upload"
            style={{ transform: "rotate(90deg)", width: 22, height: 22 }}
            src={imageSrc + "assets/PrivateCabinet/arrow.svg"}
          />
        </Button>
      );
  };

  useEffect(() => {
    if (!openCropImage && activeButton) setActiveButton(null);
    if (!activeButton && openCropImage) setOpenCropImage(false);
  }, [openCropImage, activeButton]);

  return (
    <div className={styles.wrapper}>
      {activeOption === "addText" && (
        <div className={classNames(styles.optionsWrapper, styles.textWrapper)}>
          <TextArea
            onAddMessage={setTextMessage}
            initialTextValue={textMessage}
            nullifyAction={() => setActiveOption(null)}
            saveTextButtonRef={saveTextButtonRef}
          />
        </div>
      )}
      {activeOption === "filterSettings" && (
        <div className={styles.optionsWrapper}>
          <FilterSettings
            visualEffects={visualEffects}
            setVisualEffects={setVisualEffects}
          />
        </div>
      )}
      <div className={styles.buttonsWrapper}>
        <div className={styles.leftContainer}>
          {state === "readyToSend" && (
            <Button
              clickCallback={onBackButtonhandler}
              width={38}
              height={38}
              borderRadius="50%"
              childrenColor="white"
              backgroundColor="#EDEDED"
            >
              <img
                alt="back"
                style={{ transform: "translateX(-1px)" }}
                src={imageSrc + "assets/PrivateCabinet/arrow-2.svg"}
              />
            </Button>
          )}
        </div>
        <div className={styles.centerContainer}>
          {state === "init" && stream && (
            <div className={styles.actionButton}>
              <Button
                clickCallback={onClickHandler}
                mouseDownCallback={() =>
                  !isRecording &&
                  contentType === "video" &&
                  onActionBtnHandler()
                }
                width={48}
                height={48}
                borderRadius="50%"
                backgroundColor="#fff"
                isRecording={isRecording}
              >
                {contentType === "image" && <CameraIcon />}
                {contentType === "video" &&
                  (isRecording ? (
                    <div className={styles.square} />
                  ) : (
                    <VideoIcon />
                  ))}
              </Button>
            </div>
          )}
          {renderCentralBtns()}
        </div>
        <div className={styles.rightContainer}>{renderRightBtns()}</div>
      </div>
    </div>
  );
};

export default Buttons;

Buttons.propTypes = {
  state: PropTypes.string,
  nullifyAction: PropTypes.func.isRequired,
  contentType: PropTypes.string.isRequired,
  setContentType: PropTypes.func.isRequired,
  onActionBtnHandler: PropTypes.func.isRequired,
  isRecording: PropTypes.bool,
  videoRecordStop: PropTypes.func.isRequired,
  takePicture: PropTypes.func.isRequired,
  ducationTimer: PropTypes.number,
  setInitialState: PropTypes.func.isRequired,
  stream: PropTypes.object,
  visualEffects: PropTypes.object,
  setVisualEffects: PropTypes.func.isRequired,
  onRotateClick: PropTypes.func.isRequired,
  onMirrorClick: PropTypes.func.isRequired,
  onSendFile: PropTypes.func.isRequired,
  textMessage: PropTypes.string,
  setTextMessage: PropTypes.func.isRequired,
  saveImageChanges: PropTypes.func.isRequired,
  setImageFinal: PropTypes.func.isRequired,
  cancelImageChanges: PropTypes.func.isRequired,
  setOpenCropImage: PropTypes.func.isRequired,
  openCropImage: PropTypes.bool
};
