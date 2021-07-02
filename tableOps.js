let sortingBtn = userTable.getElementsByTagName('button');
console.log(sortingBtn);
// sortingBtn[0].addEventListener('click',sortAsc);
// sortingBtn[1].addEventListener('click',sortAsc);
//document.querySelector('#extBtn').addEventListener('click',sortAsc);

//added to avoid loss of event on dynamic buttons
document.addEventListener('click', function(e){
    if(e.target && ( e.target.id== 'sortBtn1' || e.target.id== 'sortBtn2')){
         sortAsc(e);
    }
});
function sortAsc(e) {
    console.log(userTable.innerHTML);
    changeIcon(e.target);
    let table, rows, switching, i, x, y, shouldSwitch;
    let ascSwitched=0;
    let dir='asc';
    let index;
    table = document.getElementById("userTable");
    switching = true;
    
    if(e.target.id == 'sortBtn1'){
        index = 3;
    }else{
        index=5;
    }

    while (switching) {
      switching = false;
      rows = table.rows;
      //console.log(rows);
      for (i = 1; i < (rows.length - 1); i++) {
        
        switching = false;
        x = rows[i].getElementsByTagName("TD")[index];
        y = rows[i + 1].getElementsByTagName("TD")[index];
        
        if (dir=='asc' && x.innerHTML > y.innerHTML) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            ascSwitched=1;
            switching = true;
            break;
        }else if(dir=='desc' && x.innerHTML < y.innerHTML){
            rows[i].parentNode.insertBefore(rows[i+1], rows[i]);
            ascSwitched=1;
            switching = true;
            break;
        }
      }
      if(ascSwitched==0){
          dir='desc';
          switching=true;
      }
      
    }
}


function changeIcon(elem){
    //console.log(document.getElementById('sortBtn').innerHTML.charCodeAt(0));
    if(elem.innerHTML.charCodeAt(0)==8593){

        elem.innerHTML= '&#8595;' ;
    }
    else{
        elem.innerHTML='&#8593;';
    }
}



let searchBox=document.querySelector('#searchBox');
searchBox.addEventListener('keyup',filter);

function filter() {
    // Declare variables
    var  filter, table, tr, firstName, lastName, i, txtValue;
    console.log(searchBox);
    
    filter = searchBox.value.toUpperCase();
    //console.log(filter);
    table = document.getElementById("userTable");
    tr = table.getElementsByTagName("tr"); //same as table.rows line:11
    
    for (i = 0; i < tr.length; i++) {
      firstName = tr[i].getElementsByTagName("td")[0];
      lastName = tr[i].getElementsByTagName("td")[1];
      if (firstName || lastName) {
        //txtValue = td.textContent;
        if (firstName.textContent.toUpperCase().indexOf(filter) > -1 || lastName.textContent.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }
