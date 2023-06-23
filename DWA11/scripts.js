const MAX_NUMBER = 20;
const MIN_NUMBER = -10;
const STEP_AMOUNT = 1;

const number = document.querySelector('[data-key="number"]');
const subtract = document.querySelector('[data-key="subtract"]');
const reset = document.querySelector('[data-key="reset"]');
const add = document.querySelector('[data-key="add"]');

const subtractHandler = () => {
  const newValue = parseInt(number.value) - STEP_AMOUNT;
  number.value = newValue;

  if (add.disabled === true) {
    add.disabled = false;
  }

  if (newValue <= MIN_NUMBER) {
    subtract.disabled = true;
  }
};

const addHandler = () => {
  const newValue = parseInt(number.value) + STEP_AMOUNT;
  number.value = newValue;

  if (subtract.disabled === true) {
    subtract.disabled = false;
  }

  if (newValue >= MAX_NUMBER) {
    add.disabled = false;
  }
};

const resetHandler = () => {
  number.value = 0;
  subtract.disabled = true;
  add.disabled = false;
  showConfirmationMessage('The counter has been reset.');
};

const showConfirmationMessage = (message) => {
  alert(message);
};

subtract.addEventListener('click', subtractHandler);
add.addEventListener('click', addHandler);
reset.addEventListener('click', resetHandler);

const initialState = {
  count: 0,
};

const ActionTypes = {
  INCREMENT: 'INCREMENT',
  DECREMENT: 'DECREMENT',
  RESET: 'RESET',
};

const incrementAction = () => ({
  type: ActionTypes.INCREMENT,
});

const decrementAction = () => ({
  type: ActionTypes.DECREMENT,
});

const resetAction = () => ({
  type: ActionTypes.RESET,
});

const tallyReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.INCREMENT:
      return {
        ...state,
        count: state.count + 1,
      };
    case ActionTypes.DECREMENT:
      return {
        ...state,
        count: state.count - 1,
      };
    case ActionTypes.RESET:
      return {
        ...state,
        count: 0,
      };
    default:
      return state;
  }
};

const createStore = (reducer) => {
  let state = reducer(undefined, {});
  let listeners = [];

  const getState = () => state;

  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach((listener) => listener());
  };

  const subscribe = (listener) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  };

  return {
    getState,
    dispatch,
    subscribe,
  };
};

const store = createStore(tallyReducer);

const logState = () => {
  console.log('New state:', store.getState());
};

store.subscribe(logState);

console.log(store.getState());

store.dispatch(incrementAction());
store.dispatch(incrementAction());

store.dispatch(decrementAction());

store.dispatch(resetAction());
