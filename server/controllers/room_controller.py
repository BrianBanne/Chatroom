import uuid
import connexion
import six

from models.room import Room  # noqa: E501
from models.room_users import RoomUsers  # noqa: E50
import util
from flask import jsonify

rooms = [{'id': util.getUUIDhex(), 'users': []}, {'id': util.getUUIDhex(), 'users': []} ]

def create_room(body):  # noqa: E501
    """Creates a new room

     # noqa: E501


    :rtype: None
    """
    print(body)
    userId = body['id']
    new_room = {'id' : util.getUUIDhex(), 'users': [userId]}
    rooms.append(new_room)
    return jsonify(message='Room succesfully created', data=new_room)


def get_room_from_id(id):  # noqa: E501
    """Get room from id

     # noqa: E501

    :param id: The id for the room needed
    :type id: str

    :rtype: Room
    """
    return 'do some magic!'


def get_room_users_from_id(room_id):  # noqa: E501
    """get_room_users_from_id

     # noqa: E501

    :param room_id: The id for the room needed
    :type room_id: str

    :rtype: RoomUsers
    """
    return 'do some magic!'

def join_room_from_id():
    return 'hei'


def get_rooms():  # noqa: E501
    """Get all rooms

     # noqa: E501


    :rtype: List[Room]
    """
    return jsonify(data=rooms)
