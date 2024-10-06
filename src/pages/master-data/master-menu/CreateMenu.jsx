import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { deleteData, getData, postData } from '@/functions/api/api';
import PageTitle from '@/layouts/partials/PageTitle';
import { showAlert } from '@/functions/alert/showAlert';
import Loading from '@/components/Loading';
import { queryURL } from '@/functions/utils/utils';
import InputText from '@/components/InputText';
import { Link, useParams } from 'react-router-dom';

export default function CreateMenu() {
        const { id_master_aplikasi } = useParams();
        const [data, setData] = useState({
                id_master_aplikasi: id_master_aplikasi,
                nama_menu: '',
                deskripsi: '',
                order: '',
                icon: '',
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
        const [debouncedFilter, setDebouncedFilter] = useState(dataQuery.filter);

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

        const handleDelete = async (id_master_menu) => {
                showAlert({
                        icon: 'warning',
                        title: 'Anda Yakin?',
                        text: 'Menghapus Data Menu.',
                        confirm: true,
                        onConfirm: async () => {
                                try {
                                        await deleteData(`mstmenu/${id_master_menu}`);
                                        showAlert({
                                                icon: 'success',
                                                title: 'Success!',
                                                text: 'Menu deleted successfully.'
                                        });

                                        fetchData();
                                } catch (error) {
                                        showAlert({
                                                icon: 'error',
                                                title: 'Error!',
                                                text: 'Failed to delete menu.'
                                        });
                                }
                        },
                });
        };

        const handleSubmit = async (e) => {
                e.preventDefault();
                setLoading(true);
                try {
                        const response = await postData('mstmenu', data);
                        if (response.success === true) {
                                showAlert({
                                        icon: 'success',
                                        title: 'Success!',
                                        text: 'Menu created successfully.'
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
                        const response = await getData(`mstmenu/${data.id_master_aplikasi}?${queryURL(dataQuery)}`);
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
                if (data.id_master_aplikasi != '') {
                        fetchData();
                }
        }, [data.id_master_aplikasi, dataQuery.limit, dataQuery.offset, dataQuery.order, debouncedFilter]);

        const columns = [
                {
                        name: 'Sub Menu',
                        selector: row => <Link to={`/set_akses_group/${data.id_master_aplikasi}/${row.id_master_group}`} className='btn btn-sm btn-info' children='Sub Menu' />
                },
                {
                        name: 'Nama Menu',
                        selector: row => row.nama_menu,
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
                                        <button className="btn btn-sm btn-warning">Edit</button>
                                        <button
                                                className="btn btn-sm btn-danger"
                                                onClick={() => handleDelete(row.id_master_menu)}>Hapus</button>
                                </div>
                        ,
                },
        ];

        return (
                <>
                        <PageTitle title="Master Menu" />
                        <div className="container-fixed">
                                <div className="flex flex-wrap items-center justify-between gap-5 pb-7.5">
                                        <div className="flex flex-col justify-center gap-2">
                                                <h1 className="text-xl font-semibold text-gray-900">Master Menu</h1>
                                                <Link className="btn btn-sm btn-light" to="/master_menu">
                                                        <i className="ki-filled ki-black-left-line"></i>
                                                        <div>
                                                                Kembali
                                                        </div>
                                                </Link>
                                        </div>
                                </div>
                                <div className="card pb-2.5">
                                        <div className="grid gap-5 lg:gap-7.5">
                                                <form onSubmit={handleSubmit}>
                                                        <div className="card-body grid gap-5">
                                                                <InputText
                                                                        label='Nama Menu'
                                                                        name='nama_menu'
                                                                        value={data.nama_menu}
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
                                                                <InputText
                                                                        label='Order'
                                                                        name='order'
                                                                        value={data.order}
                                                                        onChange={handleChange}
                                                                        required
                                                                />
                                                                <InputText
                                                                        label='Icon'
                                                                        name='icon'
                                                                        value={data.icon}
                                                                        onChange={handleChange}
                                                                        required
                                                                />
                                                                <div className="flex justify-end">
                                                                        <button className="btn btn-primary">
                                                                                Tambah
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
