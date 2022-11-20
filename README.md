# info6150-assignment8
This is a simple api to demonstrate RestFul APIs using ExpressJs, MongoDB
Created 4 rest end points to perform CRUD operations on users mongoDB collection

* /users/create: Created a create post endpoint to create new users in mongoDB collection
    * Method: Post
    * Returns: Newly created user in json format
    * Errors: Throws CreateErorr when user with mail id already exists in DB
* /users/getAll: Created a getAll get endpoint to get a list of all available users in the users collection
    * Method: Get
    * Returns: A json list of all users from the DB
    * Errors: None
* /users/update/:mailid: Created a update put endpoint to update the user with the mail Id
    * Method: Put
    * Returns: Updated user in json format
    * Errors: Throws UpdateError when user with mail id does not exists in DB
* /users/delete/:mailid: Created a delete endpoint with html delete method to delete a user with mail id
    * Method: Delete
    * Returns: List of users in the DB after deletion
    * Errors: Throws DeleteError when user with mail id does not exists in DB

### Validations ###
* Created userValidations.js file which contains validations for fullname, email, password
* userValidate function is used to validate the input fields and returns a json with errors