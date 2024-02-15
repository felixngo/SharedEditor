import {useParams} from "react-router-dom";
import {useEffect} from "react";
import Editor from "../editor";
import {isNumberObject} from "node:util/types";

export default function DocumentView() {
    const { id } = useParams<{ id: string }>();

    return (
        <Editor id={Number(id)} />
    )
}
