let savingsData = [];


document
.getElementById("excelFile")
.addEventListener("change", function(e) {

    const file = e.target.files[0];

    if (!file) return;


    const reader = new FileReader();


    reader.onload = function(event) {

        const workbook = XLSX.read(
            event.target.result,
            {
                type: "binary"
            }
        );


        console.log("Sheets found:", workbook.SheetNames);


        const sheet = workbook.Sheets["Savings"];


        if (!sheet) {
            alert("Could not find Savings tab");
            return;
        }


        savingsData = XLSX.utils.sheet_to_json(sheet);


        console.log("Savings loaded:", savingsData);


        displaySavings();

    };


    reader.readAsBinaryString(file);

});



function parseDate(value) {

    if (!value) return null;


    let parts = value.toString().split("/");


    if (parts.length !== 3) return null;


    let day = Number(parts[0]);
    let month = Number(parts[1]) - 1;
    let year = Number(parts[2]);


    if (year < 100) {
        year += 2000;
    }


    return new Date(
        year,
        month,
        day
    );

}



function displaySavings() {


    if (!savingsData.length) {
        alert("No savings data found");
        return;
    }


    const table =
        document.getElementById("accountsTable");


    table.innerHTML = `

    <tr>
        <th>Who</th>
        <th>Account</th>
        <th>Type</th>
        <th>Current Value</th>
        <th>Change</th>
        <th>% Change</th>
    </tr>

    `;



    const columns =
        Object.keys(savingsData[0]);



    // Find only date columns

    let dateColumns = columns.filter(column => {

        return parseDate(column) !== null;

    });



    dateColumns.sort(
        (a,b) =>
        parseDate(a) - parseDate(b)
    );



    console.log("Date columns:", dateColumns);



    if (dateColumns.length < 2) {

        alert(
            "Need at least two date columns for comparison"
        );

        return;
    }



    const latest =
        dateColumns[dateColumns.length - 1];


    const previous =
        dateColumns[dateColumns.length - 2];



    console.log(
        "Latest:",
        latest,
        "Previous:",
        previous
    );



    let totalSavings = 0;


    let owners = new Set();



    savingsData.forEach(item => {


        let current =
            Number(item[latest]) || 0;


        let old =
            Number(item[previous]) || 0;



        let change =
            current - old;



        let percent =
            old !== 0
            ?
            (change / old) * 100
            :
            0;



        totalSavings += current;


        owners.add(item.Who);



        let row =
            table.insertRow();



        row.innerHTML = `

        <td>${item.Who || ""}</td>

        <td>${item.Account || ""}</td>

        <td>${item["Type of Savings"] || ""}</td>

        <td>
        £${current.toLocaleString()}
        </td>

        <td>
        £${change.toLocaleString()}
        </td>

        <td>
        ${percent.toFixed(2)}%
        </td>

        `;


    });



    document
    .getElementById("savings")
    .innerHTML =
    "£" + totalSavings.toLocaleString();



    document
    .getElementById("accountCount")
    .innerHTML =
    savingsData.length;



    document
    .getElementById("ownerCount")
    .innerHTML =
    owners.size;



    document
    .getElementById("updated")
    .innerHTML =
    latest;


}
