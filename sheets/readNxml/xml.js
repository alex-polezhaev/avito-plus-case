import _ from "lodash";

export default (values) => {
  const xmlSnippets = values.map((arrOfOneField) => {
    const tag = arrOfOneField[0];
    return arrOfOneField.map((value, index) => {
      if (index >= 2) {
        return `<${tag}>${value}</${tag}>`
      }
    });
  });
  return _.unzip(xmlSnippets);
};
