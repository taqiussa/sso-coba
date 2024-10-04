import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { deleteData, getData, postData, updateData } from '@/functions/api/api';
import PageTitle from '@/layouts/partials/PageTitle';
import { Link } from 'react-router-dom';
import { showAlert } from '@/functions/alert/showAlert';
import Loading from '@/components/Loading';
import { queryURL } from '@/functions/utils/utils';
import InputText from '@/components/InputText';
import ListAplikasi from '@/components/ListAplikasi';
import select from '@/metronic/core/plugins/components/select';

export default function MasterGroup() {
        const [data, setData] = useState({
                id_master_aplikasi: '',
                nama_group: '',
                deskripsi: '',
        })

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
        const [loadingUpdate, setLoadingUpdate] = useState(false);
        const [debouncedFilter, setDebouncedFilter] = useState(dataQuery.filter);
        const [listAplikasi, setListAplikasi] = useState([]);
        const [editingRow, setEditingRow] = useState(null);
        const [editedData, setEditedData] = useState({});

        const handleEditClick = (row) => {
                console.log(row);
                setEditingRow(row.id_master_group);
                setEditedData(row);
        };


        const handleChangeEdit = (e) => {
                setEditedData({
                        ...editedData,
                        [e.target.name]: e.target.value,
                });
        };


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

        const handleUpdate = async (e) => {
                e.preventDefault();
                setLoadingUpdate(true);
                try {
                        const response = await updateData(`mstgroupakses/${editingRow}`, editedData);
                        if (response.success === true) {
                                showAlert({
                                        icon: 'success',
                                        title: 'Success!',
                                        text: 'Group created successfully.'
                                });
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
                        setLoadingUpdate(false);
                        setEditingRow(null);
                }
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

        const handleSubmit = async (e) => {
                e.preventDefault();
                setLoading(true);
                try {
                        const response = await postData('mstgroupakses', data);
                        if (response.success === true) {
                                showAlert({
                                        icon: 'success',
                                        title: 'Success!',
                                        text: 'Group created successfully.'
                                });
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
                        selector: row => <button className='btn btn-sm btn-info' children='Set Akses' />
                },
                {
                        name: 'Nama Group',
                        selector: row => editingRow === row.id_master_group ? (
                                <input
                                        type="text"
                                        name="nama_group"
                                        value={editedData.nama_group || ''}
                                        onChange={handleChangeEdit}
                                        className="input"
                                />
                        ) : (
                                row.nama_group
                        ),
                        sortable: true,
                },
                {
                        name: 'Deskripsi',
                        selector: row => editingRow === row.id_master_group ? (
                                <input
                                        type="text"
                                        name="deskripsi"
                                        value={editedData.deskripsi || ''}
                                        onChange={handleChangeEdit}
                                        className="input"
                                />
                        ) : (
                                row.deskripsi
                        ),
                        sortable: true,
                },
                {
                        name: 'Aksi',
                        cell: row => editingRow === row.id_master_group ? (
                                <form onSubmit={handleUpdate} className="flex gap-3">
                                        <div>
                                                <button type='submit' className="btn btn-sm btn-success">
                                                        Update
                                                        {
                                                                loadingUpdate &&
                                                                <div className={`${loadingUpdate ? 'inline-flex' : 'hidden'}`}>
                                                                        <i class="ki-filled ki-arrows-circle animate-spin"></i>
                                                                </div>
                                                        }
                                                </button>
                                        </div>
                                        <div>
                                                <button onClick={() => setEditingRow(null)} className="btn btn-sm btn-secondary">Batal</button>
                                        </div>
                                </form>
                        ) : (
                                <div className="flex gap-3">
                                        <button onClick={() => handleEditClick(row)} className="btn btn-sm btn-warning">Edit</button>
                                        <button
                                                className="btn btn-sm btn-danger"
                                                onClick={() => handleDelete(row.id_master_group)}>Hapus</button>
                                </div>
                        ),
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
                                                <form onSubmit={handleSubmit}>
                                                        <div className="card-body grid gap-5">
                                                                <ListAplikasi
                                                                        name='id_master_aplikasi'
                                                                        value={data.id_master_aplikasi}
                                                                        onChange={handleChange}
                                                                        listAplikasi={listAplikasi}
                                                                />

                                                                <InputText
                                                                        label='Nama Group'
                                                                        name='nama_group'
                                                                        value={data.nama_group}
                                                                        onChange={handleChange}
                                                                        required
                                                                />
                                                                <InputText
                                                                        label='Deskripsi'
                                                                        name='deskripsi'
                                                                        value={data.deskripsi}
                                                                        onChange={handleChange}
                                                                        required
                                                                />
                                                                <div className="flex justify-end">
                                                                        <button className="btn btn-primary">
                                                                                Simpan
                                                                                {
                                                                                        loading &&
                                                                                        <div className={`${loading ? 'inline-flex' : 'hidden'}`}>
                                                                                                <i class="ki-filled ki-arrows-circle animate-spin"></i>
                                                                                        </div>
                                                                                }
                                                                        </button>
                                                                </div>
                                                        </div>
                                                </form>
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
