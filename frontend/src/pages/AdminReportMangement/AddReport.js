import React from "react";

import Header from "../../../components/dashboard/Header";
import Sidebar from "../../../components/dashboard/Sidebar";

import ReportForm from "../../../components/dashboard/ReportManagement/ReportForm";

function AddReport() {
    return (
        <>
            <Header />
            <Sidebar />
            <main className="main" id="main">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="index.html">Home</a></li>
                    <li class="breadcrumb-item">Report Management</li>
                    <li class="breadcrumb-item">Add Report</li>
                </ol>
                <ReportForm
                    formName="Add Report"
                    buttonName="Add Report"
                    companyName=""
                    companyPhoneNo=""
                    brNo=""
                    companyAddress=""
                    contactPersonName=""
                    contactPersonPhoneNo=""
                    contactPersonEmail=""
                    status = {true}
                />
            </main>
        </>
    )
}

export default AddReport;