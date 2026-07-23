let financeData = {

savings:[],
income:[],
outgoings:[],
leeBudget:[],
emmaBudget:[]

};



document
.getElementById("excelFile")
.addEventListener("change",function(e){


let file=e.target.files[0];


let reader=new FileReader();



reader.onload=function(event){


let workbook=XLSX.read(
event.target.result,
{type:"binary"}
);



console.log(
"Sheets:",
workbook.SheetNames
);



financeData.savings =
XLSX.utils.sheet_to_json(
workbook.Sheets["Savings"]
);



financeData.income =
XLSX.utils.sheet_to_json(
workbook.Sheets["Income"]
);



financeData.outgoings =
XLSX.utils.sheet_to_json(
workbook.Sheets["Outgoings"]
);



financeData.leeBudget =
XLSX.utils.sheet_to_json(
workbook.Sheets["Lees Budget"]
);



financeData.emmaBudget =
XLSX.utils.sheet_to_json(
workbook.Sheets["Emmas Budget"]
);



console.log(
financeData
);



calculateWealth();


};


reader.readAsBinaryString(file);


});





function showTab(id){


document
.querySelectorAll(".tab")
.forEach(t=>{
t.style.display="none";
});


document
.getElementById(id)
.style.display="block";


}



window.onload=function(){

showTab("dashboard");

}
