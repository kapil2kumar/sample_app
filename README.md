# sample-app

*Sample App with Authentication*

Write a REST API with token-based authentication and handling various HTTP status codes as per REST standards.
Write API’s for basic CRUD operation on an entities/collection called Agency and client which has below fields. One Agency can have multiple clients.
Agency
AgencyId, Name, Address1, Address2, State, City, Phone Number
Beside Address2 all other fields are required.
	Client
	ClientId, AgencyId, Name, Email, PhoneNumber, TotalBill (all are required fields)
You have to create 3 RESTFUL API’s which will read/write to MongoDB with proper validation.
1st API should create an agency and client in single request
2nd API should update a client detail.
3rd API should return name of agency along with client details which has top client(s) with maximum total bill, below fields should be part of response.
        AgencyName, ClientName, TotalBill


## Installation

Installing this project is simple, run the following commands:

```console
$ npm install
$ node server.js or npm start
```

To launch the web server.

**NOTE**: You must have MongoDB installed and working locally in order to run
this project.  It will work with all the default MongoDB options.
