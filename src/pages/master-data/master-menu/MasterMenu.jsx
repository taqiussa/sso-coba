import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { getData } from '@/functions/api/api';
import PageTitle from '@/layouts/partials/PageTitle';
import { Link } from 'react-router-dom';
import Loading from '@/components/Loading';
import { queryURL } from '@/functions/utils/utils';

export default function MasterMenu() {
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
                        const response = await getData(`masterapps?${queryURL(data)}`);
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
                        name: 'Menu',
                        selector: row => <Link children='Menu' className='btn btn-info' to={`/create_menu/${row.id_master_aplikasi}`} />
                },
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
        ];

        return (
                <>
                        <PageTitle title="Master Aplikasi" />
                        <div className="container-fixed">
                                <div className="flex flex-wrap items-center justify-between gap-5 pb-7.5">
                                        <div className="flex flex-col justify-center gap-2">
                                                <h1 className="text-xl font-semibold text-gray-900">Master Menu</h1>
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
