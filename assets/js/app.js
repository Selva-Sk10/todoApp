"use strict";

const
containerBox = document.querySelector(".wrapper"),
taskBtn = document.querySelector(".task-btn"),
formTag = document.querySelector("form"),
ulTag = document.querySelector("ul"),
inputTitle = document.querySelectorAll("input")[0],
inputDate = document.querySelectorAll("input")[1],
textAreaDesc = document.querySelector("textarea"),
clearBtn = document.querySelector(".btns button"),
closeBtn = document.querySelectorAll("span button")[0],
addBtn = document.querySelectorAll("span button")[1],
updateBtn = document.querySelectorAll("span button")[2];
let storageArr = null;
let isUpdateState = false;

formTag.addEventListener("submit", handleRefresh);
taskBtn.addEventListener("click", showForm);
closeBtn.addEventListener("click", hideForm);
addBtn.addEventListener("click", handleSubmit);
clearBtn.addEventListener("click", clearInput);
updateBtn.addEventListener("click", updated);

function handleRefresh(e){
    e.preventDefault();
}

function showForm(){
    containerBox.classList.add("inactive");
    formTag.classList.add("slide-down");
    document.body.classList.add("dark-bg");
}

function hideForm(){
    containerBox.classList.remove("inactive");
    formTag.classList.remove("slide-down");
    document.body.classList.remove("dark-bg");

    if(isUpdateState){
        clearInput();
        updateBtn.classList.remove("btn-show");
        addBtn.classList.remove("btn-hide");
        isUpdateState = false;
    }
}

function clearInput(){
    inputTitle.value = "";
    inputDate.value = "";
    textAreaDesc.value = "";
}

function deleteFun(elem){
    let listNode = elem.closest("li");
    ulTag.removeChild(listNode);
    clearInput();
}

function callUpdateFun(elem){
    let parentListArr = elem.closest("li").children;
    inputTitle.value = parentListArr[0].innerText;
    inputDate.value = parentListArr[1].innerText;
    textAreaDesc.value = parentListArr[2].textContent;

    storageArr = [...elem.closest("li").children];
    isUpdateState = true;
    updateBtn.classList.add("btn-show");
    addBtn.classList.add("btn-hide");
    showForm();
}

function updated(){
    if(inputTitle.value || inputDate.value || textAreaDesc.value){
        storageArr[0].innerText = inputTitle.value;
        storageArr[1].innerText = inputDate.value;
        storageArr[2].textContent = textAreaDesc.value;
    }else{
        console.log(storageArr[0]);
        deleteFun(storageArr[0]);
    }

    updateBtn.classList.remove("btn-show");
    addBtn.classList.remove("btn-hide");
    isUpdateState = false;
    clearInput();
    hideForm();
}

function handleSubmit(){
    if(inputTitle.value || inputDate.value || textAreaDesc.value){
        const todoList = `
        <h3>${inputTitle.value}</h3>
        <p>${inputDate.value}</p>
        <pre>${textAreaDesc.value}</pre>
        <div class="todo-btns">
            <button onclick="callUpdateFun(this)">Update</button>
            <button onclick="deleteFun(this)">Delete</button>
        </div>`;

        let liTag = document.createElement("li");
        liTag.innerHTML = todoList;
        ulTag.appendChild(liTag);
        clearInput();
    }

    hideForm();
}