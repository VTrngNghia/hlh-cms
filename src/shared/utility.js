import firebase from "firebase/app";

export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties,
  };
};
export const updateJSONArrayById = (a, newE) => {
  return a.map(oldE => {
    return oldE.id === newE.id ? newE : oldE;
  });
};

export const displayDate = jsDate => jsDate.toISOString().split("T")[0];

export const toTimestamp = reactDate => firebase.firestore.Timestamp
  .fromDate(new Date(reactDate));


export const handleSocialClick = (medium, id) => {
  let domain;
  switch (medium) {
    case "instagram":
      domain = "https://instagram.com/";
      break;
    case "twitter":
      domain = "https://twitter.com/";
      break;
    case "facebook":
    default:
      domain = "https://facebook.com/";
    
  }
  const win = window.open(domain + id, "_blank");
  win.focus();
};

export const TODAY = new Date().toISOString().split("T")[0];

export const checkValidity = (value, rules) => {
  let isValid = true;
  if (!rules) {
    return true;
  }
  
  if (rules.required) {
    isValid = value.trim() !== "" && isValid;
  }
  
  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid;
  }
  
  if (rules.maxLength) {
    isValid = value.length <= rules.maxLength && isValid;
  }
  
  if (rules.isEmail) {
    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    isValid = pattern.test(value) && isValid;
  }
  
  if (rules.isNumeric) {
    const pattern = /^\d+$/;
    isValid = pattern.test(value) && isValid;
  }
  
  return isValid;
};

export const isEmpty = str => !str || str.trim() === "";