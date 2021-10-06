import { useEffect, useState } from 'react'
import { Col, Container, Nav, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { getRequest } from '../../../api/request';

const Footer = () => {
    const [loading, setLoading] = useState(true);
    const [siteSetting, setSiteSetting] = useState();
    const getProileImage = async () => {
        try {
            const token = localStorage.getItem("TOKEN");
            const response = await getRequest(
                `/api/secure/site/`,
                token
            );
            if (response.result.status === 200) {
                setSiteSetting(response.result.data.site[0]);
                setLoading(false);
            }
            console.log("Get Profile Iamge Response", response.result.data.site[0]);
        } catch (error) {
            console.log("Get Site Setting Error", error);
        }
    };
    useEffect(() => {
        getProileImage();
    }, []);
    return (
        <>
            {
                (loading) ? <></> : <><footer id="footer">
                    <Container>
                        <Row className="justify-content-center">
                            <Col lg={5} md={5} xs={12}>
                                <Link className="site-logo" to="/">
                                    <img src={"https://184.72.179.219/views/uploads/" + siteSetting.logo} alt="" className="img-fluid" />
                                </Link>
                                <Nav className="social" as="ul">
                                    <Nav.Item as="li">
                                        <Nav.Link href={siteSetting.Instagram} target="_BLANK">
                                            <FontAwesomeIcon icon={faInstagram} />
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item as="li">
                                        <Nav.Link href={siteSetting.Facebook} target="_BLANK">
                                            <FontAwesomeIcon icon={faFacebook} />
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item as="li">
                                        <Nav.Link href={siteSetting.Twitter} target="_BLANK">
                                            <FontAwesomeIcon icon={faTwitter} />
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item as="li">
                                        <Nav.Link href={siteSetting.LinkedIn} target="_BLANK">
                                            <FontAwesomeIcon icon={faWhatsapp} />
                                        </Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </Col>
                            <Col lg={7} md={7} xs={12} dangerouslySetInnerHTML={{
                                __html: siteSetting.footer,
                            }} />
                        </Row>
                    </Container>
                </footer>
                    <div className="footer_copyright">
                        <Container>
                            <Row>
                                <Col lg={12} md={12} xs={12}>
                                    <p className="text-center m-0 py-3 text-white">
                                        {
                                            siteSetting.copyright
                                        }
                                    </p>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                    <div className="lim">
                        <a to="#" className="link btn">
                            Download MEMBERSHIP APPLICATION here
                        </a>
                    </div>
                </>
            }
        </>
    )
}

export default Footer
