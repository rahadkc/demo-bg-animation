export const objectToArray = (input) => {
  const entries = Object.entries(input);
  entries.forEach((entry) => (entry[0] = +entry[0]));
  return entries;
};

export function translateToString(string) {
  string = string?.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, "");
  string = string?.replace(/\s/g, "-");
  return string;
}

export const getShortContent = (str = "", num = 150) => {
  let str_len = str?.length;
  if (str_len > num) {
    return str.substring(0, num) + "...";
  }
  return str;
};

export function checkEmptyObject(obj) {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
}

export function normalizeInput(value, previousValue) {
  if (!value) return value;
  const currentValue = value.replace(/[^\d]/g, "");
  const cvLength = currentValue.length;

  if (!previousValue || value.length > previousValue.length) {
    if (cvLength < 4) return currentValue;
    if (cvLength < 7)
      return `(${currentValue.slice(0, 3)}) ${currentValue.slice(3)}`;
    return `(${currentValue.slice(0, 3)}) ${currentValue.slice(
      3,
      6
    )}-${currentValue.slice(6, 10)}`;
  }
}

function getFileNameFromPath(filePath) {
  return filePath.substring(filePath.lastIndexOf("/") + 1);
}

function getShortName(fileName) {
  if (fileName.length > 30) {
    return fileName.slice(0, 30) + "..." + fileName.split(".").pop();
  }
  return fileName;
}

export function getFileName(fileName) {
  if (typeof fileName === "string") {
    if (fileName.includes("/")) {
      return getShortName(getFileNameFromPath(fileName));
    }
    return getShortName(fileName);
  }
}

export function getFileExtension(filename) {
  return (
    filename.substring(filename.lastIndexOf(".") + 1, filename.length) ??
    filename
  );
}
