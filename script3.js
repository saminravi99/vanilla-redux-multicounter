const countersContainer = document.getElementById("counters-container");
const addCounter = document.getElementById("add-counter");
const removeCounter = document.getElementById("remove-counter");

// intial state for adding counters to the container
let intialState = {
  counter1: 0,
  counters: 1,
  counter1Payload: 1,
};

// create store with reducer
const store = Redux.createStore(addCounterReducer);

const newCounter = () => {
  const newCounter = document.createElement("div");
  newCounter.innerHTML = `
     <div
         id="counter${intialState.counters + 1}"
          class="p-4 h-auto flex flex-col items-center justify-center space-y-5 bg-white rounded shadow"
        >
          <div 
            id="counter${store.getState().counters}-value"
          class="text-2xl font-semibold">0</div>
          <div class="flex space-x-3">
            <button
                id="increment-${intialState.counters + 1}"
                onclick="increment('counter${
                  store.getState().counters
                }', 'counter${store.getState().counters}-value')"
             class="bg-indigo-400 text-white px-3 py-2 rounded shadow">
              Increment By ${
                store.getState()[`counter${store.getState().counters}Payload`]
              }
            </button>
            <button 
                id="decrement-${intialState.counters + 1}"
                onclick="decrement('counter${
                  store.getState().counters
                }', 'counter${store.getState().counters}-value')"
            class="bg-red-400 text-white px-3 py-2 rounded shadow">
              Decrement By ${
                store.getState()[`counter${store.getState().counters}Payload`]
              }
            </button>
          </div>
        </div>
    `;
  countersContainer.appendChild(newCounter);
};

const resetCounter = () => {
  const newCounter = document.createElement("div");
  newCounter.innerHTML = `
     <div id="counter1">
         <div
          
          class="p-4 h-auto flex flex-col items-center justify-center space-y-5 bg-white rounded shadow"
        >
          <div 
          id="counter1-value"
           class="text-2xl font-semibold">0</div>
          <div class="flex space-x-3">
            <button
            id="increment-1"
            onclick="increment('counter1', 'counter1-value')"
             class="bg-indigo-400 text-white px-3 py-2 rounded shadow">
              Increment By 1
            </button>
            <button 
            id="decrement-1"
            onclick="decrement('counter1', 'counter1-value')"
            class="bg-red-400 text-white px-3 py-2 rounded shadow">
              Decrement By 1
            </button>
          </div>
        </div>
       </div>
    `;
  countersContainer.innerHTML = "";
  countersContainer.appendChild(newCounter);
};

// reducer function to add counter
function addCounterReducer(state = intialState, action) {
  if (action.type === "ADD_COUNTER") {
    return {
      ...state,
      [`counter${state.counters + 1}`]: 0,
      [`counter${state.counters + 1}Payload`]: Number(
        (Math.random() * 10).toFixed(0)
      ),
      counters: state.counters + 1,
    };
  }
  if (action.type === "INCREMENT") {
    console.log(
      state[`${action.payload.id}`] + state[`${action.payload.id}Payload`]
    );
    console.log(action.payload.id);
    console.log(state[`${action.payload.id}`]);
    console.log(state[`${action.payload.id}Payload`]);
    return {
      ...state,
      [`${action.payload.id}`]:
        state[`${action.payload.id}`] + state[`${action.payload.id}Payload`],
    };
  }
  if (action.type === "DECREMENT") {
    return {
      ...state,
      [`${action.payload.id}`]:
        state[`${action.payload.id}`] - state[`${action.payload.id}Payload`],
    };
  }
  if (action.type === "REMOVE_COUNTER") {
    return {
      counter1: 0,
      counters: 1,
      counter1Payload: 1,
    };
  }
  return state;
}

//Click Handlers
let previousState;
let currentState;
addCounter.addEventListener("click", () => {
  previousState = store.getState();

  store.dispatch({
    type: "ADD_COUNTER",
  });
  currentState = store.getState();
  if (previousState?.counters !== currentState?.counters) {
    console.log(previousState?.counters !== currentState?.counters);
    newCounter();
  }
});

removeCounter.addEventListener("click", () => {
  console.log("hello");
  store.dispatch({
    type: "REMOVE_COUNTER",
  });
});

//Subscribe to store changes
store.subscribe(() => {
  console.log(store.getState());
});

function increment(id, counterValue) {
  store.dispatch({
    type: "INCREMENT",
    payload: {
      id: id,
    },
  });
  document.getElementById(counterValue).innerText = store.getState()[id];
}

function decrement(id, counterValue) {
  store.dispatch({
    type: "DECREMENT",
    payload: {
      id: id,
    },
  });
  document.getElementById(counterValue).innerText = store.getState()[id];
}
