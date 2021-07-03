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


setRooms();
setInclusions();
getUserRequests(); //SHOULD ADD IN ONLOAD?

function setRooms(){
    let rooms = document.querySelector('#rooms');
    for(var room of roomTypes){
        console.log(room);
        rooms.innerHTML+=`<option value="${room}">${room}</option>`
    }
}
function setInclusions(){
    let inclusions=document.querySelector('#inclusions');
    for(var inclusion of inclusionTypes){
        inclusions.innerHTML+=`<input type="checkbox" name="inclu" value="${inclusion}" checked/>
                                    <label>${inclusion}</label>`
    }
}

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


//SUBMIT
form.addEventListener('submit',e=>{
    e.preventDefault(); //prevents it going to the header
    console.log('submitted '+'name:'+form.firstName.value+' guests:'+form.guestsNumber.value);   
    console.log('submitted '+'room:'+form.rooms.value+' stratDate:'+form.startDate.value); 
    console.log(form.inclu[0].checked);
    console.log(form.genderBtn.value); 
    for(let val of form.inclu){
        if(val.checked==true){
            console.log(val.value);
        }
    }
    if(!validateDates(form.rooms.value)){
        alert('Check calendar for availability');
        return false;
    }
    //console.log(errorCount);
    if(errorSet.size!=0){
        alert('remove errors');
        return false;
    }else if(!requiredFields()){
        //this part nort required any more
        alert('name and room should be selected');
        return false;
    }else{
        console.log(form);
        addUserRequest(e);
        updateOccupancy(new Date(form.startDate.value),new Date(form.endDate.value),form.rooms.value);
        return true;
        //form.submit();
    }
  

})

//CLEAR ALL
btnClear.addEventListener('click',function(e){
    e.preventDefault();
    //console.log(this);
    this.form.firstName.value='';
    this.form.lastName.value='';
    let maleBtn = document.querySelector('#maleBtn');
    maleBtn.checked=false;
    let femaleBtn = document.querySelector('#femaleBtn');
    femaleBtn.checked=false;
    this.form.guestsNumber.value=1;
    this.form.rooms.value='';
    this.form.startDate.value='';
    this.form.endDate.value='';
    for(let val of form.inclu){
        val.checked=true;
        }
})

//VALIDATION BY INPUT

form.firstName.addEventListener('input',(e)=>{
    //console.log(e);
    if(!/^[A-Za-z ]+$/.test(form.firstName.value)){
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
    if(!/^[A-Za-z ]+$/.test(form.lastName.value)){
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

//LOCAL STORAGE

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
    
    let requestString = localStorage.getItem('requestTable');
    console.log(requestString);
    if(requestString){
        let requestArray = JSON.parse(requestString);
        requestArray.push(userReq);
        localStorage.setItem('requestTable',JSON.stringify(requestArray));
    }else{
        let requestArray = [];
        requestArray.push(userReq);
        localStorage.setItem('requestTable',JSON.stringify(requestArray));
    }

    console.log('should be created');
    console.log(userList.innerHTML)
    //const newList=`<div>${userReq.firstName}</div>` + userList.innerHTML ;
    //userList.innerHTML=newList;
    let inclu_string=inclusions.toString();
    
    userTable.innerHTML+=addRecord(userReq,inclu_string);
}

function getUserRequests(){
    console.log('getting requests');

    let requestString = localStorage.getItem('requestTable');
    //console.log(requestString);
    if(requestString){
    let requestArray = JSON.parse(requestString);
    //console.log(requestArray[0])
    for(var req of requestArray){
        //console.log(req);
        let inclu_string = req.inclusions.toString();
        userTable.innerHTML+=addRecord(req,inclu_string);

    }
    }

}

function addRecord(req,inclusion){
    let record = `<tr>
                    <td>${req.firstName}</td>
                    <td>${req.lastName}</td>
                    <td>${req.gender}</td>
                    <td>${req.startDate}</td>
                    <td>${req.endDate}</td>
                    <td>${req.guestsNumber}</td>
                    <td>${req.room}</td>
                    <td>${inclusion}</td>
                </tr>`
    return record;
}