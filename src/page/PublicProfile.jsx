import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';  // Importamos useParams
import imgSrc from './img/avatarDefault.png';
import { FaGithub, FaLinkedin, FaBookOpen, FaEnvelope, FaPhone, FaLocationDot } from "react-icons/fa6";
import { Context } from '../context/GlobalContext';
import '../styles/Profile.css';
import { TbBriefcase2Filled } from "react-icons/tb";

const PublicProfile = () => {
  const { id } = useParams(); 
  const [loaded, setLoaded] = useState(false);
  const [user, setUser] = useState({});
  const { actions } = useContext(Context);

  const getInfo = async () => {
    try {
      const userData = await actions.getUserByid(id, sessionStorage.access_token); 
      setUser(userData);
      setLoaded(true);  
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  useEffect(() => {
    getInfo();
  }, [id]);  

  return (
    <>
    <div className="container mt-5 py-3">
      {!loaded ? (
        <div><h1>Loading...</h1></div>
      ) : (
        <div className="row">
          <div className="col-md-5">
            <h2 className="mt-5 ms-5">{user.username}</h2>
            <div className="mx-auto my-1 p-2">
              <img src={user.profile?.avatar || imgSrc} alt="Profile Avatar" className='img-fluid w-50 my-3 profile-avatar rounded-circle' />
            </div>
            </div>
            <div className='col-md-5 mt-5 py-5'>
            <div className="d-flex justify-content-start mb-3">
              <FaEnvelope className='fs-4 mx-4' />
              <h5>{user.email}</h5>
            </div>
            <div className="d-flex justify-content-start mb-3">
              <FaBookOpen className='fs-4 mx-4' />
              <h5>{user.profile?.biography || "No biography"}</h5>
            </div>
            <div className="d-flex justify-content-start mb-3">
              <FaPhone className='fs-4 mx-4' />
              <h5>{user.profile?.phone || "No phone number"}</h5>
            </div>
            <div className="d-flex justify-content-start mb-3">
              <FaLocationDot className='fs-4 mx-4' />
              <h5>{user.profile?.country || "No country added"}</h5>
            </div>
            <div className="d-flex justify-content-start mb-3">
              <FaGithub className='fs-4 mx-4' />
              <h5>{user.profile?.github || "No Github link"}</h5>
            </div>
            <div className="d-flex justify-content-start mb-3">
              <FaLinkedin className='fs-4 mx-4' />
              <h5>{user.profile?.linkedin || "No LinkedIn link"}</h5>
            </div>

            <div className="d-flex justify-content-start mb-3">
              {user.profile?.resume ? (
                <div className="d-flex flex-column">
                  <div className="d-flex justify-content-start mb-3">
                    <TbBriefcase2Filled className="fs-4 mx-4" />
                    <h5 className='me-1'>Resume:</h5>
                    <a href={user.profile?.resume} target='_blank' rel="noopener noreferrer" className='link-dark link-offset-2 link-underline-opacity-0 link-underline-opacity-50-hover h5'>See more</a>
                  </div>
                  <div>
                    <embed
                      src={user.profile?.resume}
                      type="application/pdf"
                      width="600"
                      height="800"
                    />
                  </div>
                </div>
              ) : (
                <h5>No Resume</h5>
              )}
            </div>
            </div>
        </div>
      )}
    </div>
    </>
  );
};

export default PublicProfile;
