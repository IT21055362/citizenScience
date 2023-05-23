import React from "react";
import { Link } from "react-router-dom";
import Header from "../../../components/dashboard/Header";
import Sidebar from "../../../components/dashboard/Sidebar";
import ReportStatusTable from "../../../components/dashboard/ReportManagement/ReportStatusTable";
import html2Canvas from 'html2canvas';
import jsPDF from 'jspdf';


function ReportStatus() {

    const exportPdf = () => {
        const input = document.getElementById("report");
        html2Canvas(input, { scale: 2, logging: true, letterRendering: 1, useCORS: true })
            .then(
                canvas => {
                    const imgWidth = 297;
                    const imgHeight = canvas.height * imgWidth / canvas.width;
                    const imgData = canvas.toDataURL('img/svg');
                    const pdf = new jsPDF('l', 'mm', 'a4');
                    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
                    pdf.save('Raw Material Report Report.pdf')
                }
            )
    }
    return (
        <>
            <Header />
            <Sidebar />
            <main className="main" id="main">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="index.html">Home</a></li>
                    <li className="breadcrumb-item">Report Management</li>
                    <li className="breadcrumb-item">Reports</li>
                </ol>

                <div className="col-12 ">
                    <button className="btn btn-primary" style={{ float: "right" }} onClick={() => { exportPdf() }}><i class="bi bi-file-earmark-arrow-down-fill"></i> Download </button>
                    <div style={{ padding: "100px" }} id="report">
                    <ReportStatusTable />
                    </div>
                </div>
            </main>
        </>
    )
}

export default ReportStatus;