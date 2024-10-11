import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/JobCard.css'
import { FaTrash } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";
import { Context } from '../context/GlobalContext';

const JobCards = () => {
	const navigate = useNavigate()
	const { store } = useContext(Context)


	return (
		<div className="jobCard">
			<div className="card p-2 mb-2">
				<div className="d-flex ">
					<img src={store?.user?.profile?.avatar} className="img-fluid rounded-circle" alt="..." />
					<div className="ms-3 w-100">
						<h5>title</h5>
						<div className="text-muted">
							<i className="fas fa-map-marker-alt me-2"></i>
							description
						</div>
						<div className="text-muted">
							<i className="fas fa-phone me-2"></i>
							price
						</div>
						<div className="text-muted">
							<i className="fas fa-envelope me-2"></i>
							language
						</div>
					</div>

					<div className="ms-auto">
						<Link to="">
							<i className="fas fa-pencil-alt me-3"><FaPencilAlt /></i>
						</Link>

						<i className="fas fa-trash" ><FaTrash /></i>
					</div>
				</div>
			</div>
		</div>
	)
}

export default JobCards