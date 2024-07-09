##### Salon App Api Endpoints #####


##  User Signup Endpoint:

Method: POST
URL: http://localhost:3000/api/customer/signup
Body: JSON
json
Copy code
{
    "fullName": "John Doe",
    "email": "john@example.com",
    "phoneNumber": "1234567890",
    "gender": "male",
    "password": "password123"
}
Click on the "Send" button to make the request.
Partner Signup Endpoint:

#### for login 

Method: POST
URL: http://localhost:3000/api/customer/login
Body: JSON
json
Copy code
{
   
    "email": "mangesh@example.com",   
    "password": "password123"
}





Here's how you can test the "GET Profile" endpoint with authentication in Postman:

Method: GET
URL: http://localhost:3000/api/customer/profile
Headers:
Key: x-auth-token
Value: <Your JWT Token>
Body: None
Click on the "Send" button to make the request.



To test the update profile endpoint, follow these steps:

Method: PUT
URL: http://localhost:3000/api/customer/profile
Headers:
Content-Type: application/json
x-auth-token: [JWT Token] (if authentication is required)
Body: JSON
json

{
    "fullName": "Updated Name",
    "phoneNumber": "1234567890",
    "gender": "female",
    "email": "anything@gamil.com"
}
Click on the "Send" button to make the request.


To test the DELETE Profile functionality in Postman, you can follow these steps:

Open Postman.
Select the DELETE method.
Enter the URL: http://localhost:3000/api/customer/profile.
If authentication is required, add the x-auth-token header with the JWT token obtained after logging in.
Leave the body empty.
Click on the "Send" button to make the request.



to fetch all profiles of customer 

Method: GET
URL: http://localhost:3000/api/customer/profiles

Body: None

## for partner 

Method: POST
URL: http://localhost:3000/api/partner/signup
Body: JSON
json
Copy code
{
    "fullName": "Jane Smith",
    "email": "jane@example.com",
    "phoneNumber": "0987654321",
    "gender": "female",
    "password": "password123",
    "role": "owner"
}
Click on the "Send" button to make the request.
These examples will register a user and a partner respectively. You can then use similar requests to test other endpoints such as login.


for login
Method: POST
URL: http://localhost:3000/api/partner/login
Body: JSON
json
Copy code
{
   
    "email": "jane@example.com",
   
    "password": "password123"
    
}



Get Partner Profile: Retrieve partner profile information.

Method: GET
URL: http://localhost:3000/api/partner/profile
Headers:
Key: x-auth-token
Value: <access_token_received_after_login>
Update Partner Profile: Update partner profile information.

Method: PUT
URL: http://localhost:3000/api/partner/profile
Headers:
Key: Content-Type
Value: application/json
Key: x-auth-token
Value: <access_token_received_after_login>
Body: JSON
json

{
    "fullName": "Updated Name",
    "email": "updated_email@example.com",
    "phoneNumber": "9876543210",
    "gender": "female"
}
Delete Partner Profile: Delete partner profile.

Method: DELETE
URL: http://localhost:3000/api/partner/profile
Headers:
Key: x-auth-token
Value: <access_token_received_after_login>


#### Salon Management APIs:
#### /api/partner/salon/add (POST): Add a new salon.
#### /api/partner/salon/:id/edit (PUT): Update salon details.




Add a New Salon (/api/partner/salon/add - POST):
Method: POST
URL: http://localhost:3000/api/partner/salon/add (Replace localhost:3000 with your actual server URL)
Headers:

Key: Content-Type
Value: multipart/form-data
Key: x-auth-token (if authentication is required, include the JWT token obtained after login)

