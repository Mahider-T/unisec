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
   POST /events/create <br>
        -Description: Creates a new event and inserts it to the database.<br>
        -Request: JSON file containing the proper fields including an image for each event.<br>
        -Response: The newly created document as JSON file.<br>
     
   GET /events/<br>
     -Description: Get a list of all events.<br>
     -Request: None.<br>
     -Response: JSON file with a list of all events in events collection.<br>
     
   GET /events/find/:id <br>
     -Description: Get an event with a given id.<br>
     -Request: None.<br>
     -Response: JSON file of the an event with the given id.<br>
     
   GET /events/search <br>
     -Description: Search an event by title or description.<br>
     -Request: Searching term or sub-string as query parameter. <br>
     -Response: JSON file of documents that match the request. <br>
     
   PUT /events/:id <br>
     -Description: Update an event with a given id. <br>
     -Request: event id as parameter and JSON file for the updated body. <br>
     -Response: updated document as JSON file. <br>
     
   DELETE /events/:id <br>
     -Description: Delete event by id <br>
     -Request: event id as parameter. <br>
     -Response: "Event deleted successfully" on successful operation. <br>
