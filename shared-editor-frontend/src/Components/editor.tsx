import {useEffect, useState} from "react";
import {Schema, DOMParser} from "prosemirror-model"
import {EditorState, Transaction, TextSelection} from "prosemirror-state"
import {EditorView} from "prosemirror-view"
import {addListNodes} from "prosemirror-schema-list"
import {exampleSetup} from "prosemirror-example-setup"
import {schema} from "prosemirror-schema-basic"
import '../Styles/prosemirror.css';
import {DocumentDto, getDocument, saveDocument, updateDocument} from "../DataAccess/DocumentsDataAccess";

interface EditorProps {
    id: number;
}

export default function Editor({id} : EditorProps) {
    const [currentDocument, setCurrentDocument] = useState<DocumentDto>();
    useEffect(() => {
        getDocument(id).then((doc) => {
            setCurrentDocument(doc);
            // setCurrentVersion(Number(doc.version));
        });
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
