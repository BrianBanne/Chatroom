#!/usr/bin/env python3

import connexion

from swagger_server import encoder
from flask_cors import CORS

ROOMS = []
USERS = []


def main():
    app = connexion.App(__name__, specification_dir='./swagger/')
    app.app.json_encoder = encoder.JSONEncoder
    CORS(app.app)
    app.add_api('swagger.yaml', arguments={'title': 'Swagbot API'})
    app.run(port=8080)


if __name__ == '__main__':
    main()
