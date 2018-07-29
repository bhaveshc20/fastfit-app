export function round(x, n) {
  return parseFloat(Math.round(x * Math.pow(10, n)) / Math.pow(10, n)).toFixed(n);
}

export function calculateDistance(distance, unitType){
  if (unitType === 'miles'){
    return `${round((distance * 0.00062137), 2)}`;
  }
  return `${round((distance / 1000), 2)} km`;
}

// Add zero in front of numbers < 10
export function zeroPad(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}
