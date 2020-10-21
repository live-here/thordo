const { AWS, GlobalConfig } = require('./config');

const SQSClient = ({ 
  sqs = new AWS.SQS({ endpoint: GlobalConfig.SQS_ENDPOINT }),
  queueURL = GlobalConfig.QUEUE_URL
}) => {
  
  return {
    sendMessage,
    receiveMessage,
  }

  function sendMessage() {
    const params = {
      DelaySeconds: 10,
      MessageAttributes: {
        "Title": {
          DataType: "String",
          StringValue: "The Whistler"
        },
        "Author": {
          DataType: "String",
          StringValue: "John Grisham"
        },
        "WeeksOn": {
          DataType: "Number",
          StringValue: "6"
        }
      },
      MessageBody: "Information about current NY Times fiction bestseller for week of 12/11/2016.",
      QueueUrl: queueURL
    };

    sqs.sendMessage(params, function(err, data) {
      if (err) {
        console.log("Error", err);
      } else {
        console.log("Success", data.MessageId);
      }
    });
  }

  function receiveMessage() {
    const params = {
      AttributeNames: [
        "SentTimestamp"
      ],
      MaxNumberOfMessages: 10,
      MessageAttributeNames: [
        "All"
      ],
      QueueUrl: queueURL,
      VisibilityTimeout: 20,
      WaitTimeSeconds: 0
    };
    
    sqs.receiveMessage(params, function(err, data) {
      if (err) {
        console.log("Receive Error", err);
      } else if (data.Messages) {
        const deleteParams = {
          QueueUrl: queueURL,
          ReceiptHandle: data.Messages[0].ReceiptHandle
        };

        sqs.deleteMessage(deleteParams, function(err, data) {
          if (err) {
            console.log("Delete Error", err);
          } else {
            console.log("Message Deleted", data);
          }
        });
      }
    });
  }
}

module.exports = SQSClient