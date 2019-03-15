const form = document.querySelector("#todo-form");
const todoinput = document.querySelector("#todo");
const todolist = document.querySelector(".list-group");
const cb1 = document.querySelectorAll(".card-body")[0];
const cb2 = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearB = document.querySelector("#clear-todos");
eventListeners();
function eventListeners(){
    form.addEventListener("submit", addTodo);
    document.addEventListener("DOMContentLoaded", loadAllTodos);
    cb2.addEventListener("click",deleteTodo);
    filter.addEventListener("keyup", filtertodo);
    clearB.addEventListener("click", clearall);


}
function clearall(e){
    if(confirm("Are you sure?")){
        // todolist.innerHTML=""; Also we can use this code
        while(todolist.firstChild != null){
            todolist.removeChild(todolist.firstChild)
        }
        localStorage.removeItem("todos");

    }
}
function filtertodo(e){
    const filterValue= e.target.value.toLowerCase();
    const listItems = document.querySelectorAll(".list-group-item");
    listItems.forEach(function (listItem){
       const  text = listItem.textContent.toLowerCase();
       if (text.indexOf(filterValue)===-1){
           listItem.setAttribute("style", "display: none !important");
       }else {
           listItem.setAttribute("style", "display: block");
       }
    });

}
function deleteTodo(e){
    if (e.target.className === "fa fa-remove") {
        e.target.parentElement.parentElement.remove();
        deletefromStorage(e.target.parentElement.parentElement.textContent);
        showAlert("warning", "Successfully Deleted");
    }
}
function deletefromStorage(deletetodo){
    let todos = getfromstorage();
    todos.forEach(function(todo,index){
        if(todo === deletetodo){
            todos.splice(index,1);
        }
    });
    localStorage.setItem("todos", JSON.stringify(todos));

}
function loadAllTodos(){
    let todos = getfromstorage();
    todos.forEach(function(todo){
        addtotodo(todo);
    });
}
function addTodo(e){
    const newtodo = todoinput.value.trim();
    if(newtodo===""){

        showAlert("danger", "It shouldn't be empty");
    }else{
        addtotodo(newtodo);
        addtoStorage(newtodo);
        showAlert("success", "Successfully Added");
    }
    


    e.preventDefault();
}
function showAlert(type, message){
    const alert = document.createElement("div");
    alert.className='alert alert-'+type;
    alert.textContent=message;
    cb1.appendChild(alert);
    setTimeout(function(){
        alert.remove();
    }, 1000);
}
function getfromstorage(){
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos=[];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}
function addtoStorage(newtodo){
    let todos = getfromstorage();
    todos.push(newtodo);
    localStorage.setItem("todos", JSON.stringify(todos));
}
function addtotodo(newtodo){

   const listitem = document.createElement("li");
   const link = document.createElement("a");
   link.href="#";
   link.className = "delete-item";
   link.innerHTML=  "<i class = 'fa fa-remove'></i>"
   listitem.className = "list-group-item d-flex justify-content-between";
   listitem.appendChild(document.createTextNode(newtodo));
   listitem.appendChild(link);
   todolist.appendChild(listitem);
   todoinput.value="";
}