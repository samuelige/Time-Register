const name = document.getElementById('name');
const btnSignIn = document.getElementById('btnSignIn');
const clearAll = document.getElementById('btnClear');
const filter = document.getElementById('filter');
const form = document.getElementById('form');
const mainTable = document.getElementById('mainTable');
const time = timeIn();

// Event Listeners
form.addEventListener('submit',addName);
btnSignIn.addEventListener('click',addName);
filter.addEventListener('keyup',filterLogins);
clearAll.addEventListener('click',clearNames);


onload = getNames();

// Add item function
function addName(e){
    if(name.value !== ""){                
        createElements();
        storeNameInLocalStorage(name.value);
        storeTimeInLocalStorage(time);
        name.focused = true;
        name.value = "";
    }
    else{
        alert('Please enter a name!');
    }
  
    e.preventDefault();
}



// Get Task from LS 
function getNames(){
    let tasks, tasks2;
    if(localStorage.getItem('userNames') === null){
        tasks = [];
        tasks2 = [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem('userNames'));
        tasks2 = JSON.parse(localStorage.getItem('userNames'));
    }

    tasks.forEach(function(task){        
        var holder = document.createElement('tr');
        let nameHolder = document.createElement('td');
        let timeHolder = document.createElement('td');
        let actionHolder = document.createElement('td');
        let empty = document.createElement('td');
        let btnAction = document.createElement('button');
        let btnClear = document.createElement('h4');
        btnClear.addEventListener('click',removeName);

        holder.className = 'name-list';
        btnAction.style.backgroundColor = 'red';
        btnAction.style.color = 'white';
        btnAction.innerHTML = 'Edit';    
        empty.innerHTML = "";
        btnClear.innerHTML = 'x';
        btnClear.className = 'x';        
        btnClear.style.color = 'red';
        nameHolder.innerText = task;
        timeHolder.innerText = time;
        holder.style.width = '100%';
        holder.style.padding = '10px';


        actionHolder.appendChild(btnAction);
        actionHolder.appendChild(btnClear);
        holder.appendChild(nameHolder);
        holder.appendChild(timeHolder);
        holder.appendChild(empty);
        holder.appendChild(actionHolder);
        mainTable.appendChild(holder);
    });
}


// Create all element
function createElements(){
    var holder = document.createElement('tr');
    let nameHolder = document.createElement('td');
    let timeHolder = document.createElement('td');
    let actionHolder = document.createElement('td');
    let empty = document.createElement('td');
    let btnAction = document.createElement('button');
    let btnClear = document.createElement('h4');
    holder.className = 'name-list';
    btnAction.style.backgroundColor = 'red';
    btnAction.style.color = 'white';
    btnAction.innerHTML = 'Edit';    
    empty.innerHTML = "";
    btnClear.innerHTML = 'x';
    btnClear.className = 'x';
    btnClear.addEventListener('click',removeName);
    btnClear.style.color = 'red';
    nameHolder.innerText = name.value;
    timeHolder.innerText = time;
    holder.style.width = '100%';
    holder.style.padding = '10px';
    actionHolder.appendChild(btnAction);
    actionHolder.appendChild(btnClear);
    holder.appendChild(nameHolder);
    holder.appendChild(timeHolder);
    holder.appendChild(empty);
    holder.appendChild(actionHolder);
    mainTable.appendChild(holder);
}

// filter function
function filterLogins(e){
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.name-list').forEach(function(names){
        const item = names.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1){
            names.style.display = 'block';            
            names.colspan = '4';            
        }
        else{
            names.style.display = 'none';
        }
    });
}


// clear names
function clearNames(){            
    while(mainTable.firstChild){
        mainTable.removeChild(mainTable.firstChild);
        localStorage.clear();
    }            
}

// Remove name from list
function removeName(e){    
        if(confirm('Are you sure?')){
            e.target.parentElement.parentElement.remove();  
            removeNameFromLocalStorage(e.target.parentElement.parentElement); 
            removeTimeFromLocalStorage(e.target.parentElement); 
    }
}

// Add name to ls
function storeNameInLocalStorage(userName){
    let tasks;
    if(localStorage.getItem('userNames') === null){
        tasks = [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem('userNames'));
    }
    tasks.push(userName);
    localStorage.setItem('userNames', JSON.stringify(tasks));
}

// Add time to ls
function storeTimeInLocalStorage(logInTime){
    let tasks;
    if(localStorage.getItem('logInTimes') === null){
        tasks = [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem('logInTimes'));
    }
    tasks.push(logInTime);
    localStorage.setItem('logInTimes', JSON.stringify(tasks));
}



// Remove Name from LS
function removeNameFromLocalStorage(mainTable){
    let tasks;
    if(localStorage.getItem('userNames') === null){
        tasks = [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem('userNames'));
    }

    tasks.forEach(function(task, index){
        if(mainTable.textContent === task){
            tasks.splice(index, 1);
        }
    });
    localStorage.setItem('userNames', JSON.stringify(tasks));
}

// Remove Time from LS
function removeTimeFromLocalStorage(mainTable){
    let tasks;
    if(localStorage.getItem('logInTimes') === null){
        tasks = [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem('logInTimes'));
    }

    tasks.forEach(function(task, index){
        if(mainTable.textContent === task){
            tasks.splice(index, 1);
        }
    });
    localStorage.setItem('logInTimes', JSON.stringify(tasks));
}


// get time format
function timeIn(time){
        var date = new Date();
        var h = date.getHours();
        var m = date.getMinutes();
        var s = date.getSeconds();
        var session = "AM";
        if(h == 0){
            h = 12;        
        }
        if(h > 12){
            h = h - 12;
            session = " PM";
        }    
        h = (h < 10) ? "0" + h : h;
        m = (m < 10) ? "0" + m : m;
        s = (s < 10) ? "0" + s : s;    
        return (time = h + ":" + m + ":" + s + " "+session);    
}

