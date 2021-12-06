import React, { useState } from "react";
// import { useSelector } from "react-redux";
import styles from "./Contacts.module.sass";
import ContactList from "./ContactList/ContactList";

const Contacts = () => {
	// const contacts = useSelector(state => state.Cabinet.companyContactList)
    const [selectedItem, setSelectedItem] = useState(null);

	const data = [
		{
			id: "54",
			name: "Ravshan ",
			tel: ["+38(065) 123 65 44", "+38(073) 656 56 25"],
			email: ["ravshandavlatov@gmail.com"],
			id_user: "60",
			soc: [
				{ type: "twitter", link: "dgb" },
				{ type: "linkedin", link: "fgbfgb" },
				{ type: "facebook", link: "fghfg" },
				{ type: "skype", link: "gbfgf" },
				{ type: "instagram", link: "fgbfg" },
				{ type: "vk", link: "gfbnfgbf" },
			],
			sname: "Davlatov",
			prim: "\u0414\u0438\u0437\u0430\u0439\u043d-\u043f\u0440\u043e\u0435\u043a\u0442. Deadline: 07.08.2021",
			mes: [
				{ type: "viber", link: "+38(073) 333 97 73" },
				{ type: "whatsapp", link: "+38(056) 162 15 52" },
				{ type: "telegram", link: "+42(626) 562 62 32" },
				{ type: "skype", link: "+45(262) 652 35 55" },
				{ type: "slack", link: "+45(215) 552 63 55" },
			],
			icon: [
				"",
			],
		},
        {
			id: "1",
			name: "Alina",
			tel: ["+38(065) 123 55 33", "+38(073) 656 56 55"],
			email: ["ravshandavlatov@gmail.com"],
			id_user: "60",
			soc: [
				{ type: "twitter", link: "twitterlink" },
				{ type: "linkedin", link: "linkedinlink" },
				{ type: "facebook", link: "fgfacebookhfglink" },
				{ type: "skype", link: "skypelink" },
				{ type: "instagram", link: "instagramlink" },
				{ type: "vk", link: "vklink" },
			],
			sname: "Surname",
			mes: [
				{ type: "viber", link: "+38(073) 333 97 73" },
				{ type: "whatsapp", link: "+38(056) 162 15 52" },
				{ type: "telegram", link: "+42(626) 562 62 32" },
				{ type: "skype", link: "+45(262) 652 35 55" },
				{ type: "slack", link: "+45(215) 552 63 55" },
			],
			icon: [
				"",
			],
		},
        {
			id: "2",
			name: "Alina",
			tel: ["+38(065) 123 55 33", "+38(073) 656 56 55"],
			email: ["ravshandavlatov@gmail.com"],
			id_user: "60",
			soc: [
				{ type: "twitter", link: "twitterlink" },
				{ type: "linkedin", link: "linkedinlink" },
				{ type: "facebook", link: "fgfacebookhfglink" },
				{ type: "skype", link: "skypelink" },
				{ type: "instagram", link: "instagramlink" },
				{ type: "vk", link: "vklink" },
			],
			sname: "Surname",
			mes: [
				{ type: "viber", link: "+38(073) 333 97 73" },
				{ type: "whatsapp", link: "+38(056) 162 15 52" },
				{ type: "telegram", link: "+42(626) 562 62 32" },
				{ type: "skype", link: "+45(262) 652 35 55" },
				{ type: "slack", link: "+45(215) 552 63 55" },
			],
			icon: [
				"",
			],
		},
        {id: "3",name: "Alina",id_user: "57",sname: "Surname"},
        {id: "4",name: "Boris",id_user: "57",sname: "Borisovic"},
        {id: "5",name: "Name",id_user: "57",sname: "Surname"},
        {id: "6",name: "Mame",id_user: "57",sname: "Surname"},
        {id: "7",name: "Name",id_user: "57",sname: "Surname"},
        {id: "8",name: "Name",id_user: "57",sname: "Surname"},
        {id: "9",name: "Plina",id_user: "57",sname: "Surname"},
        {id: "11",name: "Polina",id_user: "57",sname: "Surname"},
        {id: "12",name: "PAlina",id_user: "57",sname: "Surname"},
        {id: "13",name: "PAlino",id_user: "57",sname: "Surname"},
        {id: "14",name: "Wlina",id_user: "57",sname: "Surname"},
        {id: "15",name: "Mlina",id_user: "57",sname: "Surname"},
        {id: "16",name: "Nlina",id_user: "57",sname: "Surname"},
        {id: "17",name: "Qalina",id_user: "57",sname: "Surname"},
        {id: "18",name: "Alina",id_user: "57",sname: "Surname"},
        
        
	];
    //TODO: sort api answer
    data.sort((a,b) => {
        return a.name === b.name ?  0 : a.name < b.name ? -1 : 1
    })

	return (
		<div className={styles.wrapper}>
			<ContactList data={data} selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
            <div>

            </div>
		</div>
	);
};

export default Contacts;
