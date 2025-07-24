# nrl-news-lambda

This project contains a simple AWS Lambda function that serves NRL news from an S3 bucket. It's deployed using the AWS SAM CLI and exposed via API Gateway.

## What It Does

- Fetches `latest_nrl_news.json` from an S3 bucket  
- Returns the file as a JSON response via a REST API  
- Runs as a lightweight Node.js Lambda function  
- Exposed publicly using API Gateway  
- Managed and deployed with AWS SAM  

## Requirements

- AWS SAM CLI  
- Node.js 18+  
- Docker (for local testing only)

## Deployment

To build and deploy the project to AWS:

```bash
sam build
sam deploy --guided


# Run Locally
# To test the function locally:

# Build the project
sam build

# Invoke the function with a sample event
sam local invoke NewsFunction --event events/event.json

# Start the local API
sam local start-api

# Destination
http://localhost:3000/news/