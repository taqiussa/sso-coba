import { getData } from '@/functions/api/api';
import PageTitle from '@/layouts/partials/PageTitle';
import React, { useEffect, useState } from 'react'

export default function MasterUser() {
        const [data, setData] = useState([]);
        const [page, setPage] = useState(1);
        const [totalPages, setTotalPages] = useState(1);
        const [isLoading, setIsLoading] = useState(false);
        const [error, setError] = useState(null);

        useEffect(() => {
                fetchData();
        }, [page]);

        const fetchData = async () => {
                setIsLoading(true);
                setError(null);
                try {
                        const json = JSON.stringify({
                                "limit": 10,
                                "offset": 0,
                                "order": "",
                                "filter": "",
                        });

                        const response = await getData(`users/${json}`);

                        console.log(response);

                        // if (response && response.data && Array.isArray(response.data.records)) {
                        //         setData(response.data.records);
                        //         setTotalPages(response.data.totalPages);
                        // } else {
                        //         throw new Error('Invalid response format');
                        // }
                } catch (err) {
                        console.error('Error fetching data:', err);
                        if (err.message === 'Invalid JSON response from server') {
                                setError('The server returned an invalid response. Please try again or contact support.');
                        } else if (err.response && err.response.status === 401) {
                                setError('Authentication failed. Please log in again.');
                        } else {
                                setError('Failed to load data. Please try again later.');
                        }
                } finally {
                        setIsLoading(false);
                }
        };

        const handlePageChange = (newPage) => {
                setPage(newPage);
        };

        if (isLoading) {
                return <div className="text-center py-4">Loading...</div>;
        }

        return (
                <>
                        <PageTitle title='Master User' />
                        <div>
                                {/* <table className="table-auto">
                                        <thead>
                                                <tr>
                                                        <th>Status</th>
                                                        <th>IP Address</th>
                                                        <th>Last Session</th>
                                                        <th>Label</th>
                                                        <th>Method</th>
                                                </tr>
                                        </thead>
                                        <tbody>
                                                {data.map((item, index) => (
                                                        <tr key={index}>
                                                                <td><span className={`badge ${item.status}`}></span></td>
                                                                <td>{item.ipAddress}</td>
                                                                <td>{item.lastSession}</td>
                                                                <td>{item.label}</td>
                                                                <td>{item.method}</td>
                                                        </tr>
                                                ))}
                                        </tbody>
                                </table>
                                <div>
                                        <button disabled={page === 1} onClick={() => handlePageChange(page - 1)}>Previous</button>
                                        <span>Page {page} of {totalPages}</span>
                                        <button disabled={page === totalPages} onClick={() => handlePageChange(page + 1)}>Next</button>
                                </div> */}
                        </div>
                </>
        )
}
