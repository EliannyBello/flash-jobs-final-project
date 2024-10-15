import React, { useContext, useEffect, useState } from "react";
import ApplicantItem from "../components/ApplicantItem";
import { Context } from "../context/GlobalContext";
import { useParams } from "react-router-dom";
import '../styles/application.css'
import { RiEmotionSadLine } from "react-icons/ri";

const ApplicantsList = () => {
    const [apList, setApList] = useState([])
    const { actions } = useContext(Context);
    const params = useParams()

    const getList = async () => {
        const response = await actions.getApplications(params.id, sessionStorage.access_token)
        const data = await response
        data && setApList(data)
        console.log(data)
    }

    const Container = () => (
        apList.length > 0 ? (
            <ul className="list-group">
                {apList.map((item, index) => <ApplicantItem item={item} key={index} />)}
            </ul>
        ) : (
            <p className="text-info fs-1">You have no applicants at the moment. <RiEmotionSadLine /></p>
        )
    );

    useEffect(() => {
        getList()
    }, [])

    return (
        <div className="container-fluid py-5 mt-5 d-flex justify-content-center">
            <div className="col-12 col-md-8">
                <Container />
            </div>
        </div>
    )
}

export default ApplicantsList;