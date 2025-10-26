const AWS = require('aws-sdk');

let AmazonDaxClient;
try {
    AmazonDaxClient = require('amazon-dax-client');
} catch (error) {
    console.log('DAX client not available:', error.message);
}

// Initialize DynamoDB client with DAX fallback
let dynamodb;

function getDynamoDBClient() {
    if (dynamodb) {
        return dynamodb;
    }

    if (process.env.DAX_ENDPOINT && AmazonDaxClient) {
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

    return dynamodb;
}

module.exports = { getDynamoDBClient };