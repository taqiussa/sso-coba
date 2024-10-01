import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { deleteData, getData } from '@/functions/api/api';
import PageTitle from '@/layouts/partials/PageTitle';
import { Link } from 'react-router-dom';
import { showAlert } from '@/functions/alert/showAlert';

export default function MasterUser() {
        const [dataTable, setDataTable] = useState([]);
        const [data, setData] = useState({
                limit: 10,
                offset: 0,
                order: '',
                filter: '',
        });
        const [totalData, setTotalData] = useState(0);
        const [isLoading, setIsLoading] = useState(false);

        const handleChange = (e) => {
                setData({
                        ...data,
                        [e.target.name]: e.target.value,
                });
        };

        const handleDelete = async (id_user) => {
                showAlert({
                        icon: 'warning',
                        title: 'Are you sure?',
                        text: 'This action will delete the user.',
                        confirm: true,
                        onConfirm: async () => {
                                try {
                                        await deleteData(`users/${id_user}`);
                                        fetchData();
                                } catch (error) {
                                        showAlert('error', 'Error!', 'Failed to delete user.');
                                }
                        },
                });
        };

        useEffect(() => {
                fetchData();
        }, [data.limit, data.offset, data.filter, data.order]);

        const fetchData = async () => {
                setIsLoading(true);
                try {
                        const queryURL = new URLSearchParams({
                                limit: data.limit,
                                offset: data.offset,
                                order: data.order,
                                filter: data.filter,
                        });

                        const response = await getData(`users/?${queryURL.toString()}`);
                        setDataTable(response.data.data);
                        setTotalData(response.data.recordsTotal);
                } catch (err) {
                        console.error('Error fetching data:', err);
                } finally {
                        setIsLoading(false);
                }
        };

        const columns = [
                {
                        name: 'Nama Lengkap',
                        selector: row => row.nama_lengkap,
                        sortable: true,
                },
                {
                        name: 'Email',
                        selector: row => row.email,
                        sortable: true,
                },
                {
                        name: 'Username',
                        selector: row => row.username,
                        sortable: true,
                },
                {
                        name: 'Avatar',
                        selector: row => row.avatar,
                },
                {
                        name: 'Edit',
                        cell: row => <Link to={`/edit-user/${row.id_user}`} className="btn btn-sm btn-warning">Edit</Link>,
                },
                {
                        name: 'Hapus',
                        cell: row => <button
                                className="btn btn-sm btn-danger"
                                onClick={() => handleDelete(row.id_user)}>Hapus</button>,
                },
        ];

        return (
                <>
                        <PageTitle title="Master User" />
                        <div className="container-fixed">
                                <div className="flex flex-wrap items-center justify-between gap-5 pb-7.5">
                                        <div className="flex flex-col justify-center gap-2">
                                                <h1 className="text-xl font-semibold text-gray-900">Master User</h1>
                                                <div className="flex items-center gap-1.5 font-medium">
                                                        <span className="text-md text-gray-600">Total User:</span>
                                                        <span className="text-md text-gray-800 font-semibold me-2">
                                                                {totalData}
                                                        </span>
                                                </div>
                                        </div>
                                        <div className="flex items-center gap-2.5">
                                                {/* <a className="btn btn-sm btn-light" href="#">
                                                        Import Data
                                                </a> */}
                                                <Link className="btn btn-sm btn-primary" to="/create-user">
                                                        Tambah User
                                                </Link>
                                        </div>
                                </div>
                        </div>
                        <div className="container-fixed">
                                <div className="grid gap-5 lg:gap-7.5">
                                        <div className="card card-grid min-w-full">
                                                <div className="card-header flex-wrap gap-2">
                                                        <h3 className="card-title font-medium text-sm">
                                                                Showing {data.limit} of {totalData}
                                                        </h3>
                                                        <div className="flex">
                                                                <label className="input input-sm">
                                                                        <i className="ki-filled ki-magnifier"></i>
                                                                        <input
                                                                                name="filter"
                                                                                placeholder="Search users"
                                                                                type="text"
                                                                                value={data.filter}
                                                                                onChange={handleChange}
                                                                        />
                                                                </label>
                                                        </div>
                                                </div>
                                                <div className="card-body">
                                                        <DataTable
                                                                columns={columns}
                                                                data={dataTable ?? []}
                                                                progressPending={isLoading}
                                                                progressComponent={
                                                                        <div className='flex flex-col items-center justify-center gap-3'>
                                                                                <i class="ki-filled ki-arrows-circle animate-spin text-4xl"></i>
                                                                                Memuat Data . . .
                                                                        </div>

                                                                }
                                                                pagination
                                                                paginationServer
                                                                paginationTotalRows={totalData}
                                                                paginationRowsPerPageOptions={[10, 25, 50, 100]}
                                                                onChangeRowsPerPage={(newLimit) => setData({ ...data, limit: newLimit })}
                                                                onChangePage={(page) => setData({ ...data, offset: page - 1 })}
                                                                noDataComponent={null}
                                                        />
                                                        {
                                                                !dataTable &&
                                                                <div className="flex justify-center my-7">
                                                                        <button
                                                                                className="btn btn-secondary"
                                                                                onClick={() => setData({ ...data, offset: 0 })}
                                                                                disabled={data.offset === 0}
                                                                        >
                                                                                Refresh Data
                                                                        </button>
                                                                </div>
                                                        }
                                                </div>
                                        </div>
                                </div>
                        </div>
                </>
        );
}
