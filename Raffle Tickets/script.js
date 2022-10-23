let drawCheck = [false, false];
let finalData = [];
let winnerNumber = 1;

let inputNumbers = document.getElementById("inputNumbers");
let csvFile = document.getElementById("csvFile");
csvFile.addEventListener("change", () =>{
    console.log('bozo');
    createLists();
})


function createLists(){
    if(csvFile.files[0] != null){
        Papa.parse(csvFile.files[0],
        {
            download:true,
            header:false, //DEPENDS ON WHETHER HEADER IS PRESENT
            skipEmptyLines: true,
            complete: function(results){
                finalData = results;

                //Displays the data
                displayData(finalData);
                cleanData(finalData);
                drawCheck[0] = true;
            }
        })
    }
}
/*
let btn = document.getElementById("createLists").addEventListener("click", () => {
    if(csvFile.files[0] != null){
        Papa.parse(csvFile.files[0],
        {
            download:true,
            header:false, //DEPENDS ON WHETHER HEADER IS PRESENT
            skipEmptyLines: true,
            complete: function(results){
                finalData = results;

                //Displays the data
                displayData(finalData);
                cleanData(finalData);
                drawCheck[0] = true;
            }
        })
    }
});*/

function suspense(){
    let dots = document.getElementById("dots");

    setTimeout(() => {
        dots.innerHTML = "."
    }, 1000);

    setTimeout(() => {
        dots.innerHTML = ". ."
    }, 2000);

    setTimeout(() => {
        dots.innerHTML = ". . . "
    }, 3000);

}

function cleanData(data){

    for(let i = 0; i < data.data.length; i++){
        data.data[i][1] = Number(data.data[i][1])
    }
}
function displayData(results){
    displayText = document.getElementById("Names");
    let str = "Names | Numbers: <br> ";
    for(let i = 0; i < results.data.length; i++){
        str = str + "<br>" + results.data[i][0] + " | Tickets Bought : " + results.data[i][1];
    }
    displayText.innerHTML = str;
}

function getWinners(n){
    let totalNumberOfTickets = 0;
    let winnerList = document.getElementById("winnerList")
    winnerList.innerHTML = ""
    for(let i = 0; i < finalData.data.length; i++){
        totalNumberOfTickets+= Number(finalData.data[i][1]);
    }
    for(let i = 0; i < n; i ++){
        let winner = Math.round(Math.random()*totalNumberOfTickets);

        let index = 0;
        let windex = 0;
        for(let j = 0; index<= winner; j++){
            index+= finalData.data[j][1];
            windex = j;
        }
        console.log("WINNER = ", finalData.data[windex]);

        let winnerDisplay= document.getElementById("winners");
        //Update Winner List REAL

        suspense();
        


        setTimeout(() => {
            let dots = document.getElementById("dots");
            dots.innerHTML = "";
            winnerDisplay.innerHTML = winnerDisplay.innerHTML + "<br> " + winnerNumber + ") " + finalData.data[windex][0] + " | <b>Phone</b>: " + finalData.data[windex][2] + " | <b>Email</b>: " + finalData.data[windex][3] + " | <b>Tickets</b>: " + finalData.data[windex][1];
            winnerNumber++;
            //Update LIST for Show
            winnerList.innerHTML = winnerList.innerHTML+`<li style="color:red; list-style: none"> ` + finalData.data[windex][0] + "</li>";

            //Ensures no negatives
            finalData.data[windex][1] -=1;
            if(finalData.data[windex][1] < 0){
                finalData.data[windex][1] = 0;
            }
        }, 4000);
    }
}


let drawWinners = document.getElementById("drawWinners").addEventListener("click", () => {
    inputNumbers = document.getElementById("inputNumbers");
    if(drawCheck[0]==true && inputNumbers.value!=''){
        
        let numOfWinners = inputNumbers.value;

        getWinners(numOfWinners);
    }
})

