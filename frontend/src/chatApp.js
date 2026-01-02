import { useState,useEffect } from "react";
import { createConnection } from "./chat";
export function ChatRoom({roomId}){
    const [serverUrl,setServerUrl] = useState('http://127.0.0.1');
    useEffect(()=>{
        const connection = createConnection(serverUrl,roomId);
        connection.connect();

        return()=>{
            connection.disconnect();
        }
    },[roomId,serverUrl])
    return (
        <>
            <label>
                Server Url:{' '}
                <input value={serverUrl} onChange={e => setServerUrl(e.target.value)}/>
            </label>
            <h1>Welcome to {roomId} room!!</h1>
        </>
    )
}