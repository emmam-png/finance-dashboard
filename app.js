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



console.log("Savings loaded:", savingsData);


displaySavings();


}


};


reader.readAsBinaryString(file);


});




function displaySavings(){


let table =
document.getElementById("accountsTable");



table.innerHTML = `

<tr>
<th>Who</th>
<th>Account</th>
<th>Type</th>
<th>Value</th>
</tr>

`;



let totalSavings = 0;



savingsData.forEach(account=>{


let value =
Number(
account["Value as of Date"]
);



totalSavings += value;



let row =
table.insertRow();



row.innerHTML = `

<td>${account.Who}</td>

<td>${account.Account}</td>

<td>${account["Type of Savings"]}</td>

<td>
£${value.toLocaleString()}
</td>

`;



});



document
.getElementById("savings")
.innerHTML =
"£" + totalSavings.toLocaleString();



}
