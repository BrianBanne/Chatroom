import connexion
import six
from swagger_server.__main__ import USERS

from swagger_server.models.user import User  # noqa: E501
from swagger_server import util
from flask import jsonify
import uuid


def add_user(name):  # noqa: E501
    """Creates a new user

     # noqa: E501

    :param name: User must provide a name
    :type name: str

    :rtype: User
    """
    print(name)
    new_user = User(uuid.uuid4().hex, name)
    USERS.append(new_user)
    return jsonify(data=new_user.to_dict())


def delete_user_from_id(id):  # noqa: E501
    """Delete user from id

     # noqa: E501

    :param id: The id for the name needed
    :type id: str

    :rtype: None
    """
    for user in USERS:
        if (user.id() == id):
            del user
            return jsonify(message="User removed")
    return jsonify(message="Cant remove user")


def get_all_users():  # noqa: E501
    """Get all users

     # noqa: E501


    :rtype: List[User]
    """
    userlist = []
    for user in USERS:
        userlist.append(user.to_dict())
    return jsonify(data=userlist)


def get_user_from_id(id):  # noqa: E501
    """Get user from id

     # noqa: E501

    :param id: The id for the name needed
    :type id: str

    :rtype: User
    """
    for user in USERS:
        if user.id == id:
            return user
    return None
