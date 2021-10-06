import React from 'react'
import { getRequest } from '../../api/request';
import PublicLayout from '../../layouts/Public/PublicLayout'
import { PostCard } from './../../components/Public/PostCard';
import { useState, useEffect } from 'react';

const Parties = () => {
    const [partiesData, setPartiesData] = useState([]);
    const getAllParties = async () => {
        try {
            const token = localStorage.getItem("TOKEN");
            // console.log("token", token);
            // var params = props.location.search.slice(5);
            const response = await getRequest(
                `/api/secure/party/party-list`,
                token
            );
            setPartiesData(response.result.data.parties)
        } catch (error) {
            console.log("Get Site Setting Error", error);
        }
    };
    useEffect(() => {
        getAllParties();
    }, []);
    return (
        <PublicLayout>
            <main id="main_content">
                <section className="latest_posts v2">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-10 col-md-10 col-12">
                                <h1>Parties</h1>
                                {
                                    partiesData.map((e, index) => (
                                        <PostCard key={`id_${e._id}_${index}`} text={e.title} image={"http://redfruitfarm.in/views/uploads/" + e.image} grid={false} row={false} />
                                    ))
                                }

                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </PublicLayout>
    )
}

export default Parties
