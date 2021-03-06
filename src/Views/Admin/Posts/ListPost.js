
import React from 'react'
import { Card, CardBody, Col, Container, FormGroup, Form, Input, Label, Row } from 'reactstrap'
import Header from '../../../components/Admin/Headers/Header'
import DataTable from 'react-data-table-component';
import { useState, useEffect } from 'react';
import { getRequest, postRequestForm, putRequest } from '../../../api/request';
import { Button, Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-toastify';
import moment from 'moment';

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
        setFeaturedImage({ image: event.target.files[0], defaultImage: URL.createObjectURL(event.target.files[0]) })
    }
    const changeBackgroundImage = (event) => {
        setBackgroundImage({ backgroundImage: event.target.files[0], defaultbackgroundImage: URL.createObjectURL(event.target.files[0]) })
    }
    const updateSlideHandler = async (e) => {
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
            "postId",
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
                "/api/secure/post/update",
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

const ListPost = () => {
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
                `/api/secure/post/post-list`,
                token
            );
            // response.result.data.posts.map((item, key) => {
            // console.log("item",item);
            setTableData(response.result.data.posts);
            // });
            console.log("Get All Posts Response", response.result.data.posts);
        } catch (error) {
            console.log("Get Site Setting Error", error);
        }
    };
    const deleteSinglePost = async (postId, row, index, column, id) => {
        // console.log("row",row);
        // console.log("index", index);
        // console.log("column",column);
        // console.log("id", id);


        // console.log("column",column);
        // console.log("id", id);
        try {
            const token = localStorage.getItem("TOKEN");
            // console.log("id request to delete the post", postId);
            // var params = props.location.search.slice(5);
            const response = await postRequestForm(
                `/api/secure/post/delete-post`,
                token, { postId }
            );
            // console.log(response);
            if (response.result.status === 200) {
                toast.success('Post Deleted', {
                    position: "bottom-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                });
                var fadeTarget = document.querySelector(`.rdt_Table .rdt_TableRow#row-${index}`);
                var fadeEffect = setInterval(function () {
                    if (!fadeTarget.style.opacity) {
                        fadeTarget.style.opacity = 1;
                    }
                    if (fadeTarget.style.opacity > 0) {
                        fadeTarget.style.opacity -= 0.1;
                    } else {
                        if (fadeTarget.style.opacity == 0) {
                            fadeTarget.style.display = 'none';
                            clearInterval(fadeEffect);
                        }
                    }
                }, 5);
            }
            // setTableData(response.result.data.posts);
            // console.log("Get All Posts Response", response.result.data.posts);
        } catch (error) {
            toast.success(error, {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });
        }
    };


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
                    id: 'data_sort',
                    sortable: true,
                    selector: row => moment(row.createdAt).format("dddd, MMMM Do YYYY"),
                },
                {
                    name: '',
                    button: true,
                    right: true,
                    grow: 1,
                    minWidth: '50px',
                    sortable: false,
                    cell: (row, index, column, id) => <Button className="del_btn" size='lg' variant="danger" onClick={() => deleteSinglePost(row._id, row, index, column, id)}><FontAwesomeIcon icon={faTrash} /></Button>
                },
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
                                    defaultSortAsc={false}
                                    defaultSortFieldId="cell-data_sort-undefined"
                                    // onSort={handleSort}
                                    // theme="dark"
                                    // expandableCloseAllOnExpand={true}
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

export default ListPost
