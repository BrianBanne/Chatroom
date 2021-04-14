import { createRoom, getRooms, joinRoom } from "../api.js";

let numberOfRooms = 0;
const { username, userId } = JSON.parse(localStorage.getItem("swagbot_user"));
fetchRooms();

document.getElementById("username").innerHTML =
  username !== undefined ? username : "";

const createRoomButton = document.getElementById("createRoomBtn");
const deleteRoomButton = document.getElementById("deleteRoomBtn");
const pickRoomForm = document.getElementById("pickRoomForm");

createRoomButton.addEventListener("click", handleCreateRoom);
deleteRoomButton.addEventListener("click", handleDeleteRoom);
pickRoomForm.addEventListener("submit", handleEnterRoom);

async function handleCreateRoom() {
  console.log("number", numberOfRooms);
  try {
    const { room } = await createRoom(userId, numberOfRooms);

    goToRoom(room, "Room created successfully!");
  } catch (err) {
    alert(err);
  }
}

async function handleDeleteRoom() {
  const selectedRoomId = document.getElementById("room_id").value.toString();

  try {
   // Make route for delete room
   // goToRoom(room, "Room joined succesfully");
   alert('Room deleted!')
   fetchRooms()
  } catch (err) {
    alert(err);
  }
}

async function handleEnterRoom() {
  const selectedRoomId = document.getElementById("room_id").value.toString();

  try {
    const { room } = await joinRoom(userId, selectedRoomId);
    goToRoom(room, "Room joined succesfully");
  } catch (err) {
    alert(err);
  }
}


//Function fires on page-load
async function fetchRooms() {
  const { rooms } = await getRooms();
  if (typeof rooms === "undefined" || rooms.length === 0) {
    document.getElementById("joinRoomBtn").disabled = true;
  } else {
    document.getElementById("joinRoomBtn").disabled = false;
    document.getElementById("room_id").innerHTML = getAvailableRooms(rooms);
  }
  //Used for room-naming
  numberOfRooms = rooms.length + 1;
}

// HELPERS

function goToRoom(room, message) {
  alert(message);
  localStorage.setItem(
    "swagbot_room",
    JSON.stringify({ id: room.id, name: room.name })
  );
  window.location = `/room?id=${room.id}`;
}

function getAvailableRooms(rooms) {
  let roomRange = "";

  rooms.map(
    (room, idx) =>
      (roomRange += `<option value="${room.id}">${idx + 1}</option>`)
  );

  return roomRange;
}
