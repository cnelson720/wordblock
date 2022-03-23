//sorts hiscores by highest 'score'
function sortTable(){
    const table = document.getElementById('hiscores-table');
    
    const rows = table.rows;

    //make an array out of all rows
    let rowArray = Array.from(rows);

    //remove first row (header)
    rowArray.shift();  

    //sort the array by highest number
    rowArray.sort(function(a, b){
        a = a.cells[2].innerText;
        b = b.cells[2].innerText;
        return b - a;
    })
    
    let tbody = table.tBodies[0];
    
    //replaces each row with the sorted one
    rowArray.forEach(function (row){
        tbody.appendChild(row);
    })
}
