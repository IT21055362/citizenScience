import React, { useEffect, useRef, useState } from "react";

import Header from "../../../components/dashboard/Header";

import ReportTable from "../../../components/dashboard/ReportManagement/ReportTable";
import Sidebar from "../../../components/dashboard/Sidebar";
import SearchBar from "../../../components/dashboard/ReportManagement/SearchBar";
import { Link } from "react-router-dom";

function Reports() {

    const isMounted = useRef(false);

    const [Reports, setReports] = useState(null);
    const [filteredReports, setFilteredReports] = useState(null);
    const [searchTerm, setSearchTerm] = useState(null);
    const [searchCategory, setSearchCategory] = useState("");
    const [error, setError] = useState(null);

    useEffect(() => {

        const fetchAllReports = async () => {
            const response = await fetch("/api/Reports");
            const json = await response.json();

            if (response.ok) {
                setReports(json);
                setFilteredReports(Reports);
            } else {
                setError(json.error);
                console.log(error);
            }
        };

        fetchAllReports();

    }, [])

    useEffect(() => {

        if (isMounted.current) {
            const handleSearch = (data) => {

                let term;

                if (searchTerm !== null) {
                    term = searchTerm.replace(/[^a-zA-Z0-9_ \d]/, '');
                }


                //const term = searchTerm;


                const regExp = new RegExp(term, "i");
                //*If search category is company name
                if (searchCategory === "comName") {
                    if (data) {
                        const filteredReports = data.filter(data => data.companyName.match(regExp));
                        setFilteredReports(filteredReports);
                    }
                }//*If search category is raw material
                else if (searchCategory === "rawMaterial") {
                    if (data) {
                        const filteredReports = data.filter(data => data.rawMaterial.match(regExp));
                        setFilteredReports(filteredReports);
                    }
                }
            }
            handleSearch(Reports);

        }
        else {
            isMounted.current = true;
        }
    }, [searchCategory, searchTerm]);

    //* Get search term from Search Bar Component
    const getSearchTerm = (data) => {
        setSearchTerm(data)
    }

    //* Get search category from Search Bar Component
    const getSearchCategory = (data) => {
        setSearchCategory(data);
    }

    return (
        <>
            <Header />
            <Sidebar />
            <main className="main" id="main">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="index.html">Home</a></li>
                    <li className="breadcrumb-item">Report list</li>
                </ol>

                <Link to={{ pathname: '/add-Report' }}><button className="btn btn-primary" style={{ float: "right" }}><i className="bi bi-person-plus-fill"></i><span style={{ margin: "0 10px", color: "#FFF" }}>Add Report</span></button></Link>
                <SearchBar
                    searchTerm={getSearchTerm}
                    searchCategory={getSearchCategory}
                />
             
                <ReportTable
                    Reports={searchTerm === "" ? Reports : filteredReports}
                    searchCategory={searchCategory}
                />
            </main>
        </>
    )
}

export default Reports;