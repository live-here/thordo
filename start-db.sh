#!/bin/bash
docker pull amazon/dynamodb-local
docker run -d -p 8000:8000 --name thordo-dynamo amazon/dynamodb-local