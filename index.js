const token=localStorage.getItem('token')
function addexpance(e){
    e.preventDefault();
    console.log(e.target.Description.value)
    const expanceDetais={
        expAmount:e.target.expanceAmount.value,
        description:e.target.Description.value,
        catagory:e.target.catagory.value,
        userId:1
    }
  console.log(expanceDetais)
  //showOncreen(expanceDetais)
const validate=axios.post(`http://localhost:2000/addExpance `,expanceDetais,{headers:{'Authorizan':token}})
  .then(res=>{
   console.log(res.data)
   showOncreen(res.data) 
  })
  .catch(err=>{
 //console.log(err)
  })
}


function showOncreen(obj){
    const parant=document.getElementById('addTable');
    const table=`<tr id='${obj.id}'> <td>${obj.expAmount}</td> <td>${obj.description} </td> <td>${obj.catagory} </td> <td> <button onclick="deleteClick(${obj.id})">Delete Expance</button></td> </tr>`
   parant.innerHTML+=table;
}

function deleteClick(id){
    axios.delete(`http://localhost:2000/deleteExp/${id}`)
    .then(data=>{
     removeOnscreen(data.data.id)
    })
  .catch(err=>console.log(err))
}

function removeOnscreen(id){
   const tr=document.getElementById(id)
   tr.parentNode.removeChild(tr)
}

document.addEventListener('DOMContentLoaded',()=>{
  console.log(token)
    axios.get(`http://localhost:2000/allExpance`,{headers:{'Authorizan':token}})
    .then(res=>{
        const data=res.data;
        data.forEach(element=>{
            showOncreen(element)
        })
    })
    .catch(err=>console.log(err))
})