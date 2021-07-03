console.log('In calendar setup');

document.querySelector('#showCalendar').addEventListener('click',(e)=>{
    document.querySelector('#completeBox').style.display="";
    document.querySelector('#hideCalendar').style.display="";
    document.querySelector('#showCalendar').style.display="none";
    e.stopPropagation();
})

document.querySelector('#hideCalendar').addEventListener('click',()=>{
    document.querySelector('#completeBox').style.display="none";
    document.querySelector('#showCalendar').style.display="";
    document.querySelector('#hideCalendar').style.display="none";
})

let occupancyJun = {
    Premium: [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    Mid: [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    Budget: [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
}

function getLocalStorage(obj){
    if(!localStorage.getItem('occupancyJun')){
        console.log('setting occupancy');
        localStorage.setItem('occupancyJun',JSON.stringify(obj));
    }else{
        let retrieval = localStorage.getItem('occupancyJun');
        occupancyJun = JSON.parse(retrieval);
    }
}

// function getLocalStorage(){
//     console.log('retrieving occupancy');
//     let retrieval = localStorage.getItem('occupancyJun');
//     occupancyJun = JSON.parse(retrieval);
//     console.log(occupancyJun);
// }

function updateLocalStorage(){
    localStorage.setItem('occupancyJun',JSON.stringify(occupancyJun));
}

//setLocalStorage(occupancyJun);

console.log('out of calendar setup');


//OPERATIONS

// function validateCalendar(){
//     // console.log('validating calendar....');
//     // console.log(form.startDate);
//     // console.log(form.startDate.value);
//     let stDate = form.startDate.value.slice(8,10);
//     console.log(stDate);
//     stDate = +stDate;
//     let enDate = form.endDate.value.slice(8,10);
//     enDate = +enDate;
//     let room = form.rooms.value;
//     console.log(room);
//     let checkArr = occupancyJun[room];
//     console.log(checkArr);
//     for(let i = stDate -1 ; i < enDate ; i++){
//         if(checkArr[i]==0){
//             return false;
//         }
//     }
//     console.log('calendar VALIDATED');
//     return true;
// }

// //validateCalendar();

// function changeOccupancy(){
//     console.log('changing occupancy');
//     let stDate = +form.startDate.value.slice(8,10);
//     let enDate = +form.endDate.value.slice(8,10);
//     let room = form.rooms.value;
//     console.log('room is'+ room);
//     let checkArr = occupancyJun[room];
//     console.log(checkArr);
//     for(let i = stDate -1 ; i < enDate ; i++){
//         checkArr[i]=0;
//     }
//     occupancyJun[room]=checkArr;
//     updateLocalStorage();
//     console.log('occupancy changed');

// }