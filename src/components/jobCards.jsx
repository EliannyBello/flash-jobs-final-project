import React from 'react'

const jobCards = () => {
  return (
    //margin: 10px; image 150px height x 150px width

    <div className="jobCard">
			<div className="card p-3 mb-3">
				<div className="d-flex align-items-center">

					<img src="https://picsum.photos/id/64/200" className="img-fluid rounded-circle" alt="..." />

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
							<i className="fas fa-pencil-alt me-3"> </i>
						</Link>

						<i className="fas fa-trash" ></i>
					</div>
				</div>
			</div>
		</div>
  )
}

export default jobCards