import InputText from '@/components/InputText';
import { showAlert } from '@/functions/alert/showAlert';
import { postData } from '@/functions/api/api';
import PageTitle from '@/layouts/partials/PageTitle'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function CreateAplikasi() {
        const [loading, setLoading] = useState(false);
        const [data, setData] = useState({
                nama_aplikasi: '',
                deskripsi: '',
                url: '',
                tgl_version: '',
                versi_aplikasi: '',
                image: '',
        });

        const [previewImage, setPreviewImage] = useState('media/avatars/blank.png');

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

                        const response = await postData('masterapps/', data);

                        if (response.success) {
                                showAlert({ icon: 'success', title: 'Success!', text: 'Apps created successfully.' });
                        } else {
                                showAlert({ icon: 'error', title: 'Error!', text: response.message || 'Failed to create apps.' });
                        }
                } catch (error) {
                        console.error("Error submitting data:", error);
                        showAlert({ icon: 'error', title: 'Error!', text: 'An unexpected error occurred. Please try again.' });
                } finally {
                        setLoading(false);
                }
        };

        return (
                <>
                        <PageTitle title='Tambah Aplikasi' />
                        <h1 className="text-xl font-semibold leading-none text-gray-900 mb-3">
                                Master Aplikasi
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
                                                                                150x150px JPEG, PNG Image
                                                                        </span>
                                                                        <input type='file' name='image' onChange={handleChange} />
                                                                        <img src={data.image ? previewImage : '/media/avatars/blank.png'} className='size-16 image-input-placeholder rounded-full border-2 border-success image-input-empty:border-gray-300' />
                                                                </div>
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
