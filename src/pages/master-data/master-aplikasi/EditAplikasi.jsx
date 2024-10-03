import { showAlert } from '@/functions/alert/showAlert';
import { getData, postData, updateData } from '@/functions/api/api';
import PageTitle from '@/layouts/partials/PageTitle'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

export default function EditAplikasi() {
        const { id_user } = useParams();
        const navigate = useNavigate();
        const [loading, setLoading] = useState(false);
        const [data, setData] = useState({
                name: '',
                phone: '',
                email: '',
                idPerson: '',
                username: '',
                userType: '',
                avatar: null
        });

        const [previewImage, setPreviewImage] = useState('media/avatars/blank.png');

        const fetchData = async () => {
                if (!id_user) return;

                try {
                        const response = await getData(`users/${id_user}`);

                        if (response?.success) {
                                setData({
                                        name: response.data[0].nama_lengkap ?? '',
                                        phone: response.data[0].no_hp ?? '',
                                        email: response.data[0].email ?? '',
                                        username: response.data[0].username ?? '',
                                        userType: response.data[0].jenis_user ?? '',
                                        idPerson: response.data[0].id_person ?? '',
                                        avatar: response.data[0].avatar ?? ''
                                })
                        } else {
                                console.error("Failed to fetch menu: ", response.message);
                        }
                } catch (error) {
                        console.error("Error fetching menu: ", error);
                }
        };

        const handleChange = (e) => {
                const { name, value, type, files } = e.target;
                if (type === 'file') {
                        if (files && files[0]) {
                                setData({
                                        ...data,
                                        [name]: files[0],
                                });
                                setPreviewImage(URL.createObjectURL(files[0]));
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

        const handleSubmit = async () => {
                setLoading(true); // Set loading to true at the start
                try {
                        // Prepare the data for submission
                        const payload = {
                                Nama_Lengkap: data.name,
                                Id_Person: data.idPerson,
                                Jenis_User: data.userType,
                                No_Hp: data.phone,
                                Username: data.username,
                                Email: data.email,
                                Avatar: data.avatar,
                        };

                        // Make the POST request
                        const response = await updateData(`users/${id_user}`, payload, true);

                        if (response.success) {
                                showAlert('success', 'Success!', 'User edited successfully.');
                                navigate('/master_user');
                        } else {
                                showAlert('error', 'Error!', response.message || 'Failed to create user.');
                        }
                } catch (error) {
                        console.error("Error submitting data:", error);
                        showAlert('error', 'Error!', 'An unexpected error occurred. Please try again.');
                } finally {
                        setLoading(false);
                }
        };

        useEffect(() => {
                setLoading(true)
                fetchData();
                setLoading(false);
        }, [])
        if (loading) {
                return (<di>Loading....</di>)
        }
        return (
                <>
                        <PageTitle title='Tambah User' />
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
                                                <div className="card-body grid gap-5">
                                                        <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
                                                                <label className="form-label max-w-56">
                                                                        Photo
                                                                </label>
                                                                <div className="flex items-center justify-between flex-wrap grow gap-2.5">
                                                                        <span className="text-2sm font-medium text-gray-600">
                                                                                150x150px JPEG, PNG Image
                                                                        </span>
                                                                        <input type='file' name='avatar' onChange={handleChange} />
                                                                        <img src={data.avatar ? previewImage : '/media/avatars/blank.png'} className='size-16 image-input-placeholder rounded-full border-2 border-success image-input-empty:border-gray-300' />
                                                                </div>
                                                        </div>
                                                        <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
                                                                <label className="form-label max-w-56">
                                                                        Nama Lengkap
                                                                </label>
                                                                <input className="input" type="text" name="name" placeholder='Nama Lengkap' value={data.name} onChange={handleChange} />
                                                        </div>
                                                        <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
                                                                <label className="form-label max-w-56">
                                                                        No. HP
                                                                </label>
                                                                <input className="input" name="phone" placeholder="Nomor Handphone" type="text" value={data.phone} onChange={handleChange} />
                                                        </div>
                                                        <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
                                                                <label className="form-label max-w-56">
                                                                        Email
                                                                </label>
                                                                <input className="input" type="text" name="email" placeholder='Email' value={data.email} onChange={handleChange} />
                                                        </div>
                                                        <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
                                                                <label className="form-label max-w-56">
                                                                        Username
                                                                </label>
                                                                <input className="input" type="text" name="username" placeholder='Username' value={data.username} onChange={handleChange} />
                                                        </div>
                                                        <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
                                                                <label className="form-label max-w-56">
                                                                        Jenis User
                                                                </label>
                                                                <select className="select" name="userType" value={data.userType} onChange={handleChange}>
                                                                        <option value=''>
                                                                                Pilih Jenis User
                                                                        </option>
                                                                        <option value='Dosen'>
                                                                                Dosen
                                                                        </option>
                                                                        <option value='Mahasiswa'>
                                                                                Mahasiswa
                                                                        </option>
                                                                        <option value='Perseptor'>
                                                                                Perseptor
                                                                        </option>
                                                                        <option value='Tenaga Pendidik'>
                                                                                Tenaga Pendidik
                                                                        </option>
                                                                        <option value='Orang Tua'>
                                                                                Orang Tua
                                                                        </option>
                                                                </select>
                                                        </div>
                                                        <div className="flex justify-end">
                                                                <button className="btn btn-primary" onClick={handleSubmit}>
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
                                        </div>
                                </div>
                        </div>
                </>
        )
}
