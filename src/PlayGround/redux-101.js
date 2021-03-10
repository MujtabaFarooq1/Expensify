import { createStore } from "redux";

//
const incrementCount = ({ incrementBy = 1 } = {}) => ({
  type: "INCREMENT",
  incrementBy,
});

const decrementCount = ({ decrementBy = 1 } = {}) => ({
  type: "DECREMENT",
  decrementBy,
});
const setCount = ({ count } = {}) => {
  if (count) {
    return {
      type: "SET",
      count,
    };
  } else {
    alert("Please Provide Valid data for setting count");
    return {
      type: "SET",
    };
  }
};
const resetCount = () => ({
  type: "RESET",
});

const countReducer = (state = { count: 0 }, action) => {
  switch (action.type) {
    case "INCREMENT":
      return {
        count: state.count + action.incrementBy,
      };
    case "RESET":
      return {
        count: 0,
      };
    case "SET":
      return {
        count: action.count ? action.count : state.count,
      };
    case "DECREMENT":
      return {
        count: state.count - action.decrementBy,
      };
    default:
      return state;
  }
};

const store = createStore(countReducer);

//

store.subscribe(() => {
  console.log(store.getState());
});

// Increment count
store.dispatch(incrementCount({ incrementBy: 10 }));

store.dispatch(incrementCount());

// Reset Count
store.dispatch(resetCount());

// Decrement Count
store.dispatch(decrementCount());

store.dispatch(decrementCount({ decrementBy: 4 }));

store.dispatch(setCount({ count: 230 }));
