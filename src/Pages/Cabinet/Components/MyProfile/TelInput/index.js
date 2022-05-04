import React from "react";
import Index from "../Input/Input";

const TellInput = ({ ...props }) => {
  const onFocus = () => {
    /*const inp = event.target
        if (!/^\+\d*$/.test(inp.value))
            inp.value = '+'*/
  };

  // let formatPhoneNumber = subjectString => {
  //   var phoneRegex = /^(\d{2})(\d{3})(\d{3})(\d{2})(\d{2})+$/;

  //   if (phoneRegex.test(subjectString)) {
  //     return subjectString.replace(phoneRegex, "+$1($2) $3 $4 $5");
  //   } else {
  //     return subjectString;
  //   }
  // };

  const maskPhoneNumber = (number) => {
    const tempValue = number.replace(/\D/gim, "");

    return tempValue.replace(
      ...({
        3: [/(\d{2})(\d{0,3})/g, "$1 $2"],
        4: [/(\d{2})(\d{1,3})/g, "$1 $2"],
        5: [/(\d{2})(\d{3})/g, "$1 $2"],
        6: [/(\d{2})(\d{3})(\d{0,2})/g, "$1 $2-$3"],
        7: [/(\d{2})(\d{3})(\d{2})/g, "$1 $2-$3"],
        8: [/(\d{2})(\d{3})(\d{2})(\d{1,2})/g, "$1 $2-$3-$4"],
        9: [/(\d{2})(\d{3})(\d{2})(\d{2})/g, "$1 $2-$3-$4"],
      }[tempValue.length] || [])
    );
  };

  const onTelChange = (event) => {
    const inp = event.target;
    inp.value = maskPhoneNumber(inp.value);

    /*if (!/\d/.test(event.key))
            event.preventDefault()*/
  };

  return (
    <Index
      {...props}
      type="tel"
      onFocus={onFocus}
      maxLength={18}
      onChange={onTelChange}
      //onKeyPress={onKeyPress}
      //pattern = "[0-9] {3} - [0-9] {2} - [0-9] {3}"
    />
  );
};

export default TellInput;
