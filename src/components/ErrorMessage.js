import React from "react";
import {Message} from "semantic-ui-react";

const ErrorMessage = (props) =>{
    return(
        <Message className="container" negative>
            <Message.Header>Hata</Message.Header>
            <p>{props.Message}</p>
        </Message>
        )
}
export default ErrorMessage;