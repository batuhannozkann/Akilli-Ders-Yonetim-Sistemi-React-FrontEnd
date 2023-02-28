import React,{useState} from "react";
import { Table ,Icon,Header} from 'semantic-ui-react'
import {storage} from "../firebase-client"
import {ref,uploadBytes} from "firebase/storage"
const LessonList=()=>{
  const [file, setFile] = useState('');
  const [imageUrl, setUrl] = useState();
  const uploadFile=(event)=>{
    const fileRef=ref(storage,`NYP/${file.name}`);
    uploadBytes(fileRef,file)
  };
  console.log(file);
  const changeFile = async (e)=>{
      await setFile(e.target.files[0]);
  };
    return(
      <><Table celled style={{margin:"0"}} className="fluid">
      <Table.Header>
          <Table.Row>
              <Table.HeaderCell textAlign="center" colSpan='3'>DERS KÜTÜPHANESİ</Table.HeaderCell>
          </Table.Row>
      </Table.Header>
      <Table.Body>
          <Table.Row>
              <Table.Cell collapsing>
                  <Icon name='folder' /> node_modules
              </Table.Cell>
              <Table.Cell>Initial commit</Table.Cell>
              <Table.Cell  textAlign='right'>
                  <a><Icon name="download"></Icon></a>
              </Table.Cell>
          </Table.Row>
          <Table.Row>
              <Table.Cell>
                  <Icon name='folder' /> test
              </Table.Cell>
              <Table.Cell>Initial commit</Table.Cell>
              <Table.Cell textAlign='right'> <a><Icon name="download"></Icon></a></Table.Cell>
          </Table.Row>
          <Table.Row>
              <Table.Cell>
                  <Icon name='folder' /> build
              </Table.Cell>
              <Table.Cell>Initial commit</Table.Cell>
              <Table.Cell textAlign='right'> <a><Icon name="download"></Icon></a></Table.Cell>
          </Table.Row>
          <Table.Row>
              <Table.Cell>
                  <Icon name='folder' /> package.json
              </Table.Cell>
              <Table.Cell>Initial commit</Table.Cell>
              <Table.Cell textAlign='right'> <a><Icon name="download"></Icon></a></Table.Cell>
          </Table.Row>
          <Table.Row>
              <Table.Cell>
                  <Icon name='folder' /> Gruntfile.js
              </Table.Cell>
              <Table.Cell>Initial commit</Table.Cell>
              <Table.Cell textAlign='right'> <a><Icon name="download"></Icon></a></Table.Cell>
          </Table.Row>
      </Table.Body>
  </Table>
  </>
        )
}
export default LessonList;