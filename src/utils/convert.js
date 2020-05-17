export const convertDistance = (distance) => {
  return `${(distance / 1000).toFixed(1)} km`;
};

export const convertTime = (seconds) => {
  return new Date(seconds * 1000).toISOString().substr(11, 8);
};

export const convertPrice = (str) => {
  const array = str.split('R$')[1].split('.');
  let strReplace = '';

  array.forEach((item) => {
    strReplace += item;
  });

  return parseFloat(strReplace.replace(',', '.'));
};

export const convertFloatInPrice = (price) => {
  const after = String(price).split('.');

  if (after[1]) {
    if (after[1].length === 1) {
      return `R$${String(price).replace('.', ',')}0`;
    }
  }

  return `R$${String(price).replace('.', ',')}`;
};
