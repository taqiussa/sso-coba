import React, { useEffect, useState } from 'react';
import { getData, updateData } from '@/functions/api/api';
import PageTitle from '@/layouts/partials/PageTitle';
import { showAlert } from '@/functions/alert/showAlert';
import InputText from '@/components/InputText';
import { Link, useParams } from 'react-router-dom';

export default function EditGroup() {
        const { id_master_aplikasi, id_master_group } = useParams();

        const [data, setData] = useState({
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
                        const response = await updateData(`mstgroupakses/${id_master_group}`, data);
                        if (response.success === true) {
                                showAlert({
                                        icon: 'success',
                                        title: 'Success!',
                                        text: 'Group updated successfully.'
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

        const fetchData = async () => {
                setLoading(true);
                try {
                        const response = await getData(`mstgroupakses/detail/${id_master_group}`);
                        if (response.success) {
                                setData({
                                        nama_group: response.data[0].nama_group ?? null,
                                        deskripsi: response.data[0].deskripsi ?? null,
                                });
                        }
                } catch (err) {
                        console.error('Error fetching data:', err);
                } finally {
                        setLoading(false);
                }
        };

        useEffect(() => {
                if (id_master_group !== '') {
                        fetchData();
                }
        }, [id_master_group])

        return (
                <>
                        <PageTitle title="Edit Group" />
                        <div className="container-fixed">
                                <h1 className="text-xl font-semibold leading-none text-gray-900 mb-3">
                                        Edit Group
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
                                                                                Update
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
