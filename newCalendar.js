let occupancy = {};

if(!localStorage.getItem('occupancy')){
    localStorage.setItem('occupancy',JSON.stringify(occupancy));
}else{
    occupancy = JSON.parse(localStorage.getItem('occupancy'));
}

let monthsArr = [ "Jan","Feb","Mar","April","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"];

roomTypeObj = {
    Premium: [],
    Mid:[],
    Budget:[]
}


function updateOccupancy(stDate,endDate,roomType){
    //let st1Date = new Date();
    // let end1Date = new Date(2021,6,10);
    //end1Date.setDate(end1Date.getDate()+1);
    occupancy = JSON.parse(localStorage.getItem('occupancy'));
    while(stDate<=endDate){
        let year = stDate.getFullYear();
        let month = stDate.getMonth();
        let date = stDate.getDate();
        if(!occupancy[year]){
            occupancy[year]={};
            occupancy[year][month]=roomTypeObj;
            console.log('Object added');
            console.log(occupancy);
            occupancy[year][month][roomType].push(date);
        }else if(!occupancy[year][month]){
            occupancy[year][month]=roomTypeObj;
            occupancy[year][month][roomType].push(date);
        }else{
            occupancy[year][month][roomType].push(date);
        }
        console.log(stDate);
        stDate.setDate(stDate.getDate()+1);
    }
    console.log(JSON.parse(JSON.stringify(occupancy)))
    localStorage.setItem('occupancy',JSON.stringify(occupancy));
}

function setCalendar(roomType,month,year){
    console.log('SETTING CALENDAR');
    let occupancy = JSON.parse(localStorage.getItem('occupancy'));
    let tableContent = document.getElementById('calendarBody');
    console.log(tableContent);
    let rows = tableContent.rows;
    console.log(rows);
    //console.log(rows.item(0));
    console.log()
    for(let row of rows){
        //console.log(row.cells);
        for(let cell of row.cells){
            if(cell.innerHTML!='' && occupancy[year] && occupancy[year][month] && occupancy[year][month][roomType].includes(+cell.innerHTML) && cell.style.backgroundColor!="rgb(231, 231, 231)"){
                //console.log(occupancyJun[roomType][cell.innerHTML]);
                console.log(cell.innerHTML);
                cell.innerHTML+='<span class="occupied" style="color:red">&#8226;</span>'
            }
            else if(cell.innerHTML!=''&& cell.style.backgroundColor!="rgb(231, 231, 231)"){
                cell.innerHTML+='<span class="occupied" style="color:#1e941e">&#8226;</span>'
            }
        }
    }
}

function validateDates(roomType){
    let form = document.querySelector('form');
    let stDate = new Date(form.startDate.value);
    let endDate = new Date(form.endDate.value);
    while(stDate<=endDate){
        let year = stDate.getFullYear();
        let month = stDate.getMonth();
        let date = stDate.getDate();
        if(occupancy[year] && occupancy[year][month] && occupancy[year][month][roomType].includes(date)){
            return false;
        }
        console.log(stDate);
        stDate.setDate(stDate.getDate()+1);
    }
    return true;
}