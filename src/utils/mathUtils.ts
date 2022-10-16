
export const angleOfLineBetweenPoints = (
  x1: number,
  y1: number,
  x2: number,
  y2: number
) => {
  return Math.atan2(y2 - y1, x2 - x1);
};

export const distanceBetweenPoints = (
  x1: number,
  y1: number,
  x2: number,
  y2: number
) => {
  const xComponent = Math.pow(x2 - x1, 2);
  const yComponent = Math.pow(y2 - y1, 2);
  return Math.sqrt(xComponent + yComponent);
};

export const addOffset = (
  num: number,
  maxOffset: number,
  maxNum: number,
) => {
  let offsetNum = num + getRandomPosOrNegInt(maxOffset);
  if (offsetNum < 0) {
    return 0;
  } else if (offsetNum >= maxNum) {
    return maxNum;
  }
  return offsetNum;
};

export const getRandomPosOrNegInt = (max: number) => {
  return Math.random() < 0.5 ? getRandomInt(max) * -1 : getRandomInt(max);
}

export const getRandonBetweenValues = (min: number, max: number): number => {
  return Math.random() * (max - min) + min;
}

export const getRandomInt = (max: number): number => {
  return Math.floor(Math.random() * max);
};

export const getRandomFloat = (max: number): number => {
  return Math.random() * max;
};

const constrain = (n, low, high) => {
  return Math.max(Math.min(n, high), low);
};

//Copies implementation from p5.
export const mapToBoundaries = (n, start1, stop1, start2, stop2) => {
  
  const withinBounds = true;

  const newval = (n - start1) / (stop1 - start1) * (stop2 - start2) + start2;
  if (!withinBounds) {
    return newval;
  }
  if (start2 < stop2) {
    return constrain(newval, start2, stop2);
  } else {
    return constrain(newval, stop2, start2);
  }
};