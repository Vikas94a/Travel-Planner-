const destination = document.querySelector("#destination");
const startDate = document.querySelector("#start-date");
const endDate = document.querySelector("#end-date");
const submitBtn = document.querySelector("#submit");
const taskListContainer = document.querySelector("#task-list");
const taskForm = document.querySelector("#travel-form");
const plans = document.querySelector("#plan-option");
const saveBtn = document.querySelector("#save");
let currentTripIndex = null;
// task array
let trips = [];
loadTasksFromLocalStorage();
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
  saveTaskToLocalStorage();
  appendTrip(trips);
});

function appendTrip(taskArr) {
  // Clear existing trips
  while (taskListContainer.firstChild) {
    taskListContainer.removeChild(taskListContainer.firstChild);
  }

  taskArr.forEach((trip) => {
    const tripContainer = document.createElement("div");
    tripContainer.classList.add("trip-container");

    // Display trip details
    const startDateElem = document.createElement("p");
    startDateElem.textContent = `Start Date: ${trip.startDate}`;
    const endDateElem = document.createElement("p");
    endDateElem.textContent = `End Date: ${trip.endDate}`;
    const destinationElem = document.createElement("p");
    destinationElem.textContent = `Destination: ${trip.tripDestination}`;

    // Add task button
    const addPlan = document.createElement("button");
    addPlan.classList.add("add-Button");
    addPlan.textContent = "+";
    let buttonAdded = false;
    let buttonsContainer;

    // Toggle buttons on click
    addPlan.addEventListener("click", () => {
      if (!buttonAdded) {
        addPlan.textContent = "-";
        buttonsContainer = createPlanButtons(tripContainer);
        buttonAdded = true;
        currentTripIndex = trips.indexOf(trip);
      } else {
        addPlan.textContent = "+";
        buttonsContainer.style.display = "none";
        buttonAdded = false;
      }
    });

    tripContainer.append(destinationElem, startDateElem, endDateElem, addPlan);

    // Append task container
    const taskContainer = document.createElement("div");
    taskContainer.classList.add("tasks-container");
    appendTask(trip.tasks, taskContainer);
    tripContainer.append(taskContainer);

    taskListContainer.append(tripContainer);
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
const dynamicallForm = document.querySelector(".dynnamic-container");
function buttonsAction(button) {
  const taskForm = document.querySelector("#task-form");
  const inputName = document.querySelector("#name");
  const inputNameLabel = document.querySelector("label[for='name']");

  button.addEventListener("click", () => {
    dynamicallForm.style.display = "block"; // added new
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
const dynamicForm = document.querySelector(".dynnamic-form");
const inputName = document.querySelector("#name");

console.log(dynamicForm);

// dynamicallForm save button addEventListener
saveBtn.addEventListener("click", (e) => {
  e.preventDefault(); // (refreshing page)
  console.log("button clicked");

  const taskName = inputName.value;
  const startDate = dynamicStartDate.value;
  const endDate = dynamicEndDate.value;
  const taskBudget = budget.value;

  if (taskName && startDate && endDate && taskBudget) {
    const currentTrip = trips[currentTripIndex]; // Get the most recent trip

    // Add task to the current trip's task array
    currentTrip.tasks.push({
      name: taskName,
      startDate: startDate,
      endDate: endDate,
      taskBudget: taskBudget,
    });

    saveTaskToLocalStorage();
    appendTrip(trips);
    dynamicForm.style.display = "none";
    // Hide the form
  } else {
    alert("Please fill in all fields.");

    // Hide the dynamic form after task is saved
    dynamicallForm.style.display = "none";
  }
});

function appendTask(taskArr, container) {
  taskArr.forEach((task) => {
    const taskContainer = document.createElement("div");
    taskContainer.classList.add("task-container");

    const nameElem = document.createElement("p");
    nameElem.classList.add("name-Elem");
    nameElem.textContent = `Task Name: ${task.name}`;
    const startDateElem = document.createElement("p");
    startDateElem.textContent = `Start Date: ${task.startDate}`;
    const endDateElem = document.createElement("p");
    endDateElem.textContent = `End Date: ${task.endDate}`;
    const budgetElem = document.createElement("p");
    budgetElem.textContent = `Total Cost: ${task.taskBudget}`;

    taskContainer.append(nameElem, startDateElem, endDateElem, budgetElem);
    container.append(taskContainer);
  });
}

function saveTaskToLocalStorage() {
  localStorage.setItem("trips", JSON.stringify(trips));
}

function loadTasksFromLocalStorage() {
  const storedTasks = localStorage.getItem("trips");
  if (storedTasks) {
    trips = JSON.parse(storedTasks);
    appendTrip(trips);
  }
}
