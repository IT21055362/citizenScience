import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Header from "../../../components/dashboard/Header";
import Sidebar from "../../../components/dashboard/Sidebar";
import ReportForm from "../../../components/dashboard/ReportManagement/ReportForm";



function ReportDetails() {
    const [companyName, setCompanyName] = useState("");
    const [companyPhoneNo, setCompanyPhoneNo] = useState("");
    const [brNo, setBrNo] = useState("");
    const [rawMaterial, setRawMaterial] = useState("");
    const [companyAddress, setCompanyAddress] = useState("");
    const [contactPersonName, setContactPersonName] = useState("");
    const [contactPersonPhoneNo, setContactPersonPhoneNo] = useState("");
    const [contactPersonEmail, setcontactPersonEmail] = useState("");
    const [bankName, setBankName] = useState("");
    const [bankBranch, setBankBranch] = useState("");
    const [bankAccountNo, setBankAccountNo] = useState("");
    const [status, setStatus] = useState(true);
    const [error, setError] = useState(null);

    const { id } = useParams();

    //*Dispaly current Reports details when component loads
    useEffect(() => {
        const fetchReport = async () => {
            const response = await fetch(`/api/Reports/${id}`);
            const json = await response.json();

            if (response.ok) {
                return json
            } else {
                setError(error)
                throw (error);
            }
        };

        fetchReport()
            .then(Report => {
                setCompanyName(Report.companyName);
                setCompanyPhoneNo(Report.companyPhoneNo);
                setBrNo(Report.brNo);
                setRawMaterial(Report.rawMaterial);
                setCompanyAddress(Report.companyAddress);
                setContactPersonName(Report.contactPersonName);
                setContactPersonPhoneNo(Report.contactPersonPhoneNo);
                setcontactPersonEmail(Report.contactPersonEmail);
                setBankName(Report.bankName);
                setBankBranch(Report.bankBranch);
                setBankAccountNo(Report.bankAccountNo);
                setStatus(Report.status)
            })
            .catch(error => console.log(error));
    }, []);

    return (
        <>
            <Header />
            <Sidebar />
            <main className="main" id="main">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="index.html">Home</a></li>
                    <li class="breadcrumb-item">Report Management</li>
                    <li class="breadcrumb-item">Update Report</li>
                </ol>
                <ReportForm
                    formName="Update "
                    buttonName="Update "
                    companyName={companyName}
                    companyPhoneNo={companyPhoneNo}
                    brNo={brNo}
                    rawMaterial={rawMaterial}
                    companyAddress={companyAddress}
                    contactPersonName={contactPersonName}
                    contactPersonPhoneNo={contactPersonPhoneNo}
                    contactPersonEmail={contactPersonEmail}
                    bankName={bankName}
                    bankBranch={bankBranch}
                    bankAccountNo={bankAccountNo}
                    status={status} 
                />
            </main>
        </>
    )
}

export default ReportDetails;