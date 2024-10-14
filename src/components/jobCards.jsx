import React from 'react'
import '../styles/JobCard.css'
import { } from "react-icons/fa";
import PostCard from './PostCard';

const JobCards = ({ data }) => {



	return (
		<div className="jobCard">
			{data?.map((datos, index) => (
				<PostCard datos={datos} data={data} key={index} />
			))}
		</div>
	)
}

export default JobCards