				Image Analyzer API
					By
				Sai Kumar Erpina
				   801149962
Steps to work on API:
1. Use API URL  http://159.65.32.185:3000/api/v1/analyzeImage as a post request.
2. Any image URL can be passed as a body parameter using the name ‘imageUrl’.
3. Once the parameter is passed, the API will analyze the image and return the details of the image as a Json response.

Working example using postman: 

Open postman and use the above-mentioned API URL. Select the request type to ‘POST’

BODY PARAMETERS

Name: imageUrl

Description: url of the image that needs to be analyzed.

Example:
{
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/3/3c/Shaki_waterfall.jpg"
}


Click on the ‘body’ and select the data type as ‘JSON’.
Enter the json text with ‘imageUrl’ as parameter and https://upload.wikimedia.org/wikipedia/commons/3/3c/Shaki_waterfall.jpg as a value to the parameter.

Send the request.

Once the request is sent, the API will analyze the image and returns the details as a response as below.


Using JSON Web Token

Steps to work on API:

1. Use the URL  http://159.65.32.185:3000/api/v1/signIn/analyzeImage as a post request to generate the token for the image analyzer API. To this request, ‘username’ and ‘password’ body parameters have to be passed. Enter username=saikumar and password=saikumar to generate the token.

BODY PARAMETERS

Name: username

Description: enter the username of the user.

Name: password

Description: enter the password of the user.

Use the below example:
{
“username”:”saikumar”,
“password”:”saikumar”
}


2. Use the URL http://159.65.32.185:3000/api/v1/user/analyzeImage as a post request to analyze an image. To this request, the generated token in the step1 has to be passed as an ‘Authorization’ parameter in the header. Also, pass the imageUrl as a body parameter and send the request.

Header: 

Authorization: Generated Token in the step1

Body Param

{
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/3/3c/Shaki_waterfall.jpg"
}


3. Once the parameters are passed, the API will analyze the image and return the details of the image as a Json response.





