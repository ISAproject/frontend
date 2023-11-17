import React, { useEffect, useState } from 'react';
import { GetCompanyById } from "../../services/CompanyService";


function CompanyComponent() {
    const [companyData, setCompanyData] = useState({
        id: 0,
        name: "",
        address: "",
        description: "",
        avgGrade: 0,
        equipemntsFree: [],
        administrators: []
    });

    useEffect(() => {
        console.log('Fetching company data...');
        GetCompanyById(1)
            .then((res) => {
                console.log(res)
                setCompanyData(res.data)})
            .catch((error) => console.error('Error fetching company data:', error));
    }, []);

    console.log(companyData);

    return (
        <>
            <h1>Company</h1>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Description</th>
                        <th>Average grade</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{companyData.name}</td>
                        <td>{companyData.address}</td>
                        <td>{companyData.description}</td>
                        <td>{companyData.avgGrade}</td>
                    </tr>
                </tbody>
            </table>
        </>
    );
}

export default CompanyComponent;