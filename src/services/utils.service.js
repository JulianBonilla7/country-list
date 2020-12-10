import { v4 as uuidv4 } from "uuid";

const generateID = () => uuidv4();

const removeAccents = string => {
  const hexAccentMap = {
    a: /[\xE0-\xE6]/g,
    e: /[\xE8-\xEB]/g,
    i: /[\xEC-\xEF]/g,
    o: /[\xF2-\xF6]/g,
    u: /[\xF9-\xFC]/g,
    c: /\xE7/g
  };
  let result = string;
  for (let letter in hexAccentMap) {
    var regex = hexAccentMap[letter];
    result = result.replace(regex, letter);
  }
  return result;
};

export const utils = {
  generateID,
  removeAccents
};
