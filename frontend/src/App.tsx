import { useState } from "react";
import {ChatRoom} from "./chatApp";
export function App() {
  const [roomId,setRoomId] = useState('general');
  const [show,setShow] = useState(false);
  return (
    <>
      <label>
        choose the chat room {' '}
        <select value={roomId} onChange={e => setRoomId(e.target.value)}>
          <option value = "general">General</option>
          <option value = "music">Music</option>
          <option value = "travel">Travel</option>
        </select>
      </label>
      <button onClick={()=>setShow(!show)}>{show ? 'close chat' : 'open chat'}</button>
      {show && <hr/>}
      {show && <ChatRoom roomId = {roomId}/> }
    </>
  )  
}

export default App;
