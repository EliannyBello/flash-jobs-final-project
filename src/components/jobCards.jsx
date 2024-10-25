import React from 'react'
import '../styles/JobCard.css'
import { } from "react-icons/fa";
import PostCard from './PostCard';
import ProfilePostCard from './ProfilePostCard';
import { useLocation } from 'react-router-dom';

const JobCards = ({ data }) => {

	const location = useLocation()

	return (
		<div className={"jobCard " + ((location.pathname == '/') && 'd-flex row row-cols-md-2 row-cols-xxl-3 g-2 justify-content-start')}>
			{(location.pathname == '/') ? (
				data?.map((datos, index) => (
					<PostCard datos={datos} data={data} key={index} />
				))
			) : (
				data?.map((datos, index) => (
					<ProfilePostCard datos={datos} data={data} key={index} />
				))
			)}
		</div>
	)
}

export default JobCards