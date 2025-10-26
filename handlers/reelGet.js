const AWS = require('aws-sdk');
const AmazonDaxClient = require('amazon-dax-client');

// Initialize DynamoDB client with DAX fallback
let dynamodb;
if (process.env.DAX_ENDPOINT) {
  try {
    const daxClient = new AmazonDaxClient({
      endpoints: [process.env.DAX_ENDPOINT],
      region: process.env.AWS_REGION || 'ap-south-1'
    });
    dynamodb = new AWS.DynamoDB.DocumentClient({ service: daxClient });
    console.log('Using DAX for DynamoDB operations');
  } catch (error) {
    console.log('DAX not available, falling back to regular DynamoDB:', error.message);
    dynamodb = new AWS.DynamoDB.DocumentClient();
  }
} else {
  dynamodb = new AWS.DynamoDB.DocumentClient();
}

module.exports.handler = async (event) => {
  const { uuid } = event.pathParameters;
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Key: { uuid }
  };

  try {
    const result = await dynamodb.get(params).promise();
    if (!result.Item) {
      return { statusCode: 404, body: JSON.stringify({ error: 'Reel not found' }) };
    }
    return { statusCode: 200, body: JSON.stringify({ reel: result.Item }) };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
};
