let taskData = [];

const saveLocalstorage = () => {
    localStorage.setItem("tasks",JSON.stringify({tasks:taskData}))
}

const addTask = () => { 
      const taskDetails = {
          id: `${Date.now()}`,
          taskName: document.getElementById("tname").value,
          Deadline: document.getElementById("tdeadline").value,
          taskType: document.getElementById("ttype").value,
          description: document.getElementById("tdescription").value,
          priority: document.getElementById("tpriority").value,
          repeat: document.getElementById("trepeat").value,
          status: document.getElementById("tstatus").value,
      };
    
      document.getElementById("tasksRow").insertAdjacentHTML('beforeend', generateReviewPost(taskDetails));
      taskData.push(taskDetails);
      console.log(taskData);
      saveLocalstorage();
  
  }

  const generateReviewPost = ({id,taskName,Deadline,taskType,description,priority,repeat,status}) => {
    return (`
    <div class="col-md-6 col-lg-4 pb-3 review-card" id=${id} key=${id}>
     <div class="card card-custom bg-warning border-black border-0">
    <div class="card-text repeat">${repeat}</div>
    <div class="card-custom-avatar">
      <center> <h4 class="m-auto reviewer-name">${taskName}</h4></center>
    </div>
    <div class="card-body" style="overflow-y: auto">
      <h6 class="card-title taskdeadline">${Deadline}</h6>
      <h6 class="taskType">${taskType}</h6>
      <i class="fa fa-star" style="color:yellow;">&nbsp;&nbsp;<span style="color:black" class="priority">${priority}</span></i>
      <p class="card-text description">${description}</p>
    </div>
    <div class="card-footer" style="background: inherit; border-color: inherit;">
    <button type="button" class="btn btn-outline-info" name=${id} onclick="editTask(this)">
    <i class="fas fa-pencil-alt" name=${id} onclick="editTask(this)"></i>
</button>
      <button type="button" class="btn btn-outline-danger" name=${id} onclick="deleteTask(this)">
      <i class="far fa-trash-alt" name=${id} onclick="deleteTask(this)"></i>
  </button>
  <h6 class="status">${status}</h6>
    </div>
  </div>
  </div>`)
}
  
const reloadTasks = () => {
  const localCopy = JSON.parse(localStorage.getItem("tasks"));
  console.log(localCopy);
  if(localCopy){
      taskData = localCopy["tasks"];
  }
  taskData.map((data) => {
      document.getElementById("tasksRow").insertAdjacentHTML('beforeend', generateReviewPost(data));
  })
}

const deleteTask = (e) => {
  const targetID = e.getAttribute("name");
  taskData =taskData.filter((cardData) => cardData.id!==targetID);
  console.log(taskData)
  saveLocalstorage();
  window.location.reload();
}

const editTask = (e) => {
  e.parentNode.childNodes[1].innerHTML="Save";
  e.parentNode.childNodes[1].setAttribute("onclick","saveEditReview(this)");
  console.log(e.parentNode.parentNode.childNodes[5].childNodes);
  console.log(e.parentNode.parentNode.childNodes[5].childNodes[1].innerHTML);
  e.parentNode.parentNode.childNodes[5].childNodes[1].setAttribute("contenteditable", "true");
  console.log(e.parentNode.parentNode.childNodes[5].childNodes[3]);
  e.parentNode.parentNode.childNodes[5].childNodes[3].setAttribute("contenteditable", "true");
  console.log(e.parentNode.parentNode.childNodes[5].childNodes[7]);
  e.parentNode.parentNode.childNodes[5].childNodes[7].setAttribute("contenteditable","true");
  console.log(e.parentNode.parentNode.childNodes[5].parentNode.childNodes[5].childNodes[5].childNodes[1].innerHTML);
 e.parentNode.parentNode.childNodes[5].parentNode.childNodes[5].childNodes[5].childNodes[1].setAttribute("contenteditable","true");
   console.log(e.parentNode.parentNode.childNodes[7].childNodes[5].innerHTML);
  console.log(e.parentNode.parentNode.childNodes[3].childNodes[1].innerHTML);
  e.parentNode.parentNode.childNodes[3].childNodes[1].setAttribute("contenteditable","true");

 
}


const saveEditReview = (e) => {
  const targetID = e.getAttribute("name");
  console.log(targetID);
  const updatedTaskDetails = {
    id: targetID,
    taskName:e.parentNode.parentNode.childNodes[3].childNodes[1].innerHTML,
    Deadline: e.parentNode.parentNode.childNodes[5].childNodes[1].innerHTML,
    taskType:e.parentNode.parentNode.childNodes[5].parentNode.childNodes[1].innerHTML, 
    description:e.parentNode.parentNode.childNodes[7].childNodes[5].innerHTML,
    repeat: e.parentNode.parentNode.childNodes[5].childNodes[3].innerHTML,
    priority:e.parentNode.parentNode.childNodes[5].parentNode.childNodes[5].childNodes[5].childNodes[1].innerHTML,
    status:e.parentNode.parentNode.childNodes[5].childNodes[7].innerHTML
  }
 
  var len = taskData.length;
   
    for(var i=0;i<len;i++){
        if(taskData[i].id==targetID){
            var index=i;
        }
    }

    taskData[index]=updatedTaskDetails;
   
    saveLocalstorage();
     window.location.reload();   
}
