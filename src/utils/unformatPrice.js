export const unformatPrice = (price) => price.replace(/,/g, '.').replace(/[^0-9.-]+/g, '');
