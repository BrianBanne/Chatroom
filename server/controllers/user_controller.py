import connexion
import six

from swagger_server.models.user import User  # noqa: E501
from swagger_server import util


def add_user(body):  # noqa: E501
    """Creates a new user

     # noqa: E501

    :param body: User must provide a name
    :type body: dict | bytes

    :rtype: None
    """
    if connexion.request.is_json:
        body = User.from_dict(connexion.request.get_json())  # noqa: E501
    return 'do some magic!'


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


    :rtype: None
    """
    return 'do some magic!'


def get_user_from_id(id):  # noqa: E501
    """Get user from id

     # noqa: E501

    :param id: The id for the name needed
    :type id: int

    :rtype: None
    """
    return 'do some magic!'
