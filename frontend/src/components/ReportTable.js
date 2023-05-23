import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ReportTable(props) {
    const [Reports, setReports] = useState(null);

    useEffect(() => {
        //* Assign Reports to Reports object
        setReports(props.Reports)
    }, [props.Reports]);

    return (
        <>
            <section className="section">
                <div className="row">
                    <div className="col-12">
                        <div className="card" style={{ padding: "20px" }}>
                            <div className="card-body">
                                <h1>Reports</h1>
                                <div className="row" style={{ float : "right", width:"20%", margin:"10px 0 35px" }} >
                                    <div className="col-lg-6 col-md-12" style={{ color: "#41AF6C" }}>
                                    <i className="bi bi-circle-fill"></i>Approved
                                    </div>

                                    <div className="col-lg-6 col-md-12" style={{ color: "#F96666" }}>
                                    <i className="bi bi-circle-fill"></i> Rejected
                                    </div>
                                </div>
                                <table className="table  table-hover col-8">
                                    <thead>
                                        <tr>
                                            <th scope="col">User Name</th>
                                            <th scope="col">Category</th>
                                            <th scope="col">Location</th>
                                            <th scope="col">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody >
                                        {Reports &&
                                            Reports.map((Report) => {
                                                return (
                                                    <tr key={Report._id}>
                                                        <td>{Report.userName}</td>
                                                        <td>{Report.typeOfLitter}</td>
                                                        <td>{Report.location}</td>
                                                        <td><i className="bi bi-circle-fill" style={{ color: Report.status ? "#41AF6C" : "#F96666" }}></i></td>
                                                        
                                                        <td><Link to={{ pathname: `/update-Report-details/${Report._id}` }}><button className="btn btn-primary" title="Update details"><i className="bi bi-eye-fill" style={{ color: "#FFF" }}></i></button></Link></td>
                                                        {/* <td><Link to={{ pathname: `/Report-reports/${Report.rawMaterial}` }}><button className="btn btn-primary" title="View payment details"><i className="bi bi-file-earmark-text-fill"></i></button></Link></td> */}
                                                    </tr>
                                                );
                                            })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default ReportTable;
