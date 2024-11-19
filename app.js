const destination = document.querySelector("#destination");
const startDate = document.querySelector("#start-date");
const endDate = document.querySelector("#end-date");
const submitBtn = document.querySelector("#submit");
const taskListContainer = document.querySelector("#task-list");
const taskForm = document.querySelector("#travel-form");
const plans = document.querySelector("#plan-option");
const saveBtn = document.querySelector("#save");

// task array
let trips = [];

// event listner for Submit button
taskForm.addEventListener("submit", (e) => {
  e.preventDefault(); // prevent page reload
  const formData = new FormData(taskForm);
  trips.push({
    tripDestination: formData.get("destination"),
    startDate: formData.get("start-date"),
    endDate: formData.get("end-date"),
    tasks: [],
    complete: false,
  });
  appendTask(trips);
});

function appendTask(taskArr) {
  while (taskListContainer.firstChild) {
    taskListContainer.removeChild(taskListContainer.firstChild);
  }

  taskArr.forEach((e) => {
    // container for the task
    const taskContainer = document.createElement("div");
    taskContainer.classList.add("task-container");

    // start date
    const startDateElem = document.createElement("p");
    startDateElem.textContent = `Start Date:-${e.startDate}`;

    // end-date
    const endDateElem = document.createElement("p");
    endDateElem.textContent = `End Date:-${e.endDate}`;

    //location
    const destinationElem = document.createElement("p");
    destinationElem.textContent = `Destination:${e.tripDestination}`;
    // add More task button
    const addPlan = document.createElement("button");
    addPlan.classList.add("add-Button");
    addPlan.textContent = "+";
    let buttonAdded = false;

    let buttonsContainer;
    // event listner for add button s
    addPlan.addEventListener("click", () => {
      if (!buttonAdded) {
        addPlan.textContent = "-";
        buttonsContainer = createPlanButtons(taskContainer);
        buttonAdded = true;
      } else if (buttonAdded) {
        addPlan.textContent = "+";
        buttonsContainer.style.display = " none";
        buttonAdded = false;
      }
    });

    taskContainer.append(destinationElem, startDateElem, endDateElem, addPlan);

    taskListContainer.append(taskContainer);
  });
}

// function for creating buttons dynamicall
function createPlanButtons(container) {
  const buttonsContainer = document.createElement("div");
  //flight button
  const flightBtn = document.createElement("button");
  flightBtn.textContent = "Flight";
  buttonsAction(flightBtn); //******** */
  //transport button
  const transportBtn = document.createElement("button");
  transportBtn.textContent = "Transportation";
  buttonsAction(transportBtn);
  // hotel button
  const hotelBtn = document.createElement("button");
  hotelBtn.textContent = "Hotel";
  buttonsAction(hotelBtn);
  // restaurant button
  const restaurantBtn = document.createElement("button");
  restaurantBtn.textContent = "Restaurant";
  buttonsAction(restaurantBtn);

  // activity button
  const activityBtn = document.createElement("button");
  activityBtn.textContent = "Activity";
  buttonsAction(activityBtn);

  buttonsContainer.append(
    flightBtn,
    transportBtn,
    hotelBtn,
    restaurantBtn,
    activityBtn
  );

  container.append(buttonsContainer);
  return buttonsContainer;
}

// function for dynamically buttons

function buttonsAction(button) {
  const dynamicallForm = document.querySelector(".dynnamic-container");
  const taskForm = document.querySelector("#task-form");
  const inputName = document.querySelector("#name");
  const inputNameLabel = document.querySelector("label[for='name']");

  button.addEventListener("click", () => {
    if (button.textContent === "Flight") {
      dynamicallForm.style.display = "block";
      taskForm.textContent = `Add flight Details`;
      inputNameLabel.textContent = "Flight-Number";
      inputName.placeholder = "Enter Flight number";
      inputName.value = "";
    } else if (button.textContent === "Transportation") {
      dynamicallForm.style.display = "block";
      taskForm.textContent = "Add Transportation Details";
      inputNameLabel.textContent = "Transport mode";
      inputName.value = "";
    } else if (button.textContent === "Hotel") {
      dynamicallForm.style.display = "block";
      taskForm.textContent = " Add Hotel Details";
      inputNameLabel.textContent = "Hotel Name & Address";
      inputName.placeholder = "Please Enter Hotel Name &Address";
      inputName.value = "";
    } else if (button.textContent === "Restaurant") {
      dynamicallForm.style.display = "block";
      taskForm.textContent = " Add Restaurant Details";
      inputNameLabel.textContent = "Restaurant Name & Address";
      inputName.placeholder = "Please Enter Restaurant Name & Address";
      inputName.value = "";
    } else if (button.textContent === "Activity") {
      dynamicallForm.style.display = "block";
      taskForm.textContent = " Add Activity Details";
      inputNameLabel.textContent = "Activity Name";
      inputName.value = "";
    }
  });
}

const dynamicStartDate = document.querySelector("#dynamic-start-date");
const dynamicEndDate = document.querySelector("#dynamic-end-date");
const budget = document.querySelector("#cost");
const dynamicForm = document.querySelector("#dynnamic-form");

// dynamicallForm save button addEventListener
saveBtn.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(dynamicForm);
  trips.forEach((e) => {
    e.tasks.push({
      name: formData.get("inputName"),
      startDate: formData.get("dynamicStartDate"),
      endDate: formData.get("dynamicEndDate"),
      taskBudget: formData.get("budget"),
    });
  });
});

console.log(trips);
