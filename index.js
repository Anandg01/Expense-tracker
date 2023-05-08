function addexpance(e){
    e.preventDefault();
    console.log(e.target.Description.value)
    const expanceDetais={
        expAmount:e.target.expanceAmount.value,
        description:e.target.Description.value,
        catagory:e.target.catagory.value
    }
  console.log(expanceDetais)
  //showOncreen(expanceDetais)
  const validate=  axios.post(`http://localhost:2000/addExpance`,expanceDetais)
  .then(res=>{
   console.log(res.data)
   showOncreen(res.data) 
  })
  .catch(err=>{
console.log(err)
  })
}


function showOncreen(obj){
    const parant=document.getElementById('addTable');
    const table=`<tr id='${obj.id}'> <td>${obj.expAmount}</td> <td>${obj.description} </td> <td>${obj.catagory} </td> <td> <button onclick="deleteClick(${obj.id})">Delete Expance</button></td> </tr>`
   parant.innerHTML+=table;
}

function deleteClick(id){
    console.log(id)
}

document.addEventListener('DOMContentLoaded',()=>{
    axios.get(`http://localhost:2000/allExpance`)
    .then(res=>{
        console.log(res.data)
        const data=res.data;
        data.forEach(element=>{
            showOncreen(element)
        })
    })
    .catch(err=>console.log(err))
})