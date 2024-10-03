import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { deleteData, getData } from '@/functions/api/api';
import PageTitle from '@/layouts/partials/PageTitle';
import { Link } from 'react-router-dom';
import { showAlert } from '@/functions/alert/showAlert';
import Loading from '@/components/Loading';

export default function MasterGroup() {
        const [dataTable, setDataTable] = useState([]);
        const [data, setData] = useState({
                limit: 10,
                offset: 0,
                order: '',
                filter: '',
        });
        const [totalData, setTotalData] = useState(0);
        const [isLoading, setIsLoading] = useState(false);
        const [debouncedFilter, setDebouncedFilter] = useState(data.filter);

        const handleChange = (e) => {
                setData({
                        ...data,
                        [e.target.name]: e.target.value,
                });
        };

        const handleDelete = async (id_master_group) => {
                showAlert({
                        icon: 'warning',
                        title: 'Anda Yakin?',
                        text: 'Menghapus Data Group.',
                        confirm: true,
                        onConfirm: async () => {
                                try {
                                        await deleteData(`mstgroupakses/e627ce87-ce12-4fe1-aebb-a833de6faeb5/${id_master_group}`);
                                        fetchData();
                                } catch (error) {
                                        showAlert({
                                                icon: 'error',
                                                title: 'Error!',
                                                text: 'Failed to delete user.'
                                        });
                                }
                        },
                });
        };

        useEffect(() => {
                const timer = setTimeout(() => {
                        setDebouncedFilter(data.filter);
                }, 500);

                return () => {
                        clearTimeout(timer);
                };
        }, [data.filter]);

        useEffect(() => {
                fetchData();
        }, [data.limit, data.offset, data.order, debouncedFilter]);

        const fetchData = async () => {
                setIsLoading(true);
                try {
                        const queryURL = new URLSearchParams({
                                limit: data.limit,
                                offset: data.offset,
                                order: data.order,
                                filter: data.filter,
                        });

                        const response = await getData(`mstgroupakses/99da12ac-6f5a-4012-b51b-1c21aadf4787?${queryURL.toString()}`);
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
                        name: 'Nama Group',
                        selector: row => row.nama_group,
                        sortable: true,
                },
                {
                        name: 'Deskripsi',
                        selector: row => row.deskripsi,
                        sortable: true,
                },
                {
                        name: 'ID Master Group',
                        selector: row => row.id_master_group,
                        sortable: true,
                },
                {
                        name: 'ID Master Aplikasi',
                        selector: row => row.id_master_aplikasi,
                },
                {
                        name: 'Edit',
                        cell: row => <Link to={`/edit-group/${row.id_user}`} className="btn btn-sm btn-warning">Edit</Link>,
                },
                {
                        name: 'Hapus',
                        cell: row => <button
                                className="btn btn-sm btn-danger"
                                onClick={() => handleDelete(row.id_master_group)}>Hapus</button>,
                },
        ];

        return (
                <>
                        <PageTitle title="Master Group" />
                        <div className="container-fixed">
                                <div className="flex flex-wrap items-center justify-between gap-5 pb-7.5">
                                        <div className="flex flex-col justify-center gap-2">
                                                <h1 className="text-xl font-semibold text-gray-900">Master Group</h1>
                                        </div>
                                        <div className="flex items-center gap-2.5">
                                                {/* <a className="btn btn-sm btn-light" href="#">
                                                        Import Data
                                                </a> */}
                                                {/* <Link className="btn btn-sm btn-primary" to="/create-user">
                                                        Tambah Group
                                                </Link> */}
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
                                                                progressComponent={<Loading />}
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
                                                                <div className="flex flex-col items-center justify-center my-7">
                                                                        <div className='text-slate-400'>
                                                                                No Data Available.
                                                                        </div>
                                                                        <div>
                                                                                <button
                                                                                        className="btn btn-secondary"
                                                                                        onClick={() => setData({ ...data, offset: 0 })}
                                                                                        disabled={data.offset === 0}
                                                                                >
                                                                                        Refresh Data
                                                                                </button>
                                                                        </div>
                                                                </div>
                                                        }
                                                </div>
                                        </div>
                                </div>
                        </div>
                </>
        );
}
