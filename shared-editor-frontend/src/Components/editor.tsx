import { useEffect, useState } from "react";
import {Schema, DOMParser} from "prosemirror-model"
import {EditorState} from "prosemirror-state"
import {EditorView} from "prosemirror-view"
import {addListNodes} from "prosemirror-schema-list"
import {exampleSetup} from "prosemirror-example-setup"
import {schema} from "prosemirror-schema-basic"
import {undo, redo, history} from "prosemirror-history"
import {keymap} from "prosemirror-keymap"

export default function Editor() {
    const [state, setState] = useState('');
    useEffect(() => {
        const mySchema = new Schema({
            nodes: addListNodes(schema.spec.nodes, "paragraph block*", "block"),
            marks: schema.spec.marks
        })


        const test = DOMParser.fromSchema(mySchema).parse(document.querySelector("#test")!);
        console.log(test);
        window.view = new EditorView(document.querySelector("#editor"), {
            state: EditorState.create({
                doc: DOMParser.fromSchema(mySchema).parse(document.querySelector("#content")!),
                plugins: [
                    history(),
                    keymap({"Mod-z": undo, "Mod-y": redo}),
                ]
            }),
            dispatchTransaction(transaction) {
                const newState = window.view.state.apply(transaction);
                window.view.updateState(newState);
            }
        });

        return () => {
            window.view.destroy();
        };
    }, []);


    return (
        <>
            <div id="test">
            <h1>Test</h1>
            <p>This is a test of the editor.</p>
            </div>
            <div id="editor"/>
            <div id="content"/>
        </>
    )
}
