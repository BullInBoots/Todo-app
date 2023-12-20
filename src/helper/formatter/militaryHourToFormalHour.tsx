export const militaryHourToFormalHour = (time: number) => {
  return `${Math.floor(time/1000)}:${time%100}`;
}