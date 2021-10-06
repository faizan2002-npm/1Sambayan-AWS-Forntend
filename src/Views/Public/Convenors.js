import React from 'react'
import { getRequest } from '../../api/request';
import PublicLayout from '../../layouts/Public/PublicLayout'
import { PostCard } from './../../components/Public/PostCard';
import { useState, useEffect } from 'react';

import images from "../../Constants/Admin/images";

const Convenors = () => {
    const [convenorData, setConvenorData] = useState([]);
    const getAllConvenors = async () => {
        try {
            const token = localStorage.getItem("TOKEN");
            // console.log("token", token);
            // var params = props.location.search.slice(5);
            const response = await getRequest(
                `/api/secure/community/community-list`,
                token
            );
            setConvenorData(response.result.data.communities)
        } catch (error) {
            console.log("Get Site Setting Error", error);
        }
    };
    useEffect(() => {
        getAllConvenors();
    }, []);
    return (
        <PublicLayout>
            <main id="main_content">

                <section className="other_banner" style={
                    {
                        backgroundImage: `url(${images.Books})`
                    }
                }>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-10 col-md-10 col-12 ">
                                <p>
                                    <b>THE CONVENORS</b> lorem ipsum sit dolor nobis exceperibus et audit fugit que repudig
                                    nimusci iur moluptate
                                    maximinum que quate optatur? Quia as aut assim quia verume nonsequam iusam volupti con eos
                                    sum quam,
                                    comnis ut odigeni hicienis exped qui volorro molectum aut expernam re nit quo magnis mod
                                    quodiost que nem
                                    id maiore, offici volupid erspicto corerfera cupti omnihil in remquas sed endit voloris
                                    maiorecerro coresciet
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="section-5 pb-5 mb-5">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-8 col-md-8 col-12">
                                <div className="row">
                                    {
                                        convenorData.map((e, index) => (
                                            <div className="col-lg-3 col-md-6 col-12  my-3" key={`id_${e._id}_${index}`}>
                                                <div className="card border-0">
                                                    <a to="single_convenors.html">
                                                        <img src={"http://ec2-54-160-216-157.compute-1.amazonaws.com/views/uploads/" + e.image} className="card-img-top" alt="..." />
                                                    </a>
                                                    <div className="card-body">
                                                        <h6 className="card-title">
                                                            {e.title}
                                                        </h6>
                                                        <p className="card-text">
                                                            {e.description}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </PublicLayout>
    )
}

export default Convenors