Body:
Select form-data option
Add the following key-value pairs:
Key: name, Value: My Salon
Key: address, Value: 123 Main St
Key: city, Value: Cityville
Key: state, Value: Stateville
Key: country, Value: Countryland
Key: zipCode, Value: 12345
Key: ShopActLicense, Value: 21erfohro
Key: gst, Value: 3245jfewf
key: partnerEmail, value: mangesh@gmail.com
Key: images, Value: Select multiple image files from your local system
After setting up the request in Postman as described above, click on the "Send" button to make the POST request to add a new salon. Make sure to include the necessary headers and form-data parameters according to the API requirements.


#### To get salons details 

Method: GET
URL: https://naayee.store/api/salon/email/m@gmail.com


Click "Send" to execute the request and receive a response containing all salons associated with the authenticated partner.



Click on the "Send" button to make the POST request to create a new salon.
Update Salon Details (/api/partner/salon/:id/edit - PUT):

Open Postman and create a new request with the PUT method.
Set the request URL to http://localhost:3000/api/partner/salon/:id/edit where :id is the ID of the salon you want to update (replace localhost:3000 with your actual server URL).
Add the required headers, such as Content-Type: application/json and x-auth-token if authentication is required.
In the request body, provide JSON data with the updated salon details. For example:
json

{
    "name": "BC Salon",
    "address": "3 Main Street",
    "city": "New York",
    "state": "Nc",
    "country": "US",
    "zipCode": "10091"
}

Click on the "Send" button to make the PUT request to update the salon details.



### Salon Management APIs:
#### /api/partner/salon/:id/services (GET, POST, PUT, DELETE): Manage services offered by the salon.




#### Step 1: Add a New Service to a Salon

### Method: POST
URL: http://localhost:3000/api/partner/salon/:salon-id/services
Replace :id with the actual salon ID.
Headers:
Content-Type: application/json
x-auth-token: [Your JWT token if authentication is required]
Body:
json
Copy code
{
    "name": "Haircut",
    "description": "Professional haircut service",
    "price": 50
}
Click on the "Send" button to make the POST request.


### GET All Services
Method: GET
URL: http://localhost:3000/api/partner/salon/salon:id/services
Replace :id with the actual salon ID.
Headers:
Content-Type: application/json
x-auth-token: [Your JWT token if authentication is required]
Body: None
Click on the "Send" button to make the GET request.
POST Add a New Service

PUT Update a Service

### Method: PUT
URL: http://localhost:3000/api/partner/salon/:id/services/:serviceId
Replace :id with the actual salon ID and :serviceId with the ID of the service you want to update.
Headers:
Content-Type: application/json
x-auth-token: [Your JWT token if authentication is required]
Body:
json
Copy code
{
    "name": "Haircut",
    "description": "Updated haircut service description",
    "price": 55
}
Click on the "Send" button to make the PUT request.
DELETE a Service

### Method: DELETE
URL: http://localhost:3000/api/partner/salon/:id/services/:serviceId
Replace :id with the actual salon ID and :serviceId with the ID of the service you want to delete.
Headers:
Content-Type: application/json
x-auth-token: [Your JWT token if authentication is required]
Body: None
Click on the "Send" button to make the DELETE request.

##### Salon Management APIs:
## /api/partner/salon/:id/staff (GET, POST, PUT, DELETE): Manage staff members working at the salon.

1. #### Add a new staff member (POST)
Method: POST
URL: http://localhost:3000/api/partner/salon/:id/staff (Replace :id with the actual salon ID)
Headers:
Content-Type: application/json
x-auth-token: [Your JWT token]
Body (raw JSON):
json
Copy code
{
  "name": "John Doe",
  "position": "Hair Stylist"
}
Send the request to add a new staff member to the salon.


2. ##### Get all staff members by salon ID (GET)
Method: GET
URL: http://localhost:3000/api/partner/salon/:id/staff (Replace :id with the actual salon ID)
Headers:
Content-Type: application/json
x-auth-token: [Your JWT token]
Body: None
Send the request to retrieve all staff members associated with the specified salon.

