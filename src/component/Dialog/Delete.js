import React, {useState} from 'react'
import { Col, Form, Alert, Spinner , Button, Row} from 'react-bootstrap'
import { useRecoilState } from 'recoil';
import { arrayVdoData } from '../../store';
import { arrayData } from '../../store';
import axios from 'axios'
import { server, ACCESS_TOKEN , DELETE_NAME } from '../../Constants'
import { withRouter } from 'react-router-dom'
import { defaults } from 'request';

const DeleteL = (props) => {

    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState(undefined)
    const [dataArray, setDataArray] = useRecoilState(arrayVdoData)

    const hide = async () => props.ShowModel(false)
    const showModel = () => {
        if (props.Model) {
            return "block"
        } else {
            return "none"
        }
     }
     let showModelCss = showModel()

     const DeleteLearning = async (name) => {
         if (props.Type === "บทเรียน") {
            setLoading(true)
            const message = await axios.delete(server.DELETE_NAME + `?subject=${name}`, {
                headers: { "auth-token": localStorage.getItem(ACCESS_TOKEN) },
            }).then(result => result.data.message )
            setMessage(message)
            setLoading(false)
            setTimeout(() => {
                props.history.push('/admin')
            }, 1000);
         } else {
            setLoading(true)
            const message = await axios.delete(server.DELETE_VDO + `?vdoName=${name}`, {
                headers: { "auth-token": localStorage.getItem(ACCESS_TOKEN) },
            }).then(result => result.data.message )
            setMessage(message)
            const newVDO = (dataArray.data || []).filter(vdo => vdo.vdoName !== name )
            setDataArray({...dataArray, data:newVDO })
            setLoading(false)
            setTimeout(() => {
                hide()
            }, 1000);
         }
     }

    return (
        <div style={{ display: showModelCss }} className="model" >
            <div className="model-content">
                {!loading && <div className="closeBtn" onClick={() => hide() }>
                    X
                </div>}
                {!loading ? <div>
                    {!message ? <div className="text-alert-dialog">
                        <label>คุณแน่ใจว่าต้องการลบ{props.Type} "{props.Name}" {props.Type === "บทเรียน" ? 'ทั้งหมด' : ''}</label>
                    </div>
                    : <Alert variant={'success'} style={{marginBottom: "0px"}}>{message}</Alert>}
                </div> : 
                <div style={{margin: "50px 0px 50px 0px", justifyContent: "center", display: "flex"}}>
                    <Spinner animation="border" variant="primary" />
                </div>}
                
                {!loading && !message && <Row className="flex-center">
                    <Col><Button variant="info" style={{ width: "100px"}} onClick={() => DeleteLearning(props.Name)}>ยืนยัน</Button></Col>
                    <Col><Button variant="secondary" onClick={() => hide()} style={{ width: "100px"}}>ยกเลิก</Button></Col>
                </Row> }
            </div>
        </div>
    )
}

export default withRouter(DeleteL)