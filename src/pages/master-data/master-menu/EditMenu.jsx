import React, { useEffect, useState } from 'react';
import { getData, updateData } from '@/functions/api/api';
import PageTitle from '@/layouts/partials/PageTitle';
import { showAlert } from '@/functions/alert/showAlert';
import InputText from '@/components/InputText';
import { Link, useParams } from 'react-router-dom';

export default function EditMenu() {
        const { id_master_aplikasi, id_master_menu } = useParams();
        const [data, setData] = useState({
                nama_menu: '',
                deskripsi: '',
                order: '',
                icon: '',
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
                        const response = await updateData(`mstmenu/${id_master_menu}`, data);
                        if (response.success === true) {
                                showAlert({
                                        icon: 'success',
                                        title: 'Success!',
                                        text: 'Menu updated successfully.'
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
                try {
                        const response = await getData(`mstmenu/detail/${id_master_menu}`);

                        setData({
                                nama_menu: response.data[0].nama_menu ?? null,
                                deskripsi: response.data[0].deskripsi ?? null,
                                order: response.data[0].order ?? null,
                                icon: response.data[0].icon ?? null
                        });

                } catch (err) {
                        console.error('Error fetching data:', err);
                } finally {
                        setLoading(false);
                }
        };

        useEffect(() => {
                if (id_master_menu != '') {
                        fetchData();
                }
        }, [id_master_menu]);

        return (
                <>
                        <PageTitle title="Edit Menu" />
                        <div className="container-fixed">
                                <div className="flex flex-wrap items-center justify-between gap-5 pb-7.5">
                                        <div className="flex flex-col justify-center gap-2">
                                                <h1 className="text-xl font-semibold text-gray-900">Edit Menu</h1>
                                                <Link className="btn btn-sm btn-light" to={`/create_menu/${id_master_aplikasi}`}>
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
