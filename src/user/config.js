const AWS = require("aws-sdk");

AWS.config.update({
  region: "us-west-2",
  endpoint: "http://localhost:8000",
});
// aws dynamodb get-item --endpoint-url http://localhost:8000 --table-name user --key ' { "id": { "S": "123" } }'
// aws dynamodb ist-tables --endpoint-url http://localhost:8000
const dynamodb = new AWS.DynamoDB();

const params = {
  TableName: "User",
  KeySchema: [
    { AttributeName: "id", KeyType: "HASH" },
    { AttributeName: "email", KeyType: "RANGE" },
    // { AttributeName: "name", KeyType: "SORT" },
  ],
  AttributeDefinitions: [
    { AttributeName: "id", AttributeType: "N" },
    { AttributeName: "email", AttributeType: "S" },
    // { AttributeName: "name", AttributeType: "S" },
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 10,
    WriteCapacityUnits: 10,
  },
};

dynamodb.createTable(params, function (err, data) {
  if (err) {
    console.error(
      "Unable to create table. Error JSON:",
      JSON.stringify(err, null, 2)
    );
  } else {
    console.log(
      "Created table. Table description JSON:",
      JSON.stringify(data, null, 2)
    );
  }
});

module.exports.AWS = AWS;
