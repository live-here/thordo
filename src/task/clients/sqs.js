const { AWS, GlobalConfig } = require('./config');

const SQSClient = ({ 
  sqs = new AWS.SQS({ endpoint: GlobalConfig.SQS_ENDPOINT }),
  queueURL = GlobalConfig.QUEUE_URL
}) => {

}