//wealth logic
// Household Finance Dashboard
// Main Excel loader


let financeData = {

    savings: [],
    emmaBudget: [],
    leeBudget: [],
    outgoings: []

};



document
.getElementById("excelFile")
.addEventListener("change", function(e){


const file = e.target.files[0];


if(!file){
    return;
}


const reader = new FileReader();



reader.onload = function(event){


const workbook = XLSX.read(
    event.target.result,
    {
        type:"binary"
    }
);



console.log(
    "Sheets:",
    workbook.SheetNames
);



// Load Savings

if(workbook.Sheets["Savings"]){

financeData.savings =
XLSX.utils.sheet_to_json(
    workbook.Sheets["Savings"]
);

}



// Load Emma Budget

if(workbook.Sheets["Emma's Budget"]){

financeData.emmaBudget =
XLSX.utils.sheet_to_json(
    workbook.Sheets["Emma's Budget"]
);

}



// Load Lee Budget

if(workbook.Sheets["Lee's Budget"]){

financeData.leeBudget =
XLSX.utils.sheet_to_json(
    workbook.Sheets["Lee's Budget"]
);

}



// Load Outgoings

if(workbook.Sheets["Outgoings"]){

financeData.outgoings =
XLSX.utils.sheet_to_json(
    workbook.Sheets["Outgoings"]
);

}



console.log(
    "Finance data loaded:",
    financeData
);



// Run dashboard updates

if(typeof calculateWealth === "function"){
    calculateWealth();
}


if(typeof calculateIncome === "function"){
    calculateIncome();
}


if(typeof createCharts === "function"){
    createCharts();
}



};


reader.readAsBinaryString(file);


});





function showTab(tabName){


document
.querySelectorAll(".tab")
.forEach(tab=>{

    tab.style.display="none";

});


document
.getElementById(tabName)
.style.display="block";


}



// Show dashboard first

document
.addEventListener(
"DOMContentLoaded",
function(){

showTab("dashboard");

});
