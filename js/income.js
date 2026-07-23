
function calculateIncome(){


    // Outgoings

    let bills = 0;


    financeData.outgoings.forEach(item=>{

        bills += Number(
            item["£ monthly"]
            ||
            item["£ monthly "]
            ||
            0
        );

    });



    document
    .getElementById("monthlyBills")
    .innerHTML =
    "£" + bills.toLocaleString();



    // Lees Budget

    let lee = 0;


    financeData.leesBudget.forEach(item=>{

        lee += Number(
            item.Budget || 0
        );

    });



    document
    .getElementById("leesBudget")
    .innerHTML =
    "£" + lee.toLocaleString();



    // Emmas Budget

    let emma = 0;


    financeData.emmasBudget.forEach(item=>{

        emma += Number(
            item.Budget || 0
        );

    });



    document
    .getElementById("emmasBudget")
    .innerHTML =
    "£" + emma.toLocaleString();



}
