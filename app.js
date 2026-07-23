const ctx = document
.getElementById("savingsChart");


new Chart(ctx, {

type:"line",

data:{


labels:[
"Jan",
"Feb",
"Mar",
"Apr",
"May",
"Jun",
"Jul"
],


datasets:[{

label:"Savings",

data:[
12000,
14000,
15500,
17000,
19000,
21500,
24150
],


tension:.4

}]


},


options:{

responsive:true,

plugins:{

legend:{

display:true

}

}

}

});
