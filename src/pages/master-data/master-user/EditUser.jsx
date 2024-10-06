import InputText from '@/components/InputText';
import JenisUser from '@/components/JenisUser';
import Loading from '@/components/Loading';
import { showAlert } from '@/functions/alert/showAlert';
import { getData, updateData } from '@/functions/api/api';
import { avatarUrl } from '@/functions/config/env';
import PageTitle from '@/layouts/partials/PageTitle'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

export default function EditUser() {
        const { id_user } = useParams();
        const [loading, setLoading] = useState(false);
        const [data, setData] = useState({
                nama_lengkap: '',
                no_hp: '',
                email: '',
                username: '',
                jenis_user: '',
                id_person: '31afd140-3834-4ff1-a68c-d2457cf9879e',
                avatar: null
        });

        const [previewImage, setPreviewImage] = useState('media/avatars/blank.png');

        const handleChange = (e) => {
                const { name, value, type, files } = e.target;
                const maxSize = 500 * 1024;

                if (type === 'file') {
                        if (files && files[0]) {
                                const file = files[0];

                                if (file.size > maxSize) {
                                        showAlert({ icon: 'error', title: 'Max. Size', text: 'File size exceeds the 500KB limit.' });
                                        return;
                                }

                                setData({
                                        ...data,
                                        [name]: file,
                                });

                                console.log(data);

                                setPreviewImage(URL.createObjectURL(file));
                        } else {
                                console.log("No file selected or file input is empty");
                        }
                } else {
                        setData({
                                ...data,
                                [name]: value
                        });
                }
        };

        const handleSubmit = async (e) => {
                e.preventDefault();
                setLoading(true);
                try {
                        const response = await updateData(`users/${id_user}`, data);
                        if (response.success === true) {
                                showAlert({
                                        icon: 'success',
                                        title: 'Success!',
                                        text: 'User edited successfully.'
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
                        console.error("Error submitting data:", error);
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
                if (!id_user) return;

                try {
                        setLoading(true);
                        const response = await getData(`users/${id_user}`);

                        if (response?.success) {
                                if (response.data[0].avatar !== null || response.data[0].avatar !== '') {
                                        setPreviewImage(`${avatarUrl}${response.data[0].avatar}`)
                                }
                                setData({
                                        nama_lengkap: response.data[0].nama_lengkap ?? '',
                                        no_hp: response.data[0].no_hp ?? '',
                                        email: response.data[0].email ?? '',
                                        username: response.data[0].username ?? '',
                                        jenis_user: response.data[0].jenis_user ?? '',
                                        id_person: response.data[0].id_person ?? '',
                                        avatar: response.data[0].avatar ?? ''
                                });
                        } else {
                                console.error("Failed to fetch menu: ", response.message);
                        }
                } catch (error) {
                        console.error("Error fetching menu: ", error);
                } finally {
                        setLoading(false);
                }
        };

        useEffect(() => {
                fetchData();
        }, []);

        if (loading) {
                return <Loading />
        }

        return (
                <>
                        <PageTitle title='Edit User' />
                        <h1 className="text-xl font-semibold leading-none text-gray-900 mb-3">
                                Master User
                        </h1>
                        <Link className="btn btn-sm btn-light" to="/master_user">
                                <i className="ki-filled ki-black-left-line"></i>
                                <div>
                                        Kembali
                                </div>
                        </Link>
                        <div className="container-fixed mt-5">
                                <div className="">
                                        <div className="card pb-2.5">
                                                <div className="card-header" id="basic_settings">
                                                        <h3 className="card-title">
                                                                Edit User
                                                        </h3>
                                                </div>
                                                <form onSubmit={handleSubmit}>
                                                        <div className="card-body grid gap-5">
                                                                <InputText
                                                                        label='Nama Lengkap'
                                                                        name='nama_lengkap'
                                                                        value={data.nama_lengkap}
                                                                        onChange={handleChange}
                                                                        required={true}
                                                                />
                                                                <InputText
                                                                        label='No. Hp'
                                                                        name='no_hp'
                                                                        type='number'
                                                                        value={data.no_hp}
                                                                        onChange={handleChange}
                                                                        required={true}
                                                                />
                                                                <InputText
                                                                        label='Email'
                                                                        name='email'
                                                                        type='email'
                                                                        value={data.email}
                                                                        onChange={handleChange}
                                                                        required={true}
                                                                />
                                                                <InputText
                                                                        label='Username'
                                                                        name='username'
                                                                        value={data.username}
                                                                        onChange={handleChange}
                                                                        required={true}
                                                                />
                                                                <JenisUser
                                                                        name='jenis_user'
                                                                        value={data.jenis_user}
                                                                        onChange={handleChange}
                                                                        required={true}
                                                                />
                                                                <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
                                                                        <label className="form-label max-w-56">
                                                                                Photo
                                                                        </label>
                                                                        <div className="flex items-center justify-between flex-wrap grow gap-2.5">
                                                                                <span className="text-2sm font-medium text-gray-600">
                                                                                        150x150px JPEG, PNG Image
                                                                                </span>
                                                                                <input type='file' name='avatar' onChange={handleChange} />
                                                                                <img src={previewImage} className='size-16 image-input-placeholder rounded-full border-2 border-success image-input-empty:border-gray-300' />
                                                                        </div>
                                                                </div>
                                                                <div className="flex justify-end gap-2">
                                                                        <Link className="btn btn-secondary" to="/master_user">
                                                                                Batal
                                                                        </Link>

                                                                        <button className="btn btn-primary" type='submit'>
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
                        </div >
                </>
        )
}
