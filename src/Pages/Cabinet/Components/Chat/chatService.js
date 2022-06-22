import api from "../../../../api";
import { checkResponseStatus } from "../../../../generalComponents/generalHelpers";

export async function clearAllChatMessages(uid, contact) {
  return api
    .get("/ajax/chat_message_del_all.php", {
      params: {
        uid,
        id_user_to: contact.id_real_user,
        is_all: 1
      }
    })
    .then((res) => checkResponseStatus(res.data.ok));
}
