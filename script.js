//Capturing DOM Elements
const countersContainer = document.getElementById("counters-container");
const addCounter = document.getElementById("add-counter");
const resetCounter = document.getElementById("reset-counter");

//Action Identifiers
const ADD_COUNTER = "ADD_COUNTER";
const INCREMENT = "INCREMENT";
const DECREMENT = "DECREMENT";
const RESET_COUNTERS = "RESET_COUNTERS";

//Action Creators
const addCounterAction = () => {
  return {
    type: ADD_COUNTER,
    payload: {
      counterID: store.getState().totalCounters,
      value: 0,
      incrementBy: Math.floor(Math.random() * 10) + 1,
      decrementBy: Math.floor(Math.random() * 10) + 1,
    },
  };
};
const resetCounterAction = () => {
  return {
    type: RESET_COUNTERS,
  };
};
const incrementCounterAction = (counterID) => {
  return {
    type: INCREMENT,
    payload: {
      id: counterID,
    },
  };
};
const decrementCounterAction = (counterID) => {
  return {
    type: DECREMENT,
    payload: {
      id: counterID,
    },
  };
};

// Initial State
let initialState = {
  counters: [
    {
      counterID: 0,
      value: 0,
      incrementBy: Math.floor(Math.random() * 10) + 1,
      decrementBy: Math.floor(Math.random() * 10) + 1,
    },
  ],
  totalCounters: 1,
};

// create store with reducer
const store = Redux.createStore(counterReducer);

//Callback Function to Add a newCounter
const newCounter = () => {
  const newCounter = document.createElement("div");
  store.getState().counters.forEach((counter) => {
    newCounter.innerHTML = `
    <div
         
          class="p-4 h-auto flex flex-col items-center justify-center space-y-5 bg-white rounded shadow"
        >
          <div 
            id="${counter.counterID + 1}"
          class="text-2xl font-semibold">
            ${counter.value}
          </div>
          <div class="flex space-x-3">
            <button
                id="increment-${counter.counterID}"
                onclick="increment('${counter.counterID + 1}', '${
      counter.incrementBy
    }')"
             class="bg-indigo-400 text-white px-3 py-2 rounded shadow">
              Increment By ${counter.incrementBy}
            <button 
                id="decrement-${initialState.counters + 1}"
                onclick="decrement('${counter.counterID + 1}', '${
      counter.decrementBy
    }')"
            class="bg-red-400 text-white px-3 py-2 rounded shadow">
              Decrement By ${counter.decrementBy}
            </button>
          </div>
        </div>
    `;
  });

  countersContainer.appendChild(newCounter);
};

//Callback Function to Reset Counters to 0
const resetAllCounter = () => {
  countersContainer.innerHTML = "";
  store.getState().counters.map((counter) => {
    const newCounter = document.createElement("div");
    newCounter.innerHTML = `
   <div
         
          class="p-4 h-auto flex flex-col items-center justify-center space-y-5 bg-white rounded shadow"
        >
          <div 
            id="${counter.counterID + 1}"
          class="text-2xl font-semibold">
            ${counter.value}
          </div>
          <div class="flex space-x-3">
            <button
                id="increment-${counter.counterID}"
                onclick="increment('${counter.counterID + 1}', '${
      counter.incrementBy
    }')"
             class="bg-indigo-400 text-white px-3 py-2 rounded shadow">
              Increment By ${counter.incrementBy}
            <button 
                id="decrement-${initialState.counters + 1}"
                onclick="decrement('${counter.counterID + 1}', '${
      counter.decrementBy
    }')"
            class="bg-red-400 text-white px-3 py-2 rounded shadow">
              Decrement By ${counter.decrementBy}
            </button>
          </div>
        </div>
    `;
    countersContainer.appendChild(newCounter);
  });
};

// Reducer Function
function counterReducer(state = initialState, action) {
  if (action.type === ADD_COUNTER) {
    return {
      counters: [...state.counters, action.payload],
      totalCounters: state.totalCounters + 1,
    };
  }
  if (action.type === INCREMENT) {
    return {
      ...state,
      counters: state.counters.map((counter) => {
        if (counter.counterID + 1 === Number(action.payload.id)) {
          return {
            ...counter,
            value: counter.value + counter.incrementBy,
          };
        } else {
          return counter;
        }
      }),
    };
  }
  if (action.type === DECREMENT) {
    return {
      ...state,
      counters: state.counters.map((counter) => {
        if (counter.counterID + 1 === Number(action.payload.id)) {

          return {
            ...counter,
            value: counter.value - counter.decrementBy,
          };
        } else {
          return counter;
        }
      }),
    };
  }
  if (action.type === RESET_COUNTERS) {
    return {
      ...state,
      counters: state.counters.map((counter) => {
        return {
          ...counter,
          value: 0,
        };
      }),
    };
  }
  return state;
}

//Click Handlers for buttons
addCounter.addEventListener("click", () => {
  store.dispatch(addCounterAction());
  newCounter();
});

resetCounter.addEventListener("click", () => {
  store.dispatch(resetCounterAction());
  resetAllCounter();
});

function increment(counterID, incrementBy) {
  store.dispatch(incrementCounterAction(counterID));
  document.getElementById(counterID).innerText =
    Number(document.getElementById(counterID).innerText) + Number(incrementBy);
}

function decrement(counterID, decrementBy) {
  store.dispatch(decrementCounterAction(counterID));
  document.getElementById(counterID).innerText =
    Number(document.getElementById(counterID).innerText) - Number(decrementBy);
}

//Subscribe to store changes
store.subscribe(() => {
  console.log(store.getState());
});

//Initial render
newCounter();
