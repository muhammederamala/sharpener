async function signup(e){
    try{
        e.preventDefault()
        console.log(e.target.email.value);

        if(e.target.password.value != e.target.password2.value){
            const responseMessageElement = document.getElementById('response-message');
            responseMessageElement.textContent = "Passwords do not match";
            responseMessageElement.style.color = 'red'; 
        }

        else{        
            const signUpDetails = {
            name: e.target.name.value,
            email: e.target.email.value,
            password: e.target.password.value
        }
        console.log(signUpDetails)
        const baseURL = window.location.protocol + '//' + window.location.host;
        const response = await axios.post(`${baseURL}/user/signup`,
        signUpDetails)

        const responseMessageElement = document.getElementById('response-message');
        if(response.status === 201){
            console.log("Account created succesfully")
            const responseData = response.data;
            responseMessageElement.textContent = responseData.message;
            responseMessageElement.style.color = 'green';
        }
        else{
            console.log("Error in creating account")
            const responseData = response.data;
            responseMessageElement.textContent = responseData.message;
            responseMessageElement.style.color = 'red'; 
        }
    }
    }
    catch(err){
        console.log(err)
    }
}

async function login(e){
    try{
        e.preventDefault()
        const baseURL = window.location.protocol + '//' + window.location.host;

        const loginDetails = {
            email: e.target.email.value,
            password: e.target.password.value
        }

        const response = await axios.post(`${baseURL}/user/login`,
        loginDetails)
        
        const responseMessageElement = document.getElementById('response-message');

        if(response.status === 200){
            console.log("Logged in succesfully")
            
            const token = response.data.token;
            localStorage.setItem('Token', token);

            window.location.href = response.data.redirectTo;
        }
        else{
            console.log("Error logging into account")
            const responseData = response.data;
            responseMessageElement.textContent = responseData.message;
            responseMessageElement.style.color = 'red'; 
        }
    }
    catch(err){
        console.log(err)
    }
}


async function resetPassword(e) {
    e.preventDefault()
    // Get the values of the new password and confirm password fields
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Check if the passwords match
    if (newPassword !== confirmPassword) {
        alert('Passwords do not match. Please try again.');
        return;
    }

    // Retrieve the 'passwordId' parameter from the URL query parameters
    const urlSearchParams = new URLSearchParams(window.location.search);
    const passwordId = urlSearchParams.get('passwordId'); // Assuming 'passwordId' is the parameter name in the URL

    if (!passwordId) {
        alert('No passwordId parameter found in the URL.');
        return;
    }

    // Prepare the data to be sent in the POST request
    console.log("this is the password",newPassword)
    const requestData = {
        id: passwordId, // Include the retrieved passwordId parameter
        password: newPassword,
    };
    const baseURL = window.location.protocol + '//' + window.location.host;

    // Send the POST request to your backend
    await axios.post(`${baseURL}/user/password/reset-password/${id}`, requestData)
        .then((response) => {
            // Handle success, e.g., show a success message
        })
        .catch((error) => {
            // Handle error, e.g., show an error message
            console.error('Password reset error:', error);
            alert('An error occurred while resetting the password.');
        });
}


document.addEventListener("DOMContentLoaded", function () {
    const resetPasswordForm = document.getElementById("reset-password-form");
    const responseMessage = document.getElementById("response-message");

    resetPasswordForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent the default form submission

        const email = document.getElementById("email").value;

        // Send a POST request to your backend route with the email as the request body
        axios
            .post("/password/forgot-password", { email })
            .then((response) => {
                // Handle the response as needed, e.g., show a success message
                responseMessage.textContent = response.data.message;
            })
            .catch((error) => {
                // Handle errors, e.g., show an error message
                responseMessage.textContent = "Error: " + error.response.data.message;
            });
    });
});

