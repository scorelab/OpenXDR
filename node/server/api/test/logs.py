# coding: utf-8

from __future__ import absolute_import
import unittest

from flask import json

from api.messages import LogsActionRequest  # noqa: E501
from api.messages import LogsCreateRequest  # noqa: E501
from api.test import BaseTestCase


class TestLogs(BaseTestCase):
    """DefaultController integration test stubs"""

    def test_logs_action(self):
        """Test case for logs_action

        runLogCollectorAction
        """
        logs_action_request = LogsActionRequest()
        headers = { 
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
        response = self.client.open(
            '/logs/{log_id}/action'.format(log_id='log_id_example'),
            method='POST',
            headers=headers,
            data=json.dumps(logs_action_request),
            content_type='application/json')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_logs_create(self):
        """Test case for logs_create

        createLogCollector
        """
        logs_create_request = LogsCreateRequest()
        headers = { 
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
        response = self.client.open(
            '/logs',
            method='POST',
            headers=headers,
            data=json.dumps(logs_create_request),
            content_type='application/json')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_logs_delete(self):
        """Test case for logs_delete

        deleteLogCollector
        """
        headers = { 
            'Accept': 'application/json',
        }
        response = self.client.open(
            '/logs/{log_id}'.format(log_id='log_id_example'),
            method='DELETE',
            headers=headers)
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_logs_get(self):
        """Test case for logs_get

        getLogCollector
        """
        headers = { 
            'Accept': 'application/json',
        }
        response = self.client.open(
            '/logs/{log_id}'.format(log_id='log_id_example'),
            method='GET',
            headers=headers)
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_logs_get_all(self):
        """Test case for logs_get_all

        getLogCollectors
        """
        headers = { 
            'Accept': 'application/json',
        }
        response = self.client.open(
            '/logs',
            method='GET',
            headers=headers)
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_logs_update(self):
        """Test case for logs_update

        updateLogCollector
        """
        log = {
  "id" : "string",
  "name" : "System Log",
  "os" : "linux",
  "source" : "/var/log/syslog",
  "status" : "active",
  "createdDate" : "2019-08-24"
}
        headers = { 
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
        response = self.client.open(
            '/logs/{log_id}'.format(log_id='log_id_example'),
            method='PUT',
            headers=headers,
            data=json.dumps(log),
            content_type='application/json')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))


if __name__ == '__main__':
    unittest.main()
