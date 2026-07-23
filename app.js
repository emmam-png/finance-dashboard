let chart;


function makeChart(labels, data){

const ctx = document.getElementById("savingsChart");


if(chart){
    chart.destroy();
}


chart = new Chart(ctx, {

type:"line",

data:{

labels:labels,

datasets:[{

label:"Savings Balance",

data:data,

tension:0.4

}]

},

options:{
responsive:true
}

});

}



document
.getElementById("excelFile")
.addEventListener("change", function(e){


const file=e.target.files[0];


const reader=new FileReader();


reader.onload=function(event){


const workbook = XLSX.read(
event.target.result,
{
type:"binary"
}
);



console.log(workbook.SheetNames);



/*
=========================
SAVINGS TAB
=========================
*/


if(workbook.SheetNames.includes("Savings")){


const savingsSheet =
workbook.Sheets["Savings"];


const savings =
XLSX.utils.sheet_to_json(
savingsSheet
);



console.log("Savings", savings);



let total=0;

let labels=[];
let values=[];



savings.forEach(row=>{


// Change this if your column names differ

if(row.Amount){

total += Number(row.Amount);

labels.push(
row.Date || ""
);

values.push(total);

}


});



document.querySelector(".card h2")
.innerHTML =
"£"+total.toLocaleString();



makeChart(
labels,
values
);


}



/*
=========================
MONTHLY OUTGOINGS
=========================
*/


if(workbook.SheetNames.includes("Monthly Outgoings")){


const outgoings =
XLSX.utils.sheet_to_json(
workbook.Sheets["Monthly Outgoings"]
);


console.log(
"Outgoings",
outgoings
);

}



/*
=========================
LEE BUDGET
=========================
*/


if(workbook.SheetNames.includes("Lee's Budget")){


const lee =
XLSX.utils.sheet_to_json(
workbook.Sheets["Lee's Budget"]
);


console.log(
"Lee Budget",
lee
);

}



/*
=========================
EMMA BUDGET
=========================
*/


if(workbook.SheetNames.includes("Emma's Budget")){


const emma =
XLSX.utils.sheet_to_json(
workbook.Sheets["Emma's Budget"]
);


console.log(
"Emma Budget",
emma
);

}



};


reader.readAsBinaryString(file);


});
