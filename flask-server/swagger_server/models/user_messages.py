# coding: utf-8

from __future__ import absolute_import
from datetime import date, datetime  # noqa: F401

from typing import List, Dict  # noqa: F401

from swagger_server.models.base_model_ import Model
from swagger_server.models.message import Message
from swagger_server.models.user import User


from swagger_server import util


class UserMessages(Model):
    """NOTE: This class is auto generated by the swagger code generator program.

    Do not edit the class manually.
    """

    def __init__(self, user: User=None, messages: List[Message]=None):  # noqa: E501
        """UserMessages - a model defined in Swagger

        :param user: The user of this UserMessages.  # noqa: E501
        :type user: User
        :param messages: The messages of this UserMessages.  # noqa: E501
        :type messages: List[Message]
        """
        self.swagger_types = {
            'user': User,
            'messages': List[Message]
        }

        self.attribute_map = {
            'user': 'User',
            'messages': 'Messages'
        }

        self._user = user
        self._messages = messages

    @classmethod
    def from_dict(cls, dikt) -> 'UserMessages':
        """Returns the dict as a model

        :param dikt: A dict.
        :type: dict
        :return: The UserMessages of this UserMessages.  # noqa: E501
        :rtype: UserMessages
        """
        return util.deserialize_model(dikt, cls)

    @property
    def user(self) -> User:
        """Gets the user of this UserMessages.


        :return: The user of this UserMessages.
        :rtype: User
        """
        return self._user

    @user.setter
    def user(self, user: User):
        """Sets the user of this UserMessages.


        :param user: The user of this UserMessages.
        :type user: User
        """

        self._user = user

    @property
    def messages(self) -> List[Message]:
        """Gets the messages of this UserMessages.


        :return: The messages of this UserMessages.
        :rtype: List[Message]
        """
        return self._messages

    @messages.setter
    def messages(self, messages: List[Message]):
        """Sets the messages of this UserMessages.


        :param messages: The messages of this UserMessages.
        :type messages: List[Message]
        """

        self._messages = messages
