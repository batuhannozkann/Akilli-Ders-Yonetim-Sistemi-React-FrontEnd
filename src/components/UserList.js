import React,{useEffect, useState} from "react";
import axios from "axios";
import DataTable from 'react-data-table-component';
import {Grid,Button} from "semantic-ui-react";
import {Link} from "react-router-dom"

const UserList = ()=>{
    const [userList,setUserList] = useState([]);
    const [counter,setCounter] = useState(1);
    const handleOnSelect = ({selectedRows})=>{
        console.log(selectedRows);
    }
    const DeleteUser=(userId)=>{
        axios.post("https://localhost:7082/api/User/DeleteUser",{id:userId})
        .then((response)=>{console.log(response);setCounter(counter+1)})
        .catch((error)=>{console.log(error)});
    }
    const DataList = [];
    const columns=[
        {
            name:'FirstName',
            selector:row=>row.firstName,
            sortable:true
        },
        {
            name: 'LastName',
            selector: row => row.lastName,
            sortable:true,
        },
        {
            name: 'Email',
            selector: row => row.email,
            sortable:true
        },
        {
            name: 'Number',
            selector: row => row.studentNumber,
            sortable:true
        },
        {
            cell: row => <div><Link to={`/Kullanicilar/${row.id}`} onClick={()=>{console.log(row.id)}} className="ui primary button" style={{margin:3}}>Düzenle</Link><br></br>
            <Link onClick={()=>{DeleteUser(row.id);}} className="ui button" style={{margin:3,backgroundColor:"red",color:"white"}}>Sil</Link></div>,
	        allowOverflow: true,
	        button: true,
        }
    ];
    const [data,setData] = useState([]);
    useEffect(()=>{ axios.get("https://localhost:7082/api/User/GetAllUsers",{headers:{
        'Authorization':'Bearer '+sessionStorage.getItem("accessToken")
      }})
    .then((response)=>{console.log(response);setUserList(response.data.data)})
    .catch((e)=>{console.log(e)});},[counter]);
    userList?.map((i)=>{DataList.push({firstName:i.firstName,lastName:i.lastName,email:i.email,studentNumber:i.studentNumber,id:i.id})});

    return(
        <DataTable
        title="Kullanıcı Listesi"
        columns={columns}
        data={DataList}
        selectableRows
        onSelectedRowsChange={handleOnSelect}
        pagination>
        
        </DataTable>
        )
}
export default UserList;