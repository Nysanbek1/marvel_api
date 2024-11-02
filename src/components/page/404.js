import ErrorMessage from "../errorMessage/ErrorMessage";
import { Link } from "react-router-dom";

const Page404 = () => {
    return (
        <div>
            <ErrorMessage/>
            <h1><Link to={'/'}>404</Link></h1>
        </div>
    )
}

export default Page404