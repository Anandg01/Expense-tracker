let page=1;
let perPage=5;
const token=localStorage.getItem('token')
const premium=localStorage.getItem('premimum')

const pagination=document.getElementById('pagination')

function addexpance(e){
    e.preventDefault();
    const currentDate = new Date();
    const day = currentDate.getDate();
   const month = currentDate.getMonth()+1;
    const year = currentDate.getFullYear();
console.log(currentDate,day, "month", month,year)
    // add leading zeros to day and month if needed
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;

    // create the date string in date-month-year format

    const dateStr = `${formattedDay}-${formattedMonth}-${year}`;
    const expanceDetais={
        amount:e.target.expanceAmount.value,
        description:e.target.Description.value,
        catagory:e.target.catagory.value,
        date:dateStr
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
    const table=`<tr id='${obj.id}'> <td>${obj.date}</td> <td>${obj.amount}</td> <td>${obj.description} </td> <td>${obj.catagory} </td> <td> <button class='btn' onclick="deleteClick(${obj.id})">Delete Expance</button></td> </tr>`
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

// function leaderBoard(){
//   axios.get('http://localhost:2000/leaderbord').then(res=>{
//     document.getElementById('ledtit').innerHTML='LeaderBoard'
//     document.getElementById('leader').innerHTML=``
//   res.data.forEach(data=>{
//     addleaderboard(data)
//   })
//   })
//   .catch(err=>console.log(err))
//   }

// function addleaderboard(obj){
//   const prNode=document.getElementById('leader');
//   const li=`<li>Name- ${obj.name}, Total Expance :${obj.totalexpance} </li>`
//   prNode.innerHTML+=li;
// }
// show all expence when reset

document.addEventListener('DOMContentLoaded',()=>{
 axios.get('/checkpremimum',{headers:{'Authorizan':token}})
 .then(res=>{
  console.log(res.data)
  if(res.data[0].ispremiumuser){
    console.log('true')
   const reportBtn=document.getElementById('reportKey')
   reportBtn.removeAttribute('onclick')
   reportBtn.setAttribute("href","reports.html")
   const ldrbtn=document.getElementById('leaderBordKey')
   ldrbtn.removeAttribute('onclick')
   ldrbtn.setAttribute("href","/leaderboard.html")
   document.getElementById('rozerpay').innerText="Premimum User"
  }
  else{
    console.log(false)
  }
 })
 .catch(err=>console.log(err))

  if(!token){
    window.location.href='./login.html';
  }
    axios.get(`http://localhost:2000/allExpance?page=1`,{headers:{'Authorizan':token}})
    .then(res=>{
        const expence=res.data;
        console.log(expence.total)
      expence.data.forEach(element=>{
            showOncreen(element)
        })
        console.log(expence)
        showpagination(expence)
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

function downloadAll(){
 
  axios.get('http://localhost:2000/allFileurl', { headers: {"Authorizan" : token} })
  .then(fileurl=>{
    const ul= document.getElementById('listof-file')
    ul.innerHTML=``
    fileurl.data.forEach(data=>{
      const li=`<l1 id=${data.id} ><a href="${data.fileURL}">${data.id} </a>Expences</l1>`
     ul.innerHTML+=li;
    })
  })


}

function showpagination({ hasPrev,hasNextpage,prevPage, currentPage, nextPage}){
  pagination.innerHTML=''
  if(hasPrev){
const btn2=document.createElement('button')
btn2.innerHTML=prevPage
btn2.addEventListener('click',()=>{page=prevPage; getProducts(prevPage)})
pagination.appendChild(btn2)
  }
  const btn1=document.createElement('button')
btn1.innerHTML=`<h1>${currentPage} </h1>`
btn1.addEventListener('click',()=>getProducts(currentPage))
pagination.appendChild(btn1)
if(hasNextpage){
  const btn3=document.createElement('button')
btn3.innerHTML=nextPage
btn3.addEventListener('click',()=>{page=nextPage; getProducts(nextPage)})
pagination.appendChild(btn3)
}
}

function getProducts(page){
  axios.get(`http://localhost:2000/allExpance?page=${page}&perPage=${perPage}`,{headers:{'Authorizan':token}})
  .then(res=>{
    const parant=document.getElementById('addTable');
parant.innerHTML=`<tr><th>Date</th><th>Expance Amount</th><th>Description</th><th>catagery</th><th>Action</th> </tr>`
      const expence=res.data;
     expence.data.forEach((obj)=>{
      showOncreen(obj)
     })
      showpagination(expence)
  })
  .catch(err=>console.log(err))
}

const selectElement = document.getElementById('setrowExpance');

selectElement.addEventListener('change', () => {
  const selectedValue = selectElement.value;
  perPage=selectedValue;
  getProducts(page, perPage)
});
