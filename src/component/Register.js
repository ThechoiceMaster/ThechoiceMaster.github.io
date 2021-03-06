import React, { useState } from 'react'
import { Form, Button, Col, Row, Alert , Spinner} from 'react-bootstrap'
import { Link , withRouter } from 'react-router-dom'

import { useRecoilState , useRecoilValue} from 'recoil';
import { registerAtom } from '../store';

import { LOGIN_STATUS, USER_LEVEL, ACCESS_TOKEN, USER_NAME, server } from '../Constants'
import axios from 'axios'

const Register = ( props ) => {

    const [userObj, setUserObj] = useRecoilState(registerAtom);
    const [message, setMessage] = useState({
        err: false,
        message: undefined,
        loading: false,
    });

    const RegisterSubmit = async () => {
        if (!userObj.password || !userObj.email || !userObj.name) {
            setMessage({ ...message, err: true, message: "กรุณากรอกข้อมูลให้ครบถ้วน" })
        } else if ( userObj.password.length < 6 || userObj.email.length < 6 || userObj.name.length < 6) {
            setMessage({ ...message, err: true, message: "กรุณากรอกข้อมูลทุกช่องให้มากกว่า 6 ตัวอักษร" })
        } else if (userObj.password && userObj.email && userObj.name) {
            setMessage({...message , loading: true })
            const result = await axios.post(server.REGISTER_URL, userObj);
            if (result.data.accessToken) {
                localStorage.setItem(LOGIN_STATUS, "OK_LOGIN");
                localStorage.setItem(ACCESS_TOKEN, result.data.accessToken);
                localStorage.setItem(USER_LEVEL, result.data.level);
                localStorage.setItem(USER_NAME, result.data.name);
                props.setShowModel(false)
            } else {
                setMessage({ ...message, err: true, message: result.data.message })
            }
            setMessage({...message , loading: false })
        }
        props.readStore()
    }

    const [isInvalid, setIsInvalid] = useState({
        isInvalidName: false,
        isInvalidPassword: false,
        isInvalidEmail: false,
        isValidName: false,
        isValidPassword: false,
        isValidEmail: false,
    })

    function changeHandler(event, type) {
        setMessage({...message, err:false})
        setUserObj({
          ...userObj, [event.target.name]: event.target.value
        });
        const eventLength = ( event.target.value || {}).length
        if (type === "name") {
            if ( eventLength < 6 ) {
                setIsInvalid({...isInvalid, isInvalidName: true, isValidName: false })
            } else if (eventLength >= 6) {
                setIsInvalid({...isInvalid, isInvalidName: false, isValidName: true })
            } else {
                setIsInvalid({...isInvalid, isInvalidName: false, isValidName: false })
            }
        } else if (type === "password") {
            if ( eventLength < 6 ) {
                setIsInvalid({...isInvalid, isInvalidPassword: true, isValidPassword: false })
            } else if (eventLength >= 6) {
                setIsInvalid({...isInvalid, isInvalidPassword: false, isValidPassword: true })
            } else {
                setIsInvalid({...isInvalid, isInvalidPassword: false, isValidPassword: false })
            }
        } else if (type === "email") {
            if ( eventLength < 6 ) {
                setIsInvalid({...isInvalid, isInvalidEmail: true, isValidEmail: false })
            } else if (eventLength >= 6) {
                setIsInvalid({...isInvalid, isInvalidEmail: false, isValidEmail: true })
            } else {
                setIsInvalid({...isInvalid, isInvalidEmail: false, isValidEmail: false })
            }
        }
     };

    return (
        <div className="center-from">
        <div className="login-page">
            <Form>
                <h1 className="center">สมัครสมาชิก</h1>
                { message.err && <Alert variant={"danger"}> {message.message} </Alert>}
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>username</Form.Label>
                    <Form.Control 
                        type="text"
                        name="name"
                        defaultValue={userObj.name}
                        placeholder="username ต้องมาก 6 ตัวอักษรขึ้นไป"
                        isInvalid={isInvalid.isInvalidName} isValid={isInvalid.isValidName} 
                        onChange={(e) =>  changeHandler(e, "name") } 
                    />
                </Form.Group>

                <Form.Group controlId="formBasicEmail" style={{marginTop: "15px"}}>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control 
                        name="email" type="email" 
                        defaultValue={userObj.email}
                        placeholder="Email ต้องมาก 6 ตัวอักษรขึ้นไป" 
                        isInvalid={isInvalid.isInvalidEmail} isValid={isInvalid.isValidEmail} 
                        onChange={(e) => changeHandler(e, "email") } 
                    />
                    <Form.Text className="text-muted">กรุณากรอก Email จริง จำเป็นต้องใช้ในการกู้รหัส</Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword" style={{marginTop: "15px"}}>
                    <Form.Label>password</Form.Label>
                    <Form.Control 
                        type="password" name="password"
                        defaultValue={userObj.password}
                        placeholder="Password ต้องมาก 6 ตัวอักษรขึ้นไป" 
                        isInvalid={isInvalid.isInvalidPassword} isValid={isInvalid.isValidPassword} 
                        onChange={(e) => changeHandler(e, "password") } 
                    />
                </Form.Group>

                <p style={{ textAlign:"center", marginTop: "15px" }}>กดปุ่ม "สมัครสมาชิก" เป็นการยอมรับ <a href="#" className="link-center link-r"> ข้อตกลงในการใช้งาน </a> </p>

                <Row>
                    <Col xs={12} className="auth-center">
                        <Button variant="primary" className="auth-center" onClick={(e) => RegisterSubmit(e) } disabled={message.loading}>
                            {message.loading && <Spinner style={{marginBottom: "5px", marginRight:"5px"}} as="span" animation="grow" size="sm" role="status" aria-hidden="true" /> }
                            {message.loading ? " Loading..." : "สมัครสมาชิก"}
                        </Button>
                    </Col>
                </Row>

            </Form>
        </div>
        </div>
    )
}

export default withRouter(Register)
