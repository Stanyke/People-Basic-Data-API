# User-Basic-Data-API

This is a nodejs application (api) with expressjs and mongoDB (for storage) thats used to manage user's basic data

<h3> How to start the application</h3>

- Create a .env file on root directory
- Add the _PORT_ environment variable to anything you wish to connect to.
- Add the _DB_URI_ environment variable to the mongoDB you will be working with.
- Start server using _npm run dev_

<h3><u>How to use the application</u></h3>
There are two apis available and are being detailed below.

- {baseurl}/api/v1/user
    - This endpoint is used to register new user using, there are some required parameters which can be found in the API documentation.

- {baseurl}/api/v1/user/filter/123456?name=eqc:w&age=eq:21&timestamp=gt:1587614025
    - This endpoint is used to fetch a list of users with specified filters which can also be found in the API documentation.
    - Note:
        - The *gt* means greater than
        - The *lt* means less than
        - The *eqc* means include
        - The *eq* means equal to
