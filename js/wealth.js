// Wealth Dashboard Engine


function parseFinanceDate(value) {


    if (!value) return null;


    // Handle Excel date numbers

    if (typeof value === "number") {

        return new Date(
            Math.round(
                (value - 25569) * 86400 * 1000
            )
        );

    }



    let parts =
        value.toString().split("/");



    if (parts.length !== 3) {
        return null;
    }



    let day =
        Number(parts[0]);


    let month =
        Number(parts[1]) - 1;


    let year =
        Number(parts[2]);



    if (year < 100) {
        year += 2000;
    }



    return new Date(
        year,
        month,
        day
    );

}





function getAssetType(type){


    type =
    type.toLowerCase();



    if(
        type.includes("pension") ||
        type.includes("sipp")
    ){
        return "Pension";
    }



    if(
        type.includes("isa")
    ){
        return "ISA";
    }



    if(
        type.includes("share") ||
        type.includes("investment") ||
        type.includes("crypto")
    ){
        return "Investments";
    }



    return "Cash";

}





function calculateWealth(){


    if(!financeData.savings.length){
        return;
    }



    let rows =
    financeData.savings;



    let columns =
    Object.keys(rows[0]);



    let dates =
    columns.filter(col => {


        return parseFinanceDate(col)
        !== null;


    });



    dates.sort(
        (a,b)=>
        parseFinanceDate(a)
        -
        parseFinanceDate(b)
    );



    console.log(
        "Sorted dates:",
        dates
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
    let joint = 0;



    let assetTotals = {

        Cash:0,
        ISA:0,
        Investments:0,
        Pension:0

    };



    let table =
    document.getElementById(
        "wealthTable"
    );



    table.innerHTML = `

<tr>
<th>Owner</th>
<th>Account</th>
<th>Type</th>
<th>Category</th>
<th>Value</th>
<th>Monthly Change</th>
<th>Monthly %</th>
<th>Total %</th>
</tr>

`;



    rows.forEach(item=>{


        let current =
        Number(item[latest]) || 0;



        let old =
        Number(item[previous]) || 0;



        let start =
        Number(item[first]) || 0;



        let monthly =
        current - old;



        let monthlyPercent =
        old
        ?
        (monthly / old) * 100
        :
        0;



        let totalPercent =
        start
        ?
        ((current-start)/start)*100
        :
        0;



        let category =
        getAssetType(
            item["Type of Savings"] || ""
        );



        assetTotals[category] += current;



        if(item.Who === "Emma"){

            emma += current;

        }



        if(item.Who === "Lee"){

            lee += current;

        }



        joint += current;



        let row =
        table.insertRow();



        row.innerHTML = `

<td>${item.Who}</td>

<td>${item.Account}</td>

<td>${item["Type of Savings"]}</td>

<td>${category}</td>

<td>
£${current.toLocaleString()}
</td>

<td>
£${monthly.toLocaleString()}
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
    "£" + emma.toLocaleString();



    document
    .getElementById("leeWealth")
    .innerHTML =
    "£" + lee.toLocaleString();



    document
    .getElementById("jointWealth")
    .innerHTML =
    "£" + joint.toLocaleString();





    let monthlyChange =
    rows.reduce(
        (total,item)=>{


            let current =
            Number(item[latest]) || 0;


            let old =
            Number(item[previous]) || 0;


            return total +
            (current-old);


        },0
    );



    let monthlyPercent =
    joint-monthlyChange
    ?
    (monthlyChange /
    (joint-monthlyChange))
    *100
    :
    0;



    document
    .getElementById("monthlyChange")
    .innerHTML =
    monthlyPercent.toFixed(2)+"%";



    console.log(
        "Asset breakdown:",
        assetTotals
    );


}
