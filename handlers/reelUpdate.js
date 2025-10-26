const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

module.exports.handler = async (event) => {
  const { uuid } = event.pathParameters;
  const data = JSON.parse(event.body);

  const updateFields = [];
  const expressionAttributeValues = {};

  // Build dynamic update expression
  for (const key of Object.keys(data)) {
    if (key !== 'uuid') {
      updateFields.push(`${key} = :${key}`);
      expressionAttributeValues[`:${key}`] = data[key];
    }
  }
  updateFields.push('updated_at = :updated_at');
  expressionAttributeValues[':updated_at'] = new Date().toISOString();

  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Key: { uuid },
    UpdateExpression: 'set ' + updateFields.join(', '),
    ExpressionAttributeValues: expressionAttributeValues,
    ReturnValues: 'ALL_NEW'
  };

  try {
    const result = await dynamodb.update(params).promise();
    return { statusCode: 200, body: JSON.stringify({ message: 'Reel updated', reel: result.Attributes }) };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
};
