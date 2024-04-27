async function pullHistory() {
    try{
        //print fuel quote history
        const response = await fetch(`http://localhost:3000/formHistoryPull`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        const quote = await response.json();
        populateTable(quote);
    } catch(err){
        console.log(err.message);
    }
}

function populateTable(data) { //initialize table with data from backend
    var table = document.querySelector('#historyTable');
    var tbody = table.querySelector('tbody');

    // clear existing table rows
    tbody.innerHTML = '';

    // create a row for each item in the data
    data.rows.forEach(function(item) {
        var row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.galrequested}</td>
            <td>${item.deliveryaddress}</td>
            <td>${item.deliverydate}</td>
            <td>${item.pricepergallon}</td>
            <td>${item.totalprice}</td>
        `;
        tbody.appendChild(row);
    });
}


// everything below here are stuff that are for dropdowns and filters 
function openDrop(element) {
    closeOthers(element);
    if (element.style.display === "block") {
        element.style.display = "none";
    } else {
        element.style.display = "block";
    }
  }


function closeDrop(){
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var dropdowns2 = document.getElementsByClassName("filterdropdown-content");
    for (var i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.style.display === "block") {
            openDropdown.style.display = "none";
        }
    }
    for (var i = 0; i < dropdowns2.length; i++) {
        var openDropdown2 = dropdowns2[i];
        if (openDropdown2.style.display === "block") {
            openDropdown2.style.display = "none";
        }
    }
}

function closeOthers(element){
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var dropdowns2 = document.getElementsByClassName("filterdropdown-content");
    for (var i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (element === dropdowns[i]){
            continue;
        }
        if (openDropdown.style.display === "block") {
            openDropdown.style.display = "none";
        }
    }
    for (var i = 0; i < dropdowns2.length; i++) {
        var openDropdown2 = dropdowns2[i];
        if (element === dropdowns2[i]){
            continue;
        }
        if (openDropdown2.style.display === "block") {
            openDropdown2.style.display = "none";
        }
    }
}

function createFilters() {
    clearFilters();
    //gallons requested
    if(!isInputEmpty(document.querySelector("#minGallons").value) && !isInputEmpty(document.querySelector("#maxGallons").value)){ //both not empty
        rangeFilter(0, document.querySelector("#minGallons").value, document.querySelector("#maxGallons").value);
    }
    else if(isInputEmpty(document.querySelector("#minGallons").value) && isInputEmpty(document.querySelector("#maxGallons").value)){ //both empty
        // do nothing
    }
    else if(isInputEmpty(document.querySelector("#minGallons").value)){ //min empty
        rangeFilter(0, 0, document.querySelector("#maxGallons").value);
    }
    else if(isInputEmpty(document.querySelector("#maxGallons").value)){ //max empty
        rangeFilter(0, document.querySelector("#minGallons").value, Infinity);
    }

    //address
    if(!isInputEmpty(document.querySelector("#filteringAddress").value)){
        exactFilter(1, document.querySelector("#filteringAddress").value);
    }
    
    //delivery date
    if(!isInputEmpty(document.querySelector("#startDate").value) && !isInputEmpty(document.querySelector("#endDate").value)){ //both not empty
        rangeFilterDate(2, document.querySelector("#startDate").value, document.querySelector("#endDate").value);
    }
    else if(isInputEmpty(document.querySelector("#startDate").value) && isInputEmpty(document.querySelector("#endDate").value)){ //both empty
        // do nothing
    }
    else if(isInputEmpty(document.querySelector("#startDate").value)){ //min empty
        rangeFilterDate(2, 0, document.querySelector("#endDate").value);
    }
    else if(isInputEmpty(document.querySelector("#endDate").value)){ //max empty
        rangeFilterDate(2, document.querySelector("#startDate").value, Infinity);
    }
    //suggested price
    if(!isInputEmpty(document.querySelector("#minSuggestedPrice").value) && !isInputEmpty(document.querySelector("#maxSuggestedPrice").value)){ //both not empty
        rangeFilter(3, document.querySelector("#minSuggestedPrice").value, document.querySelector("#maxSuggestedPrice").value);
    }
    else if(isInputEmpty(document.querySelector("#minSuggestedPrice").value) && isInputEmpty(document.querySelector("#maxSuggestedPrice").value)){ //both empty
        // do nothing
    }
    else if(isInputEmpty(document.querySelector("#minSuggestedPrice").value)){ //min empty
        rangeFilter(3, 0, document.querySelector("#maxSuggestedPrice").value);
    }
    else if(isInputEmpty(document.querySelector("#maxSuggestedPrice").value)){ //max empty
        rangeFilter(3, document.querySelector("#minSuggestedPrice").value, Infinity);
    }

    //total amount due
    if(!isInputEmpty(document.querySelector("#minDueAmt").value) && !isInputEmpty(document.querySelector("#maxDueAmt").value)){ //both not empty
        rangeFilter(4, document.querySelector("#minDueAmt").value, document.querySelector("#maxDueAmt").value);
    }
    else if(isInputEmpty(document.querySelector("#minDueAmt").value) && isInputEmpty(document.querySelector("#maxDueAmt").value)){ //both empty
        // do nothing
    }
    else if(isInputEmpty(document.querySelector("#minDueAmt").value)){ //min empty
        rangeFilter(4, 0, document.querySelector("#maxDueAmt").value);
    }
    else if(isInputEmpty(document.querySelector("#maxDueAmt").value)){ //max empty
        rangeFilter(4, document.querySelector("#minDueAmt").value, Infinity);
    }    
}

function rangeFilter(columnIndex, minValue, maxValue) {
    var table = document.querySelector('#historyTable');
    var tbody = table.querySelector('tbody');
    var rows = Array.from(tbody.querySelectorAll('tr'));

    rows.forEach(function(row) {
        var cellValue = row.children[columnIndex].innerText;
        if (cellValue >= minValue && cellValue <= maxValue) {   
            if(row.style.display !== 'none'){ //if alr hidden by another filter, don't show
                row.style.display = 'table-row';
            }
        } else {
            row.style.display = 'none';
        }
    });
}

//change below code once connected to backend
function rangeFilterDate(columnIndex, minValue, maxValue) {
    var table = document.querySelector('#historyTable');
    var tbody = table.querySelector('tbody');
    var rows = Array.from(tbody.querySelectorAll('tr'));

    rows.forEach(function(row) {
        var cellValue = row.children[columnIndex].innerText.parse();
        if (cellValue >= minValue && cellValue <= maxValue) {   
            if(row.style.display !== 'none'){ //if alr hidden by another filter, don't show
                row.style.display = 'table-row';
            }
        } else {
            row.style.display = 'none';
        }
    });
}

function exactFilter(columnIndex, filterValue) {
    var table = document.querySelector('#historyTable');
    var tbody = table.querySelector('tbody');
    var rows = Array.from(tbody.querySelectorAll('tr'));

    rows.forEach(function(row) {
        var cellValue = row.children[columnIndex].innerText;
        var filterValues = filterValue.split(' '); // split the filterValue by spaces
        var match = filterValues.every(function(value) {
            return cellValue.toLowerCase().includes(value.toLowerCase());
        });
        if (match) {
            if(row.style.display !== 'none'){ //if alr hidden by another filter, don't show
                row.style.display = 'table-row';
            }
        } else {
            row.style.display = 'none';
        }
    });
}


function isInputEmpty(inputValue) {
    if (inputValue.trim() === '' || inputValue === null || inputValue === undefined) {
        return true;
    }
    return false;
}

function clearFilters(){
    var table = document.querySelector('#historyTable');
    var tbody = table.querySelector('tbody');
    var rows = Array.from(tbody.querySelectorAll('tr'));

    rows.forEach(function(row) {
        row.style.display = 'table-row';
    });
}

function clearBoth(){ //clear both inputs and filters
    document.querySelector("#minGallons").value = "";
    document.querySelector("#maxGallons").value = "";
    document.querySelector("#filteringAddress").value = "";
    document.querySelector("#startDate").value = "";
    document.querySelector("#endDate").value = "";
    document.querySelector("#minSuggestedPrice").value = "";
    document.querySelector("#maxSuggestedPrice").value = "";
    document.querySelector("#minDueAmt").value = "";
    document.querySelector("#maxDueAmt").value = "";
    document.querySelector("#galReqButton").className = "filterdropbtn";
    document.querySelector("#addressButton").className = "filterdropbtn";
    document.querySelector("#dateButton").className = "filterdropbtn";
    document.querySelector("#suggestedPriceButton").className = "filterdropbtn";
    document.querySelector("#amtDueButton").className = "filterdropbtn";
    clearFilters();
}

function changeButtonClass(element, button, dropdown){
    if (element.value === "") {
        button.className = "filterdropbtn";
    }
    else{
        button.className = "filterdropbtnSelected";
    }
}


function changeButtonClass2(element, element2, button, dropdown){
    if (element.value === "" && element2.value === "") {
        button.className = "filterdropbtn";
    }
    else{
        button.className = "filterdropbtnSelected";
    }
}
