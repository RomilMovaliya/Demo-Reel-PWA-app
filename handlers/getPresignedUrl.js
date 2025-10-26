const AWS = require('aws-sdk');
const s3 = new AWS.S3();

module.exports.handler = async (event) => {
  try {
    console.log('Event received:', JSON.stringify(event, null, 2));
    
    // Parse and validate input
    let body;
    try {
      body = JSON.parse(event.body);
    } catch (parseError) {
      console.error('Failed to parse request body:', parseError);
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Invalid JSON in request body' }),
        headers: { 'Access-Control-Allow-Origin': '*' }
      };
    }

    const { fileName, fileType } = body;

    // Validate required parameters
    if (!fileName || !fileType) {
      console.error('Missing required parameters:', { fileName, fileType });
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'fileName and fileType are required' }),
        headers: { 'Access-Control-Allow-Origin': '*' }
      };
    }

    // Check if S3_BUCKET environment variable is set
    if (!process.env.S3_BUCKET) {
      console.error('S3_BUCKET environment variable not set');
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'S3_BUCKET not configured' }),
        headers: { 'Access-Control-Allow-Origin': '*' }
      };
    }

    console.log('Generating presigned URL for:', { fileName, fileType, bucket: process.env.S3_BUCKET });

    const params = {
      Bucket: process.env.S3_BUCKET,
      Key: fileName,
      Expires: 1800, // URL valid for 30 minutes
      ContentType: fileType
    };

    const uploadURL = await s3.getSignedUrlPromise('putObject', params);
    
    console.log('Successfully generated presigned URL');

    return {
      statusCode: 200,
      body: JSON.stringify({ uploadURL }),
      headers: { 
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      }
    };
  } catch (error) {
    console.error('Error generating presigned URL:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Failed to generate presigned URL',
        details: error.message 
      }),
      headers: { 'Access-Control-Allow-Origin': '*' }
    };
  }
};
