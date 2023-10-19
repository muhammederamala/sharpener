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
    catch(err){
        console.log(err)
    }
}