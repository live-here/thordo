#!/bin/bash
docker pull amazon/dynamodb-local
docker run -d -p 8000:8000 --name thordo-dynamo-user amazon/dynamodb-local -jar DynamoDBLocal.jar -sharedDb

docker run -d -p 8001:8000 --name thordo-dynamo-task amazon/dynamodb-local -jar DynamoDBLocal.jar -sharedDb