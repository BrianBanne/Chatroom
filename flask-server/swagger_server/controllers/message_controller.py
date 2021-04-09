import connexion
from flask.json import jsonify
import six
from swagger_server.controllers.room_controller import get_room
from swagger_server.controllers.user_controller import get_user_from_id
from swagger_server.models import room_messages, user
from swagger_server.models.message import Message

from swagger_server.models.room_messages import RoomMessages  # noqa: E501
from swagger_server import util
from swagger_server.models.user_messages import UserMessages

room_messages = []

def get_messages_from_id(room_id, user_id):  # noqa: E501
    """room_room_id_messages_get

     # noqa: E501

    :param room_id: 
    :type room_id: str
    :param room_id2: User must provide a name
    :type room_id2: str

    :rtype: RoomMessages
    """
    for message in room_messages:
        if message.room().id() == room_id and message.messages().user().id() == user_id:
            messages = message.messages()
            return jsonify(messages)
            
    return jsonify(message="Can't retrieve messages")


def get_user_room_messages(room_id, user_id):  # noqa: E501
    """room_room_id_user_id_messages_get

     # noqa: E501

    :param room_id: The id for the room needed
    :type room_id: str
    :param user_id: The id for the user needed
    :type user_id: str

    :rtype: RoomMessages
    """
    return 'do some magic!'


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
    new_message = RoomMessages(get_room(room_id), [UserMessages(get_user_from_id(user_id), [message])])
    return jsonify(new_message.to_dict())
