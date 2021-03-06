import React, { useEffect } from 'react'
import { Card, Button, Col, Row } from 'react-bootstrap'
import { Link, Redirect, withRouter } from 'react-router-dom'
import { arrayData, arrayVdoData, insertVdoAtom } from '../../store';
import { useRecoilState } from 'recoil';
import { server, ACCESS_TOKEN , USER_NAME , BASE_URL, USER_ID} from '../../Constants'
import axios from 'axios'

const CardItem = ( props ) => {

    const [vdoAtom, setVdoAtom] = useRecoilState(insertVdoAtom);
    const [dataVdoArray, setDataVdoArray] = useRecoilState(arrayVdoData);
    const [dataArray, setDataArray] = useRecoilState(arrayData);

    const changeHandler = async (subject) => {
        const result = await axios.get(server.INSERT_VDO + `?subject=${subject}`, {
            headers: { "auth-token": localStorage.getItem(ACCESS_TOKEN) },
        }).then(result => result.data.data )

        const [data] = await result.map( data => data )
        if (data) {
            setDataVdoArray({ ...dataVdoArray, src: data.src, detail: data.detail, data: result })
        } else {
            setDataVdoArray({ ...dataVdoArray, src: undefined, detail: undefined, data: result })
        }
        props.history.push(`${subject}`)
    };


    const getData = async () => {
        const result = await axios.get(server.GET_SUBJECT_DATA + `?user=${localStorage.getItem(USER_NAME)}`, {
            headers: { "auth-token": localStorage.getItem(ACCESS_TOKEN) },
        }).then(result => result.data.data )
        setDataArray({
            ...dataArray, data: result
        })
    }
    useEffect(() => {
        getData()
    }, [])

    return (
        <Row className="justify-content-md-center">
            { dataArray.data.map((data, i) => 
              <Col key={i} sx={12} md={4} style={{ display: "flex", justifyContent: "center", marginTop: "15px"}}>
                <Card style={{ width: '18rem' , marginTop: "10px"}} >
                    <Card.Img variant="top" src={`${server.FILE_GET_IMAGE}/${data.file}`} />
                        <Card.Body className="cardbody">
                            <Card.Title>{data.subject}</Card.Title>
                                <Card.Text>{data.description}</Card.Text>
                            <Button variant="primary" onClick={() => changeHandler(data.subject) }>
                                เข้าสู่บทเรียน
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            )}
        </Row>
    )
}

export default withRouter(CardItem)
