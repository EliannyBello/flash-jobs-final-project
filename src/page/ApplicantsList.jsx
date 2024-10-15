import React, { useContext, useEffect, useState } from "react";
import ApplicantItem from "../components/ApplicantItem";
import { Context } from "../context/GlobalContext";
import { useParams } from "react-router-dom";
import '../styles/application.css'

const ApplicantsList = () => {
    const [apList, setApList] = useState([])
    const { actions } = useContext(Context);
    const params = useParams()

    const list = [
        { 'name': 'item 1' },
        { 'name': 'item 2' },
        { 'name': 'item 3' },
        { 'name': 'item 4' },
        { 'name': 'item 5' },
        { 'name': 'item 6' },
        { 'name': 'item 7' },
        { 'name': 'item 8' }
    ]

    const getList = async () => {
        const response = await actions.getApplications(params.id, sessionStorage.access_token)
        const data = await response
        data && setApList(data)
        console.log(data)
    }

    const Container = () => (
        <ul className="list-group">
            {apList.map((item, index) => <ApplicantItem item={item} key={index} />)}
        </ul>
    )

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