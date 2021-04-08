# coding: utf-8

from __future__ import absolute_import
from datetime import date, datetime  # noqa: F401

from typing import List, Dict  # noqa: F401

from models.base_model_ import Model
from models.user import User

import util


class RoomUsers(Model):
    """NOTE: This class is auto generated by the swagger code generator program.

    Do not edit the class manually.
    """

    def __init__(self, id: str=None, users: List[User]=None):  # noqa: E501
        """RoomUsers - a model defined in Swagger

        :param id: The id of this RoomUsers.  # noqa: E501
        :type id: str
        :param users: The users of this RoomUsers.  # noqa: E501
        :type users: List[User]
        """
        self.swagger_types = {
            'id': str,
            'users': List[User]
        }

        self.attribute_map = {
            'id': 'id',
            'users': 'Users'
        }

        self._id = id
        self._users = users

    @classmethod
    def from_dict(cls, dikt) -> 'RoomUsers':
        """Returns the dict as a model

        :param dikt: A dict.
        :type: dict
        :return: The RoomUsers of this RoomUsers.  # noqa: E501
        :rtype: RoomUsers
        """
        return util.deserialize_model(dikt, cls)

    @property
    def id(self) -> str:
        """Gets the id of this RoomUsers.


        :return: The id of this RoomUsers.
        :rtype: str
        """
        return self._id

    @id.setter
    def id(self, id: str):
        """Sets the id of this RoomUsers.


        :param id: The id of this RoomUsers.
        :type id: str
        """

        self._id = id

    @property
    def users(self) -> List[User]:
        """Gets the users of this RoomUsers.


        :return: The users of this RoomUsers.
        :rtype: List[User]
        """
        return self._users

    @users.setter
    def users(self, users: List[User]):
        """Sets the users of this RoomUsers.


        :param users: The users of this RoomUsers.
        :type users: List[User]
        """

        self._users = users