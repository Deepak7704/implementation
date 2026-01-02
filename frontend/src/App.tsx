import { useReducer } from "react";
type stateType = {
  count : number
}
type ActionType =  | { type: "increment" } | { type : "decrement" } 
function reducerFunction(state:stateType,action:ActionType):stateType{
  switch(action.type){
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    default:
      throw new Error("Unknow case");
  }
}
export function App() {
  const [state,dispatch] = useReducer(reducerFunction,{count:0});
  return (
    <div className="app">
      <p>count:{state.count}</p>
      <button onClick={() => dispatch({type:"increment"})}>increment</button>
      <button onClick={() => dispatch({type:"decrement"})}>decrement</button>
    </div>
  );
}

export default App;
