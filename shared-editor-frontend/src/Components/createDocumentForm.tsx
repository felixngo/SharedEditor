import Button from "react-bootstrap/Button";
import {createDocument} from "../DataAccess/DocumentsDataAccess";
import {useNavigate} from "react-router-dom";

export default function CreateDocumentForm() {
    const navigate = useNavigate();

    const onClick = () => {
        createDocument("").then(response => {
            console.log(response);
            navigate(`/docs/${response!.data.id}`);
        });
    }

    return (
        <div>
            <Button onClick={onClick}>new Document</Button>
        </div>
    )
}
