import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { deleteData, getData, postData, updateData } from '@/functions/api/api';
import PageTitle from '@/layouts/partials/PageTitle';
import { showAlert } from '@/functions/alert/showAlert';
import Loading from '@/components/Loading';
import { queryURL } from '@/functions/utils/utils';
import { Link, useParams } from 'react-router-dom';

export default function SetAksesGroup() {
        const { id_master_aplikasi, id_master_group } = useParams();
        const [dataQuery, setDataQuery] = useState({
                limit: 10,
                offset: 0,
                order: '',
                filter: '',
        });

        const [dataTable, setDataTable] = useState([]);
        const [totalData, setTotalData] = useState(0);
        const [loading, setLoading] = useState(false);
        const [isLoading, setIsLoading] = useState(false);
        const [debouncedFilter, setDebouncedFilter] = useState(dataQuery.filter);

        const handleChangeQuery = (e) => {
                setDataQuery({
                        ...dataQuery,
                        [e.target.name]: e.target.value,
                });
        };


        const handleDelete = async (e, id_group_akses) => {
                e.preventDefault();
                setLoading(true);
                try {
                        const response = await deleteData(`groupakses/${id_group_akses}`);
                        if (response.success === true) {
                                // showAlert({
                                //         icon: 'success',
                                //         title: 'Success!',
                                //         text: 'Group created successfully.'
                                // });
                                fetchData();
                        } else {
                                showAlert({
                                        icon: 'error',
                                        title: 'Error!',
                                        text: Object.values(response.data)
                                                .map(message => `- ${message}`)
                                                .join('\n')
                                });
                        }
                } catch (error) {
                        showAlert({
                                icon: 'error',
                                title: 'Error!',
                                text: 'An unexpected error occurred. Please try again.'
                        });
                } finally {
                        setLoading(false);
                }
        };

        const handleSubmit = async (e, id_master_modul) => {
                e.preventDefault();
                setLoading(true);
                try {
                        const response = await postData('groupakses', { id_master_aplikasi, id_master_group, id_master_modul });
                        if (response.success === true) {
                                // showAlert({
                                //         icon: 'success',
                                //         title: 'Success!',
                                //         text: 'Group created successfully.'
                                // });
                                fetchData();
                        } else {
                                showAlert({
                                        icon: 'error',
                                        title: 'Error!',
                                        text: Object.values(response.data)
                                                .map(message => `- ${message}`)
                                                .join('\n')
                                });
                        }
                } catch (error) {
                        showAlert({
                                icon: 'error',
                                title: 'Error!',
                                text: 'An unexpected error occurred. Please try again.'
                        });
                } finally {
                        setLoading(false);
                }
        };



        const fetchData = async () => {
                setIsLoading(true);
                try {
                        const response = await getData(`mstgroupakses/modul/${id_master_aplikasi}/${id_master_group}?${queryURL(dataQuery)}`);
                        setDataTable(response.data.data);
                        setTotalData(response.data.recordsTotal);
                } catch (err) {
                        console.error('Error fetching data:', err);
                } finally {
                        setIsLoading(false);
                }
        };

        useEffect(() => {
                const timer = setTimeout(() => {
                        setDebouncedFilter(dataQuery.filter);
                }, 500);

                return () => {
                        clearTimeout(timer);
                };
        }, [dataQuery.filter]);

        useEffect(() => {
                fetchData();
        }, [dataQuery.limit, dataQuery.offset, dataQuery.order, debouncedFilter]);

        const columns = [
                {
                        name: 'Pilih',
                        selector: row =>
                                row.id_group_akses ?
                                        <button className='btn btn-success' children='ON' onClick={(e) => handleDelete(e, row.id_group_akses)} />
                                        :
                                        <button className='btn btn-danger' children='OFF' onClick={(e) => handleSubmit(e, row.id_master_modul)} />

                },
                {
                        name: 'Main Menu',
                        selector: row => row.nama_menu,
                        sortable: true,
                },
                {
                        name: 'Sub Menu',
                        selector: row => row.nama_modul,
                        sortable: true,
                },
                {
                        name: 'id group akses',
                        selector: row => row.id_group_akses,
                        sortable: true,
                },
        ];

        return (
                <>
                        <PageTitle title="Set Akses Group" />
                        <div className="container-fixed">
                                <div className="flex flex-wrap items-center justify-between gap-5 pb-7.5">
                                        <div className="flex flex-col justify-center gap-2">
                                                <h1 className="text-xl font-semibold text-gray-900">Set Akses Group</h1>
                                                <Link className="btn btn-sm btn-light" to="/master_group">
                                                        <i className="ki-filled ki-black-left-line"></i>
                                                        <div>
                                                                Kembali
                                                        </div>
                                                </Link>
                                        </div>
                                </div>
                                <div className="card card-grid min-w-full mt-5">
                                        <div className="card-header flex-wrap gap-2">
                                                <h3 className="card-title font-medium text-sm">
                                                        Showing {dataQuery.limit} of {totalData}
                                                </h3>
                                                <div className="flex">
                                                        <label className="input input-sm">
                                                                <i className="ki-filled ki-magnifier"></i>
                                                                <input
                                                                        name="filter"
                                                                        placeholder="Cari . . . "
                                                                        type="text"
                                                                        value={dataQuery.filter}
                                                                        onChange={handleChangeQuery}
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
                                                        onChangeRowsPerPage={(newLimit) => setDataQuery({ ...dataQuery, limit: newLimit })}
                                                        onChangePage={(page) => setDataQuery({ ...dataQuery, offset: page - 1 })}
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
                                                                                onClick={() => setDataQuery({ ...dataQuery, offset: 0 })}
                                                                                disabled={dataQuery.offset === 0}
                                                                        >
                                                                                Refresh Data
                                                                        </button>
                                                                </div>
                                                        </div>
                                                }
                                        </div>
                                </div>
                        </div>
                </>
        );
}
