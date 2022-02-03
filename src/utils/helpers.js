import { P_MARKETING, P_EQUIPMENT, L_BV, L_EENMANSZAK } from "./data";

const validationMessages = {
  product: "Bolån",
  legal: "Stad",
  amount: "Lånblopp",
  duration: "Låntid",
};

export function getValidationMessage(field) {
  return validationMessages[field];
}

const MaxValuesConfig = [
  {
    product: P_MARKETING,
    legal: L_BV,
    maxAmount: 200000,
    maxDuration: 12,
  },
  {
    product: P_MARKETING,
    legal: L_EENMANSZAK,
    maxAmount: 100000,
    maxDuration: 12,
  },
  {
    product: P_EQUIPMENT,
    legal: L_BV,
    maxAmount: 50000,
    maxDuration: 12,
  },
  {
    product: P_EQUIPMENT,
    legal: L_EENMANSZAK,
    maxAmount: 250000,
    maxDuration: 10,
  },
];

export function getMaxValues({ product, legal }) {
  let newMaxValues = MaxValuesConfig.find(
    (row) => row.product === product && row.legal === legal
  );
  if (!newMaxValues) {
    let defaultMaxValues = MaxValuesConfig[0];
    newMaxValues = defaultMaxValues;
  }
  const maxAmount = newMaxValues.maxAmount;
  const maxDuration = newMaxValues.maxDuration;
  return { maxAmount, maxDuration };
}

export function getOffer({ amount, duration, maxDuration }) {
  return new Calc({ amount, duration, maxDuration }).calcInterestRate();
}

/**
 * @param {number} amount - loan amount
 * @param {number} duration - loan duration
 * @param {number} maxDuration - max loan duration
 */
export class Calc {
  constructor({ amount, duration, maxDuration }) {
    this.amount = amount;
    this.duration = duration;
    this.maxDuration = maxDuration;

    if (amount < 50000) {
      this.minRate = 6; //min interest rate(%)
      this.maxRate = 8; //max interest rate(%)
    } else if (amount < 150000) {
      this.minRate = 5;
      this.maxRate = 7;
    } else if (amount <= 500000) {
      this.minRate = 4;
      this.maxRate = 6;
    }
  }

  getMaxRate() {
    return this.maxRate;
  }

  getMinRate() {
    return this.minRate;
  }

  /**
   * y = kx + b
   * y - interest rate
   * x - duration
   *
   * b = minRate
   * k = (maxRate - minRate)/maxDuration
   * @return {number} interestRate
   */
  calcInterestRate() {
    const interestRate =
      (this.maxRate - this.minRate) * (this.duration / this.maxDuration) +
      this.minRate;
    console.log({ interestRate });
    return Math.floor(interestRate * 100) / 100; //two digits after dot
  }
}
