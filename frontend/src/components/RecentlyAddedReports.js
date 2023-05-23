import React, { useEffect, useState } from "react";

const moment = require("moment");

function RecentlyAddedReports() {

    const [data, setData] = useState();
    const [error, setError] = useState();
    let count = 0;

    useEffect(() => {

        const getRecentlyAdded = async () => {
            const respone = await fetch('/api/Reports/get/recently-added');
            const json = await respone.json();

            if (respone.ok) {
                setData(json);
            }

            if (!respone.ok) {
                setError(json.error);
            }
        }

        getRecentlyAdded();
    }, [])

    return (
        <>
            <h1>Recently added reports</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">User Name</th>
                        <th scope="col">Category</th>
                        <th scope="col">Date Added</th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.map(
                        Report =>
                            <tr key={Report._id}>
                                <th scope="row">{++count}</th>
                                <td>{Report.userName}</td>
                                <td>{Report.typeOfLitter}</td>
                                <td>{moment(Report.createdAt).format("YYYY-MM-DD")}</td>
                            </tr>
                    )}
                </tbody>
            </table>
        </>

    )
}

export default RecentlyAddedReports;