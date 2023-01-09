import React from "react";
import { List ,Segment,Header} from 'semantic-ui-react'


const LessonList=()=>{
    
    return(
        <Segment style={{margin:0}} className="container">
            <Header textAlign="center" className="">KÜTÜPHANE</Header>
            <hr></hr>
        <List divided relaxed>
    <List.Item>
      <List.Icon name='book' size='large' verticalAlign='middle' />
      <List.Content>
        <List.Header as='a'>Semantic-Org/Semantic-UI</List.Header>
        <List.Description as='a'>Updated 10 mins ago</List.Description> 
        <List floated="right"><input className="" type="file" /></List>
      </List.Content>
    </List.Item>
    <List.Item>
      <List.Icon name='book' size='large' verticalAlign='middle' />
      <List.Content>
        <List.Header as='a'>Nesneye Yönelik Programlama</List.Header>
        <List.Description as='a'>Prof.Dr.Erdinç UZUN</List.Description>
        <List  floated="right"><input className="" type="file" /></List>
      </List.Content>
    </List.Item>
    <List.Item>
      <List.Icon name='book' size='large' verticalAlign='middle' />
      <List.Content>
        <List.Header as='a'>Semantic-Org/Semantic-UI-Meteor</List.Header>
        <List.Description as='a'>Updated 34 mins ago</List.Description>
        <List floated="right"><input className="" type="file" /></List>
      </List.Content>
    </List.Item>
  </List>
  </Segment>
        )
}
export default LessonList;