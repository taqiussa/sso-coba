import InputText from '@/components/InputText';
import { showAlert } from '@/functions/alert/showAlert';
import { getData, updateData } from '@/functions/api/api';
import PageTitle from '@/layouts/partials/PageTitle'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

export default function EditAplikasi() {
        const { id_master_aplikasi } = useParams();
        const navigate = useNavigate();
        const [loading, setLoading] = useState(false);
        const [data, setData] = useState({
                nama_aplikasi: '',
                deskripsi: '',
                url: '',
                tgl_version: '',
                versi_aplikasi: '',
                image: null
        });

        const [previewImage, setPreviewImage] = useState('media/avatars/blank.png');

        const fetchData = async () => {
                if (!id_master_aplikasi) return;

                try {
                        const response = await getData(`masterapps/${id_master_aplikasi}`);

                        if (response?.success) {
                                setData({
                                        nama_aplikasi: response.data[0].nama_aplikasi ?? '',
                                        deskripsi: response.data[0].deskripsi ?? '',
                                        url: response.data[0].url ?? '',
                                        tgl_version: response.data[0].tgl_version ?? '',
                                        versi_aplikasi: response.data[0].versi_aplikasi ?? '',
                                        image: response.data[0].image ?? ''
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
                setLoading(true);
                try {

                        const response = await updateData(`users/${id_master_aplikasi}`, data, true);

                        if (response.success === true) {
                                showAlert({
                                        icon: 'success',
                                        title: 'Success!',
                                        text: 'Apps edited successfully.'
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
                        <PageTitle title='Tambah Aplikasi' />
                        <h1 className="text-xl font-semibold leading-none text-gray-900 mb-3">
                                Master Aplikasi
                        </h1>
                        <Link className="btn btn-sm btn-light" to="/master_aplikasi">
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
                                                                Tambah Aplikasi
                                                        </h3>
                                                </div>
                                                <div className="card-body grid gap-5">
                                                        <InputText
                                                                label='Nama Aplikasi'
                                                                name='nama_aplikasi'
                                                                value={data.nama_aplikasi}
                                                                onChange={handleChange}
                                                                required={true}
                                                        />
                                                        <InputText
                                                                label='Deskripsi'
                                                                name='deskripsi'
                                                                value={data.deskripsi}
                                                                onChange={handleChange}
                                                                required={true}
                                                        />
                                                        <InputText
                                                                label='URL'
                                                                name='url'
                                                                value={data.url}
                                                                onChange={handleChange}
                                                                required={true}
                                                        />
                                                        <InputText
                                                                label='Tanggal Versi'
                                                                name='tgl_version'
                                                                type='date'
                                                                value={data.tgl_version}
                                                                onChange={handleChange}
                                                                required={true}
                                                        />
                                                        <InputText
                                                                label='Versi'
                                                                name='versi_aplikasi'
                                                                value={data.versi_aplikasi}
                                                                onChange={handleChange}
                                                                required={true}
                                                        />
                                                        <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
                                                                <label className="form-label max-w-56">
                                                                        Photo
                                                                </label>
                                                                <div className="flex items-center justify-between flex-wrap grow gap-2.5">
                                                                        <span className="text-2sm font-medium text-gray-600">
                                                                                150x150px JPEG, PNG Image (max : 500kb)
                                                                        </span>
                                                                        <input type='file' name='image' onChange={handleChange} />
                                                                        <img src={data.image ? previewImage : '/media/avatars/blank.png'} className='size-16 image-input-placeholder rounded-full border-2 border-success image-input-empty:border-gray-300' />
                                                                </div>
                                                        </div>
                                                        <div className="flex justify-end gap-5">
                                                                <Link
                                                                        className='btn btn-secondary'
                                                                        to='/master_aplikasi'
                                                                        children='Batal'
                                                                />
                                                                
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
