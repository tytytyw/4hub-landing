import React, { useState } from "react";

import styles from "./Accordion.module.sass";
import classnames from "classnames";
import { useLocales } from "react-localized";

const Accordion = () => {
  const { __ } = useLocales();
  const data = [
    { id: "question_1", question: __("Что такое 4Hub ?"), answer: "Ответ 1" },
    {
      id: "question_2",
      question: __("Как увеличить обьем хранилища?"),
      answer: "Ответ 2",
    },
    {
      id: "question_3",
      question: __("Как защитить мои данные?"),
      answer: "Ответ 3",
    },
  ];

  const [active, setActive] = useState("");

  const onAccordionClick = (item) => {
    if (active === item.id) setActive("");
    else setActive(item.id);
  };

  const isActive = (item) => {
    return active === item.id;
  };

  return (
    <div className={styles.wrapper}>
      <ul className={styles.accordion}>
        {data.map((item, index) => (
          <li className={styles.item} key={index}>
            <div className={styles.header}>
              <h4 className={styles.question}>{item.question}</h4>
              <span
                onClick={() => onAccordionClick(item)}
                className={classnames({
                  [styles.openBtn]: true,
                  [styles.plusBtn]: !isActive(item),
                })}
              />
            </div>

            <div
              className={classnames({
                [styles.content]: true,
                [styles.toggled]: isActive(item),
              })}
            >
              <div className={styles.answer}>{item.answer}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Accordion;
