import React from 'react'
import { Container,Form, Spinner, Button, Alert } from 'react-bootstrap'
import { useRecoilState , useRecoilValue} from 'recoil';
import { arrayVdoData, insertVdoAtom } from '../../store';
import axios from 'axios'
import { server,ACCESS_TOKEN } from '../../Constants'

export default function Insert(props) {

    const [state, setVdiUrl] = React.useState({
        loading: false,
        err: false,
        message: "กรุณาตรวจข้อมูลที่จะบันทึกเข้าสู่ระบบ"
    })

    const [vdoAtom, setVdoAtom] = useRecoilState(insertVdoAtom);
    const [dataArray, setDataArray] = useRecoilState(arrayVdoData);

    const getData = async () => {
        const result = await axios.get(server.INSERT_VDO + `?subject=${vdoAtom.subject}`, {
            headers: { "auth-token": localStorage.getItem(ACCESS_TOKEN) },
        }).then(result => result.data.data )
        setDataArray({
            ...dataArray, data: result
        })
    }

    const Submit = async () => {
        if (!vdoAtom.vdoName || !vdoAtom.description || !vdoAtom.src) {
            setVdiUrl({ ...state, err: true, message: "กรุณากรอกข้อมูลให้ครบถ้วน" })
        } else if (vdoAtom.vdoName && vdoAtom.src) {
            setVdiUrl({...state , loading: true })
            const result = await axios.post(server.INSERT_VDO, vdoAtom, {
                headers: { "auth-token": localStorage.getItem(ACCESS_TOKEN) },
            }).then(result => result.data)
            if ( result.data ) {
                setVdiUrl({...state , loading: false, err: false, message: "บันทึกข้อมูลสำเร็จ" })
                getData()
                setTimeout(() => {
                    hide()
                }, 500);
            } else {
                setVdiUrl({ ...state, err: true, loading: false, message: result.message })
            }
        }
    }

    function changeHandler(event) {
        setVdoAtom({
          ...vdoAtom, [event.target.name]: event.target.value
        });
    };

    const showModel = () => {
        if (props.Model) {
            return "block"
        } else {
            return "none"
        }
     }
     let showModelCss = showModel()
     const hide = async () => props.ShowModel(false)
     const close = async () => {
         setVdiUrl({...state , loading: false })
         hide()
     }

    return (
        <div style={{ display: showModelCss }} className="model" >
            <div className="model-insert-vdo">
                <div className="closeBtn" onClick={() => close() }>
                    X
                </div>
                        <Form className="insert-box-input">
                            <Form.Group controlId="exampleForm.ControlInput1" className="box-item-insert">
                                <Form.Label>ชื่อ วีดีโอ</Form.Label>
                                <Form.Control type="text" name="vdoName" defaultValue={vdoAtom.vdoName} onChange={e => changeHandler(e) }/>
                            </Form.Group>
                            <Form.Group controlId="exampleForm.ControlInput1" className="box-item-insert">
                                <Form.Label>รายละเอียดสั้นๆ</Form.Label>
                                <Form.Control type="text" name="description" defaultValue={vdoAtom.description} onChange={e => changeHandler(e) }/>
                            </Form.Group>
                            <Form.Group controlId="exampleForm.ControlInput1" className="box-item-insert">
                                <Form.Label>Link YouTube</Form.Label>
                                <Form.Control type="text" name="src" defaultValue={vdoAtom.src} onChange={e => changeHandler(e) }/>
                            </Form.Group>
                            <div className="insert-box-vdo">
                                <div className="insert-box">
                                    { vdoAtom.src ? <div className="active-vdo">
                                        <div className="videoWrapper">
                                            <iframe width="560" height="315" src={vdoAtom.src} frameBorder="0" 
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; 
                                                picture-in-picture" allowFullScreen>
                                            </iframe>
                                        </div>
                                    </div> 
                                    : <div style={{textAlign: "center"}}>กรุณาใส่ Link VDO</div> }
                                </div>
                            </div>
                            <Form.Group controlId="exampleForm.ControlTextarea1" className="form-label-vdo">
                                <Form.Label>ข้อความใต้ คริป วีดีโอ</Form.Label>
                                <Form.Control as="textarea" name="detail" defaultValue={vdoAtom.detail} rows={3} onChange={e => changeHandler(e) }/>
                            </Form.Group>
                            <div className="line-insert">
                                <Alert variant={ state.err ? "danger" : "success"} className="width-alert">{state.message}</Alert>
                                <Button variant="primary" className="btn-right" disabled={state.loading} onClick={() => Submit() } >
                                    {state.loading && <Spinner style={{marginBottom: "5px", marginRight:"5px"}} as="span" animation="grow" size="sm" role="status" aria-hidden="true" />}
                                    {state.loading ?
                                    " Loading..."
                                    : "บันทึก"}
                                </Button>
                            </div>
                        </Form>
            </div>
        </div>
    )
}
