import {useEffect, useState} from "react";
import {Schema} from "prosemirror-model"
import {EditorState} from "prosemirror-state"
import {EditorView} from "prosemirror-view"
import {addListNodes} from "prosemirror-schema-list"
import {exampleSetup} from "prosemirror-example-setup"
import {schema} from "prosemirror-schema-basic"
import '../Styles/prosemirror.css';
import {DocumentDto, getDocument, saveDocument} from "../DataAccess/DocumentsDataAccess";
import {socket} from "../Utils/Socket";
import io from "socket.io-client";

interface EditorProps {
    id: number;
}

export default function Editor({id} : EditorProps) {
    const [currentDocument, setCurrentDocument] = useState<DocumentDto>();
    const skt = io("http://localhost:8080");

    useEffect(() => {
        getDocument(id).then((doc) => {
            setCurrentDocument(doc);
        });

        skt.on("document_updated", (doc) => {
            console.log("document updated")
            setCurrentDocument(doc);
        })

    }, []);

    useEffect(() => {

        if (currentDocument !== undefined)
        {
            const mySchema = new Schema({
                nodes: addListNodes(schema.spec.nodes, "paragraph block*", "block"),
                marks: schema.spec.marks
            })

            let state = EditorState.create({
                doc: schema.nodeFromJSON(currentDocument.content),
                plugins: exampleSetup({schema: mySchema}),
            });

            window.view = new EditorView(document.querySelector("#editor"), {
                state: state,
                dispatchTransaction(transaction) {
                    const serializedSteps = transaction.steps.map(step => step.toJSON());

                    saveDocument(id,transaction.doc.toJSON(), serializedSteps, Number(currentDocument.version))
                    const newState = window.view.state.apply(transaction);
                    window.view.updateState(newState);
                }
            });

            return () => {
                window.view.destroy();
            };
        }
    }, [currentDocument]);

    return (
        <div>
            <h1>Test</h1>
            <div id="editor"/>
            <div id="content"/>
        </div>
    )
}
