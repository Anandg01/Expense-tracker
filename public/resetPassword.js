let email;
function resetpas(e){
    e.preventDefault()
const email=e.target.email.value;
    console.log('jay Shree Ram',email)
   //axios.post('http://localhost:2000/user/forgetpassword',{email:email})
   axios.post('http://localhost:2000/password/forgetpassword',{email:email})
    .then(res=>{
      printmessage(res)
  console.log(res)
    }).catch((err,res)=>{
      console.error(err)
      console.log(res)
      printmessage(undefined)
    })
}

function printmessage(res){
  if(!res){
    document.getElementById('msg').innerHTML=`Something went wrong`
  }
  else{
    document.getElementById('msg').innerHTML=`${res.data.message}`

  }
}