3. #### Update staff member by ID (PUT)
Method: PUT
URL: http://localhost:3000/api/partner/salon/:id/staff/:staffId (Replace :id with the salon ID and :staffId with the staff member's ID you want to update)
Headers:
Content-Type: application/json
x-auth-token: [Your JWT token]
Body (raw JSON):
json
Copy code
{
  "name": "Jane Doe",
  "position": "Senior Stylist"
}
Send the request to update the details of the specified staff member.

4. ####  Delete staff member by ID (DELETE)
Method: DELETE
URL: http://localhost:3000/api/partner/salon/:id/staff/:staffId (Replace :id with the salon ID and :staffId with the staff member's ID you want to delete)
Headers:
Content-Type: application/json
x-auth-token: [Your JWT token]
Body: None
Send the request to delete the specified staff member from the salon.
Ensure that you replace placeholders such as :id, :staffId, and [Your JWT token] with actual values according to your application and authentication setup. These examples cover the basic operations for managing staff members using the provided API endpoints. Adjust the request bodies and parameters as needed based on your API design and requirements.



User Profile APIs:
get all saloon
get all services under saloon
get all staff under saloon

first customer login 

##### Get All Saloons
Method: GET
URL: http://localhost:3000/api/customer/salons (Replace localhost:3000 with your actual server URL if it's different)
Headers: Add any required headers such as authentication tokens if your API requires them.

#### Get All Services Under a Saloon
Method: GET
URL: http://localhost:3000/api/customer/salons/:id/services (Replace :id with the actual ID of the saloon)
Headers: Include any necessary headers.
#### Get All Staff Under a Saloon
Method: GET
URL: http://localhost:3000/api/customer/saloons/:id/staff 
(Replace :id with the actual ID of the saloon)
Headers: Include any required headers.



Add a New Booking
Endpoint: POST /api/customer/bookings
Body (JSON):
json
Copy code
{
  "salonId": 1,
  "serviceId": 1,
  "staffId": 1,
  "customerEmail": "customer@example.com",
  "bookingDate": "2024-05-15",
  "startTime": "12:00:00",
  "endTime": "11:00:00"
}
This endpoint adds a new booking for the specified parameters. Adjust the values as per your system setup.


for update booking by customer
Set the request type to PUT.
Enter the URL for your endpoint. For example:

Copy code
PUT http://localhost:3000/api/customer/bookings/:id

In the Body section, select raw and choose JSON format.
Provide the JSON data for updating the booking. Here's an example JSON with fields you can update:

{
    "bookingDate": "2024-05-15",
    "startTime": "12:00:00",
    "endTime": "13:00:00"
}

Delete a Booking
Endpoint: DELETE /api/customer/bookings/{bookingId}
Replace {bookingId} with the actual ID of the booking you want to delete.
This endpoint deletes the specified booking.





partner - 
Endpoints:GET  /api/partner/bookings
 
Get all salon bookings.

Endpoints: put
/api/partner/bookings/:bookingId/confirm
approval by partner  


<!-- admin apis  -->
#### for fetch all user profile
get method
https://naayee.store/api/admin/users


#### for fetch all partners profiles
get method
https://naayee.store/api/admin/partners

#### for fetch all salons profile
get method
https://naayee.store/api/admin/salons

### Admin login and signup

Set the request method to POST.
Enter the URL for the signup endpoint: http://localhost:3000/api/admin/signup.
Go to the Body tab.
Select raw and set the format to JSON.
Enter the following JSON data:
json
Copy code
{
    "fullName": "Admin Name",
    "email": "admin@example.com",
    "password": "securepassword123"
}
Click Send.
If the signup is successful, you should receive a response with a message indicating that the admin has been registered successfully.

### Step 2: Admin Login
Create a new request.
Set the request method to POST.
Enter the URL for the login endpoint: http://localhost:3000/api/admin/login.
Go to the Body tab.
Select raw and set the format to JSON.
Enter the following JSON data:
json
Copy code
{
    "email": "admin@example.com",
    "password": "securepassword123"
}
