let savingsData = [];



document
.getElementById("excelFile")
.addEventListener("change", function(e){


const file = e.target.files[0];

const reader = new FileReader();



reader.onload = function(event){


const workbook = XLSX.read(
event.target.result,
{
type:"binary"
}
);



if(workbook.SheetNames.includes("Savings")){


const sheet =
workbook.Sheets["Savings"];


savingsData =
XLSX.utils.sheet_to_json(sheet);



displaySavings();


}



};



reader.readAsBinaryString(file);


});





function displaySavings(){


let accounts = {};



savingsData.forEach(row=>{


let key =
row.Who +
"-" +
row["Type of Savings"];



if(!accounts[key]){

accounts[key]=[];

}


accounts[key].push(row);


});



let table =
document.getElementById(
"accountsTable"
);



table.innerHTML = `

<tr>
<th>Owner</th>
<th>Account</th>
<th>Balance</th>
<th>Change</th>
<th>%</th>
</tr>

`;



let totalSavings = 0;



Object.keys(accounts).forEach(key=>{


let account =
accounts[key];


// Sort by date

account.sort(
(a,b)=>
new Date(a["Monthly Dates"])
account[0].Date
-
new Date(b.Date)
);



let current =
Number(
account[account.length-1].Value
);
  let previous =
Number(
account[account.length-2]?.Value || current
);




let difference =
current - previous;



let percentage =
previous ?
((difference / previous)*100)
:
0;



totalSavings += current;



let row =
table.insertRow();



row.innerHTML = `

<td>${account[0].Who}</td>

<td>${account[0]["Type of Savings"]}</td>

<td>
£${current.toLocaleString()}
</td>

<td>
£${difference.toLocaleString()}
</td>

<td>
${percentage.toFixed(2)}%
</td>

`;



});



document
.getElementById("savings")
.innerHTML =
"£"+totalSavings.toLocaleString();



}
