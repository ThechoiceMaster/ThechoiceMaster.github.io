import React, { useState, useEffect } from 'react'
import { Form, Button, Col, Row, Alert , Spinner} from 'react-bootstrap'

import { Link , withRouter } from 'react-router-dom'

import { useRecoilState , useRecoilValue} from 'recoil';
import { loginAtom } from '../store';

import { LOGIN_STATUS, USER_LEVEL, ACCESS_TOKEN, USER_NAME, server } from '../Constants'
import axios from 'axios'

const Login = ( props ) => {

    const [userObj, setUserObj] = useRecoilState(loginAtom);
    const [message, setMessage] = useState({
        err: false,
        message: undefined,
        loading: false,
    });

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
        }
    };

    const [isInvalid, setIsInvalid] = useState({
        isInvalidName: false,
        isInvalidPassword: false,
        isValidName: false,
        isValidPassword: false,
    })

    const LoginSubmit = async (props) => {
        if (!userObj.password || !userObj.name) {
            setMessage({ ...message, err: true, message: "กรุณากรอกข้อมูลให้ครบถ้วน" })
        } else if ( userObj.password.length < 6 || userObj.name.length < 6) {
            setMessage({ ...message, err: true, message: "กรุณากรอกข้อมูลทุกช่องให้มากกว่า 6 ตัวอักษร" })
        } else if (userObj.password && userObj.name) {
            setMessage({...message , loading: true })
            const result = await axios.post(server.LOGIN_URL, userObj);
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

    return (
        <div className="center-from">
            <div className="login-page">
                <Form>
                    <h1 className="center">เข้าสู่ระบบ</h1>
                    { message.err && <Alert variant={"danger"}> กรุณากรอกข้อมูลให้ถูกต้อง {message.message} </Alert>}
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>username</Form.Label>
                        <Form.Control type="text" placeholder="username" name="name" defaultValue={userObj.name} isInvalid={isInvalid.isInvalidName} isValid={isInvalid.isValidName} onChange={(e) => changeHandler(e, "name") }/>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword" style={{marginTop: "15px"}}>
                        <Form.Label>password</Form.Label>
                        <Form.Control type="password" placeholder="Password" name="password" defaultValue={userObj.password} isInvalid={isInvalid.isInvalidPassword} isValid={isInvalid.isValidPassword} onChange={(e) => changeHandler(e, "password") }/>
                    </Form.Group>
                    <Row >
                        <Col xs={12} className="bottom-from">
                            <a href="#" variant="primary" className="btn-center link" type="submit">
                                ลืมรหัสผ่าน
                            </a>
                            <Button variant="primary" className="btn-center" disabled={message.loading} onClick={() => LoginSubmit(props) } >
                                {message.loading && <Spinner style={{marginBottom: "5px", marginRight:"5px"}} as="span" animation="grow" size="sm" role="status" aria-hidden="true" />}
                                {message.loading ?
                                " Loading..."
                                : "เข้าสู่ระบบ"}
                            </Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} className="text-center">
                            <Form.Text variant="primary" className="btn-center" type="submit">
                                ยังไม่มีบัญชี
                            </Form.Text>
                            <a href="#" variant="primary" className="link-center link-r" onClick={() => props.setLogin(false) } type="submit">
                                สมัครสมาชิก
                            </a>
                        </Col>
                    </Row>
                </Form>
            </div>
        </div>
    )
}

export default withRouter(Login)