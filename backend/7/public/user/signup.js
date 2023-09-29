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
        const response = await axios.post('http://localhost:3000/user/signup',
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

        const loginDetails = {
            email: e.target.email.value,
            password: e.target.password.value
        }

        const response = await axios.post("http://localhost:3000/user/login",
        loginDetails)
        
        const responseMessageElement = document.getElementById('response-message');

        if(response.status === 200){
            console.log("Logged in succesfully")
            const responseData = response.data;
            responseMessageElement.textContent = responseData.message;
            responseMessageElement.style.color = 'green';
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