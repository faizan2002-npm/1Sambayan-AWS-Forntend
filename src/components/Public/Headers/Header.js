import { useEffect, useState } from 'react'
import { Navbar, Container, Nav, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import routes from '../../../routes';
import { getRequest } from '../../../api/request';

const Header = () => {
    const [loading, setLoading] = useState(true);
    const [siteSetting, setSiteSetting] = useState();
    const getSiteSetting = async () => {
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
    const getRoutes = (routes) => {
        routes.sort((a, b) => (a.order > b.order) ? 1 : -1)
        return routes.map((prop, key) => {
            if (prop.layout === "" && prop.show === 'yes') {
                if (prop.name === 'Home') {
                    return (
                        <Nav.Item as="li" key={key}>
                            <Link className="nav-link" to={prop.layout + prop.path}>{prop.name}</Link>
                        </Nav.Item>
                    );
                } else {
                    return (
                        <Nav.Item as="li" key={key}>
                            <Link className="nav-link" to={prop.layout + prop.path}>{prop.name}</Link>
                        </Nav.Item>
                    );
                }
            } else {
                return null;
            }
        });
    };
    useEffect(() => {
        getSiteSetting();
    }, []);
    return (
        <>
            {
                (loading) ? '' : <>
                    <header id="header">
                        <Container fluid>
                            <Navbar as="nav" variant="dark" expand="lg">
                                <Link className="navbar-brand" to="/">
                                    <Image src={"http://redfruitfarm.in/views/uploads/" + siteSetting.logo} alt="" fluid />
                                </Link>
                                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                                <Navbar.Collapse id="basic-navbar-nav">
                                    <Nav className="ml-auto" as="ul" id="primary_main_menu">
                                        {
                                            getRoutes(routes)
                                        }
                                        <Nav.Item className="btn" as="li" >
                                            <Link className="nav-link" href='#'>Donate Now</Link>
                                        </Nav.Item>
                                    </Nav>
                                </Navbar.Collapse>
                            </Navbar>
                        </Container>
                    </header>
                </>
            }
        </>
    )
}

export default Header
