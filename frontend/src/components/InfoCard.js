import React, { useEffect, useState } from "react";

const moment = require("moment");

function InfoCard() {
    const [ReportCount, setReportCount] = useState(0);

    useEffect(() => {
        const getCount = async () => {
            const response = await fetch('/api/Reports/getCount/count', { method: 'GET' });

            const json = await response.json();

            if (response.ok) {
                setReportCount(json.count);
            }

            if (!response.ok) {
                console.log(json.error);
            }

        }
        getCount();

    }, []);

    return (
        <div className="row">
            <div className="col-lg-6">
                <div className="card info-card sales-card">
                    <div className="card-body">
                        
                        <div className="d-flex align-items-center">
                            <div className="ps-3">
                                <h1 >Welcome</h1>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div className="col-lg-6">
                <div className="card info-card sales-card">
                    <div className="card-body">
                        <h5 className="card-title">Today : {moment().format("YYYY MMMM DD")}</h5>
                        <div className="d-flex align-items-center">
                            <div className="ps-3">
                                <h3 >Reports : {ReportCount}</h3>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>

    )
}
export default InfoCard;