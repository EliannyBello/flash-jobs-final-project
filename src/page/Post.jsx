import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../context/GlobalContext";
import { FaRegStar, FaStar } from "react-icons/fa";

const Post = () => {
    const context = useContext(Context);
    const params = useParams();

    //tests
    const date = new Date();
    const localDate = date.toLocaleDateString();
    const post = {
        title: 'Post Title',
        description: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptate,
        ullam est? Ratione fugiat ipsa rerum consequuntur sapiente doloribus minus non,
        iusto odit assumenda enim ad totam, dolorem consequatur dolor laboriosam.`,
        payment: 100,
        date: localDate,
        requiredTime: 3,
        expirationDate: null,
        user: 'username',
        applications: ['user 1', 'user 2', 'user 3', 'user 4', 'user 5', 'user 6', 'user7'],
        post_languages: ['English', 'Spanish', 'Korean'],
        tech_knowledges: ['SQL', 'React', 'Python'],
    };

    const user = {
        username: 'John Doe',
        rating: 4,
        jobs_posted: 10


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
        for (let i in list) {
            if (list.length == 0) {
                toString += 'No one has applied for this offer'
            } else if (list.length == 1) {
                toString += `Just ${list[i]} has applied for this offer`;
            } else if (i > 2) {
                toString += `and ${list.length - i} more have applied for this offer`;
                break;
            } else {
                toString += `${list[i]}, `;
            }
        }
        return toString;
    }

    return (
        <div className="container-fluid mt-3 pt-5">
            <div className="row g-3">
                <div className="col-12 col-lg-4">
                    <div className="card">
                        <img src="..." className="card-img-top" alt="user avatar" />
                        <div className="card-body">
                            <h5 className="card-title">{user.username}</h5>
                            <p className="card-text"><b>Rating: </b>{[...new Array(5)].map((_, i) => displayRating(user.rating, i))}</p>
                        </div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item"><b>Published Jobs: </b>{user.jobs_posted}</li>
                        </ul>
                    </div>
                </div>
                <div className="col-12 col-lg-8">
                    <div className="card" >
                        <div className="card-header">
                            <h5 className="card-title">{post.title}</h5>
                            <h6 className="card-subtitle mb-2 text-body-secondary">{post.date}</h6>
                            <h6 className="card-subtitle mb-2 text-body-secondary"><b>{displayApplications(post.applications)}</b></h6>
                        </div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item"><b>Tech Knowledges:</b>{listInformation(post.tech_knowledges)}</li>
                            <li className="list-group-item"><b>Languages:</b>{listInformation(post.post_languages)}</li>
                            <li className="list-group-item"><b>Required Time: </b>{post.requiredTime} days</li>
                            <li className="list-group-item"><b>Payment: </b>${post.payment}</li>
                        </ul>
                        <div className="card-body">
                            <p className="card-text">{post.description}</p>
                            <Link to="/post/1/apply" className="btn btn-primary text-white">Apply</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Post;