async function signup(e){
    try{
        e.preventDefault()
      
        const signUpDetails = {
            name: e.target.name.value,
            email: e.target.email.value,
            password: e.target.password.value,
            phone: e.target.phone.value
        }
        const baseURL = window.location.protocol + '//' + window.location.host;
        const response = await axios.post(`${baseURL}/user/signup`,
        signUpDetails)

        const responseMessageElement = document.getElementById('response-message');
        if(response.status === 201){
            // console.log("Account created succesfully")
            // const responseData = response.data;
            // responseMessageElement.textContent = responseData.message;
            // responseMessageElement.style.color = 'green';
            // To navigate to a new URL
            window.location.href = `${baseURL}/user/login`;
        }
        else{
            console.log("Error in creating account")
            const responseData = response.data;
            responseMessageElement.textContent = responseData.message;
            responseMessageElement.style.color = 'red'; 
        }
    }
    catch(err){
        const responseDiv = document.getElementById('response-message')
        responseDiv.classList.add('mt-2','alert', 'alert-danger')

        if(err.response.status === 409){
            responseDiv.textContent = "User with this email already exists"
        }
        else{
            responseDiv.textContent = "Internal server error"
        }
    }
}

async function login(e){
    try{
        e.preventDefault()
        const responseMessageElement = document.getElementById('responseP');
        if(responseMessageElement){
            responseMessageElement.remove();
        }
        const baseURL = window.location.protocol + '//' + window.location.host;

        const loginDetails = {
            email: e.target.email.value,
            password: e.target.password.value
        }

        const response = await axios.post(`${baseURL}/user/login`,
        loginDetails)
        
        if(response.status === 200){            
            const token = response.data.token;
            localStorage.setItem('Token', token);

            window.location.href = `${baseURL}/chat`;
        }

    }
    catch(err){
        const responseDiv = document.getElementById('response-message')
        responseDiv.classList.add('mt-2','alert', 'alert-danger')

        if(err.response.status === 404){
            responseDiv.textContent = "Account does not exist."
        }
        else if(err.response.status === 401){
            responseDiv.textContent = "Incorrect email or password"
        }
        else{
            responseDiv.textContent = "Internal server error"
        }
    }
}