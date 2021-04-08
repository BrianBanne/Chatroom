# coding: utf-8

from __future__ import absolute_import

from flask import json
from six import BytesIO

from test import BaseTestCase


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

        
        """
        response = self.client.open(
            '/api/room/{room-id}/{user-id}/messages'.format(room_id='room_id_example', user_id='user_id_example'),
            method='POST')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))


if __name__ == '__main__':
    import unittest
    unittest.main()
