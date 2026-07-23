let chart;


function createChart(values){

const ctx = document
.getElementById("savingsChart");


if(chart){
    chart.destroy();
}


chart = new Chart(ctx, {

type:"line",

data:{

labels:values.labels,

datasets:[{

label:"Savings",

data:values.data,

tension:.4

}]

}

});


}



document
.getElementById("excelFile")
.addEventListener("change", function(e){


const file=e.target.files[0];


const reader=new FileReader();


reader.onload=function(event){


const workbook =
XLSX.read(
event.target.result,
{
type:"binary"
}
);



const sheet =
workbook.Sheets[
workbook.SheetNames[0]
];


const data =
XLSX.utils.sheet_to_json(sheet);



console.log(data);



let totalSavings=0;


let dates=[];
let amounts=[];



data.forEach(row=>{


if(row.Category==="Savings"){

totalSavings += Number(row.Amount);

dates.push(row.Date);

amounts.push(totalSavings);

}


});



document.querySelector(".card h2")
.innerHTML =
"£"+totalSavings;



createChart({

labels:dates,

data:amounts

});


};



reader.readAsBinaryString(file);


});
