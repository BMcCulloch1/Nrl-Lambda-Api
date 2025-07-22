/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html 
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 * 
 */

const {S3Client, GetObjectCommand} = require("@aws-sdk/client-s3")

//Convert Readabletream into a string 
const streamToString = (stream) => 
    new Promise((resolve, reject) => {
        const chunks = [];
        stream.on("data", (chunk) => chunks.push(chunk));
        stream.on("error", reject);
        stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf-8")));
    });

const lambdaHandler = async (event, context) => {
    try {
        const client = new S3Client({region: "eu-west-1"});

        // Retrieve JSON file from S3 bucket 
        const command = new GetObjectCommand({
            Bucket: "nrl-bucket-latest-news",
            Key: "latest_nrl_news.json"
        });

        
        //Covert S3 file to text 
        const response = await client.send(command);
        const jsonTxt = await streamToString(response.Body);

        //Convert text to JSON
        const newsData = JSON.parse(jsonTxt);

        //API response
        return {
            statusCode: 200,
            body: JSON.stringify(newsData),
        };

    } catch (err) {
        console.error(err);
        return {
            statusCode: 500,
            body: JSON.stringify({error: "Something went wrong"}),
        };
    }


};

module.exports = {lambdaHandler};

