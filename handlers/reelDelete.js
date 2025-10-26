const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

module.exports.handler = async (event) => {
  const { uuid } = event.pathParameters;

  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Key: { uuid }
  };

  try {
    await dynamodb.delete(params).promise();
    return { statusCode: 200, body: JSON.stringify({ message: 'Reel deleted' }) };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
};
