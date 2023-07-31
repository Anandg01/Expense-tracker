document.getElementById('dayForm').addEventListener('submit', getDalyReport)
const token = localStorage.getItem('token')
async function getDalyReport(e) {
    e.preventDefault();
    const day = document.getElementById("date").value;
    const date = new Date(e.target.date.value);
    console.log(date)
    const formattedDate = `${date.getDate().toString().padStart(2, "0")}-${(
        date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${date.getFullYear()}`;
    console.log(e.target.date.value)
    try {
        const Expences = await axios.get(`http://localhost:2000/dalyreports/${formattedDate}`, { headers: { 'Authorizan': token } })
        console.log(Expences.data)
        resetHeadTabel('dateTable')
        Expences.data.forEach((expence) => {
            addExpenseRow(expence,'dateTable')
        })  
    }
    catch (err) {
        console.log(err)
    }
}

document.getElementById('monthForm').addEventListener('submit',getMonthReport)

async function getMonthReport(event){
    event.preventDefault();
  const month = new Date(event.target.month.value);
  const formattedMonth = `${(month.getMonth() + 1)
    .toString()
    .padStart(2, "0")}`;
console.log(formattedMonth)
try{
const expences=await axios.get(`monthlyReport/${formattedMonth}`,{ headers: { 'Authorizan': token } })
console.log("month", expences.data);
resetHeadTabel('monthTabel')
expences.data.forEach((expence)=>{
    addExpenseRow(expence, 'monthTabel')
})
}
catch(err){
    console.log(err)
}
}


function resetHeadTabel(tabelId){
    const table = document.getElementById(tabelId)
        table.innerHTML = '';
        const tr = document.createElement('tr')

        const th1 = document.createElement('th')
        th1.textContent = 'Date'
        tr.appendChild(th1)

        const th2 = document.createElement('th')
        th2.textContent = 'Description'
        tr.appendChild(th2)

        const th3 = document.createElement('th')
        th3.textContent = 'categary'
        tr.appendChild(th3)

        const th4 = document.createElement('th')
        th4.textContent = 'Expence Amount'
        tr.appendChild(th4)
        table.appendChild(tr)
}

//Function to create and add a new row to the table
function addExpenseRow(obj, TableId) {
    const parent = document.getElementById(TableId);
    console.log(parent)
    // Create a new table row (<tr>)
    const newRow = document.createElement("tr");
    // Create and add data cells (<td>) to the row
    const dateCell = document.createElement("td");
    dateCell.textContent = obj.date;
    dateCell.setAttribute('class','dateField')
    newRow.appendChild(dateCell);


    const descriptionCell = document.createElement("td");
    descriptionCell.textContent = obj.description;
    newRow.appendChild(descriptionCell);

    const categoryCell = document.createElement("td");
    categoryCell.textContent = obj.catagory;
    newRow.appendChild(categoryCell);

    const amountCell = document.createElement("td");
    amountCell.textContent = obj.amount;
    newRow.appendChild(amountCell);

    // Append the new row to the table body
    parent.appendChild(newRow);
}
