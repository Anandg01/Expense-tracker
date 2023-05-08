
async function SignUp(event){

    event.preventDefault();
    try{
        
    const userDetails={
        name:event.target.userName.value,
        email:event.target.email.value,
        password:event.target.password.value
    }
    const responce=await axios.post(`http://localhost:2000/user/signUp`,userDetails)
    if(responce.status===201){
    window.location.href='./login.html';
    }
    else if(responce.status===303){
        throw new Error(responce.data.errors[0].message)
    }
    else{
        throw new Error('Faild to Login')
    }

    }
    
    catch(err){
        document.getElementById('error').innerHTML=`<p style='color:red;'>${err}</p>`
    }
}