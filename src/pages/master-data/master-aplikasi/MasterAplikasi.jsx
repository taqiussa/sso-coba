import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { deleteData, getData } from '@/functions/api/api';
import PageTitle from '@/layouts/partials/PageTitle';
import { Link, useLocation } from 'react-router-dom';
import { showAlert } from '@/functions/alert/showAlert';
import Loading from '@/components/Loading';

export default function MasterAplikasi() {
        const location = useLocation();
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

        const handleDelete = async (id_master_aplikasi) => {
                showAlert({
                        icon: 'warning',
                        title: 'Anda Yakin?',
                        text: 'Menghapus Data Aplikasi.',
                        confirm: true,
                        onConfirm: async () => {
                                try {
                                        await deleteData(`masterapps/${id_master_aplikasi}`);
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

                        const response = await getData(`masterapps?${queryURL.toString()}`);
                        setDataTable(response.data.data);
                        setTotalData(response.data.recordsTotal);
                } catch (err) {
                        console.error('Error fetching data:', err);
                } finally {
                        setIsLoading(false);
                }
        };

        const columns = () => {
                let column = [
                        {
                                name: 'Nama Aplikasi',
                                selector: row => row.nama_aplikasi,
                                sortable: true,
                        },
                        {
                                name: 'Deskripsi',
                                selector: row => row.deskripsi,
                                sortable: true,
                        },
                        {
                                name: 'image',
                                selector: row => row.image,
                                sortable: true,
                        },
                        {
                                name: 'URL',
                                selector: row => row.url,
                        },
                        {
                                name: 'Versi',
                                selector: row => row.versi_aplikasi,
                        },

                ];

                if (location.pathname.includes('master_menu')) {
                        column = [
                                {
                                        name: 'Menu',
                                        cell: row => <Link to={`/create_menu/${row.id_master_aplikasi}`} children='Menu' className='btn btn-info btn-sm' />
                                },
                                ...column
                        ]
                }
                else if (location.pathname.includes('master_aplikasi')) {
                        column = [
                                ...column,
                                {
                                        name: 'Aksi',
                                        cell: row =>
                                                <div className='gap-5 flex items-center justify-center'>
                                                        <div>
                                                                <Link to={`/edit_aplikasi/${row.id_master_aplikasi}`} className="btn btn-sm btn-warning">Edit</Link>
                                                        </div>
                                                        <div>
                                                                <button
                                                                        className="btn btn-sm btn-danger"
                                                                        onClick={() => handleDelete(row.id_master_aplikasi)}>Hapus</button>
                                                        </div>
                                                </div>
                                },
                        ]
                }

                return column;
        }

        return (
                <>
                        {
                                location.pathname.includes('master_aplikasi') ?
                                        <PageTitle title="Master Aplikasi" />
                                        :
                                        <PageTitle title="Master Menu" />
                        }
                        <div className="container-fixed">
                                <div className="flex flex-wrap items-center justify-between gap-5 pb-7.5">
                                        <div className="flex flex-col justify-center gap-2">
                                                {
                                                        location.pathname.includes('master_aplikasi') ?
                                                                <h1 className="text-xl font-semibold text-gray-900">Master Aplikasi</h1>
                                                                :
                                                                <h1 className="text-xl font-semibold text-gray-900">Master Menu</h1>
                                                }
                                        </div>
                                        {
                                                location.pathname.includes('master_aplikasi') &&
                                                <div className="flex items-center gap-2.5">
                                                        <Link className="btn btn-sm btn-primary" to="/create_aplikasi">
                                                                Tambah Aplikasi
                                                        </Link>
                                                </div>
                                        }
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
                                                                                placeholder="Search apps"
                                                                                type="text"
                                                                                value={data.filter}
                                                                                onChange={handleChange}
                                                                        />
                                                                </label>
                                                        </div>
                                                </div>
                                                <div className="card-body">
                                                        <DataTable
                                                                columns={columns()}
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
