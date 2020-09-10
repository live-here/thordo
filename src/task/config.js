const AWS = require("aws-sdk");

AWS.config.update({
  region: "us-west-2",
  endpoint: "http://localhost:8000",
});
// aws dynamodb get-item --endpoint-url http://localhost:8000 --table-name user --key ' { "id": { "S": "123" } }'
// aws dynamodb list-tables --endpoint-url http://localhost:8000
const dynamodb = new AWS.DynamoDB();

const params = {
  TableName: "task",
  KeySchema: [
    { AttributeName: "id", KeyType: "HASH" },
    { AttributeName: "userId", KeyType: "RANGE" }
  ],
  AttributeDefinitions: [
    { AttributeName: "id", AttributeType: "S" },
    { AttributeName: "userId", AttributeType: "S" },
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 10,
    WriteCapacityUnits: 10,
  },
};

if (require.main === module) {
  (async () => {
    console.log('starting...');
    const res = await new Promise((resolve, reject) => 
    dynamodb.createTable(params, (err, data) => {
      if (err) {
        console.error('error creating tables', err);
        reject(err);
        return;
      }
      resolve(data);
    }))
    console.log('tables migrations result', res);
  })().catch(console.error);
}

module.exports.AWS = AWS;
