import { useEffect, useState } from "react";
import {Schema, DOMParser} from "prosemirror-model"
import {EditorState} from "prosemirror-state"
import {EditorView} from "prosemirror-view"
import {addListNodes} from "prosemirror-schema-list"
import {exampleSetup} from "prosemirror-example-setup"
import {schema} from "prosemirror-schema-basic"
import '../styles/prosemirror.css';
import {updateDocument} from "../DataAccess/DocumentsDataAccess";

interface EditorProps {
    id: number;
}

export default function Editor({id} : EditorProps) {
    useEffect(() => {
        const mySchema = new Schema({
            nodes: addListNodes(schema.spec.nodes, "paragraph block*", "block"),
            marks: schema.spec.marks
        })

        window.view = new EditorView(document.querySelector("#editor"), {
            state: EditorState.create({
                doc: DOMParser.fromSchema(mySchema).parse(document.querySelector("#content")!),
                plugins: exampleSetup({schema: mySchema}),
            }),
            dispatchTransaction(transaction) {
                const newState = window.view.state.apply(transaction);
                updateDocument(id, newState.doc.toJSON());
                window.view.updateState(newState);
            }
        });

        return () => {
            window.view.destroy();
        };
    }, []);


    return (
        <div>
            <h1>Test</h1>
            <div id="editor"/>
            <div id="content"/>
        </div>
    )
}
