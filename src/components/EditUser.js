import react,{useEffect, useState} from "react";
import {Form,Grid, Button,Header,List,Segment} from "semantic-ui-react";
import axios, { isCancel } from "axios";
import {Link} from "react-router-dom";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

const EditUser = (props) =>{
    const {id} = props.match.params;
    const [userId,setUserId] = useState({
      userId:id
    });
    const [changeRole,setChangeRole] = useState([]);
    const [addedRole,setAddedRole] = useState([]);
    const [roles,setRoles] = useState([]);
    const [currentRoles,setCurrentRoles] = useState([]);
    console.log(addedRole);
    useEffect(()=>{
      axios.get("https://localhost:7082/api/User/GetAllRoles")
      .then((response)=>{setRoles(response.data.data);setSelectedRole({name:response.data.data[0].name,id:response.data.data[0].id});})
      .catch((e)=>{console.log(e)});
      axios.post("https://localhost:7082/api/User/GetUserRoles",userId)
      .then((response)=>{setCurrentRoles(response.data.data)})
      .catch((e)=>{console.log(e)});
    },[]);
    const [selectedRole,setSelectedRole] = useState({
      id:"",
      name:""
    })
  
    console.log(roles[0]);
    console.log(selectedRole);
    return(
      <Form className="container">
    <Grid className="container">
        <Grid.Column width={10} style={{marginTop:50}}>
        <Form.Field>
      <label>İsim</label>
      <input placeholder='First Name' />
    </Form.Field>
    <Form.Field>
      <label>Soyisim</label>
      <input placeholder='Last Name' />
    </Form.Field>
    <Form.Field>
      <label>Email</label>
      <input placeholder='Last Name' />
    </Form.Field>
    <Form.Field>
      <Button type="submit" className="primary">Güncelle</Button>
    </Form.Field>
        </Grid.Column>
        <Grid.Column width={1}></Grid.Column>
        <Grid.Column width={5} className="container" style={{marginTop:50}}>
            <Header>Rol Ekle/Çıkar</Header>
            <Form.Field>
                        <select onChange={(e)=>roles.map(i=>{e.target.value==i.id?setSelectedRole({name:i.name,id:i.id}):console.log("hata")})
                        } 
                        multiple={false} className="ui fluid dropdown  selection">
                            {roles.map((i) => {

                                return (
                                    <option value={i.id}>{i.name}</option>);
                            })}
                        </select>
                    </Form.Field>
                    <Segment divided>
                    <List divided>
                        {addedRole.map((i) => {
                            return (
                                <List.Item>
                                    <Link onClick={() => { addedRole.splice(addedRole.indexOf(i), 1); } }><List.Icon
                                        style={{ paddingLeft: "98%" }} name="trash alternate"></List.Icon></Link>
                                    <List.Icon name='book' size='large' verticalAlign='middle' />
                                    <List.Content>
                                        <List.Header as='a'>{i.name}</List.Header>

                                    </List.Content>
                                </List.Item>);
                                
                        })}
                    </List>
                </Segment>
                <Link onClick={()=>addedRole.push(selectedRole)} className="ui primary button">Listeye Rol Ekle</Link>
                <Segment divided>
                    <Header>Aktif Roller</Header>
                    <List divided>
                        {currentRoles.map((i) => {
                            const obj = i;
                            return (
                                <List.Item key={i.id}>
                                    <Link onClick={()=>{
            confirmAlert({
                title: 'Confirm to submit',
                message: 'Silmek istediğine emin misin?',
                buttons: [
                  {
                    label: 'Yes',
                    onClick: () => {""}
                  },
                  {
                    label: 'No',
                    onClick: () => isCancel(confirmAlert)
                  }
                ]
              });
        }}>
            <List.Icon
                                        style={{ paddingLeft: "98%" }} name="trash alternate"></List.Icon></Link>
                                    <List.Icon name='book' size='large' verticalAlign='middle' />
                                    <List.Content>
                                        <List.Header as='a'>{i}</List.Header>
                                    </List.Content>
                                </List.Item>);
                            })}
                    </List>
                </Segment>
        </Grid.Column>
    </Grid>
    </Form>)
}
export default EditUser;