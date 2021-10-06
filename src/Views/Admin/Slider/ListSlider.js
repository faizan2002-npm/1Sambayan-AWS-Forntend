import React from 'react'
import { Card, CardBody, CardHeader, Col, Container, FormGroup, Form, Input, Label, Row } from 'reactstrap'
import Header from '../../../components/Admin/Headers/Header'
import DataTable from 'react-data-table-component';
import { v4 as uuidv4 } from 'uuid';
import { useState, useEffect } from 'react';
import { getRequest, postRequest, postRequestForm, putRequest } from '../../../api/request';
import { Link } from 'react-router-dom';
import EditorField from '../../../components/Admin/EditorFormik.d';
import { Button, Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons'
import { deleteRequest } from '../../../api/request';

// A super simple expandable component.
function camelize(str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
        return index === 0 ? word.toLowerCase() : word.toUpperCase();
    }).replace(/\s+/g, '');
}
const ExpandedComponent = ({ data }) => {
    const [defaultData, setDefaultSlideData] = useState({
        title: data.title,
        description: data.description,
        image: "https://184.72.179.219/views/uploads/" + data.image,
        backgroundImage: "https://184.72.179.219/views/uploads/" + data.backgroundImage,
    })
    const [featuredImage, setFeaturedImage] = useState({ image: data.image, defaultImage: defaultData.image })
    const [backgroundImage, setBackgroundImage] = useState({ backgroundImage: data.backgroundImage, defaultbackgroundImage: defaultData.backgroundImage })
    const changeFeaturedImage = (event) => {
        setFeaturedImage( { image: event.target.files[0], defaultImage: URL.createObjectURL(event.target.files[0]) })
    }
    const changeBackgroundImage = (event) => {
        setBackgroundImage( { backgroundImage: event.target.files[0], defaultbackgroundImage: URL.createObjectURL(event.target.files[0]) })
    }
    const updateSlideHandler = async(e) => {
        e.preventDefault();
        console.log(e);
        const formData = new FormData();
        formData.append(
            "title",
            e.target[0].value
        );
        formData.append(
            "description",
            e.target[1].value
        );
        formData.append(
            "image",
            featuredImage.image
        );
        formData.append(
            "backgroundImage",
            backgroundImage.backgroundImage
        );
        formData.append(
            "headerId",
            data._id
        );
        const APIfeaturedImage = {
            image: formData.get('image')
        };
        const APIbackgroundImage = {
            backgroundImage: formData.get('backgroundImage')
        };
        const APIresponse = {
            props: {
                title: formData.get('title'),
                description: formData.get('description'),
            },
            ...APIfeaturedImage,
            ...APIbackgroundImage
        };
        // console.log("Update Slider APIresponse", APIresponse);
        const token = localStorage.getItem("TOKEN");
        // console.log(token);
        // const APIresponse = {
        //     props: {
        //         title: values.editTitle,
        //         description: values.editDesc,
        //         image: values.image,
        //         video: {
        //             videoURL: '',
        //             videoSettings: {
        //                 loop: false,
        //                 controls: false,
        //                 autoPlay: false,
        //                 muted: false
        //             },
        //         },
        //         postId: data._id
        //     }
        // };
        console.log('Update Post APIresponse', APIresponse);
        try {
            const response = await putRequest(
                "/api/secure/site/update-header",
                token,
                formData
            );

            console.log("status", response);
            if (response.result.status === 200) {
                alert('Updated');

                //   console.log("logged in!");
                //   if (response.result.data.user.type === "teacher") {
                //     // navigate("TeacherDashboard");
                //     teacherLoginRedirect();
                //   }
            }
        } catch (error) {
            console.log("Set Site Setting error", error.message);
        }
    }
    return (<>
        {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
        {/* <Formik
            enableReinitialize={true} initialValues={{
                editTitle: data.title,
                editDesc: data.description,
                image: data.image,
                video: data.video
            }}
            onSubmit={async (values) => {
                // console.log(values);
                const token = localStorage.getItem("TOKEN");
                // console.log(token);
                const APIresponse = {
                    props: {
                        title: values.editTitle,
                        description: values.editDesc,
                        image: values.image,
                        video: {
                            videoURL: '',
                            videoSettings: {
                                loop: false,
                                controls: false,
                                autoPlay: false,
                                muted: false
                            },
                        },
                        postId: data._id
                    }
                };
                console.log('Update Post APIresponse', APIresponse);
                try {
                    const response = await putRequest(
                        "/api/secure/site/update-header",
                        token,
                        APIresponse
                    );
    
                    console.log("status", response);
                    if (response.result.status === 200) {
                        alert('Updated');
    
                        //   console.log("logged in!");
                        //   if (response.result.data.user.type === "teacher") {
                        //     // navigate("TeacherDashboard");
                        //     teacherLoginRedirect();
                        //   }
                    }
                } catch (error) {
                    console.log("Set Site Setting error", error.message);
                }
            }}
        > */}
        <Form className="form" encType="multipart/form-data" method="post" onSubmit={updateSlideHandler}>
            <Row className="m-0">
                <Col xs={12} className="my-3">
                    <h2>Edit Post {data.title}</h2>
                </Col>
                <Col xs={12}>
                    <FormGroup className="mb-3">
                        <Label>Title</Label>
                        <Input
                            name="title"
                            type="text"
                            placeholder="Name"
                            className="form-control"
                            defaultValue={data.title}
                        />
                    </FormGroup>
                </Col>
                <Col xs={12}>
                    <FormGroup className="mb-3">
                        <Label>Content</Label>
                        <Input
                            name="description"
                            type="textarea"
                            placeholder="Content"
                            className="form-control"
                            defaultValue={data.description}
                        />
                    </FormGroup>
                </Col>
                <Col lg={6} md={6} xs={12}>
                    <FormGroup className="mb-3">
                        <Label>Featured Image</Label>
                        <input id="image" name="image" type="file" onChange={changeFeaturedImage} className="form-control" />
                        {
                            (featuredImage.defaultImage) ? <Image src={featuredImage.defaultImage} alt="profils pic" fluid /> : ''
                        }
                    </FormGroup>
                </Col>
                <Col lg={6} md={6} xs={12}>
                    <FormGroup className="mb-3">
                        <Label>Featured Background Image</Label>
                        <input id="backgroundImage" name="backgroundImage" type="file" onChange={changeBackgroundImage} className="form-control" />
                        {
                            (backgroundImage.defaultbackgroundImage) ? <Image src={backgroundImage.defaultbackgroundImage} alt="profils pic" fluid /> : ''
                        }
                    </FormGroup>
                </Col>
                <Col className="text-center mt-5" xs={12}>
                    <Button type="submit" color="success" outline>
                        Save
                    </Button>
                </Col>
            </Row>
        </Form>
        {/* </Formik> */}
    </>)
};

const ListSlider = () => {
    const handleRowClick = () => {
        console.log('row.createdAt', this.row.title);
    }
    const [columns, setColumns] = useState([]);
    const [pending, setPending] = React.useState(true);
    const [tableHead, setTableHead] = useState();
    const [tableData, setTableData] = useState();
    const getAllPosts = async () => {
        try {
            const token = localStorage.getItem("TOKEN");
            // console.log("token", token);
            // var params = props.location.search.slice(5);
            const response = await getRequest(
                `/api/secure/site/header-list`,
                token
            );

            setTableData(response.result.data.headers);
            // console.log("Get All Posts Response", response.result.data.posts);
        } catch (error) {
            console.log("Get Site Setting Error", error);
        }
    };
    // const deleteSinglePost = async (id) => {
    //     const postId = {
    //         id
    //     }
    //     try {
    //         const token = localStorage.getItem("TOKEN");
    //         console.log("id request to delete the post", id);
    //         // var params = props.location.search.slice(5);
    //         const response = await postRequest(
    //             `/api/secure/site/delete-header`,
    //             token, id
    //         );
    //         console.log(response);
    //         if (response.result.status === 200) {
    //             // alert('Updated');

    //             //   console.log("logged in!");
    //             //   if (response.result.data.user.type === "teacher") {
    //             //     // navigate("TeacherDashboard");
    //             //     teacherLoginRedirect();
    //             //   }
    //         }
    //         // setTableData(response.result.data.posts);
    //         // console.log("Get All Posts Response", response.result.data.posts);
    //     } catch (error) {
    //         console.log("Get Site Setting Error", error);
    //     }
    // };

    useEffect(() => {
        const timeout = setTimeout(() => {
            getAllPosts();
            setTableHead([
                {
                    name: 'Title',
                    sortable: true,
                    selector: row => row.title,
                },
                {
                    name: 'Date',
                    sortable: true,
                    selector: row => row.createdAt,
                },
                // {
                //     name: 'Action',
                //     button: true,
                //     sortable: false,
                //     selector: (row) => <Button size='sm' variant="danger" onClick={() => deleteSinglePost(row._id)}><FontAwesomeIcon icon={faTrash} /></Button>
                // },
            ]);
            setPending(false);
        }, 2000);
        return () => clearTimeout(timeout);
    }, []);
    return (
        <>
            <Header />
            <Container className="mt--7" fluid>
                <Row className="mt-5">
                    <Col className="mb-5 mb-xl-0" xl="12">
                        <Card className="shadow-none b-0">
                            <CardBody className="p-0">
                                <DataTable
                                    columns={tableHead}
                                    data={tableData}
                                    expandableRows
                                    style={{
                                        borderRadius: "5px"
                                    }}
                                    // theme="dark"
                                    pagination
                                    expandableRowsComponent={ExpandedComponent}
                                    progressPending={pending}
                                    expandableIcon={
                                        {
                                            collapsed: <FontAwesomeIcon icon={faPencilAlt} />,
                                            expanded: <FontAwesomeIcon icon={faPencilAlt} />,
                                        }
                                    }
                                />
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default ListSlider
