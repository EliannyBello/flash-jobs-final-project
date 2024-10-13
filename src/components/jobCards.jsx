import React, { useContext } from 'react'
import { Link} from 'react-router-dom'
import '../styles/JobCard.css'
import { FaTrash } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";
import { Context } from '../context/GlobalContext';

const JobCards = () => {
	const { store } = useContext(Context)


	return (
		<div className="jobCard">
			{store?.user?.JobCards?.map((datos, index) => (
				<div key={index} className="card p-2 mb-2">
					<div className="d-flex ">
						<img src={store?.user?.profile?.avatar} className="img-fluid rounded-circle" alt="avatar" />
						<div className="ms-3 w-100">
							<h5>{datos.title}</h5>
							<div className="text-muted">
								<i className="fas fa-map-marker-alt me-2"></i>
								{datos.description}
							</div>
							<div className="text-muted">
								<i className="fas fa-phone me-2"></i>
								{datos.payment} 
							</div>
							<div className="text ">
								<i className="fas fa-envelope me-2"></i>
								{datos.languages.join(", ")}
							</div>
							<div className="text-muted">
								<i className="fas fa-laptop-code me-2"></i>
								{datos.technologies.join(", ")}
							</div>
						</div>
						<div className="ms-auto">
							<Link to={`/jobform/${datos.id}`}>
								<FaPencilAlt className="me-3" />
							</Link>
							<FaTrash />
						</div>
					</div>
				</div>
			))}
		</div>
	)
}

export default JobCards