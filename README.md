# UNISEC-backend

Back-end for UNISEC-Ethiopia website using express.js and MongoDB.

## Installation

1. Clone the repository.
2. Install the dependencies by running `npm install`.
3. Set up the required environment variables.
4. Run the application using the command `npm start`.

## Usage

You can use any API building application like Postman to test the API endpoints provided in this project.

## API Endpoints
1. ## Events
   POST /events/create
     -Description: Creates a new event and inserts it to the database.<br>
     -Request: JSON file containing the proper fields including an image for each event.<br>
     -Response: The newly created document as JSON file.<br>
   GET /events/
     -Description: Get a list of all events.
     -Request: None.
     -Response: JSON file with a list of all events in events collection.
   GET /events/find/:id
     -Description: Get an event with a given id.
     -Request: None.
     -Response: JSON file of the an event with the given id.
   GET /events/search
     -Description: Search an event by title or description.
     -Request: Searching term or sub-string as query parameter.
     -Response: JSON file of documents that match the request.
   PUT /events/:id
     -Description: Update an event with a given id
     -Request: event id as parameter and JSON file for the updated body.
     -Response: updated document as JSON file. 
   DELETE /events/:id
     -Description: Delete event by id
     -Request: event id as parameter.
     -Response: "Event deleted successfully" on successful operation.
