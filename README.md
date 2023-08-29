# Dalia Express API

Welcome to the Dalia Express API documentation. This API serves as the backend for the Next.js frontend application, providing CRUD operations for managing plant data.

## Table of Contents
- [Overview](#overview)
- [CRUD Operations](#crud-operations)
- [Running the API](#running-the-api)

## Overview
The Dalia Express API is built to work in conjunction with the frontend application developed using Next.js. It facilitates Create, Read, Update, and Delete (CRUD) operations for plant data.

## CRUD Operations
The API follows a schema defined using Zod, which enforces data validation. The documented operations with examples are available at localhost:8000/api-docs, provided by Swagger.

## Running the API
Currently, the Dalia Express API is not deployed on Vercel and can only be run locally using Docker.

To run the API locally, follow these steps:

1. Install Docker on your system if not already installed.
2. Clone this repository: `git clone <repository_url>`
3. Navigate to the project directory: `cd <project_directory>`
4. Build the Docker image: `docker-compose build`
5. Run the Docker container: `docker-compose up`

The API should now be up and running locally. You can access it at `http://localhost:8000`.

Please note that this README provides a brief overview and instructions. For more detailed information, code examples, and usage instructions, refer to the source code and associated documentation.

## Deployment
Currently the application is not implemented in Vercel due to a configuration problem in the compiled typescript files.
