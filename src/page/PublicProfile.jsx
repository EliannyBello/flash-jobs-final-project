import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';  // Importamos useParams
import imgSrc from './img/avatarDefault.png';
import { FaGithub, FaLinkedin, FaBookOpen, FaEnvelope, FaPhone, FaLocationDot } from "react-icons/fa6";
import { FaRegStar, FaStar } from "react-icons/fa";
import { Context } from '../context/GlobalContext';
import '../styles/publicProfile.css';
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

  const calculateRating = (ratingList) => {
    let sum = 0;
    let average = 0;
    for (let num of ratingList) {
      sum += num;
    }
    average = Math.round(sum / ratingList.length);
    return average;
  }

  const displayRating = (rating, index) => {
    return index < rating ? < FaStar key={index} /> : <FaRegStar key={index} />
  }


  useEffect(() => {
    getInfo();
  }, [id]);

  return (
    <div className='mt-2 py-5'>
      <div className="container container-public">
        {!loaded ? (
          <div><h1>Loading...</h1></div>
        ) : (
          <div className="row row-public">
            <div className="col-md-5 user-datos">
              <h2 className="mt-5 ms-3">{user.username}</h2>
              <div className="mx-auto my-1 p-2 img-public">
                <img src={user.profile?.avatar || imgSrc} alt="Profile Avatar" className='img-fluid w-50 my-3 profile-avatar rounded-circle' />
              </div>
              <div className="d-flex justify-content-center">
                <p className="card-text text-center">{
                  [...new Array(5)].map((_, i) => displayRating(calculateRating([...user?.profile?.employer_ratings, ...user?.profile?.applicant_ratings]), i))
                }</p>
                <p className="card-text text-center">({
                  [...user?.profile?.employer_ratings, ...user?.profile?.applicant_ratings].length
                })</p>
              </div>
            </div>
            <div className='col-md-5 mt-2 biografia-public'>
              <div className="d-flex justify-content-start mb-3">
                <FaEnvelope className='fs-4 me-2' />
                <h5>{user.email}</h5>
              </div>
              <div className="d-flex justify-content-start mb-3">
                <FaBookOpen className='fs-4 me-2' />
                <h5>{user.profile?.biography || "No biography"}</h5>
              </div>
              <div className="d-flex justify-content-start mb-3">
                <FaPhone className='fs-4 me-2' />
                <h5>{user.profile?.phone || "No phone number"}</h5>
              </div>
              <div className="d-flex justify-content-start mb-3">
                <FaLocationDot className='fs-4 me-2' />
                <h5>{user.profile?.country || "No country added"}</h5>
              </div>

              <div className="d-flex justify-content-start  mb-3">
                <div><FaGithub className='fs-4 me-2' /></div>
                {(user?.profile?.github) ? (
                  <a className='h5 link-dark link-offset-2 link-underline-opacity-0 link-underline-opacity-50-hover' target='_blank' href={`http://www.github.com/${user?.profile?.github}`}>{user?.profile?.github}</a>
                ) : (
                  <h5>No Github link</h5>
                )}
              </div>
              <div className="d-flex justify-content-start  mb-3">
                <div> <FaLinkedin className='fs-4 me-2' /></div>
                {(user?.profile?.linkedin) ? (
                  <a className='h5 link-dark link-offset-2 link-underline-opacity-0 link-underline-opacity-50-hover' target='_blank' href={`http://www.linkedin.com/in/${user?.profile?.github}`}>{user?.profile?.github}</a>
                ) : (
                  <h5>No LinkedIn link</h5>
                )}
              </div>

              <div className="d-flex justify-content-start mb-3">
                {(user?.profile?.resume) ? (
                  <div className="d-flex flex-column">
                    <div className="d-flex justify-content-start mb-3">
                      <TbBriefcase2Filled className="fs-4 me-2" />
                      <h5 className='me-1'>Resume:</h5>
                      <a href={user.profile?.resume} target='_blank' rel="noopener noreferrer" className='link-dark link-offset-2 link-underline-opacity-0 link-underline-opacity-50-hover h5'>See more</a>
                    </div>
                    <div>
                      <embed
                        src={user.profile?.resume}
                        type="application/pdf"
                        width="600"
                        height="890"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="d-flex flex-column">
                    <div className="d-flex justify-content-start mb-3">
                      <TbBriefcase2Filled className="fs-4 me-2" />
                      <h5 className='me-1'>No Resume</h5>
                    </div>
                  </div>

                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PublicProfile;
