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


const sheet =
workbook.Sheets["Savings"];


if(!sheet){
alert("Savings tab not found");
return;
}


savingsData =
XLSX.utils.sheet_to_json(sheet);


console.log("Savings loaded:", savingsData);


displaySavings();


};


reader.readAsBinaryString(file);


});



function parseUKDate(dateString){

let parts = dateString.split("/");

return new Date(
parts[2].length === 2 ? "20"+parts[2] : parts[2],
parts[1]-1,
parts[0]
);

}



function displaySavings(){


let table =
document.getElementById("accountsTable");


table.innerHTML = `

<tr>
<th>Who</th>
<th>Account</th>
<th>Type</th>
<th>Current Value</th>
<th>Change</th>
<th>% Change</th>
</tr>

`;



let totalSavings = 0;



let columns =
Object.keys(savingsData[0]);



// Find date columns

let dateColumns =
columns.filter(col => {

return ![
"Who",
"Account",
"Type of Savings",
"2025 CHANGE",
"2025 % CHANGE"
].includes(col);

});


// Sort dates

dateColumns.sort(
(a,b)=>
parseUKDate(a)-parseUKDate(b)
);



let latest =
dateColumns[dateColumns.length-1];


let previous =
dateColumns[dateColumns.length-2];



console.log(
"Latest:",
latest,
"Previous:",
previous
);



savingsData.forEach(item=>{


let current =
Number(item[latest] || 0);


let old =
Number(item[previous] || 0);



let change =
current-old;



let percent =
old ?
(change/old)*100
:
0;



totalSavings += current;



let row =
table.insertRow();


row.innerHTML = `

<td>${item.Who}</td>

<td>${item.Account}</td>

<td>${item["Type of Savings"]}</td>

<td>
£${current.toLocaleString()}
</td>

<td>
£${change.toLocaleString()}
</td>

<td>
${percent.toFixed(2)}%
</td>

`;



});



document
.getElementById("savings")
.innerHTML =
"£"+totalSavings.toLocaleString();



document
.getElementById("accountCount")
.innerHTML =
savingsData.length;



}
