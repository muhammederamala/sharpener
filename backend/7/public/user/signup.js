async function signup(e){
    try{
        e.preventDefault()
        console.log(e.target.email.value);

        const signUpDetails = {
            name: e.target.name.value,
            email: e.target.email.value,
            password: e.target.password.value
        }
        console.log(signUpDetails)
        const response = await axios.post('http://localhost:3000/user/signup',
        signUpDetails)
        if(response.status === 201){
            console.log("Account created succesfully")
        }
        else{
            console.log("Error in creating account")
        }
    }
    catch(err){
        console.log(err)
    }
}