const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
const dynamodb = new AWS.DynamoDB.DocumentClient();

module.exports.handler = async (event) => {
  try {
    const data = JSON.parse(event.body);
    const { username, description, tags, video_url, profile_image_url } = data;

    if (!username || !description || !tags || !video_url) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Missing fields' }) };
    }

    const reel = {
      uuid: uuidv4(),
      username,
      description,
      tags: Array.isArray(tags) ? tags : tags.split(','),
      video_url,
      profile_image_url: profile_image_url || null,
      likes: 0,
      shares: 0,
      views: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    await dynamodb.put({ TableName: process.env.DYNAMODB_TABLE, Item: reel }).promise();

    return { statusCode: 201, body: JSON.stringify({ message: 'Reel created', reel }) };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
};
