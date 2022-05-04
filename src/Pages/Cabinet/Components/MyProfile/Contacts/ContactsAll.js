import React, { useEffect, useState } from "react";
import styles from "./Contacts.module.sass";

import ContactList from "./ContactList/ContactList";
import ContactsData from "./ContactsData/ContactsData";
import PropTypes from "prop-types";

const ContactsAll = ({ data }) => {
  const [selectedContact, setSelectedContact] = useState(data?.[0]);

  useEffect(() => {
    const newSelectedContact = data?.find(
      (contact) => contact?.id === selectedContact?.id
    );
    newSelectedContact && setSelectedContact(newSelectedContact);
  }, [data]);

  return (
    <>
      <div className={styles.contactList}>
        <ContactList
          data={data}
          selectedItem={selectedContact}
          setSelectedItem={setSelectedContact}
        />
      </div>

      <div className={styles.contactData}>
        <ContactsData
          data={data}
          selectedItem={selectedContact}
          setSelectedItem={setSelectedContact}
        />
      </div>
    </>
  );
};

export default ContactsAll;

ContactsAll.propTypes = {
  data: PropTypes.array,
};

ContactsAll.defaultProps = {
  data: [],
};
