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
    const [addedRoleIds,setAddedRoleIds] = useState([]);
    const [roles,setRoles] = useState([]);
    const [currentRoles,setCurrentRoles] = useState([]);
    const [deleteRoles,setDeleteRoles] = useState([]);
    const [infoUser,setInfoUser] = useState({
      firstName:"",
      lastName:"",
    })
    console.log(infoUser);
    useEffect(()=>{
      axios.get(`https://localhost:7082/api/User/GetUserById?id=${id}`,{headers:{
        'Authorization':'Bearer '+sessionStorage.getItem("accessToken")
      }})
      .then((response)=>{setInfoUser({firstName:response.data.data.firstName,lastName:response.data.data.lastName});console.log(response)})
      .catch((e)=>console.log(e));

      axios.get("https://localhost:7082/api/User/GetAllRoles",{headers:{
        'Authorization':'Bearer '+sessionStorage.getItem("accessToken")
      }})
      .then((response)=>{setRoles(response.data.data);setSelectedRole({name:response.data.data[0].name,id:response.data.data[0].id});})
      .catch((e)=>{console.log(e)});
      axios.post("https://localhost:7082/api/User/GetUserRoles",userId,{headers:{
        'Authorization':'Bearer '+sessionStorage.getItem("accessToken")
      }})
      .then((response)=>{setCurrentRoles(response.data.data)})
      .catch((e)=>{console.log(e)});
    },[]);
    const postRoleHandle =()=>{
      axios.post("https://localhost:7082/api/User/ClaimRoleToUser",{roleIds:addedRoleIds,userId:id},{headers:{
        'Authorization':'Bearer '+sessionStorage.getItem("accessToken")
      }})
      .then((response)=>{console.log(response);window.location.reload();})
      .catch((e)=>console.log(e));
    }
    const deleteRoleHandle=(i)=>{
      axios.post("https://localhost:7082/api/User/DeleteRoleFromUser",{Role:i,UserId:id},{headers:{
        'Authorization':'Bearer '+sessionStorage.getItem("accessToken")
      }})
      .then((response)=>{console.log(response);window.location.reload();})
      .catch((e)=>{console.log(e);})
    }
    const HandleInfos=(e)=>{
      setInfoUser({...infoUser,[e.target.name]:e.target.value})
    }
    const UpdateUserInfos=(e)=>{
      axios.post("https://localhost:7082/api/User/UpdateUserInfos",{...infoUser,id:id},{headers:{
        'Authorization':'Bearer '+sessionStorage.getItem("accessToken")
      }})
      .then((response)=>{console.log(response)})
      .catch((e)=>{console.log(e)});
    }
    console.log(addedRole);
    const [selectedRole,setSelectedRole] = useState({
      id:"",
      name:""
    })

    console.log(currentRoles)
    console.log(selectedRole);
    return(
      <Form className="container" onSubmit={UpdateUserInfos}>
    <Grid className="container">
        <Grid.Column width={10} style={{marginTop:50}}>
        <Form.Field>
      <label>İsim</label>
      <input placeholder='First Name'  value={infoUser.firstName} name="firstName" onChange={HandleInfos} />
    </Form.Field>
    <Form.Field>
      <label>Soyisim</label>
      <input placeholder='Last Name' value={infoUser.lastName} name="lastName" onChange={HandleInfos} />
    </Form.Field>
    <Form.Field>
      <Button type="submit" className="primary">Güncelle</Button>
    </Form.Field>
        </Grid.Column>
        <Grid.Column width={1}></Grid.Column>
        <Grid.Column width={5} className="container" style={{marginTop:50}}>
            <Header>Rol Ekle/Çıkar</Header>
            <Form.Field>
                        <select onChange={(e)=>roles.map(i=>{e.target.value==i.id?setSelectedRole({name:i.name,id:i.id}):console.log()})
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
                                    <Link onClick={() => { addedRole.splice(addedRole.indexOf(i), 1);addedRoleIds.splice(addedRoleIds.indexOf(i.id),1)} }><List.Icon
                                        style={{ paddingLeft: "98%" }} name="trash alternate"></List.Icon></Link>
                                    <List.Icon name='book' size='large' verticalAlign='middle' />
                                    <List.Content>
                                        <List.Header as='a'>{i.name}</List.Header>

                                    </List.Content>
                                </List.Item>);
                                
                        })}
                    </List>
                </Segment>
                <Link onClick={()=>{addedRole.push(selectedRole);addedRoleIds.push(selectedRole.id)}} className="ui primary button">Listeye Rol Ekle</Link>
                <Link onClick={postRoleHandle} className="ui primary button">Gönder</Link>
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
                    onClick: () => {deleteRoleHandle(i);}
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