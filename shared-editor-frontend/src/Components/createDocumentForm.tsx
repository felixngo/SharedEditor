import Button from "react-bootstrap/Button";
import {createDocument} from "../DataAccess/DocumentsDataAccess";
import {useNavigate} from "react-router-dom";

export default function CreateDocumentForm() {
    const navigate = useNavigate();

    const onClick = () => {
        createDocument("").then(doc => {
            console.log(doc);
            navigate(`/docs/${doc.id}`);
        });
    }

    return (
        <div>
            <Button onClick={onClick}>new Document</Button>
        </div>
    )
}
