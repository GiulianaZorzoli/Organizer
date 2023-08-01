//MENU Y TITULO (mostrar menu, cambiar de seccion)
const menuButtonWidget = document.getElementById("menu-button-widget")
const mostrarMenu = document.getElementById("mostrar-menu")
const pageTitle = document.getElementById("web-section")


menuButtonWidget.addEventListener("click",()=>{
        mostrarMenu.classList.toggle("mostrar")
})
const sections=document.querySelectorAll(".menu-option")
const titulos=["HOME","TO-DO","CALENDAR","NOTES"]
const screens = document.querySelectorAll(".screen")
index=0
sections.forEach((section,indice)=>{
    section.addEventListener("click",()=>cambiarSeccion(indice))
})
function cambiarSeccion(indice){
    if (indice!=index){
        sections[indice].classList.add("focus-option")
        screens[indice].classList.remove("hidden")
        pageTitle.textContent=titulos[indice]
        sections[index].classList.remove("focus-option")
        screens[index].classList.add("hidden")
        index=indice
    }
}

document.addEventListener("click", (e) => {
    if(!e.target.classList.contains("menu")){
        mostrarMenu.classList.remove("mostrar")
    }
    //     

    // }
})
//TO-DO
const addNewToDo = document.getElementById("addNewToDo")
const newToDoText = document.getElementById("newToDoText")
const newToDo = document.getElementById("newToDo")
const checkbox = document.getElementById("checkboxToDo")
const toDos=JSON.parse(localStorage.getItem("toDos")||"[]")

addNewToDo.addEventListener("click",()=>{
    if (newToDoText.value != ""){
        const todoText = newToDoText.value
        toDos.push(todoText)
        localStorage.setItem("toDos",JSON.stringify(toDos));
        showToDos()
        newToDoText.value=""
    }
})

function showToDos(){
    document.querySelectorAll(".toDoDiv").forEach(toDo => toDo.remove())
    toDos.forEach((toDo,index)=>{
        const toDoShowDiv=`<section class="toDoDiv">
                                <input type="checkbox" id="checkboxToDo">
                                <p class="toDoText">${toDo}</p>
                                <li onclick="deleteToDo(${index})"><i class="fa-solid fa-trash"></i></li>
                            </section>`
        newToDo.insertAdjacentHTML("afterend",toDoShowDiv)
    })
}
function deleteToDo(index){
    toDos.splice(index, 1)
    localStorage.setItem("toDos",JSON.stringify(toDos));
    showToDos()
}
showToDos()


//NOTES

//mostrar el pop up
const addNoteBox = document.getElementById("add-box")
const popUpBox = document.getElementById("popup-box")
addNoteBox.addEventListener("click",()=>{
    newNoteTitle.value=""
    newNoteDesc.value=""
    popUpBox.classList.remove("popup-hidden")
    newNoteButton.textContent="Add Note"
    popupTitle.textContent="Add a Note"
})

const closePopup = document.getElementById("close-popup")

closePopup.addEventListener("click",()=>{
    popUpBox.classList.add("popup-hidden")
})

//Crear nuevas notas
const newNoteTitle = document.getElementById("newNoteTitle")
const newNoteDesc = document.getElementById("newNoteDesc")
const newNoteButton = document.getElementById("newNoteButton")
const notesWidget = document.getElementById("notes-widget")

const months=["January","February","March","April","May","June","July","August","September","October","November","December"]
const notes = JSON.parse(localStorage.getItem("notes")||"[]")

let isUpdate = false, updateId;

function showNotes(){
    document.querySelectorAll(".note").forEach(note => note.remove())
    notes.forEach((note, index)=>{
        const noteLi = `<li class="note">
                            <div class="details">
                                <p class="noteTitle">${note.noteTitle}</p>
                                <span class="noteText">${note.noteDesc}</span>
                            </div>
                            <div class="noteBottom">
                            <span class="noteDay">${note.noteDate}</span>
                            <div class="noteSettings">
                                <i onclick="showMenu(this)" class="fa-solid fa-ellipsis" style="color: #597552;"></i>
                                <ul class="note-menu">
                                    <li onclick="updateNote(${index},'${note.noteTitle}','${note.noteDesc}')"><i class="fa-regular fa-pen-to-square"></i>Edit</li>
                                    <li onclick="deleteNote(${index})"><i class="fa-solid fa-trash"></i>Delete</li>
                                </ul>
                            </div>
                            </div>
                        </li>`;
        addNoteBox.insertAdjacentHTML("afterend",noteLi)
    })
}
newNoteButton.addEventListener("click",()=>{
    if(newNoteTitle.value!="" && newNoteDesc.value!=""){
        let title = newNoteTitle.value
        let desc = newNoteDesc.value
        let dateObj = new Date(),
        month =months[dateObj.getMonth()] ,
        day = dateObj.getDate(),
        year = dateObj.getFullYear();

        const noteInfo={
            noteTitle: title,
            noteDesc: desc,
            noteDate: `${month} ${day},${year}`
        }
        if (!isUpdate){
            console.log(" no update")
            notes.push(noteInfo);

        }else{
            console.log("update")
            notes[updateId] = noteInfo
        }
        
        localStorage.setItem("notes",JSON.stringify(notes));
        popUpBox.classList.add("popup-hidden")
        showNotes()
        isUpdate=false
    }
})
//mostrar el menu
function showMenu(elem) {
    elem.parentElement.classList.add("show");
    document.addEventListener("click", e => {
        if(e.target.tagName != "I" || e.target != elem) {
            elem.parentElement.classList.remove("show");
        }
    });
}
//borrar notas
function deleteNote(index){
    notes.splice(index, 1)
    localStorage.setItem("notes",JSON.stringify(notes));
    showNotes()
}
//editar notas
const popupTitle = document.getElementById("popupTitle")
function updateNote(index,title,desc){
    isUpdate =true;
    updateId=index
    addNoteBox.click()
    newNoteTitle.value=title
    newNoteDesc.value=desc
    newNoteButton.textContent="Update Note"
    popupTitle.textContent="Update a Note"
}
showNotes()


