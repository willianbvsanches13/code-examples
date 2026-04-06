export type Category = 'size' | 'creamer';
export type Option = 'small' | 'medium' | 'large' | 'none' | 'dairy' | 'non-dairy';
export type Price = number;

export interface Pricer {
  (category: Category, option: Option): Price;
}

export const createPricer = (): Pricer => {
  const sizePrices: Readonly<Record<string, Price>> = {
    small: 1.0,
    medium: 1.5,
    large: 2.0,
  };

  const creamerPrices: Readonly<Record<string, Price>> = {
    none: 0.0,
    dairy: 0.25,
    'non-dairy': 0.5,
  };

  let selections: Readonly<Record<Category, Option>> = {
    size: 'small',
    creamer: 'none',
  };

  const calculateTotal = (currentSelections: Readonly<Record<Category, Option>>): Price => {
    const sizePrice = sizePrices[currentSelections.size] ?? 0;
    const creamerPrice = creamerPrices[currentSelections.creamer] ?? 0;
    return sizePrice + creamerPrice;
  };

  const pricer: Pricer = (category: Category, option: Option): Price => {
    selections = {
      ...selections,
      [category]: option,
    };

    return calculateTotal(selections);
  };

  return pricer;
};
