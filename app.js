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
  console.log("b");
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
  destination.value = "";
  startDate.value = "";
  endDate.value = "";
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
    startDateElem.textContent = `Start Date-: ${trip.startDate}`;
    startDateElem.classList.add("startDate-elem");
    const endDateElem = document.createElement("p");
    endDateElem.classList.add("endDate-Elem");
    endDateElem.textContent = `End Date: ${trip.endDate}`;
    const destinationElem = document.createElement("p");
    destinationElem.textContent = `${trip.tripDestination}`;
    destinationElem.classList.add("destination-Elem");

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
    //  append total cost of trip
    const budgetContainer = document.createElement("div");
    budgetContainer.classList.add("budget-container");
    tripCost(budgetContainer, trip);

    tripContainer.append(
      destinationElem,
      startDateElem,
      endDateElem,
      addPlan,
      budgetContainer
      // currencyConversionContainer
    );

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
  buttonsContainer.classList.add("buttons-Container");
  //flight button
  const flightBtn = document.createElement("button");
  flightBtn.classList.add("flight-btn");
  flightBtn.textContent = "🛫";
  buttonsAction(flightBtn);

  //******** */
  //transport button
  const transportBtn = document.createElement("button");
  transportBtn.textContent = "🚌";
  transportBtn.classList.add("transport-btn");
  buttonsAction(transportBtn);
  // hotel button
  const hotelBtn = document.createElement("button");
  hotelBtn.classList.add("hotel-btn");
  hotelBtn.textContent = "🏨";
  buttonsAction(hotelBtn);

  // restaurant button
  const restaurantBtn = document.createElement("button");
  restaurantBtn.classList.add("restaurant-btn");
  restaurantBtn.textContent = "🍽️";
  buttonsAction(restaurantBtn);

  // activity button
  const activityBtn = document.createElement("button");
  activityBtn.classList.add("activity-btn");
  activityBtn.textContent = "🎡";
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

const dynamicallForm = document.querySelector(".dynnamic-container");
// function for dynamically buttons

function buttonsAction(button) {
  const taskForm = document.querySelector("#task-form");
  const inputName = document.querySelector("#name");
  const inputNameLabel = document.querySelector("label[for='name']");

  button.addEventListener("click", () => {
    // added new
    if (button.textContent === "🛫") {
      dynamicallForm.style.display = "block";
      taskForm.textContent = `Add flight Details 🛫`;
      inputNameLabel.textContent = "Flight-Number";
      inputName.placeholder = "Enter Flight number";
      inputName.value = "";
    } else if (button.textContent === "🚌") {
      dynamicallForm.style.display = "block";
      taskForm.textContent = "Add Transportation Details 🚌";
      inputNameLabel.textContent = "Transport mode";
      inputName.value = "";
    } else if (button.textContent === "🏨") {
      dynamicallForm.style.display = "block";
      taskForm.textContent = " Add Hotel Details 🏨";
      inputNameLabel.textContent = "Hotel Name & Address";
      inputName.placeholder = "Please Enter Hotel Name &Address";
      inputName.value = "";
      // autoSuggestion(inputName);
    } else if (button.textContent === "🍽️") {
      dynamicallForm.style.display = "block";
      taskForm.textContent = " Add Restaurant Details 🍽️";
      inputNameLabel.textContent = "Restaurant Name & Address";
      inputName.placeholder = "Please Enter Restaurant Name & Address";
      inputName.value = "";
      // autoSuggestion(inputName);
    } else if (button.textContent === "🎡") {
      dynamicallForm.style.display = "block";
      taskForm.textContent = " Add Activity Details 🎡";
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
    dynamicallForm.style.display = "none";
    // Hide the form
  } else {
    console.log("error");

    // Hide the dynamic form after task is saved
    dynamicallForm.style.display = "none";
  }
});

// append task
function appendTask(taskArr, container, trip) {
  taskArr.forEach((task) => {
    // taskContainer for tasks
    const taskContainer = document.createElement("div");
    taskContainer.classList.add("task-container");
    const nameElem = document.createElement("p");
    nameElem.classList.add("name-Elem");
    nameElem.textContent = `Task Name: ${task.name}`;
    const startDateElem = document.createElement("p");
    startDateElem.classList.add("taskstart-date");
    startDateElem.textContent = `Start Date: ${task.startDate}`;
    const endDateElem = document.createElement("p");
    endDateElem.textContent = `End Date: ${task.endDate}`;
    endDateElem.classList.add("taskendDate-elem");
    const budgetElem = document.createElement("p");
    budgetElem.classList.add("budget-elem");
    budgetElem.textContent = `Total Cost: ${task.taskBudget} NOK`;

    taskContainer.append(nameElem, startDateElem, endDateElem, budgetElem);
    container.append(taskContainer); // append in container
  });
  // country Mapping
}

// function to calculate and display the total cost for trip
function tripCost(container, trip) {
  const tripCost = document.createElement("p");

  // calculate the total cost of all task in the trip by summing up task budgets
  const totalCost = trip.tasks.reduce(
    (sum, task) => sum + Number(task.taskBudget),
    0
  );
  trip.cost = totalCost;
  tripCost.textContent = `Total Cost:- ${totalCost} NOK`; // total cost in NOK

  // countryMapping.js
  const destinationLower = trip.tripDestination.toLowerCase(); // Handle case insensitivity
  const targetCurrency =
    Object.keys(countryName).find(
      (code) =>   destinationLower  === countryName[code].toLowerCase())||"usd" ; // Default to INR

console.log(destinationLower )
    console.log(targetCurrency)
  // call the currencyConveter function
  currencyConverter(targetCurrency, totalCost, container);
  container.append(tripCost); // apped total cost
}

// function to save in local storage
function saveTaskToLocalStorage() {
  localStorage.setItem("trips", JSON.stringify(trips));
}

// function to load from local storage
function loadTasksFromLocalStorage() {
  const storedTasks = localStorage.getItem("trips");
  if (storedTasks) {
    trips = JSON.parse(storedTasks);
    appendTrip(trips);
  }
}
