export const convertDistance = (distance) => {
  return `${(distance / 1000).toFixed(1)} km`;
};

export const convertTime = (seconds) => {
  return new Date(seconds * 1000).toISOString().substr(11, 8);
};

export const convertPrice = (str) => {
  const array = str.trim().split('R$')[1].split('.');

  const strReplace = {
    value: '',
  };

  array.forEach((item) => {
    strReplace.value += item;
  });

  return parseFloat(strReplace.value.replace(',', '.'));
};

export const convertFloatInPrice = (price) => {
  return price.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
};
