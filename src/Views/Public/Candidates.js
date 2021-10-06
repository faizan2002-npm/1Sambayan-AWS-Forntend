import React from 'react'
import { getRequest } from '../../api/request';
import PublicLayout from '../../layouts/Public/PublicLayout'
import { PostCard } from './../../components/Public/PostCard';
import { useState, useEffect } from 'react';

const Candidates = () => {
    const [candidatesData, setCandidatesData] = useState([]);
    const getAllCandidates = async () => {
        try {
            const token = localStorage.getItem("TOKEN");
            // console.log("token", token);
            // var params = props.location.search.slice(5);
            const response = await getRequest(
                `/api/secure/candidate/candidate-list`,
                token
            );
            setCandidatesData(response.result.data.candidates)
        } catch (error) {
            console.log("Get Site Setting Error", error);
        }
    };
    useEffect(() => {
        getAllCandidates();
    }, []);
    return (
        <PublicLayout>
            <main id="main_content">
                <section className="latest_posts v2">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-10 col-md-10 col-12">
                                <h1>Candidates</h1>
                                {
                                    candidatesData.map((e, index) => (
                                        <PostCard key={`id_${e._id}_${index}`} text={e.title} image={"http://ec2-54-160-216-157.compute-1.amazonaws.com/views/uploads/" + e.image} grid={false} row={false} />
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

export default Candidates
