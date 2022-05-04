import React from "react";
import { ReactComponent as ClipboardIcon } from "../../../../assets/PrivateCabinet/project/clipboard.svg";
import { ReactComponent as CoworkingIcon } from "../../../../assets/PrivateCabinet/project/coworking.svg";
import { ReactComponent as LampIcon } from "../../../../assets/PrivateCabinet/project/lamp.svg";
import { ReactComponent as PenIcon } from "../../../../assets/PrivateCabinet/project/pen.svg";
import { ReactComponent as RocketIcon } from "../../../../assets/PrivateCabinet/project/rocket.svg";
import { ReactComponent as SuitcaseIcon } from "../../../../assets/PrivateCabinet/project/suitcase.svg";
import { ReactComponent as ThunderIcon } from "../../../../assets/PrivateCabinet/project/thunder.svg";

export const getIcon = (project) => {
  switch (project.icon) {
    case "clipboard":
      return <ClipboardIcon className={project.id_color} alt="icon" />;
    case "coworking":
      return <CoworkingIcon className={project.id_color} alt="icon" />;
    case "lamp":
      return <LampIcon className={project.id_color} alt="icon" />;
    case "pen":
      return <PenIcon className={project.id_color} alt="icon" />;
    case "rocket":
      return <RocketIcon className={project.id_color} alt="icon" />;
    case "suitcase":
      return <SuitcaseIcon className={project.id_color} alt="icon" />;
    case "thunder":
      return <ThunderIcon className={project.id_color} alt="icon" />;
    default:
      return <ClipboardIcon className={project.id_color} alt="icon" />;
  }
};
