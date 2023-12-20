export const toNonZero = (num: number) => {
  return num < 0 ? 0 : num;
}

export const numberRotation = (min: number, max: number, current:number) => {
  let temp = current;
  if (temp < min) {temp = max}
  if (temp > max) {temp = min}
  return temp;
};