import connexion
from flask.json import jsonify
import six
import uuid
from swagger_server.__main__ import ROOMS
from swagger_server.controllers.user_controller import get_user_from_id
from swagger_server.models.room import Room  # noqa: E501
from swagger_server.models.room_users import RoomUsers  # noqa: E501
from swagger_server import util
from swagger_server.models import base_model_, user


def create_room(userId):  # noqa: E501
    """Creates a new room

     # noqa: E501

    :param userId: UserId need to create room
    :type userId: str

    :rtype: Room
    """
    print(userId)
    new_room = Room(uuid.uuid4().hex, userId, [get_user_from_id(userId)])
    ROOMS.append(new_room)
    return jsonify(data=new_room)


def get_room(id):  # noqa: E501
    """Get room from id

     # noqa: E501

    :param id: The room id
    :type id: str

    :rtype: Room
    """
    for room in ROOMS:
        if room.id == id:
            return room
    return 'Unable to get a room with provided id', 400

def get_room_users(room_id):  # noqa: E501
    """get_room_users

     # noqa: E501

    :param room_id: The id for the room needed
    :type room_id: str

    :rtype: RoomUsers
    """

    user_id = connexion.request.headers['user_id']
    print('id from header:', user_id)
    if not user_id:
        return 'Could not find user-id in header', 401

    (isAuth, code) =util.authorizeRoomUser(user_id, room_id, ROOMS)
    if not isAuth:
        return 'Could not fetch users', code
    
    for room in ROOMS:
        if room.id == room_id:
            for user in room.users:
                if user.id == user_id:  
                    return jsonify(room.users)
    




def get_rooms():  # noqa: E501
    """Get all rooms

     # noqa: E501


    :rtype: List[Room]
    """
    room_info = []
    for room in ROOMS:
        room_info.append({'id': room.id, 'host_id': room.host_id})
    return jsonify(data=ROOMS)


def join_room(room_id, userId):  # noqa: E501
    """join_room

     # noqa: E501

    :param room_id: The id for the room needed
    :type room_id: str
    :param userId: 
    :type userId: str

    :rtype: RoomUsers
    """
    print(room_id, userId)
    room = get_room(room_id)
    room.users.append(get_user_from_id(userId))
    return jsonify(data=room.to_dict())
