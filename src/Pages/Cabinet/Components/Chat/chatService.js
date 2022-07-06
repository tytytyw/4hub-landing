import api from "../../../../api";
import { checkResponseStatus } from "../../../../generalComponents/generalHelpers";
import { PHOTO, VIDEO } from "../../../../generalComponents/globalVariables";

export async function clearAllChatMessages(uid, contact, all) {
  return api
    .get("/ajax/chat_message_del_all.php", {
      params: {
        uid,
        id_user_to: contact.id_real_user,
        is_all: all
      }
    })
    .then((res) => checkResponseStatus(res.data.ok));
}

export function checkFilePath(option, subOption) {
  if (subOption?.name === PHOTO || subOption?.name === VIDEO) {
    return subOption?.name;
  }
  return option?.name;
}
