import io from 'socket.io-client';
import axios from "axios";
import AppConstants from "../Utils/AppConstants";

export interface DocumentDto {
    id: number;
    title: string;
    content: JSON;
    createdAt: Date;
    updatedAt: Date;
}

export function updateDocument(id: number, content: JSON) {
    const socket = io('http://localhost:8080');
    socket.emit('update_document', {id, content});
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
        return response.data;
    } catch (e) {
        console.error(e);
        throw e;
    }
}
