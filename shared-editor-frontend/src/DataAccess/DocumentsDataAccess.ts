import io from 'socket.io-client';
import axios from "axios";
import AppConstants from "../Utils/AppConstants";


export function updateDocument(id: number, content: JSON) {
    const socket = io('http://localhost:8080');
    socket.emit('update_document', {id, content});
}


export async function createDocument(title: string) {
    try {
        console.log(AppConstants.API_URL)
        return await axios.post(
            `${AppConstants.API_URL}/document`,
            {title: title}
        );
    } catch (e) {
        console.error(e);
        // throw e;
    }
}
