import React, { useState } from 'react';
import { postData } from '@/functions/api/api';
import PageTitle from '@/layouts/partials/PageTitle';
import { showAlert } from '@/functions/alert/showAlert';
import InputText from '@/components/InputText';
import { Link, useParams } from 'react-router-dom';

export default function CreateGroup() {
        const { id_master_aplikasi } = useParams();

        const [data, setData] = useState({
                id_master_aplikasi: id_master_aplikasi,
                nama_group: '',
                deskripsi: '',
        })

        const [loading, setLoading] = useState(false);

        const handleChange = (e) => {
                setData({
                        ...data,
                        [e.target.name]: e.target.value,
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

        return (
                <>
                        <PageTitle title="Create Group" />
                        <div className="container-fixed">
                                <h1 className="text-xl font-semibold leading-none text-gray-900 mb-3">
                                        Tambah Group
                                </h1>
                                <Link className="btn btn-sm btn-light" to={`/master_group/${id_master_aplikasi}`}>
                                        <i className="ki-filled ki-black-left-line"></i>
                                        <div>
                                                Kembali
                                        </div>
                                </Link>
                                <div className="card py-3 my-3">
                                        <div className="grid gap-5 lg:gap-7.5">
                                                <form onSubmit={handleSubmit}>
                                                        <div className="card-body grid gap-5">
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
                                                                        <button type='submit' className="btn btn-primary">
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
                        </div>
                </>
        );
}
