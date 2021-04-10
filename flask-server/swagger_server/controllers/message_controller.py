import connexion
from flask import json
from flask.json import jsonify
import six
from swagger_server.__main__ import ROOMS
from swagger_server.controllers.room_controller import get_room
from swagger_server.controllers.user_controller import get_user_from_id
from swagger_server.models import room_messages, user

from swagger_server.models.room_messages import RoomMessages  # noqa: E501
from swagger_server import util
from swagger_server.models.user_message import UserMessage

room_messages = []

def getMessagesFromList(messages):
    print('arg', messages)
    arr = []
    for m in messages:
        arr.append(m.messages)
    print(arr)
    return arr



def get_messages_from_id(room_id):  # noqa: E501
    """room_room_id_messages_get

     # noqa: E501

    :param room_id: 
    :type room_id: str
    :rtype: RoomMessages
    """
    #print('room', room_id)
    #print('user', user_id)

    user_id = connexion.request.headers['user_id']
    if not user_id:
        return 'Could not find user-id in header', 400

    for message in room_messages:
        print('roomid_', message.room.id)
        print('message_id', message.messages[0].user.id)
        if message.room.id == room_id:
            for m in message.messages:
                if m.user.id == user_id:
                    #message_arr = getMessagesFromList(message.messages)
                    return jsonify(message.messages)
                    #return jsonify(message.messages)
                     #return jsonify(message.messages)
            
        
    return 'hei'

#get_messages_from_id("111")

def get_user_room_messages(room_id, user_id):  # noqa: E501
    """room_room_id_user_id_messages_get

     # noqa: E501

    :param room_id: The id for the room needed
    :type room_id: str
    :param user_id: The id for the user needed
    :type user_id: str

    :rtype: RoomMessages
    """

    #validate user input
    (isAuth, code) = util.authorizeRoomUser(user_id, room_id, ROOMS)
    if not isAuth:
        return 'Could not fetch users', code

    for m in room_messages:
        if m.room.id == room_id:
            for n in m.messages:
                if n.user.id == user_id:
                    return jsonify(m.to_dict())
    return 'Not messages in room yet', 200


def post_room_message(room_id, user_id, message):  # noqa: E501
    """Post message in room

     # noqa: E501

    :param room_id: The id for the room needed
    :type room_id: str
    :param user_id: The id for the user needed
    :type user_id: str
    :param message: 
    :type message: str

    :rtype: None
    """

    (isAuth, code) = util.authorizeRoomUser(user_id, room_id, ROOMS)
    if not isAuth:
        return 'Could not fetch users', code

    new_message = UserMessage(get_user_from_id(user_id), message)
    if len(room_messages) == 0:
       room_messages.append(RoomMessages(get_room(room_id), [new_message]))
    else:
        for rm in room_messages:
            if rm.room.id == room_id:
                print('hei', rm.messages)
                rm.messages.append(new_message)
            else:
                room_messages.append(RoomMessages(get_room(room_id), [new_message]))

    for m in room_messages:
        if m.room.id == room_id:
            print(m)
            return jsonify(m.to_dict())
 
    return 'Could not post message', 400
