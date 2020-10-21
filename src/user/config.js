const AWS = require("aws-sdk");

const GlobalConfig = {
  SQS_ENDPOINT: 'http://127.0.0.1:4566',
  QUEUE_URL: 'http://localhost:4566/000000000000/USER_QUEUE',
}

AWS.config.update({
  region: "us-west-2",
  endpoint: "http://localhost:8000",
});
// aws dynamodb get-item --endpoint-url http://localhost:8000 --table-name user --key ' { "id": { "S": "123" } }'
// aws dynamodb list-tables --endpoint-url http://localhost:8000
const dynamodb = new AWS.DynamoDB();
setupSQS();


const params = {
  TableName: "user",
  KeySchema: [
    { AttributeName: "id", KeyType: "HASH" },
  ],
  AttributeDefinitions: [
    { AttributeName: "id", AttributeType: "S" },
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 10,
    WriteCapacityUnits: 10,
  },
  StreamSpecification: {
    StreamEnabled: true,
    StreamViewType: 'NEW_AND_OLD_IMAGES'
  }
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

function setupSQS() {
  const sqs = new AWS.SQS({ endpoint: GlobalConfig.SQS_ENDPOINT });

  const params = {
    QueueName: 'USER_QUEUE',
    Attributes: {
      'DelaySeconds': '60',
      'MessageRetentionPeriod': '86400',
    }
  };

  sqs.createQueue(params, function(err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success", data.QueueUrl);
    }
  });
}

module.exports = { AWS, GlobalConfig };
