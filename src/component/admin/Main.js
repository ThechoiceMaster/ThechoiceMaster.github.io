import React, {useState, useEffect} from 'react'
import { Container ,Spinner, Button, Card, Row, Col} from 'react-bootstrap'
import { Link, withRouter } from 'react-router-dom'
import Modal from './Model'
import axios from 'axios'
import { arrayData, arrayVdoData, insertVdoAtom } from '../../store';
import { useRecoilState } from 'recoil';
import { server, ACCESS_TOKEN , USER_NAME , BASE_URL, USER_ID} from '../../Constants'


const  Main = (props) => {

    const [state, setVdiUrl] = useState({
        loading: false,
        err: false,
    })

    const [Model, ShowModel] = useState(false)
    const [dataArray, setDataArray] = useRecoilState(arrayData);
    const [vdoAtom, setVdoAtom] = useRecoilState(insertVdoAtom);
    const [dataVdoArray, setDataVdoArray] = useRecoilState(arrayVdoData);

    const getData = async () => {
        const result = await axios.get(server.GET_SUBJECT_DATA + `?user=${localStorage.getItem(USER_NAME)}`, {
            headers: { "auth-token": localStorage.getItem(ACCESS_TOKEN) },
        }).then(result => result.data.data )
        setDataArray({
            ...dataArray, data: result
        })
    }

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


    useEffect(() => {
        getData()
    }, [])

    return (
        <Container>
            <div className="box-main-insert">
                <h1>บทเรียนทั้งหมด</h1>
                <Button variant="primary" className="btn-right" disabled={state.loading}  onClick={() => ShowModel(true)}>
                    {state.loading && <Spinner style={{marginBottom: "5px", marginRight:"5px"}} as="span" animation="grow" size="sm" role="status" aria-hidden="true" />}
                    {state.loading ?
                    " Loading..."
                    : "สร้างบทเรียน"}
                </Button>
            </div>
            <div className="box-main-items">
                { dataArray.data.map((data, i) => 
                    <Card style={{ width: '18rem' , marginTop: "10px"}} key={ i } >
                        <Card.Img variant="top" src={`${server.FILE_GET_IMAGE}/${data.file}`} />
                        <Card.Body className="cardbody">
                            <Card.Title>{data.subject}</Card.Title>
                                <Card.Text>{data.description}
                                    {/* บทเรียนนี้เป็นเนื้อเรื่องการใช้คำสั่งพื้นฐานต่างๆ ใน ภาษา javascript ทุกคำสั่ง */}
                                </Card.Text>
                                <Button variant="primary" onClick={() => changeHandler(data.subject)}>จัดการบทเรียน</Button>
                        </Card.Body>
                    </Card>
                )}
            </div>
            <Modal Model={Model}  ShowModel={ShowModel} />
        </Container>
    )
}

export default withRouter(Main)
