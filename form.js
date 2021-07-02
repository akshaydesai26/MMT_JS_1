console.log('script functioning');


let db=null;
let btnSubmit = document.querySelector('#btn');
let btnClear = document.querySelector('#clr');
let userList = document.querySelector('#userList');
let form = document.querySelector('#requestForm');
let userTable = document.querySelector('#userTable');
const today=Date.now();
const formattedDate = new Date().toJSON().slice(0,10).replace(/-/g,'-');
const errorSet = new Set();
let errorCount=0;

let testDate = new Date();
console.log(testDate);
console.log(testDate.toJSON());
console.log(testDate.toJSON().slice(0,10));
console.log(formattedDate);

const roomTypes = ['Premium','Mid','Budget'];
const inclusionTypes=['Spa','Safari','Airport Ride']
setRooms();
setInclusions();

function setRooms(){
    let rooms = document.querySelector('#rooms');
    for(var room of roomTypes){
        console.log(room);
        rooms.innerHTML+=`<option value="${room}">${room}</option>`
    }
}
function setInclusions(){

}
//SUBMIT
// btnSubmit.addEventListener('click',e=>{
//     e.preventDefault();
//     console.log('submitted '+'name:'+form.firstName.value+' guests:'+form.guestsNumber.value);   
//     console.log('submitted '+'room:'+form.rooms.value+' stratDate:'+form.startDate.value); 
//     console.log(form.inclu[0].checked);
//     console.log(form.genderBtn.value); 
//     for(let val of form.inclu){
//         if(val.checked==true){
//             console.log(val.value);
//         }
//     }
//     console.log(errorCount);
//     if(errorSet.size!=0){
//         alert('remove errors');
//     }else if(!requiredFields()){
//         alert('name and room should be selected');
//     }else{
//         console.log(form);
//         const domEvent = document.createEvent('Event')
//         domEvent.initEvent('submit', false, true)
//         e.target.closest('form').dispatchEvent(domEvent)
//         //form.submit();
//     }
  

// })

//REQUIRED FIELDS CHECK
function requiredFields(){
    if(form.firstName.value==''){
        return false;
    }
    if(form.rooms.value==''){
        return false;
    }

    return true;
}

//TRIGGERED FROM CLICK HANDLER
//form.addEventListener('submit',addUserRequest); INITIALLY HAD THIS AND CLICK HANDLER

form.addEventListener('submit',e=>{
    e.preventDefault();
    console.log('submitted '+'name:'+form.firstName.value+' guests:'+form.guestsNumber.value);   
    console.log('submitted '+'room:'+form.rooms.value+' stratDate:'+form.startDate.value); 
    console.log(form.inclu[0].checked);
    console.log(form.genderBtn.value); 
    for(let val of form.inclu){
        if(val.checked==true){
            console.log(val.value);
        }
    }
    console.log(errorCount);
    if(errorSet.size!=0){
        alert('remove errors');
        return false;
    }else if(!requiredFields()){
        alert('name and room should be selected');
        return false;
    }else{
        console.log(form);
        addUserRequest(e);
        return true;
        //form.submit();
    }
  

})

//CLEAR ALL
btnClear.onclick=function(e){
    e.preventDefault();
    this.form.firstName.value='';
    this.form.lastName.value='';
    let maleBtn = document.querySelector('#maleBtn');
    maleBtn.checked=false;
    let femaleBtn = document.querySelector('#femaleBtn');
    femaleBtn.checked=false;
    this.form.guestsNumber.value=0;
    this.form.rooms.value='';
    this.form.startDate.value='';
    this.form.endDate.value='';
    for(let val of form.inclu){
        val.checked=true;
        }
}

//VALIDATION BY INPUT

form.firstName.addEventListener('input',(e)=>{
    //console.log(e);
    if(!/^[A-z ]+$/.test(form.firstName.value)){
        console.log('invalid');
        nameError.innerHTML='Input correct name';
        errorSet.add('nameError');
    }else{
        nameError.innerHTML='<br/>';
        errorSet.delete('nameError');
    }
})

form.lastName.addEventListener('input',(e)=>{
    //console.log(e);
    if(!/^[A-z ]+$/.test(form.lastName.value)){
        console.log('invalid');
        nameError.innerHTML='Input correct name';
        errorSet.add('lastNameError');
    }else{
        nameError.innerHTML='<br/>';
        errorSet.delete('lastNameError');
    }
})

