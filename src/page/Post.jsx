import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../context/GlobalContext";
import { FaRegStar, FaStar, FaTrash, FaPencilAlt } from "react-icons/fa";
import imgPrf from '../page/img/avatarDefault.png'
import Swal from 'sweetalert2'

const Post = () => {
    const { actions, logged } = useContext(Context);
    const [loading, setLoading] = useState(true);
    const [post, setPost] = useState({})
    const [user, setUser] = useState({})
    const params = useParams();
    const [isCreator, setIsCreator] = useState(false);


    const defaultUser = {
        rating: 4
    }

    const listInformation = (list) => {
        let toString = '';
        for (let i in list) {
            if (i == (list.length - 1)) {
                toString += ` ${list[i]}.`
            } else {
                toString += ` ${list[i]},`
            }
        }
        return toString;
    }

    const displayRating = (rating, index) => {
        return index < rating ? < FaStar key={index} /> : <FaRegStar key={index} />
    }

    const displayApplications = (list) => {
        let toString = '';
        console.log(list.length)
        if (list.length == 0) {
            toString += 'No one has applied for this offer'
        } else if (list.length == 1) {
            toString += `Just ${list[0]} has applied for this offer`;
        } else if (list.length == 2) {
            toString += `${list[0]} and ${list[1]} has applied for this offer`
        } else {
            for (let i in list) {
                if (i > 2) {
                    toString += `and ${list.length - i} more have applied for this offer`;
                    break;
                } else {
                    toString += `${list[i]}, `;
                }
            }
        }
        return toString;
    }

    const dateConverter = (stringDate) => {
        const date = new Date(stringDate);
        const formated = date.toLocaleDateString();
        return formated;
    }

    async function getPostInfo() { //función asicrona
        console.log('consultando')
        //guardo el resultado del GET en una variable interna (deben modificar los actions que necesiten utilizar de igual forma para que retornen los datos que necesiten)
        const post = await actions.getJobPost(params.id, sessionStorage.access_token)
        //realizo la segunda consulta que solo se hará al completar la anterior, entonces así me aseguro que tiene los datos que le pasaré como parámetro, en este caso el user_id
        const user = await actions.getUserByid(post.employer, sessionStorage.access_token)
        const sessionUser = await JSON.parse(sessionStorage.user)
        //esto se ejecutará solo si se terminaron los await de arriba
        console.log(user)
        console.log(post)
        setPost(post)
        setUser(user)
        setIsCreator(sessionUser.id === post.employer)
        setLoading(false)
    }

    const applyToJob = async () => {
        const success = await actions.jobApplication(sessionStorage.access_token, params.id);
        console.log(success)
        if (success.status == 'success') {
            Swal.fire({
                position: "center",
                icon: "success",
                title: success.message,
                showConfirmButton: false,
                timer: 1500
            });
        } else {
            Swal.fire({
                position: "center",
                icon: "error",
                title: success.message,
                showConfirmButton: false,
                timer: 1500
            });
        }
    };

    const EditsIcon = ({ id }) => (
        <div className="ms-auto">
            <Link to={`/post/${id}/edit`}>
                <FaPencilAlt className="me-3" />
            </Link>
            <FaTrash />
        </div>
    )

    useEffect(() => {
        getPostInfo()
    }, [loading]);

    const UserCard = () => (
        <div className="col-12 col-lg-4 col-xxl-3">
            <div className="card">         
                <div className="d-flex justify-content-center">
                    <img src={user?.profile?.avatar || imgPrf} className="profile-avatar rounded-circle" alt="user avatar" />
                </div>
                <div className="card-body">
                    <h5 className="card-title">{user.username}</h5>
                    <p className="card-text"><b>Rating: </b>{[...new Array(5)].map((_, i) => displayRating(defaultUser.rating, i))}</p>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item"><b>Published Jobs: </b>{user.job_postings.length}</li>
                </ul>
            </div>
        </div>
    )

    const PostCard = () => (
        <div className="col-12 col-lg-8">
            <div className="card" >
                
                <div className="card-header">
                    <div className="d-flex justify-content-between align-items-center">
                        <h5 className="card-title">{post.title}</h5>
                        {isCreator && <EditsIcon id={post.id} />}
                    </div>
                    <h6 className="card-subtitle mb-2 text-body-secondary">{dateConverter(post.date)}</h6>
                    <h6 className="card-subtitle mb-2 text-body-secondary"><b>{displayApplications(post.applications)}</b></h6>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item"><b>Rank: </b>{(post.rank)}</li>
                    <li className="list-group-item"><b>Tech Knowledges:</b>{listInformation(post.technologies)}</li>
                    <li className="list-group-item"><b>Languages:</b>{listInformation(post.languages)}</li>
                    <li className="list-group-item"><b>Required Time: </b>{post.required_time} days</li>
                    <li className="list-group-item"><b>Expiration Date: </b>{dateConverter(post.expiration_date)}</li>
                    <li className="list-group-item"><b>Payment: </b>${post.payment}</li>
                </ul>
                <div className="card-body">
                    <p className="card-text">{post.description}</p>
                    {isCreator ? (
                        <Link to={`/applicants/${post.id}`} className="btn btn-success">Go to se your post's applications</Link>
                    ) : (
                        <button onClick={applyToJob} className="btn btn-primary text-white">Apply</button>
                    )}
                </div>
            </div>
        </div>
    )



    return (
        <div className="container-fluid mt-5 py-4">
            {logged ? (loading ? (
                <div>Loading...</div>
            ) : (
                <div className="row g-3">
                    {<UserCard />}
                    {<PostCard />}
                </div>
            )) : (
                <div className="alert alert-danger" role="alert">
                    You Must Log In to See This
                </div>
            )}
        </div>
    );
}

export default Post;