# coding: utf-8

from __future__ import absolute_import

from flask import json
from six import BytesIO

from models.room import Room  # noqa: E501
from models.room_users import RoomUsers  # noqa: E501
from test import BaseTestCase


class TestRoomController(BaseTestCase):
    """RoomController integration test stubs"""

    def test_create_room(self):
        """Test case for create_room

        Creates a new room
        """
        response = self.client.open(
            '/api/rooms',
            method='POST')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_get_room_from_id(self):
        """Test case for get_room_from_id

        Get room from id
        """
        response = self.client.open(
            '/api/rooms/{id}'.format(id='id_example'),
            method='GET',
            content_type='application/json')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_get_room_users_from_id(self):
        """Test case for get_room_users_from_id

        
        """
        response = self.client.open(
            '/api/room/{room-id}/users'.format(room_id='room_id_example'),
            method='GET')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_get_rooms(self):
        """Test case for get_rooms

        Get all rooms
        """
        response = self.client.open(
            '/api/rooms',
            method='GET',
            content_type='application/json')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))


if __name__ == '__main__':
    import unittest
    unittest.main()
