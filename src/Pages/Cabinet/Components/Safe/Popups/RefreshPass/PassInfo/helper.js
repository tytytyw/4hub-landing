export const hasUpperLowerCase = (value) => {
  let hasUpperCase = value?.toLowerCase() !== value;
  let hasLowerCase = value?.toUpperCase() !== value;
  return hasUpperCase && hasLowerCase;
};

export const hasNumOrChar = (value) => {
  return value?.match(/[0-9]/) || value?.match(/[!@#$%^&*()_+\-=\\[\]{};':"\\|,.<>\\/?]/g);
};
