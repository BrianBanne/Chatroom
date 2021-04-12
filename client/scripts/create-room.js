import { createRoom, getRooms, joinRoom } from "../api.js";

async function fetchRooms() {
  const { data: rooms } = await getRooms();

  if (typeof rooms === "undefined" || rooms.length === 0) {
    document.getElementById("joinRoomBtn").disabled = true;
  } else {
    document.getElementById("joinRoomBtn").disabled = false;
    document.getElementById("room_id").innerHTML = getAvailableRooms(rooms);
  }
}

const user = JSON.parse(localStorage.getItem("swagbot_user"))

const { username, id: userId } = user

document.getElementById("username").innerHTML =
  username !== undefined ? username : "";

fetchRooms();

const pickRoomForm = document.getElementById("pickRoomForm");
document
  .getElementById("createRoomButton")
  .addEventListener("click", handleCreateRoom);

pickRoomForm.addEventListener("submit", handleEnterRoom);

async function handleEnterRoom() {
  const selectedRoomId = document.getElementById("room_id").value.toString();
  console.log(selectedRoomId);
  try {
    const res = await joinRoom(userId, selectedRoomId);
    goToRoom(selectedRoomId);
  } catch (err) {
    alert(err);
  }
}

console.log("pre", userId);

async function handleCreateRoom() {
  try {
    const room = await createRoom(userId);
    alert("Room succesfully created!");
    goToRoom(room.id);
  } catch (err) {
    alert(err);
  }
}

function goToRoom(roomId) {
  localStorage.setItem("swagbot_room", roomId);
  window.location = `/room?id=${roomId}`;
}

export function getAvailableRooms(rooms) {
  let roomRange = "";

  rooms.map(
    (room, idx) =>
      (roomRange += `<option value="${room.id}">${idx + 1}</option>`)
  );

  return roomRange;
}
