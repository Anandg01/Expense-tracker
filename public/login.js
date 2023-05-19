async function login(e){
    e.preventDefault();
    try{
    const loginDetails={
        email:e.target.email.value,
       password:e.target.password.value
    }
  //  document.getElementById('email').value='';
   // document.getElementById('password').value='';
const validate= await axios.post(`http://localhost:2000/user/login`,loginDetails)
    console.log(validate.data)
     if(validate.status===401){
     throw new Error({message:'Password Does not matched'})
     }
     else{
        
        window.location.href='./index.html'
        console.log(validate.data.premimum)
        localStorage.setItem('token',validate.data.token)
        localStorage.setItem('premimum',validate.data.premimum)
        alert(validate.data.message)
     }
    }
    catch(err){
        //alert('This Email id is not registered')
        console.log(err)
       document.getElementById('validate').innerHTML=`<p style="color:red;">${err}</p>`
    }
}


function resetPasswaord(){
    window.location.href='./resetpassword.html'
  }
  