import React from "react";
import {Message} from "semantic-ui-react";

const SuccessMessage = (props) =>{
    return(
        <Message className="container" positive>
            <Message.Header></Message.Header>
            <p>{props.Message}</p>
        </Message>
        )
}
export default SuccessMessage;