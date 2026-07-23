
// Wealth calculations


function parseFinanceDate(value){

    if(!value) return null;


    let parts = value.toString().split("/");


    if(parts.length !== 3){
        return null;
    }


    let day = Number(parts[0]);
    let month = Number(parts[1]) - 1;
    let year = Number(parts[2]);


    if(year < 100){
        year += 2000;
    }


    return new Date(
        year,
        month,
        day
    );

}




function calculateWealth(){


    if(!financeData.savings.length){
        return;
    }



    let rows =
    financeData.savings;



    let columns =
    Object.keys(rows[0]);



    // Find date columns

    let dates =
    columns.filter(col => {

        return parseFinanceDate(col) !== null;

    });



    dates.sort(
        (a,b)=>
        parseFinanceDate(a)
        -
        parseFinanceDate(b)
    );



    let latest =
    dates[dates.length-1];


    let previous =
    dates[dates.length-2];


    let first =
    dates[0];



    let emmaTotal = 0;
    let leeTotal = 0;
    let jointTotal = 0;



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




    rows.forEach(account=>{


        let current =
        Number(account[latest]) || 0;



        let old =
        Number(account[previous]) || 0;



        let start =
        Number(account[first]) || 0;



        let monthlyChange =
        current - old;



        let monthlyPercent =
        old
        ?
        (monthlyChange / old) * 100
        :
        0;



        let totalPercent =
        start
        ?
        ((current-start)/start)*100
        :
        0;



        if(account.Who === "Emma"){
            emmaTotal += current;
        }


        if(account.Who === "Lee"){
            leeTotal += current;
        }



        jointTotal += current;




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
        £${monthlyChange.toLocaleString()}
        </td>

        <td>
        ${monthlyPercent.toFixed(2)}%
        </td>

        <td>
        ${totalPercent.toFixed(2)}%
        </td>

        `;



    });





    document
    .getElementById("emmaWealth")
    .innerHTML =
    "£" + emmaTotal.toLocaleString();



    document
    .getElementById("leeWealth")
    .innerHTML =
    "£" + leeTotal.toLocaleString();



    document
    .getElementById("jointWealth")
    .innerHTML =
    "£" + jointTotal.toLocaleString();



    let totalMonthly =
    rows.reduce(
        (sum,item)=>{

            let current =
            Number(item[latest]) || 0;

            let old =
            Number(item[previous]) || 0;

            return sum + (current-old);

        },0
    );



    let monthlyPercent =
    jointTotal-totalMonthly
    ?
    (totalMonthly/(jointTotal-totalMonthly))*100
    :
    0;



    document
    .getElementById("monthlyChange")
    .innerHTML =
    monthlyPercent.toFixed(2)+"%";


}
