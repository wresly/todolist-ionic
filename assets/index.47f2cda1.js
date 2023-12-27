const p = function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(script) {
    const fetchOpts = {};
    if (script.integrity)
      fetchOpts.integrity = script.integrity;
    if (script.referrerpolicy)
      fetchOpts.referrerPolicy = script.referrerpolicy;
    if (script.crossorigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (script.crossorigin === "anonymous")
      fetchOpts.credentials = "omit";
    else
      fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
};
p();
var style = "";
class ToDo extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    const shadow = this.attachShadow({ mode: "open" });
    shadow.innerHTML = `
        <ion-item lines="none">
            <ion-checkbox checked="${this.getAttribute("data-status")}" slot="start"></ion-checkbox>
            <ion-label>
                <slot></slot>
            </ion-label>
        </ion-item>
        `;
  }
}
window.customElements.define("my-todo", ToDo);
let todoData$1 = [
  {
    name: "Buat pr matematika",
    status: false
  },
  {
    name: "Baca buku",
    status: false
  },
  {
    name: "Bangun pagi",
    status: true
  },
  {
    name: "Nyuci baju",
    status: false
  }
];
function setToDo(name, status) {
  let tempTodoData = getTodo();
  tempTodoData.push({
    name,
    status
  });
  window.localStorage.setItem("todolist", JSON.stringify(tempTodoData));
  window.location.reload();
}
function getTodo() {
  const ret = window.localStorage.getItem("todolist");
  if (ret) {
    const tempTodoData = JSON.parse(ret);
    console.log(tempTodoData);
    return tempTodoData;
  } else {
    console.log('No data found in localStorage for key "todolist"');
  }
}
if (window.localStorage.getItem("todolist") === null || window.localStorage.getItem("todolist") === void 0) {
  window.localStorage.setItem("todolist", JSON.stringify(todoData$1));
}
let todoData = getTodo();
class HomePage extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
        <style>
            /* toolbard */
            ion-toolbar ion-avatar{
                width: 45px;
                height: 45px;
            }
            ion-toolbar ion-title{
                font-size: 20px;
                font-weight: bold;
            }

            /* card */
            ion-card{
                margin-top: 50px;
            }

            /* todolist */
            div.todo-list{
                margin-top: 50px;
            }
        </style>
        <ion-toolbar>
            <ion-button class="menu-button" slot="start">
                <ion-icon icon="grid-outline"></ion-icon>
            </ion-button>
            <ion-avatar slot="end">
                <img alt="avatar" src="https://i.ibb.co/7KcbHq7/avatar.png" />
            </ion-avatar>
            <ion-title>To Do List</ion-title>
        </ion-toolbar>

        <ion-card>
            <ion-card-header>
                <ion-card-title>Today Quote</ion-card-title>
                <ion-card-subtitle>\u2014 Robert Collier \u2014</ion-card-subtitle>
            </ion-card-header>
        
            <ion-card-content>
                "Success is the sum of small efforts, repeated day in and day out."
            </ion-card-content>
        </ion-card>

        <div class="todo-list">
            <ion-list id="todo-list">
            </ion-list>
        </div>


        <!-- add buton -->
        <ion-fab slot="fixed" id="open-modal" vertical="bottom" horizontal="center">
            <ion-fab-button id="fab-test">
                <ion-icon name="add"></ion-icon>
            </ion-fab-button>
        </ion-fab>

        <!-- modal -->
        <ion-modal trigger="open-modal">
            <ion-header>
                <ion-toolbar>
                    <ion-buttons slot="start">
                        <ion-button id="cancelBtn">Cancel</ion-button>
                    </ion-buttons>
                    <ion-title>Welcome</ion-title>
                    <ion-buttons slot="end">
                        <ion-button id="saveBtn" strong="true">Save</ion-button>
                    </ion-buttons>
                </ion-toolbar>
            </ion-header>
            <ion-content class="ion-padding">
                <ion-item>
                    <ion-input label="Task Name" id="taskName" label-placement="stacked" type="text"
                        placeholder="Task Name"></ion-input>
                </ion-item>
            </ion-content>
        </ion-modal

        `;
    todoData.forEach((todo) => {
      const element = document.createElement("my-todo");
      element.innerText = todo.name;
      element.setAttribute("data-status", todo.status);
      document.getElementById("todo-list").appendChild(element);
    });
    var modal = document.querySelector("ion-modal");
    const cancelBtnModal = document.getElementById("cancelBtn");
    const saveBtnModal = document.getElementById("saveBtn");
    cancelBtnModal.addEventListener("click", () => {
      modal.dismiss();
    });
    saveBtnModal.addEventListener("click", () => {
      const name = document.getElementById("taskName").value;
      setToDo(name, false);
      modal.dismiss();
    });
  }
}
window.customElements.define("my-home", HomePage);
class ProfilePage extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
        <style>
            /* toolbar */
            ion-button.menu-button{
                --background: rgb(242, 242, 242);
                --box-shadow: none;
            }

            ion-button.menu-button ion-icon{
                color: black;
            }

            /* avatar */
            div.profile-avatar{
                margin-top: 50px;
                width: 100%;
            }

            div.profile-avatar ion-avatar{
                width: 100%;
                height: auto;

                display: flex;
                flex-direction: column;
                align-items: center;
            }

            div.profile-avatar ion-avatar img{
                height: 125px;
                width: 125px;
            }

            div.profile-avatar ion-avatar ion-title{
                font-size: 20px;
                font-weight: 600;

                margin-top: 20px;
                width: 100%;
            }


            /* setting */
            div.profile-setting{
                margin-top: 100px;
            }

            ion-button.logout-btn{ 
                margin-top: 150px;


                position: relative;
                left: 50%;
                transform: translateX(-50%);
            }
        </style>
        <ion-toolbar>
            <ion-button class="menu-button" slot="start">
                <ion-icon icon="grid-outline"></ion-icon>
            </ion-button>
        </ion-toolbar>
        
        <div class="profile-avatar">
            <ion-avatar class="ion-align-items-center">
                <img alt="avatar" src="https://i.ibb.co/7KcbHq7/avatar.png" />
                <ion-title class="ion-text-center">John Brown</ion-title>
            </ion-avatar>
        </div>

        <div class="profile-setting">
            <ion-list>
                <ion-item lines="none">
                    <ion-icon aria-hidden="true" name="create-outline" slot="start"></ion-icon>
                    <ion-label>Edit Profile</ion-label>
                    <ion-icon name="chevron-forward-outline" slot="end"></ion-icon>
                </ion-item>
                <ion-item lines="none">
                    <ion-icon aria-hidden="true" name="lock-open-outline" slot="start"></ion-icon>
                    <ion-label>Change Password</ion-label>
                    <ion-icon name="chevron-forward-outline" slot="end"></ion-icon>
                </ion-item>
                <ion-item lines="none">
                    <ion-icon aria-hidden="true" name="notifications-outline" slot="start"></ion-icon>
                    <ion-label>Notifications</ion-label>
                    <ion-toggle checked="true" slot="end"></ion-toggle>
                </ion-item>
            </ion-list>

            <ion-button class="logout-btn" fill="solid" color="danger">
                Logout
            </ion-button>
        </div>
        `;
  }
}
window.customElements.define("my-profile", ProfilePage);
