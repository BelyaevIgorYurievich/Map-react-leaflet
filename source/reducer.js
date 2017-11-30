const initialState = {
  value: 10,
};

export default function app(state = initialState, action) {
  switch (action.type) {
    case 'COUNT__ADD':
      return {
      	...state,
      	value:state.value + action.date
      }

    case 'COUNT__DOWN':
           return {
      	...state,
      	value:state.value - action.date
      }
    default:
      return state;
  }
}