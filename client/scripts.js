export function getRoomRange() {
  let roomRange = "";

  for (let i = 1; i < 43; i++) {
    roomRange +=  `<option value=" + i + ">${i}</option>`;
  }
  return roomRange
}

