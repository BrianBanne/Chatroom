export function getAvailableRooms(rooms) {
  console.log(rooms);

  let roomRange = "";

  rooms.map(
    (room, idx) =>
      (roomRange += `<option value=" + ${room.id} + ">${idx+1}</option>`)
  );

  return roomRange;
}
