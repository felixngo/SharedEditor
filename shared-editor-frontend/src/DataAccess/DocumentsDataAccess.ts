import io from 'socket.io-client';
import axios from "axios";
import AppConstants from "../Utils/AppConstants";
import {Selection, Transaction} from 'prosemirror-state';

export interface DocumentDto {
    id: number;
    title: string;
    content: JSON;
    createdAt: Date;
    updatedAt: Date;
    version: number;
}

export function updateDocument(id: number, content: JSON) {
    const socket = io('http://localhost:8080');
    socket.emit('update_document', {id, content});
    socket.close();
}

export async function createDocument(title: string) {
    try {
        const response = await axios.post(
            `${AppConstants.API_URL}/document`,
            {title: title}
        );
        return response.data;

    } catch (e) {
        console.error(e);
        throw e;
    }
}

export async function getDocument(id: number) : Promise<DocumentDto> {
    try {
        const response = await axios.get(
            `${AppConstants.API_URL}/document/${id}`
        );

        console.log(response.data);
        return response.data;
    } catch (e) {
        console.error(e);
        throw e;
    }
}

// export function saveDocument(id: number, transaction: Transaction, selection: Selection,  version: number) {
//     const socket = io('http://localhost:8080');
//     socket.emit('save_document', {
//         id : id,
//         transaction: transaction,
//         selection: selection,
//         version: version
//     });
//     // socket.close();
// }

export function saveDocument(id: number,newNode: JSON, steps: JSON[], version: number) {
    const socket = io('http://localhost:8080');
    socket.emit('save_document', {
        id : id,
        newState: newNode,
        steps: steps,
        version: version
    });
    // socket.close();
}
