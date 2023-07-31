document.addEventListener('DOMContentLoaded',()=>{
  const token=localStorage.getItem('token')
    leaderBoard(token);
})

function leaderBoard(token){
    axios.get(`http://localhost:2000/leaderbord`,{ headers: { 'Authorizan': token } }).then(res=>{
      document.getElementById('leader').innerHTML=``
    res.data.forEach((data, i)=>{
      leadersIntable(data,i)
    })
    })
    .catch(err=>console.log(err))
    }
  
  function leadersIntable(obj, rank){
    const table=document.getElementById('lBtabel');
    console.log(table)
    const tr=`<td>${rank+1} </td> <td>${obj.name} </td> <td>${obj.totalexpences} </td>`
    table.innerHTML+=tr;
  }