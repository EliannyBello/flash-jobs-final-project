import React, { useContext, useEffect, useState } from "react";
import { Context } from "../context/GlobalContext";
import { FaWindowClose, FaCheckSquare } from "react-icons/fa";
import { Link } from "react-router-dom";  // Importamos Link de react-router-dom
import Swal from "sweetalert2";

const ApplicantItem = ({ item, style, editable = false }) => {
    const [user, setUser] = useState({})
    const { actions } = useContext(Context)

    const getInfo = async () => {
        const user = await actions.getUserByid(item.user, sessionStorage.access_token)
        setUser(user)
    }

    const acceptApplicant = async () => {
        Swal.fire({
            title: "Are you sure?",
            text: "This will reject the others applicants automatically",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, accept!"
        }).then(async (result) => {
            try {
                if (result.isConfirmed) {
                    const response = await actions.acceptApplicant(item.id, sessionStorage.access_token)
                    Swal.fire({
                        title: `${response.title}!`,
                        text: response.message,
                        icon: response.status
                    }).then(() => {
                        (response.status == 'success') && window.location.reload();
                    });
                }
            } catch (error) {
                console.log(error.message)
            }
        });
    }

    const rejectAppliccant = async () => {
        console.log(item.id)
        Swal.fire({
            title: "Are you sure?",
            text: "This will reject the selected applicant",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, accept!"
        }).then(async (result) => {
            try {
                if (result.isConfirmed) {
                    const response = await actions.rejectApplicant(item.id, sessionStorage.access_token)
                    Swal.fire({
                        title: `${response.title}!`,
                        text: response.message,
                        icon: response.status
                    }).then(() => {
                        (response.status == 'success') && window.location.reload();
                    });
                }
            } catch (error) {
                console.log(error.message)
            }
        });
    }

    useEffect(() => {
        getInfo()
    }, [])

    return (
        <li className={`list-group-item align-items-center d-flex justify-content-between bg-${style}-subtle`}>
            <Link to={`/profile/${user.id}`} className="m-0 text-dark text-decoration-none">
                {user.username}
            </Link>
            {editable && (<div className="d-flex">
                <FaCheckSquare onClick={acceptApplicant} className="btn-hover check fs-4" />
                <FaWindowClose onClick={rejectAppliccant} className="btn-hover reject ms-2 fs-4" />
            </div>
            )}
        </li>
    )
}

export default ApplicantItem;
