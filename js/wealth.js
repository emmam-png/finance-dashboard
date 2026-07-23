function ukDate(value){

    let parts = value.split("/");

    let day = Number(parts[0]);
    let month = Number(parts[1]) - 1;
    let year = Number(parts[2]);

    if(year < 100){
        year += 2000;
    }

    return new Date(year, month, day);

}



function calculateWealth(){


    let data = financeData.savings;


    if(!data.length){
        return;
    }



    let columns =
    Object.keys(data[0]);



    let dates =
    columns.filter(col => {

        return col.includes("/");

    });



    dates.sort(
        (a,b)=>
        ukDate(a)-ukDate(b)
    );



    let latest =
    dates[dates.length-1];


    let previous =
    dates[dates.length-2];


    let first =
    dates[0];



    console.log(
        "Latest:",
        latest,
        "Previous:",
        previous
    );



    let emma = 0;
    let lee = 0;



    let monthlyDifference = 0;
    let previousTotal = 0;



    let table =
    document.getElementById(
        "wealthTable"
    );



    table.innerHTML = `

<tr>
<th>Owner</th>
<th>Account</th>
<th>Type</th>
<th>Current Value</th>
<th>Monthly Change</th>
<th>Monthly %</th>
<th>Total Growth %</th>
</tr>

`;



    data.forEach(account=>{


        let current =
        Number(account[latest]) || 0;



        let old =
        Number(account[previous]) || 0;



        let start =
        Number(account[first]) || 0;



        let change =
        current-old;



        let monthlyPercent =
        old
        ?
        (change/old)*100
        :
        0;



        let growth =
        start
        ?
        ((current-start)/start)*100
        :
        0;



        monthlyDifference += change;

        previousTotal += old;



        if(account.Who==="Emma"){
            emma += current;
        }



        if(account.Who==="Lee"){
            lee += current;
        }



        let row =
        table.insertRow();



        row.innerHTML = `

<td>${account.Who}</td>

<td>${account.Account}</td>

<td>${account["Type of Savings"]}</td>

<td>
£${current.toLocaleString()}
</td>

<td>
£${change.toLocaleString()}
</td>

<td>
${monthlyPercent.toFixed(2)}%
</td>

<td>
${growth.toFixed(2)}%
</td>

`;



    });



    let joint =
    emma + lee;



    document
    .getElementById("emmaWealth")
    .innerHTML =
    "£"+emma.toLocaleString();



    document
    .getElementById("leeWealth")
    .innerHTML =
    "£"+lee.toLocaleString();



    document
    .getElementById("jointWealth")
    .innerHTML =
    "£"+joint.toLocaleString();




    let householdMonthly =
    previousTotal
    ?
    (monthlyDifference / previousTotal)*100
    :
    0;



    document
    .getElementById("monthlyChange")
    .innerHTML =
    householdMonthly.toFixed(2)+"%";



}
