import React, { useEffect } from 'react'
import {  Button, Col, Row } from 'react-bootstrap'
import { useRecoilState } from 'recoil'
import { USER_LEVEL } from '../../Constants'
import { arrayVdoData, insertVdoAtom } from '../../store'
import Delete from '../../component/Dialog/Delete'
import VdoEdit from '../../component/Dialog/VdoEdit'
import { useParams } from 'react-router-dom'
import ModalInsert from '../admin/Insert'

export default function Javascript() {
    const { subject } = useParams()

    const [type, setType] = React.useState(undefined)
    const [Model, ShowModel] = React.useState(false)

    const [vdoEdit, ShowVdoEdit] = React.useState(false)
    const [ _ , setVdoAtom] = useRecoilState(insertVdoAtom);

    const [ModelDelete, ShowModelDelete] = React.useState(false)
    const [dataArray, setDataArray] = useRecoilState(arrayVdoData);



    const userLevel = () => {
        const level = localStorage.getItem(USER_LEVEL)
        if ( level === "2" ) {
            return true
        } else {
            return false
        }
    }

    const deleteDialog = (type, Name) => {
        ShowModelDelete(true)
        setType({type, Name})
    }

    const EditVdo = (data) => {
        ShowVdoEdit(true)
        setVdoAtom(data)
    }

    useEffect(() => {
        userLevel()
    }, []);


    return (
        <div className="vdo-from">
            <div className="active-vdo">
                <div className="videoWrapper">
                   {dataArray.data.length > 0 ? <iframe width="560" height="315" src={dataArray.src}
                        allowFullScreen >
                     </iframe>
                    : <h1 style={{textAlign: "center"}}>{userLevel() ? 'รีบเพิ่มเนื้อหาเร็วเข้านักเรียนรออยู่นะ' : 'บทเรียนนี้ยังไม่มีเนื้อหารอสักนิดนึงนะ'}</h1>}
                </div>
            </div>
            <div className="playlist-vdo">
                <Row style={{marginBottom: "15px"}}>
                    <Col>
                       <p>จำนวนผู้เข้าชม เดือนนี้ 1 คน</p>
                    </Col>
                </Row>
                {dataArray.data.length > 0 && (dataArray.data || []).map((a, i) => (
                    <div key={i} className="vid-list" onClick={() => setDataArray({...dataArray, src: a.src, detail: a.detail })}>
                       {/* <img src="logo192.png" /> */}
                       <div className="vid-list-text">
                            <h3>{ (a.vdoName || "").length > 20 ? a.vdoName.substring(0, 20) + " .." : a.vdoName }</h3>
                            <p>{ (a.description || "").length > 80 ? a.description.substring(0, 80) + " .." : a.description }</p>
                       </div>
                       { userLevel() && <Col className="btn-admin">
                            <Button variant="warning" style={{marginRight: "5px", width: "100px"}} onClick={() => EditVdo(a)}>แก้ไข</Button>
                            <Button variant="danger" style={{marginRight: "5px", width: "100px"}} onClick={() => deleteDialog(" VDO", a.vdoName)}>ลบ</Button>
                       </Col> }
                    </div>
                ))}
            </div>
            <div className="active-vdo">
                <p>{dataArray.detail || ""}</p>
            </div>
            <div className="active-btn">
                { userLevel() && <Col className="Col-btn">
                       <Button variant="danger" onClick={() => deleteDialog("บทเรียน", subject) } >ลบบทเรียน</Button>
                       <Button variant="primary" style={{marginLeft: "20px"}} onClick={() => ShowModel(true)} >เพิ่มเนื้อหา</Button>
                </Col> }
            </div>
            {vdoEdit ? <VdoEdit ShowModel={ShowVdoEdit} Model={vdoEdit}  /> : <div></div> }
            {Model ? <ModalInsert ShowModel={ShowModel} Model={Model} /> : <div></div> }
            {ModelDelete ? <Delete ShowModel={ShowModelDelete} Model={ModelDelete} Type={type.type} Name={type.Name}/> : <div></div> }
        </div>
    )
}
