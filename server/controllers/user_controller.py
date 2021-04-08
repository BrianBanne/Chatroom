from logging import log
import connexion
import six
from flask import jsonify
from models.user import User  # noqa: E501
import util
import sys

users = []

def add_user(body):  # noqa: E501
    """Creates a new user


     # noqa: E501

    :param name: User must provide a name
    :type name: str

    :rtype: None
    """
    print(body)
    username = body["name"]
    #user = {'userId': util.getUUIDhex() ,'name': username}
    user = User(util.getUUIDhex(), username)
    users.append(user)

    return jsonify(message=f"User {username} succesfully created", data=user.getUserObject())


def delete_user_from_id(id):  # noqa: E501
    """Delete user from id

     # noqa: E501

    :param id: The id for the name needed
    :type id: str

    :rtype: None
    """
    return 'do some magic!'


def get_all_users():  # noqa: E501
    """Get all users

     # noqa: E501


    :rtype: List[User]
    """
    formattedUsers = []
    for user in users:
        formattedUsers.append(user.getUserObject())
    return jsonify(data=formattedUsers)


def get_user_from_id(id):  # noqa: E501
    """Get user from id

     # noqa: E501

    :param id: The id for the name needed
    :type id: str

    :rtype: User
    """
    return 'do some magic!'

