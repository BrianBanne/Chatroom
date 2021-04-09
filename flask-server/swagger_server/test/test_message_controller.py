# coding: utf-8

from __future__ import absolute_import

from flask import json
from six import BytesIO

from swagger_server.models.room_messages import RoomMessages  # noqa: E501
from swagger_server.test import BaseTestCase


class TestMessageController(BaseTestCase):
    """MessageController integration test stubs"""

    def test_room_room_id_messages_get(self):
        """Test case for room_room_id_messages_get

        
        """
        room_id2 = 'room_id_example'
        response = self.client.open(
            '/api/room/{room-id}/messages'.format(room_id='room_id_example'),
            method='GET',
            data=json.dumps(room_id2),
            content_type='application/json')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_room_room_id_user_id_messages_get(self):
        """Test case for room_room_id_user_id_messages_get

        
        """
        response = self.client.open(
            '/api/room/{room-id}/{user-id}/messages'.format(room_id='room_id_example', user_id='user_id_example'),
            method='GET')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_room_room_id_user_id_messages_post(self):
        """Test case for room_room_id_user_id_messages_post

        Post message in room
        """
        message = 'message_example'
        response = self.client.open(
            '/api/room/{room-id}/{user-id}/messages'.format(room_id='room_id_example', user_id='user_id_example'),
            method='POST',
            data=json.dumps(message),
            content_type='application/json')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))


if __name__ == '__main__':
    import unittest
    unittest.main()