//CALENDAR
const currentDate = document.getElementById("currentDate")
const days = document.getElementById("daysNumber")
const prevIcon = document.getElementById("prevMonth")
const nextIcon = document.getElementById("nextMonth")
const selectedDate = document.getElementById("selectedDate")
const eventInput = document.getElementById("eventInput")
const eventSubmit = document.getElementById("eventSubmit")
const todayEvents = document.getElementById("todayEvents")

const events = JSON.parse(localStorage.getItem("events")||"[]")

let date = new Date()
let currYear = date.getFullYear()
let currMonth = date.getMonth()
let currDay = date.getDate()


selectedDate.textContent=`${currDay} ${months[currMonth]} ${currYear}`
loadEvents()

prevIcon.addEventListener("click",()=>{
    currMonth=currMonth-1

    if (currMonth<0){
        date =new Date (currYear, currMonth)
        currYear = date.getFullYear()
        currMonth = date.getMonth()
    }else{
        date = new Date()
    }
    renderCalendar()
})

nextIcon.addEventListener("click",()=>{
    currMonth=currMonth+1
    if (currMonth>11){
        date =new Date (currYear, currMonth)
        currYear = date.getFullYear()
        currMonth = date.getMonth()
    }else{
        date = new Date()
    }
    renderCalendar()
})


function renderCalendar(){
    let firstDayOfMonth = new Date (currYear,currMonth,1).getDay()//primer dia del mes
    let lastDateOfMonth = new Date(currYear,currMonth + 1, 0).getDate() //ultimo dia del mes
    let lastDayOfMonth = new Date (currYear,currMonth,lastDateOfMonth).getDay()
    let lastDateOfLastMonth = new Date(currYear, currMonth, 0).getDate()
    let liTag=``

    for (let i = firstDayOfMonth ; i > 0; i--){
        liTag += `<li class="inactiveDays" onclick="changeActive(this,'${lastDateOfLastMonth-i+1}')">${lastDateOfLastMonth-i+1}</li>`
        
    }

    for (let i = 1; i <= lastDateOfMonth; i++){
        let isToday = i===date.getDate() && currMonth === new Date().getMonth() && currYear === new Date().getFullYear() ? "today" : ""
        liTag +=`<li class="${isToday}" onclick="changeActive(this,'${i}')">${i}</li>`;
    }

    for (let i = lastDayOfMonth; i < 6; i++) {
        liTag += `<li class="inactiveDays" onclick="changeActive(this, '${i-lastDayOfMonth+1}')">${i-lastDayOfMonth+1}</li>`
        
    }

    currentDate.innerText=`${months[currMonth]} ${currYear}`
    days.innerHTML = liTag
}

function changeActive(elem , i){
    elem.classList.add("active")
    document.addEventListener("click", e => {
        if(!e.target.classList.contains("DI") && e.target != elem) {
            elem.classList.remove("active");
        }
    });
    selectedDate.textContent=`${i} ${months[currMonth]} ${currYear}`
    loadEvents()
}

function loadEvents (){
    document.querySelectorAll(".thisDayEvents").forEach(event => event.remove())
    document.querySelectorAll(".trashEvents").forEach(trash=>trash.remove())
    events.forEach((e, index)=>{

        if (e[0]==selectedDate.textContent){
            const divEvent =document.createElement("div")
            todayEvents.appendChild(divEvent)
            const liEvent = document.createElement("li")
            liEvent.textContent=e[1]
            liEvent.classList.add("thisDayEvents")
            divEvent.appendChild(liEvent)
            const trashEvent = document.createElement("i")
            trashEvent.classList.add("fa-solid")
            trashEvent.classList.add("fa-trash-can")
            trashEvent.classList.add("trashEvents")
            divEvent.appendChild(trashEvent)

            trashEvent.addEventListener("click",()=>{
                events.splice(index,1)
                localStorage.setItem("events",JSON.stringify(events))
                loadEvents()
            })
    }
})
}

eventSubmit.addEventListener("click",()=>{
    if (eventInput.value!=""){
        const event = [selectedDate.textContent,eventInput.value]
        events.push(event)
        eventInput.value=""
        localStorage.setItem("events",JSON.stringify(events));
        loadEvents()
    }
})
renderCalendar()