# coding: utf-8

from __future__ import absolute_import

from flask import json
from six import BytesIO

from swagger_server.models.room import Room  # noqa: E501
from swagger_server.models.room_user import RoomUser  # noqa: E501
from swagger_server.models.room_users import RoomUsers  # noqa: E501
from swagger_server.test import BaseTestCase


class TestRoomController(BaseTestCase):
    """RoomController integration test stubs"""

    def test_create_room(self):
        """Test case for create_room

        Creates a new room
        """
        userId = 'userId_example'
        response = self.client.open(
            '/api/rooms',
            method='POST',
            data=json.dumps(userId),
            content_type='application/json')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_get_room(self):
        """Test case for get_room

        Get room from id
        """
        response = self.client.open(
            '/api/rooms/{id}'.format(id='id_example'),
            method='GET',
            content_type='application/json')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_get_room_users(self):
        """Test case for get_room_users

        
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

    def test_join_room(self):
        """Test case for join_room

        
        """
        userId = 'userId_example'
        response = self.client.open(
            '/api/room/{room-id}/users'.format(room_id='room_id_example'),
            method='POST',
            data=json.dumps(userId),
            content_type='application/json')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))


if __name__ == '__main__':
    import unittest
    unittest.main()
