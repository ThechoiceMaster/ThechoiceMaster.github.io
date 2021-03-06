import React, {useRef} from 'react'
import { Form, Alert, Spinner , Button, Row} from 'react-bootstrap'
import { useRecoilState } from 'recoil';
import { insertSubject } from '../../store';
import { arrayData } from '../../store';
import axios from 'axios'
import { server, ACCESS_TOKEN , USER_NAME} from '../../Constants'

export default function Model(props) {

    const [userObj, setUserObj] = useRecoilState(insertSubject);
    const [dataArray, setDataArray] = useRecoilState(arrayData);

    const [state, setVdiUrl] = React.useState({
        loading: false,
        err: false,
        message: "กรุณาตรวจข้อมูลที่จะบันทึกเข้าสู่ระบบ",
        src: null,
        attachment: { uploading: false }
    })

    const [file, setFile] = React.useState('')
    const [filename, setFilename] = React.useState(undefined)
    const [uploadedFile, setUploadedFile] = React.useState({})

    function changeHandler(event) {
        setUserObj({
          ...userObj, [event.target.name]: event.target.value
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

    const renderInputFile = useRef()
    const uploadFileImage = useRef(null)
    const selectFile = async (e) => {
        const [showFile] = e.target.files
        const reader = new FileReader()
        const {current} = uploadFileImage
        current.file = showFile
        reader.onload = (e) => {
            current.src = e.target.result
        }
        reader.readAsDataURL(showFile)
        
        setFile(e.target.files[0])
        setFilename(e.target.files[0].name || 'default.png')
    }

    const onSubmit = async () => {
        if (!userObj.subject || !userObj.description) {
            setVdiUrl({ ...state, err: true, message: "กรุณากรอกข้อมูลให้ครบถ้วน" })
        } else if (userObj.subject && userObj.subject) {
            const username = localStorage.getItem(USER_NAME)
            setVdiUrl({...state , loading: true })
            const files = new FormData()
            files.append("sampleFile", file, filename)
            const fileName = await axios.post(server.FILE_INPUT_IMAGE, files, {
                onUploadProgress: (ProgressEvent) => {
                      console.log(
                        "upload success" +
                        Math.round((ProgressEvent.loaded / ProgressEvent.total) * 100) +
                        "%"
                      )
                    },
                  headers: { "auth-token": localStorage.getItem(ACCESS_TOKEN) },
                "Content-Type": "multipart/form-data",
            }).then(result => result.data)
            const result = await axios.post(server.INSERT_NAME, { ...userObj, username, fileName}, {
                headers: { "auth-token": localStorage.getItem(ACCESS_TOKEN) },
            }).then(result => result.data)
            setVdiUrl({...state , loading: false })
            if (result.data) {
                setVdiUrl({ ...state, err: false })
                setDataArray({
                    ...dataArray, data: result.data
                  })
                hide()
            } else {
                setVdiUrl({ ...state, message: result.message, err: true })
            }
        }
    }

    const hide = async () => props.ShowModel(false)

    const close = async () => {
        setVdiUrl({...state , loading: false })
        hide()
    }


    return (
        <div style={{ display: showModelCss }} className="model" >
            <div className="model-content">
                <div className="closeBtn" onClick={() => close() }>
                    X
                </div>
                <Form >
                    <Form.Group controlId="exampleForm.ControlInput1" >
                        <Form.Label>ชื่อบทเรียน</Form.Label>
                        <Form.Control type="text" name="subject" defaultValue={userObj.subject} onChange={e => changeHandler(e) }/>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlInput1" >
                        <Form.Label>รายละเอียด</Form.Label>
                        <Form.Control type="text" name="description" defaultValue={userObj.description} onChange={e => changeHandler(e) }/>
                    </Form.Group>
                    <div className="input-img">
                        <div className="img-show">
                            <img  ref={uploadFileImage} width="286" height="180"/>
                        </div>
                            <Button variant="warning" className="btn-right" disabled={state.loading} onClick={() => renderInputFile.current.click() }>
                                {state.loading && <Spinner style={{marginBottom: "5px", marginRight:"5px"}} as="span" animation="grow" size="sm" role="status" aria-hidden="true" />}
                                {state.loading ?
                                " Loading..."
                                : "Upload"}
                            </Button>
                    </div>
                    <Row><Form.File.Label data-browse="Button text">{filename ? filename : 'ไฟล์รูปภาพ jpg, png ขนาด 286 * 180 px'}</Form.File.Label></Row>
                        <div className="btn-modal-input">
                            
                            <Form.File id="formcheck-api-custom" custom className="input-file">
                                <Form.File.Input isValid={true} ref={renderInputFile} onChange={e => selectFile(e)} />
                            </Form.File>
                            
                        </div>
                    <Row>
                        { state.err && <Alert variant={"danger"}> {state.message} </Alert>}
                        <Button variant="success" className="btn-right" disabled={state.loading} onClick={() => onSubmit() } >
                            {state.loading && <Spinner style={{marginBottom: "5px", marginRight:"5px"}} as="span" animation="grow" size="sm" role="status" aria-hidden="true" />}
                            {state.loading ?
                            " Loading..."
                            : "บันทึก"}
                         </Button>
                    </Row>
                </Form>
            </div>
        </div>
    )
}
