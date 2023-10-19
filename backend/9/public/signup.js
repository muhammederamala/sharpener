async function signup(e){
    try{
        e.preventDefault()
        console.log(e.target.email.value);
      
            const signUpDetails = {
            name: e.target.name.value,
            email: e.target.email.value,
            password: e.target.password.value,
            phone: e.target.phone.value
        }
        console.log(signUpDetails)
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
            window.location.href = `${baseURL}/user/login`; // Replace with the desired URL
        }
        else{
            console.log("Error in creating account")
            const responseData = response.data;
            responseMessageElement.textContent = responseData.message;
            responseMessageElement.style.color = 'red'; 
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