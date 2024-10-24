import React, { useContext, useEffect, useState } from "react";
import ApplicantItem from "../components/ApplicantItem";
import { Context } from "../context/GlobalContext";
import { useParams } from "react-router-dom";
import '../styles/application.css';
import { RiEmotionSadLine } from "react-icons/ri";

const ApplicantsList = () => {
    const [apList, setApList] = useState([]);
    const [accepted, setAccepted] = useState({});
    const [pending, setPending] = useState([]);
    const [rejected, setRejected] = useState([]);
    const { actions } = useContext(Context);
    const params = useParams();

    const getList = async () => {
        const response = await actions.getApplications(params.id, sessionStorage.access_token);
        const data = await response;
        data && setApList(data);
        data && setAccepted(data.filter(item => item.status == 6)[0])
        data && setPending(data.filter(item => item.status == 4))
        data && setRejected(data.filter(item => item.status == 5))
        console.log(data);
    }

    const Pending = ({ style }) => (
        <ul className="list-group list-group-flush">
            {(pending.length > 0) ? (pending.map((item, index) => <ApplicantItem item={item} key={index} style={style} editable={true} />)
            ) : (
                <li className={`list-group-item align-items-center d-flex justify-content-between bg-${style}-subtle`}>
                    <h6>There is no pending applicants...</h6>
                </li>
            )}
        </ul>
    );

    const Accepted = ({ style }) => (
        <ul className="list-group list-group-flush">
            <ApplicantItem item={accepted} style={style} />
        </ul>
    );

    const Rejected = ({ style }) => (
        <ul className="list-group list-group-flush">
            {(rejected.length > 0) ? (rejected.map((item, index) => <ApplicantItem item={item} key={index} style={style} />)
            ) : (
                <li className={`list-group-item align-items-center d-flex justify-content-between m-0 bg-${style}-subtle`}>
                    <h6>There is no rejected applicants...</h6>
                </li>
            )}
        </ul>
    );

    useEffect(() => {
        getList()
    }, []);

    return (

        <div className="container-fluid py-5 mt-5 d-flex justify-content-center">
            {(apList.length > 0) ? (
                <div className="col-12 col-md-8">
                    {accepted && (
                        <div className="card text-bg-success mb-3">
                            <div className="card-header">
                                Accepted...
                            </div>
                            <Accepted style='success' />
                        </div>
                    )}
                    <div className="card text-bg-warning mb-3">
                        <div className="card-header">
                            Pending...
                        </div>
                        <Pending style='warning' />
                    </div>

                    {rejected && (<div className="card text-bg-danger mb-3">
                        <div className="card-header">
                            Rejected...
                        </div>
                        <Rejected style='danger' />
                    </div>
                    )}

                </div>
            ) : (
                <p className="text-info fs-1">You have no applicants at the moment. <RiEmotionSadLine /></p>
            )}
        </div>
    );
}

export default ApplicantsList;