function ukDate(v){

let p=v.split("/");

let y=p[2];

if(y.length===2){
y="20"+y;
}


return new Date(
y,
p[1]-1,
p[0]
);

}





function calculateWealth(){


let data=financeData.savings;


if(!data.length)return;



let columns=
Object.keys(data[0]);



let dates=
columns.filter(x=>{

return ![
"Who",
"Account",
"Type of Savings",
"2025 CHANGE",
"2025 % CHANGE"
].includes(x);

});



dates.sort(
(a,b)=>ukDate(a)-ukDate(b)
);



let latest=
dates[dates.length-1];


let previous=
dates[dates.length-2];



let emma=0;
let lee=0;



let table=
document.getElementById(
"wealthTable"
);



table.innerHTML="";



data.forEach(r=>{


let value=
Number(r[latest])||0;


let old=
Number(r[previous])||0;



let percent=
old?
((value-old)/old)*100:
0;



if(r.Who==="Emma")
emma+=value;


if(r.Who==="Lee")
lee+=value;



let row=
table.insertRow();



row.innerHTML=`

<td>${r.Who}</td>

<td>${r.Account}</td>

<td>${r["Type of Savings"]}</td>

<td>${r["Type of Savings"]}</td>

<td>£${value.toLocaleString()}</td>

<td>${percent.toFixed(2)}%</td>

`;

});


document
.getElementById("emmaWealth")
.innerHTML=
"£"+emma.toLocaleString();



document
.getElementById("leeWealth")
.innerHTML=
"£"+lee.toLocaleString();



document
.getElementById("jointWealth")
.innerHTML=
"£"+(emma+lee).toLocaleString();



}
