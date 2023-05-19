
const token=localStorage.getItem('token')
const premium=localStorage.getItem('premimum')
function addexpance(e){
    e.preventDefault();
    console.log(e.target.Description.value)
    const expanceDetais={
        expAmount:e.target.expanceAmount.value,
        description:e.target.Description.value,
        catagory:e.target.catagory.value,
        userId:1
    }
  //showOncreen(expanceDetais)
const validate=axios.post(`http://localhost:2000/addExpance `,expanceDetais,{headers:{'Authorizan':token}})
  .then(res=>{
   showOncreen(res.data) 
  })
  .catch(err=>{
 //console.log(err)
  })
}


function showOncreen(obj){
  document.getElementById('expanceAmount').value='';
  document.getElementById('Description').value='';
    const parant=document.getElementById('addTable');
    const table=`<tr id='${obj.id}'> <td>${obj.expAmount}</td> <td>${obj.description} </td> <td>${obj.catagory} </td> <td> <button onclick="deleteClick(${obj.id})">Delete Expance</button></td> </tr>`
   parant.innerHTML+=table;
}

function deleteClick(id){
    axios.delete(`http://localhost:2000/deleteExp/${id}`,{headers:{'Authorizan':token}})
    .then(data=>{
      removeOnscreen(data.data[0].id)
    })
  .catch(err=>console.log(err))
}

function removeOnscreen(id){
   const tr=document.getElementById(id)
   tr.parentNode.removeChild(tr)
}

function addPremium(){
  document.getElementById('premium').innerHTML=`<h4>Premium User</h4>
   <button id="leaderbtn" onclick="leaderBoard()">LeaderBoard</button>`
}

function leaderBoard(){
  axios.get('http://localhost:2000/leaderbord').then(res=>{
    document.getElementById('ledtit').innerHTML='LeaderBoard'
  res.data.forEach(data=>{
    addleaderboard(data)
  })
  })
  .catch(err=>console.log(err))
  }

function addleaderboard(obj){
  const prNode=document.getElementById('leader');
  const li=`<li>Name- ${obj.name}, Total Expance :${obj.totalexpance} </li>`
  prNode.innerHTML+=li;
}

document.addEventListener('DOMContentLoaded',()=>{
  if(premium==='true'){
    //console.log(premium)
   addPremium();
  }
  if(!token){
    window.location.href='./login.html';
  }
    axios.get(`http://localhost:2000/allExpance`,{headers:{'Authorizan':token}})
    .then(res=>{
        const data=res.data;
        data.forEach(element=>{
            showOncreen(element)
        })
    })
    .catch(err=>console.log(err))
})

//add logout 

document.getElementById('logout').addEventListener('click', ()=>{
localStorage.removeItem('token');
window.location.href='./login.html';
})

// add payment method

document.getElementById('rozerpay').addEventListener('click', async (e) => {
  let token =localStorage.getItem('token')
  const response = await axios.get(`http://localhost:2000/premium`, {
    headers: { 'Authorizan': token }
  });
  console.log(response.data.key_id,response.data.order.id);

  const options = {
    key: response.data.key_id,
    order_id: response.data.order.id,
    handler:async function(response){
      axios.post(`http://localhost:2000/updatetransastion`,
      {order_id:options.order_id,payment_id:response.razorpay_payment_id,paymentStatus:true}, 
      {headers: { 'Authorizan': token }}) 
      alert('you are a premimum')
      addPremium()
    }
  };

  const paymentButton = new Razorpay(options);
 paymentButton.open();
  e.preventDefault();
  paymentButton.on('payment.failed', async function (response) {
  await  axios.post(`http://localhost:2000/updatetransastion`,
    {order_id:options.order_id,payment_id:response.error.metadata.payment_id,paymentStatus:false}, 
    {headers: { 'Authorizan': token }}) 
    // handle the payment failure
    console.log(response.error.metadata.payment_id)
    alert('something went wrong')

  });
});

//add download file api

function download(){
  axios.get('http://localhost:2000/download', { headers: {"Authorizan" : token} })
  .then((response) => {
      if(response.status === 201){
          //the bcakend is essentially sending a download link
          //  which if we open in browser, the file would download
          var a = document.createElement("a");
          a.href = response.data.fileURL;
          a.download = 'myexpense.csv';
          a.click();
      } else {
          throw new Error(response.data.message)
      }

  })
  .catch((err) => {
      showError(err)
  });
}

function showError(err){
  document.body.innerHTML += `<div style="color:red;"> ${err}</div>`
}