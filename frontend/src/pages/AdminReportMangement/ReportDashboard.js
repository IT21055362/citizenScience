import React, { useEffect, useState } from "react";
import Header from "../../../components/dashboard/Header";
import Sidebar from "../../../components/dashboard/Sidebar";
import RecentlyAddedReports from "../../../components/dashboard/ReportManagement/RecentlyAddedReports";
import ReportPieChart from "../../../components/dashboard/ReportManagement/ReportPieChart";
import CategoryPieChart from "../../../components/dashboard/ReportManagement/CategoryPieChart";

const moment = require('moment');

function ReportDashboard() {

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
        <>
            <Header />
            <Sidebar />
            <main className="main" id="main">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="index.html">Home</a></li>
                    <li className="breadcrumb-item">Dashboard</li>
                </ol>

                <div className="row" style={{ margin: "20px 0", justifyContent: "center" }} >
                    <div className="col-lg-5 card" style={{ margin: "0 15px 0 0", padding: "20px" }}>
                        <ReportPieChart />
                        {/* <RecentReportPayment /> */}
                    </div>

                    <div className="col-lg-5 card" style={{ margin: "0 15px 0 0", padding: "20px" }}>
                        <CategoryPieChart />
                        {/* <RecentReportPayment /> */}
                    </div>

                    <div className="col-lg-5" style={{ margin: "0 15px 0 0"}}>

                        <div className="card" style={{padding: "40px"}}>
                            <h5 className="card-title">Today : {moment().format("YYYY MMMM DD")}</h5>
                            <div className="d-flex align-items-center">
                                <div className="ps-3">
                                    <h3 >Toatl No of Reports : {ReportCount}</h3>
                                </div>
                            </div>
                        </div>
                        <div className="card" style={{padding: "20px" }}>
                            <RecentlyAddedReports />
                        </div>
                    </div>
                </div>

                

            </main>
        </>
    )
}

export default ReportDashboard;