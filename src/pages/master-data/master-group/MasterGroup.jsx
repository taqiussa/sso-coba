import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { deleteData, getData, postData, updateData } from '@/functions/api/api';
import PageTitle from '@/layouts/partials/PageTitle';
import { showAlert } from '@/functions/alert/showAlert';
import Loading from '@/components/Loading';
import { queryURL } from '@/functions/utils/utils';
import ListAplikasi from '@/components/ListAplikasi';
import { Link, useParams } from 'react-router-dom';

export default function MasterGroup() {
        const {id_master_aplikasi} = useParams();
        const [data, setData] = useState({
                id_master_aplikasi: id_master_aplikasi ?? '',
        })

        const [dataQuery, setDataQuery] = useState({
                limit: 10,
                offset: 0,
                order: '',
                filter: '',
        });

        const [dataTable, setDataTable] = useState([]);
        const [totalData, setTotalData] = useState(0);
        const [isLoading, setIsLoading] = useState(false);
        const [debouncedFilter, setDebouncedFilter] = useState(dataQuery.filter);
        const [listAplikasi, setListAplikasi] = useState([]);

        const handleChange = (e) => {
                setData({
                        ...data,
                        [e.target.name]: e.target.value,
                });
        };

        const handleChangeQuery = (e) => {
                setDataQuery({
                        ...dataQuery,
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
                                        await deleteData(`mstgroupakses/${id_master_group}`);
                                        showAlert({
                                                icon: 'success',
                                                title: 'Success!',
                                                text: 'Group deleted successfully.'
                                        });

                                        fetchData();
                                } catch (error) {
                                        showAlert({
                                                icon: 'error',
                                                title: 'Error!',
                                                text: 'Failed to delete groupS.'
                                        });
                                }
                        },
                });
        };

        const fetchData = async () => {
                setIsLoading(true);
                try {
                        const response = await getData(`mstgroupakses/${data.id_master_aplikasi}?${queryURL(dataQuery)}`);
                        setDataTable(response.data.data);
                        setTotalData(response.data.recordsTotal);
                } catch (err) {
                        console.error('Error fetching data:', err);
                } finally {
                        setIsLoading(false);
                }
        };

        const fetchAllAplikasi = async () => {
                setIsLoading(true);
                try {
                        const response = await getData(`masterapps/?limit=100&offset=0&order=&filter=`);
                        if (response.success) {
                                setListAplikasi(response.data.data);
                        }
                } catch (err) {
                        console.error('Error fetching data:', err);
                } finally {
                        setIsLoading(false);
                }
        };

        useEffect(() => {
                fetchAllAplikasi();
        }, []);

        useEffect(() => {
                const timer = setTimeout(() => {
                        setDebouncedFilter(dataQuery.filter);
                }, 500);

                return () => {
                        clearTimeout(timer);
                };
        }, [dataQuery.filter]);

        useEffect(() => {
                if (data.id_master_aplikasi != '') {
                        fetchData();
                }
        }, [data.id_master_aplikasi, dataQuery.limit, dataQuery.offset, dataQuery.order, debouncedFilter]);

        const columns = [
                {
                        name: 'Set Akses',
                        selector: row => <Link to={`/set_akses_group/${data.id_master_aplikasi}/${row.id_master_group}`} className='btn btn-sm btn-info' children='Set Akses' />
                },
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
                        name: 'Aksi',
                        cell: row =>
                                <div className="flex gap-3">
                                        {/* <button className="btn btn-sm btn-warning">Edit</button> */}
                                        <button
                                                className="btn btn-sm btn-danger"
                                                onClick={() => handleDelete(row.id_master_group)}>Hapus</button>
                                </div>
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
                                </div>
                                <div className="card pb-2.5">
                                        <div className="grid gap-5 lg:gap-7.5">
                                                <div className="card-body grid gap-5">
                                                        <ListAplikasi
                                                                name='id_master_aplikasi'
                                                                value={data.id_master_aplikasi}
                                                                onChange={handleChange}
                                                                listAplikasi={listAplikasi}
                                                        />
                                                        <div className="flex justify-end">
                                                                <Link to={`/create_group/${data.id_master_aplikasi}`} className="btn btn-primary" children='Tambah Group' />
                                                        </div>
                                                </div>
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