form.guestsNumber.addEventListener('input',(e)=>{
    //console.log(e);
    if(form.guestsNumber.value<1){
        console.log('invalid');
        guestsError.innerHTML='enter greater than 0';
        errorSet.add('guestsError');
    }else{
        guestsError.innerHTML='<br/>';
        errorSet.delete('guestsError');
    }
})

form.startDate.addEventListener('input',(e)=>{
    // console.log(today);
    // console.log(utc);
    // console.log(form.startDate.value);
    if(form.startDate.value<=formattedDate){
        console.log('invalid');
        startDateError.innerHTML='Enter a date in futue';
        errorSet.add('startDateError');
    }else{
        startDateError.innerHTML='<br/>';
        errorSet.delete('startDateError');
    }
})

form.endDate.addEventListener('input',(e)=>{
    //console.log(e);
    if(form.endDate.value<form.startDate.value){
        console.log('invalid');
        endDateError.innerHTML='Start date should be before end';
        errorSet.add('endDateError');
    }else{
        endDateError.innerHTML='<br/>';
        errorSet.delete('endDateError');
    }
})

//INDEXEDDB
const userRequest = indexedDB.open("userRequest");

userRequest.onupgradeneeded=e=>{
    db=e.target.result;
    db.createObjectStore("user_requests",{keyPath:"reqID"});
    console.log('UPGRADED');
}

userRequest.onsuccess=e=>{
    db=e.target.result;
    console.log(db);
    console.log('SUCCESS');
    getUserRequests();
}

userRequest.onerror=e=>{
    console.log('ERROR');
}

function addUserRequest(e){
    //e.preventDefault();
    console.log('creating user requets');
    const inclusions=[];
    for(let val of form.inclu){
        if(val.checked==true){
            console.log(val.value);
            inclusions.push(val.value);
        }
    }
    
    const userReq = {
        reqID : Math.random(),
        firstName: form.firstName.value,
        lastName: form.lastName.value,
        gender:form.genderBtn.value,
        guestsNumber: form.guestsNumber.value,
        startDate: form.startDate.value,
        endDate: form.endDate.value,
        room: form.rooms.value,
        inclusions:inclusions,

    }
    
    const tx=db.transaction("user_requests","readwrite");
    const reqTable= tx.objectStore("user_requests");
    reqTable.add(userReq);
    console.log('should be created');
    console.log(userList.innerHTML)
    //const newList=`<div>${userReq.firstName}</div>` + userList.innerHTML ;
    //userList.innerHTML=newList;
    let inclu_string1=inclusions.toString();
    const newRow=`<tr>
                    <td>${userReq.firstName}</td>
                    <td>${userReq.lastName}</td>
                    <td>${userReq.gender}</td>
                    <td>${userReq.startDate}</td>
                    <td>${userReq.endDate}</td>
                    <td>${userReq.guestsNumber}</td>
                    <td>${userReq.room}</td>
                    <td>${inclu_string1}</td>
                </tr>`
  userTable.innerHTML+=newRow;
}

function getUserRequests(){
    console.log('getting requests');
    const tx = db.transaction("user_requests","readwrite");
    const reqTable= tx.objectStore("user_requests");
    //cursor allows to iterate
    const reqCursor=reqTable.openCursor();
    reqCursor.onsuccess = e=>{
        const cursor = e.target.result;
        if(cursor){
            console.log("in cursor");
            console.log(cursor);
            let inclu_string=cursor.value.inclusions.toString();
            //userList.innerHTML+=`<div>${cursor.value.firstName}</div>`
            userTable.innerHTML+=`<tr>
                                    <td>${cursor.value.firstName}</td>
                                    <td>${cursor.value.lastName}</td>
                                    <td>${cursor.value.gender}</td>
                                    <td>${cursor.value.startDate}</td>
                                    <td>${cursor.value.endDate}</td>
                                    <td>${cursor.value.guestsNumber}</td>
                                    <td>${cursor.value.room}</td>
                                    <td>${inclu_string}</td>
                                  </tr>`
            cursor.continue();
        }
    }

}