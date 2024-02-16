import {useEffect, useState} from "react";
import {Schema, DOMParser} from "prosemirror-model"
import {EditorState} from "prosemirror-state"
import {EditorView} from "prosemirror-view"
import {addListNodes} from "prosemirror-schema-list"
import {exampleSetup} from "prosemirror-example-setup"
import {schema} from "prosemirror-schema-basic"
import '../Styles/prosemirror.css';
import {DocumentDto, getDocument, updateDocument} from "../DataAccess/DocumentsDataAccess";

interface EditorProps {
    id: number;
}

export default function Editor({id} : EditorProps) {
    const [currentDocument, setCurrentDocument] = useState<DocumentDto>();

    useEffect(() => {
        getDocument(id).then((doc) => {
            setCurrentDocument(doc);
        });
    }, []);

    useEffect(() => {
        if (currentDocument !== undefined)
        {
            const mySchema = new Schema({
                nodes: addListNodes(schema.spec.nodes, "paragraph block*", "block"),
                marks: schema.spec.marks
            })

            const divElement = document.createElement('div');
            divElement.id = 'content';

            // const state = EditorState.create({
            //     doc: DOMParser.fromSchema(mySchema).parse(divElement),
            //     plugins: exampleSetup({schema: mySchema}),
            // });

            const state = EditorState.create({
                doc: schema.nodeFromJSON(currentDocument.content),
                plugins: exampleSetup({schema: mySchema}),
            });

            console.log(state.doc.toJSON());

            // if (currentDocument.content !== {} as JSON)
            // {
            //     console.log("here")
            //     state.doc = ;
            // }

            window.view = new EditorView(document.querySelector("#editor"), {
                state: state,
                dispatchTransaction(transaction) {
                    const newState = window.view.state.apply(transaction);
                    updateDocument(id, newState.doc.toJSON());
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
