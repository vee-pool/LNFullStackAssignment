# LNFullStackAssignment

  ## Backend
    Developed on:
      Node.js v12.14.0
      MySQL 5.1.73

    APIs
    - POST /users - create new user
    - GET /users - get all user
    - DELETE /users/:id - delete a user
    - PATCH /users:id - update a user

    Sample POST request body
    - {
        "mobile_no": "51515415",
        "role": "Admin",
        "name": "asd sdfsdf",
        "email": "sdf@dsf.cpmsa"
      }
      
    Sample PATCH request body
    - {
        "mobile_no": "51515415",
        "role": "Admin",
        "name": "asd sdfsdf",
        "status": "Inactive"
      }

    To run:
      Change database credentials in config/config.json
      In backend folder, do following commands
      >> npm install
      >> set DEBUG=backend:* & npm start
