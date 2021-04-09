import connexion
from flask.json import jsonify
import six
import uuid
from swagger_server.controllers.user_controller import get_user_from_id
from swagger_server.models.room import Room  # noqa: E501
from swagger_server.models.room_users import RoomUsers  # noqa: E501
from swagger_server import util
from swagger_server.models import base_model_

rooms = []

def create_room(userId):  # noqa: E501
    """Creates a new room

     # noqa: E501

    :param userId: UserId need to create room
    :type userId: str

    :rtype: Room
    """
    new_room = Room(uuid.uuid4().hex, userId, [get_user_from_id(userId)])
    rooms.append(new_room)
    return jsonify(new_room)


def get_room(id):  # noqa: E501
    """Get room from id

     # noqa: E501

    :param id: The room id
    :type id: str

    :rtype: Room
    """
    for room in rooms:
        if room.id == id:
            return room
    return None


def get_room_users(room_id):  # noqa: E501
    """get_room_users

     # noqa: E501

    :param room_id: The id for the room needed
    :type room_id: str

    :rtype: RoomUsers
    """
    users = get_room(room_id).users()
    return 'do some magic!'


def get_rooms():  # noqa: E501
    """Get all rooms

     # noqa: E501


    :rtype: List[Room]
    """
    deserialized_rooms = []
    for room in rooms:
        deserialized_rooms.append(room.to_dict())
    return jsonify(deserialized_rooms)


def join_room(room_id, userId):  # noqa: E501
    """join_room

     # noqa: E501

    :param room_id: The id for the room needed
    :type room_id: str
    :param userId: 
    :type userId: str

    :rtype: RoomUsers
    """
    room = get_room(room_id)
    room.users.append(get_user_from_id(userId))
    return jsonify(room.to_dict())
