import React from 'react'
import { getRequest } from '../../api/request';
import PublicLayout from '../../layouts/Public/PublicLayout'
import { PostCard } from './../../components/Public/PostCard';
import { useState, useEffect } from 'react';

const Events = () => {
    const [eventsData, setEventsData] = useState([]);
    const getAllEvents = async () => {
        try {
            const token = localStorage.getItem("TOKEN");
            // console.log("token", token);
            // var params = props.location.search.slice(5);
            const response = await getRequest(
                `/api/secure/event/event-list`,
                token
            );
            setEventsData(response.result.data.events)
        } catch (error) {
            console.log("Get Site Setting Error", error);
        }
    };
    useEffect(() => {
        getAllEvents();
    }, []);
    return (
        <PublicLayout>
            <main id="main_content">
                {/* <section className="section-2">
                <div className="container">
                    <div className="row d-flex justify-content-center">
                        <div className="col-lg-8 col-md-8 col-12">
                            <div className="card">
                                <div className="card-body">
                                    <h2 className="h2">
                                        Celebrating 25 Years of Excellence
                                    </h2>
                                    <div className="img_cover">
                                        <img src="img/events_pic.png" className=" img-fluid" alt="..."/>
                                        <div className="Shape">
                                            <a to="#" className="btn btn-default">notify me</a>
                                        </div>
                                    </div>
    
                                </div>
    
                            </div>
                        </div>
                    </div>
                    <div className="row d-flex justify-content-center">
                        <div className=" col-lg-7 col-md-7 col-12">
                            <div className="text-center pa">
                                    <h4>
                                        About the event
                                    </h4>
                                    <p>
                                        The massive technology conference Techweek references past attendees and sponsors to illustrate
                                        how popular and illustrious the event is. If you don???t have big names to reference you can
                                        include testimonials and reviews from past attendees to create the same effect. One study showed
                                        that 79% of customers trust online reviews as much 
                                        <br/>as personal recommendations. <br/>
                                       
                                    </p>
                                    <p>
                                        ???Techweek curates exciting programming that allows a global spotlight to shine on each ecosystem
                                        and its leaders. Past speakers include Rahm Emanuel, Travis Kalanick (CEO, Uber), Craig Newmark
                                        (Founder, Craigslist), Barney Harford (CEO, Orbitz), and Chuck Templeton (Founder, OpenTable).
                                        The Techweek expo has gathered more than 200 sponsors, including companies such as Google,
                                        Groupon, Microsoft, Motorola, Redbox, Uber, and Wordpress.???
                                    </p>
                                    <ul className="nav ju">
                                        <li className="nav-item">
                                          <a className="nav-link" to="">
                                              <img src="img/events2.png" alt=""/>
                                          </a>
                                        </li>
                                        <li className="nav-item">
                                          <a className="nav-link" to="#">
                                              <img src="img/events3.png" alt=""/>
                                          </a>
                                        </li>
                                       
                                      </ul>
                                </div>
                            </div>
                    </div>
                </div>
            </section>
             */}
                <section className="latest_posts v2">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-10 col-md-10 col-12">
                                <h1>Events</h1>
                                {
                                    eventsData.map((e, index) => (
                                        <PostCard key={`id_${e._id}_${index}`} heading={e.title} text={e.description} time={e.createdAt} video={"https://184.72.179.219/views/uploads/" + e.image} image={false} grid={true} />
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

export default Events
