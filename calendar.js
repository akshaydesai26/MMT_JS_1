console.log('in calendar');

let today_c = new Date();
let currentMonth = today_c.getMonth() +1 ;
let currentYear = today_c.getFullYear();
//console.log(currentMonth);

let months = [ "Jan","Feb","Mar","April","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"];
let monthInd = currentMonth;

////////
let occupancyJun1;
// = { occupancyjul={
//     premium: [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
//     mid: [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
//     budget: [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]},
//      }
// function setLocalStorage(obj){
//     if(!localStorage.getItem('occupancyJun')){
//         console.log('setting occupancy');
//         localStorage.setItem('occupancyJun',JSON.stringify(obj));
//     }else{
//         getLocalStorage();
//     }
// }

function getLocalStorage(){
    //console.log('retrieving occupancy');
    let retrieval = localStorage.getItem('occupancyJun');
    occupancyJun = JSON.parse(retrieval);
    console.log(occupancyJun);
}

// function updateLocalStorage(){
//     localStorage.setItem('occupancyJun',JSON.stringify(occupancyJun));
// }

//setLocalStorage(occupancyJun);
//getLocalStorage();

///////


function createCalendar(month,year){
    let firstDay = new Date(year,month).getDay();
    //console.log('hellooo');
    let daysInMonth = 32 - new Date(year,month,32).getDate();

    let tableHeading = document.getElementById('monthAndYear');
    tableHeading.innerHTML = months[month]+" "+year;

    let tableContent = document.getElementById('calendarBody');
    tableContent.innerHTML='';
    let date=1;
    for(let i=0;i<6;i++){ 
        let tr = document.createElement('tr');
        for(let j=0;j<7;j++){
            let td = document.createElement('td');
            let temp_today = new Date();
            if(temp_today>new Date(year,month,date)){
                // console.log(temp_today);
                // console.log(new Date(year,month,date));
                td.style.backgroundColor="#e7e7e7";
            }
            if(i===0 && j<firstDay){
                //console.log('in 1st');
                let textNode = document.createTextNode("");
                td.appendChild(textNode);
                tr.appendChild(td);
            }else if(date>daysInMonth){
                break;
            }else{
                //console.log(date);
                let textNode = document.createTextNode(date);
                td.appendChild(textNode);
                tr.appendChild(td);
                date++;
            }
            
        }
        tableContent.appendChild(tr);
    }
    console.log(document.querySelector('#calendarDropdown').value);
    //setOccupied(document.querySelector('#calendarDropdown').value);
}

function setOccupied(roomType,month,year){
    getLocalStorage();
    let tableContent = document.getElementById('calendarBody');
    console.log(tableContent);
    let rows = tableContent.rows;
    console.log(rows);
    //console.log(rows.item(0));
    console.log()
    for(let row of rows){
        //console.log(row.cells);
        for(let cell of row.cells){
            if(cell.innerHTML!='' && occupancyJun[roomType][cell.innerHTML-1]<=0 && cell.style.backgroundColor!="rgb(231, 231, 231)"){
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

createCalendar(currentMonth,currentYear);
//setOccupied('Premium',currentMonth,currentYear);
setCalendar('Premium',currentMonth,currentYear);
//setOccupied('Premium');

let calendarDropdown = document.querySelector('#calendarDropdown');

calendarDropdown.addEventListener('input',e=>{
    createCalendar(monthInd,currentYear);
    //setOccupied(e.target.value,monthInd,currentYear);
    setCalendar(e.target.value,monthInd,currentYear);
})

document.querySelector('#previousMonth').addEventListener('click',()=>{
    monthInd--;
    if(monthInd==-1){
        monthInd=11;
        currentYear--;
    }
    createCalendar(monthInd,currentYear);
    //setOccupied(calendarDropdown.value,monthInd,currentYear);
    setCalendar(calendarDropdown.value,monthInd,currentYear);});
    
document.querySelector('#nextMonth').addEventListener('click',()=>{
    monthInd++;
    if(monthInd==12){
        monthInd=0;
        currentYear++;
    }
    createCalendar(monthInd,currentYear);
    setCalendar(calendarDropdown.value,monthInd,currentYear);});



//TEMPORARY TO AVOID ERROR

function setCalendar(roomType,month,year){
    console.log('SETTING LOCAL CALENDAR');
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
