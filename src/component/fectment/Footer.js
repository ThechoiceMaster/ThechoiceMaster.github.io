import React from 'react'
import { Container, Card,Button, Col, Row } from 'react-bootstrap'

export default function Footer() {
    return (
            <div className="footer">
                <Container className="footer-content">
                    <h4>© START BASIC 2021</h4>
                    <div className="footer-list">
                       <a href="#">ข้อกำหนดการใช้งาน</a>
                       <a href="#">นโยบายความเป็นส่วนตัว</a>
                    </div>
                </Container>
            </div>
    )
}
