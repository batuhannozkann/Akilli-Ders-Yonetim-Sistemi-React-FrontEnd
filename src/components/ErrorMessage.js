import React from "react";
import {Message} from "semantic-ui-react";

const ErrorMessage = (props) =>{
    const messages=props.Message;
    return(
        <Message className="container" negative>
            <Message.Header>Hata</Message.Header>
            <p>{messages?.map(i=>(<p>{i}</p>))}</p>
            
        </Message>
        )
}
export default ErrorMessage;