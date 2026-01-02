
export function createConnection(serverUrl,roomId){
    return{
        connect(){
            console.log("connecting to"+roomId);
        },
        disconnect(){
            console.log("Disconnecting from"+roomId);
        }
    }
}