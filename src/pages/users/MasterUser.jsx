import { getData } from '@/functions/api/api';
import PageTitle from '@/layouts/partials/PageTitle';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export default function MasterUser() {
        const [data, setData] = useState([]);
        const [page, setPage] = useState(1);
        const [totalPages, setTotalPages] = useState(1);
        const [isLoading, setIsLoading] = useState(false);
        const [error, setError] = useState(null);

        useEffect(() => {
                fetchData();
        }, [page]);

        const fetchData = async () => {
                setIsLoading(true);
                setError(null);
                try {
                        const json = JSON.stringify({
                                "limit": 10,
                                "offset": 0,
                                "order": "",
                                "filter": "",
                        });

                        const response = await getData(`users/${json}`);

                        console.log(response);

                        // if (response && response.data && Array.isArray(response.data.records)) {
                        //         setData(response.data.records);
                        //         setTotalPages(response.data.totalPages);
                        // } else {
                        //         throw new Error('Invalid response format');
                        // }
                } catch (err) {
                        console.error('Error fetching data:', err);
                        if (err.message === 'Invalid JSON response from server') {
                                setError('The server returned an invalid response. Please try again or contact support.');
                        } else if (err.response && err.response.status === 401) {
                                setError('Authentication failed. Please log in again.');
                        } else {
                                setError('Failed to load data. Please try again later.');
                        }
                } finally {
                        setIsLoading(false);
                }
        };

        const handlePageChange = (newPage) => {
                setPage(newPage);
        };

        if (isLoading) {
                return <div className="text-center py-4">Loading...</div>;
        }

        return (
                <>
                        <PageTitle title='Master User' />
                        <div>
                                <div>
                                        <div className="container-fixed">
                                                <div className="flex flex-wrap items-center lg:items-end justify-between gap-5 pb-7.5">
                                                        <div className="flex flex-col justify-center gap-2">
                                                                <h1 className="text-xl font-semibold leading-none text-gray-900">
                                                                        Master User
                                                                </h1>
                                                                <div className="flex items-center flex-wrap gap-1.5 font-medium">
                                                                        <span className="text-md text-gray-600">
                                                                                Total User:
                                                                        </span>
                                                                        <span className="text-md gray-800 font-semibold me-2">
                                                                                49,053
                                                                        </span>
                                                                </div>
                                                        </div>
                                                        <div className="flex items-center gap-2.5">
                                                                <a className="btn btn-sm btn-light" href="#">
                                                                        Import Data
                                                                </a>
                                                                <Link className="btn btn-sm btn-primary" to="/create-user">
                                                                        Tambah User
                                                                </Link>
                                                        </div>
                                                </div>
                                        </div>
                                        <div className="container-fixed">
                                                <div className="grid gap-5 lg:gap-7.5">
                                                        <div className="card card-grid min-w-full">
                                                                <div className="card-header flex-wrap gap-2">
                                                                        <h3 className="card-title font-medium text-sm">
                                                                                Showing 10 of 49,053 users
                                                                        </h3>
                                                                        <div className="flex flex-wrap gap-2 lg:gap-5">
                                                                                <div className="flex">
                                                                                        <label className="input input-sm">
                                                                                                <i className="ki-filled ki-magnifier">
                                                                                                </i>
                                                                                                <input placeholder="Search users" type="text" defaultValue />
                                                                                        </label>
                                                                                </div>
                                                                                <div className="flex flex-wrap gap-2.5">
                                                                                        <select className="select select-sm w-28">
                                                                                                <option value={1}>
                                                                                                        Active
                                                                                                </option>
                                                                                                <option value={2}>
                                                                                                        Disabled
                                                                                                </option>
                                                                                                <option value={2}>
                                                                                                        Pending
                                                                                                </option>
                                                                                        </select>
                                                                                        <select className="select select-sm w-28">
                                                                                                <option value={1}>
                                                                                                        Latest
                                                                                                </option>
                                                                                                <option value={2}>
                                                                                                        Older
                                                                                                </option>
                                                                                                <option value={3}>
                                                                                                        Oldest
                                                                                                </option>
                                                                                        </select>
                                                                                        <button className="btn btn-sm btn-outline btn-primary">
                                                                                                <i className="ki-filled ki-setting-4">
                                                                                                </i>
                                                                                                Filters
                                                                                        </button>
                                                                                </div>
                                                                        </div>
                                                                </div>
                                                                <div className="card-body">
                                                                        <div data-datatable="true" data-datatable-page-size={10}>
                                                                                <div className="scrollable-x-auto">
                                                                                        <table className="table table-auto table-border" data-datatable-table="true">
                                                                                                <thead>
                                                                                                        <tr>
                                                                                                                <th className="w-[60px] text-center">
                                                                                                                        <input className="checkbox checkbox-sm" data-datatable-check="true" type="checkbox" />
                                                                                                                </th>
                                                                                                                <th className="min-w-[200px]">
                                                                                                                        <span className="sort asc">
                                                                                                                                <span className="sort-label text-gray-700 font-normal">
                                                                                                                                        Nama Lengkap
                                                                                                                                </span>
                                                                                                                                <span className="sort-icon">
                                                                                                                                </span>
                                                                                                                        </span>
                                                                                                                </th>
                                                                                                                <th className="min-w-[250px]">
                                                                                                                        <span className="sort">
                                                                                                                                <span className="sort-label text-gray-700 font-normal">
                                                                                                                                        Kode Pengguna
                                                                                                                                </span>
                                                                                                                                <span className="sort-icon">
                                                                                                                                </span>
                                                                                                                        </span>
                                                                                                                </th>
                                                                                                                <th className="min-w-[190px]">
                                                                                                                        <span className="sort">
                                                                                                                                <span className="sort-label text-gray-700 font-normal">
                                                                                                                                        Username
                                                                                                                                </span>
                                                                                                                                <span className="sort-icon">
                                                                                                                                </span>
                                                                                                                        </span>
                                                                                                                </th>
                                                                                                                <th className="min-w-[190px]">
                                                                                                                        <span className="sort">
                                                                                                                                <span className="sort-label text-gray-700 font-normal">
                                                                                                                                        Edit
                                                                                                                                </span>
                                                                                                                                <span className="sort-icon">
                                                                                                                                </span>
                                                                                                                        </span>
                                                                                                                </th>
                                                                                                                <th className="min-w-[190px]">
                                                                                                                        <span className="sort">
                                                                                                                                <span className="sort-label">
                                                                                                                                        Hapus
                                                                                                                                </span>
                                                                                                                                <span className="sort-icon">
                                                                                                                                </span>
                                                                                                                        </span>
                                                                                                                </th>
                                                                                                                <th className="w-[60px]">
                                                                                                                </th>
                                                                                                        </tr>
                                                                                                </thead>
                                                                                                <tbody>
                                                                                                        <tr>
                                                                                                                <td className="text-center">
                                                                                                                        <input className="checkbox checkbox-sm" data-datatable-row-check="true" type="checkbox" defaultValue={1} />
                                                                                                                </td>
                                                                                                                <td>
                                                                                                                        <div className="flex items-center gap-2.5">
                                                                                                                                <img className="rounded-full size-7 shrink-0" src="assets/media/avatars/300-3.png" />
                                                                                                                                <a className="text-sm font-medium text-gray-900 hover:text-primary-active" href="#">
                                                                                                                                        Tyler Hero
                                                                                                                                </a>
                                                                                                                        </div>
                                                                                                                </td>
                                                                                                                <td>
                                                                                                                        <div className="flex items-center gap-1.5 text-gray-800 font-normal">
                                                                                                                                <i className="ki-filled ki-chrome">
                                                                                                                                </i>
                                                                                                                                Chrome on Mac OS X
                                                                                                                        </div>
                                                                                                                </td>
                                                                                                                <td className="text-gray-800 font-normal">
                                                                                                                        234.0.155.191
                                                                                                                </td>
                                                                                                                <td>
                                                                                                                        <div className="flex items-center gap-1.5 text-gray-800 font-normal">
                                                                                                                                <img className="rounded-full size-4 shrink-0" src="assets/media/flags/estonia.svg" />
                                                                                                                                Estonia
                                                                                                                        </div>
                                                                                                                </td>
                                                                                                                <td className="text-gray-800 font-normal">
                                                                                                                        Current session
                                                                                                                </td>
                                                                                                                <td>
                                                                                                                        <div className="menu" data-menu="true">
                                                                                                                                <div className="menu-item" data-menu-item-offset="0, 10px" data-menu-item-placement="bottom-end" data-menu-item-toggle="dropdown" data-menu-item-trigger="click|lg:click">
                                                                                                                                        <button className="menu-toggle btn btn-sm btn-icon btn-light btn-clear">
                                                                                                                                                <i className="ki-filled ki-dots-vertical">
                                                                                                                                                </i>
                                                                                                                                        </button>
                                                                                                                                        <div className="menu-dropdown menu-default w-full max-w-[175px]" data-menu-dismiss="true">
                                                                                                                                                <div className="menu-item">
                                                                                                                                                        <a className="menu-link" href="#">
                                                                                                                                                                <span className="menu-icon">
                                                                                                                                                                        <i className="ki-filled ki-search-list">
                                                                                                                                                                        </i>
                                                                                                                                                                </span>
                                                                                                                                                                <span className="menu-title">
                                                                                                                                                                        View
                                                                                                                                                                </span>
                                                                                                                                                        </a>
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-item">
                                                                                                                                                        <a className="menu-link" href="#">
                                                                                                                                                                <span className="menu-icon">
                                                                                                                                                                        <i className="ki-filled ki-file-up">
                                                                                                                                                                        </i>
                                                                                                                                                                </span>
                                                                                                                                                                <span className="menu-title">
                                                                                                                                                                        Export
                                                                                                                                                                </span>
                                                                                                                                                        </a>
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-separator">
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-item">
                                                                                                                                                        <a className="menu-link" href="#">
                                                                                                                                                                <span className="menu-icon">
                                                                                                                                                                        <i className="ki-filled ki-pencil">
                                                                                                                                                                        </i>
                                                                                                                                                                </span>
                                                                                                                                                                <span className="menu-title">
                                                                                                                                                                        Edit
                                                                                                                                                                </span>
                                                                                                                                                        </a>
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-item">
                                                                                                                                                        <a className="menu-link" href="#">
                                                                                                                                                                <span className="menu-icon">
                                                                                                                                                                        <i className="ki-filled ki-copy">
                                                                                                                                                                        </i>
                                                                                                                                                                </span>
                                                                                                                                                                <span className="menu-title">
                                                                                                                                                                        Make a copy
                                                                                                                                                                </span>
                                                                                                                                                        </a>
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-separator">
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-item">
                                                                                                                                                        <a className="menu-link" href="#">
                                                                                                                                                                <span className="menu-icon">
                                                                                                                                                                        <i className="ki-filled ki-trash">
                                                                                                                                                                        </i>
                                                                                                                                                                </span>
                                                                                                                                                                <span className="menu-title">
                                                                                                                                                                        Remove
                                                                                                                                                                </span>
                                                                                                                                                        </a>
                                                                                                                                                </div>
                                                                                                                                        </div>
                                                                                                                                </div>
                                                                                                                        </div>
                                                                                                                </td>
                                                                                                        </tr>
                                                                                                        <tr>
                                                                                                                <td className="text-center">
                                                                                                                        <input className="checkbox checkbox-sm" data-datatable-row-check="true" type="checkbox" defaultValue={2} />
                                                                                                                </td>
                                                                                                                <td>
                                                                                                                        <div className="flex items-center gap-2.5">
                                                                                                                                <img className="rounded-full size-7 shrink-0" src="assets/media/avatars/300-23.png" />
                                                                                                                                <a className="text-sm font-medium text-gray-900 hover:text-primary-active" href="#">
                                                                                                                                        Jane Smith
                                                                                                                                </a>
                                                                                                                        </div>
                                                                                                                </td>
                                                                                                                <td>
                                                                                                                        <div className="flex items-center gap-1.5 text-gray-800 font-normal">
                                                                                                                                <i className="ki-filled ki-chrome">
                                                                                                                                </i>
                                                                                                                                Chrome on Windows 7
                                                                                                                        </div>
                                                                                                                </td>
                                                                                                                <td className="text-gray-800 font-normal">
                                                                                                                        70.218.212.162
                                                                                                                </td>
                                                                                                                <td>
                                                                                                                        <div className="flex items-center gap-1.5 text-gray-800 font-normal">
                                                                                                                                <img className="rounded-full size-4 shrink-0" src="assets/media/flags/malaysia.svg" />
                                                                                                                                Malaysia
                                                                                                                        </div>
                                                                                                                </td>
                                                                                                                <td className="text-gray-800 font-normal">
                                                                                                                        Week ago
                                                                                                                </td>
                                                                                                                <td>
                                                                                                                        <div className="menu" data-menu="true">
                                                                                                                                <div className="menu-item" data-menu-item-offset="0, 10px" data-menu-item-placement="bottom-end" data-menu-item-toggle="dropdown" data-menu-item-trigger="click|lg:click">
                                                                                                                                        <button className="menu-toggle btn btn-sm btn-icon btn-light btn-clear">
                                                                                                                                                <i className="ki-filled ki-dots-vertical">
                                                                                                                                                </i>
                                                                                                                                        </button>
                                                                                                                                        <div className="menu-dropdown menu-default w-full max-w-[175px]" data-menu-dismiss="true">
                                                                                                                                                <div className="menu-item">
                                                                                                                                                        <a className="menu-link" href="#">
                                                                                                                                                                <span className="menu-icon">
                                                                                                                                                                        <i className="ki-filled ki-search-list">
                                                                                                                                                                        </i>
                                                                                                                                                                </span>
                                                                                                                                                                <span className="menu-title">
                                                                                                                                                                        View
                                                                                                                                                                </span>
                                                                                                                                                        </a>
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-item">
                                                                                                                                                        <a className="menu-link" href="#">
                                                                                                                                                                <span className="menu-icon">
                                                                                                                                                                        <i className="ki-filled ki-file-up">
                                                                                                                                                                        </i>
                                                                                                                                                                </span>
                                                                                                                                                                <span className="menu-title">
                                                                                                                                                                        Export
                                                                                                                                                                </span>
                                                                                                                                                        </a>
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-separator">
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-item">
                                                                                                                                                        <a className="menu-link" href="#">
                                                                                                                                                                <span className="menu-icon">
                                                                                                                                                                        <i className="ki-filled ki-pencil">
                                                                                                                                                                        </i>
                                                                                                                                                                </span>
                                                                                                                                                                <span className="menu-title">
                                                                                                                                                                        Edit
                                                                                                                                                                </span>
                                                                                                                                                        </a>
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-item">
                                                                                                                                                        <a className="menu-link" href="#">
                                                                                                                                                                <span className="menu-icon">
                                                                                                                                                                        <i className="ki-filled ki-copy">
                                                                                                                                                                        </i>
                                                                                                                                                                </span>
                                                                                                                                                                <span className="menu-title">
                                                                                                                                                                        Make a copy
                                                                                                                                                                </span>
                                                                                                                                                        </a>
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-separator">
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-item">
                                                                                                                                                        <a className="menu-link" href="#">
                                                                                                                                                                <span className="menu-icon">
                                                                                                                                                                        <i className="ki-filled ki-trash">
                                                                                                                                                                        </i>
                                                                                                                                                                </span>
                                                                                                                                                                <span className="menu-title">
                                                                                                                                                                        Remove
                                                                                                                                                                </span>
                                                                                                                                                        </a>
                                                                                                                                                </div>
                                                                                                                                        </div>
                                                                                                                                </div>
                                                                                                                        </div>
                                                                                                                </td>
                                                                                                        </tr>
                                                                                                        <tr>
                                                                                                                <td className="text-center">
                                                                                                                        <input className="checkbox checkbox-sm" data-datatable-row-check="true" type="checkbox" defaultValue={3} />
                                                                                                                </td>
                                                                                                                <td>
                                                                                                                        <div className="flex items-center gap-2.5">
                                                                                                                                <img className="rounded-full size-7 shrink-0" src="assets/media/avatars/300-1.png" />
                                                                                                                                <a className="text-sm font-medium text-gray-900 hover:text-primary-active" href="#">
                                                                                                                                        Emma Johnson
                                                                                                                                </a>
                                                                                                                        </div>
                                                                                                                </td>
                                                                                                                <td>
                                                                                                                        <div className="flex items-center gap-1.5 text-gray-800 font-normal">
                                                                                                                                <i className="ki-filled ki-chrome">
                                                                                                                                </i>
                                                                                                                                Chrome on Mac OS X
                                                                                                                        </div>
                                                                                                                </td>
                                                                                                                <td className="text-gray-800 font-normal">
                                                                                                                        140.92.152.213
                                                                                                                </td>
                                                                                                                <td>
                                                                                                                        <div className="flex items-center gap-1.5 text-gray-800 font-normal">
                                                                                                                                <img className="rounded-full size-4 shrink-0" src="assets/media/flags/ukraine.svg" />
                                                                                                                                Ukraine
                                                                                                                        </div>
                                                                                                                </td>
                                                                                                                <td className="text-gray-800 font-normal">
                                                                                                                        Today, 9:53 am
                                                                                                                </td>
                                                                                                                <td>
                                                                                                                        <div className="menu" data-menu="true">
                                                                                                                                <div className="menu-item" data-menu-item-offset="0, 10px" data-menu-item-placement="bottom-end" data-menu-item-toggle="dropdown" data-menu-item-trigger="click|lg:click">
                                                                                                                                        <button className="menu-toggle btn btn-sm btn-icon btn-light btn-clear">
                                                                                                                                                <i className="ki-filled ki-dots-vertical">
                                                                                                                                                </i>
                                                                                                                                        </button>
                                                                                                                                        <div className="menu-dropdown menu-default w-full max-w-[175px]" data-menu-dismiss="true">
                                                                                                                                                <div className="menu-item">
                                                                                                                                                        <a className="menu-link" href="#">
                                                                                                                                                                <span className="menu-icon">
                                                                                                                                                                        <i className="ki-filled ki-search-list">
                                                                                                                                                                        </i>
                                                                                                                                                                </span>
                                                                                                                                                                <span className="menu-title">
                                                                                                                                                                        View
                                                                                                                                                                </span>
                                                                                                                                                        </a>
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-item">
                                                                                                                                                        <a className="menu-link" href="#">
                                                                                                                                                                <span className="menu-icon">
                                                                                                                                                                        <i className="ki-filled ki-file-up">
                                                                                                                                                                        </i>
                                                                                                                                                                </span>
                                                                                                                                                                <span className="menu-title">
                                                                                                                                                                        Export
                                                                                                                                                                </span>
                                                                                                                                                        </a>
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-separator">
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-item">
                                                                                                                                                        <a className="menu-link" href="#">
                                                                                                                                                                <span className="menu-icon">
                                                                                                                                                                        <i className="ki-filled ki-pencil">
                                                                                                                                                                        </i>
                                                                                                                                                                </span>
                                                                                                                                                                <span className="menu-title">
                                                                                                                                                                        Edit
                                                                                                                                                                </span>
                                                                                                                                                        </a>
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-item">
                                                                                                                                                        <a className="menu-link" href="#">
                                                                                                                                                                <span className="menu-icon">
                                                                                                                                                                        <i className="ki-filled ki-copy">
                                                                                                                                                                        </i>
                                                                                                                                                                </span>
                                                                                                                                                                <span className="menu-title">
                                                                                                                                                                        Make a copy
                                                                                                                                                                </span>
                                                                                                                                                        </a>
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-separator">
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-item">
                                                                                                                                                        <a className="menu-link" href="#">
                                                                                                                                                                <span className="menu-icon">
                                                                                                                                                                        <i className="ki-filled ki-trash">
                                                                                                                                                                        </i>
                                                                                                                                                                </span>
                                                                                                                                                                <span className="menu-title">
                                                                                                                                                                        Remove
                                                                                                                                                                </span>
                                                                                                                                                        </a>
                                                                                                                                                </div>
                                                                                                                                        </div>
                                                                                                                                </div>
                                                                                                                        </div>
                                                                                                                </td>
                                                                                                        </tr>
                                                                                                        <tr>
                                                                                                                <td className="text-center">
                                                                                                                        <input className="checkbox checkbox-sm" data-datatable-row-check="true" type="checkbox" defaultValue={4} />
                                                                                                                </td>
                                                                                                                <td>
                                                                                                                        <div className="flex items-center gap-2.5">
                                                                                                                                <img className="rounded-full size-7 shrink-0" src="assets/media/avatars/300-14.png" />
                                                                                                                                <a className="text-sm font-medium text-gray-900 hover:text-primary-active" href="#">
                                                                                                                                        Michael Brown
                                                                                                                                </a>
                                                                                                                        </div>
                                                                                                                </td>
                                                                                                                <td>
                                                                                                                        <div className="flex items-center gap-1.5 text-gray-800 font-normal">
                                                                                                                                <i className="ki-filled ki-chrome">
                                                                                                                                </i>
                                                                                                                                Chrome on Windows 10
                                                                                                                        </div>
                                                                                                                </td>
                                                                                                                <td className="text-gray-800 font-normal">
                                                                                                                        214.219.147.46
                                                                                                                </td>
                                                                                                                <td>
                                                                                                                        <div className="flex items-center gap-1.5 text-gray-800 font-normal">
                                                                                                                                <img className="rounded-full size-4 shrink-0" src="assets/media/flags/canada.svg" />
                                                                                                                                Canada
                                                                                                                        </div>
                                                                                                                </td>
                                                                                                                <td className="text-gray-800 font-normal">
                                                                                                                        Current session
                                                                                                                </td>
                                                                                                                <td>
                                                                                                                        <div className="menu" data-menu="true">
                                                                                                                                <div className="menu-item" data-menu-item-offset="0, 10px" data-menu-item-placement="bottom-end" data-menu-item-toggle="dropdown" data-menu-item-trigger="click|lg:click">
                                                                                                                                        <button className="menu-toggle btn btn-sm btn-icon btn-light btn-clear">
                                                                                                                                                <i className="ki-filled ki-dots-vertical">
                                                                                                                                                </i>
                                                                                                                                        </button>
                                                                                                                                        <div className="menu-dropdown menu-default w-full max-w-[175px]" data-menu-dismiss="true">
                                                                                                                                                <div className="menu-item">
                                                                                                                                                        <a className="menu-link" href="#">
                                                                                                                                                                <span className="menu-icon">
                                                                                                                                                                        <i className="ki-filled ki-search-list">
                                                                                                                                                                        </i>
                                                                                                                                                                </span>
                                                                                                                                                                <span className="menu-title">
                                                                                                                                                                        View
                                                                                                                                                                </span>
                                                                                                                                                        </a>
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-item">
                                                                                                                                                        <a className="menu-link" href="#">
                                                                                                                                                                <span className="menu-icon">
                                                                                                                                                                        <i className="ki-filled ki-file-up">
                                                                                                                                                                        </i>
                                                                                                                                                                </span>
                                                                                                                                                                <span className="menu-title">
                                                                                                                                                                        Export
                                                                                                                                                                </span>
                                                                                                                                                        </a>
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-separator">
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-item">
                                                                                                                                                        <a className="menu-link" href="#">
                                                                                                                                                                <span className="menu-icon">
                                                                                                                                                                        <i className="ki-filled ki-pencil">
                                                                                                                                                                        </i>
                                                                                                                                                                </span>
                                                                                                                                                                <span className="menu-title">
                                                                                                                                                                        Edit
                                                                                                                                                                </span>
                                                                                                                                                        </a>
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-item">
                                                                                                                                                        <a className="menu-link" href="#">
                                                                                                                                                                <span className="menu-icon">
                                                                                                                                                                        <i className="ki-filled ki-copy">
                                                                                                                                                                        </i>
                                                                                                                                                                </span>
                                                                                                                                                                <span className="menu-title">
                                                                                                                                                                        Make a copy
                                                                                                                                                                </span>
                                                                                                                                                        </a>
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-separator">
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-item">
                                                                                                                                                        <a className="menu-link" href="#">
                                                                                                                                                                <span className="menu-icon">
                                                                                                                                                                        <i className="ki-filled ki-trash">
                                                                                                                                                                        </i>
                                                                                                                                                                </span>
                                                                                                                                                                <span className="menu-title">
                                                                                                                                                                        Remove
                                                                                                                                                                </span>
                                                                                                                                                        </a>
                                                                                                                                                </div>
                                                                                                                                        </div>
                                                                                                                                </div>
                                                                                                                        </div>
                                                                                                                </td>
                                                                                                        </tr>
                                                                                                        <tr>
                                                                                                                <td className="text-center">
                                                                                                                        <input className="checkbox checkbox-sm" data-datatable-row-check="true" type="checkbox" defaultValue={5} />
                                                                                                                </td>
                                                                                                                <td>
                                                                                                                        <div className="flex items-center gap-2.5">
                                                                                                                                <img className="rounded-full size-7 shrink-0" src="assets/media/avatars/300-19.png" />
                                                                                                                                <a className="text-sm font-medium text-gray-900 hover:text-primary-active" href="#">
                                                                                                                                        Chloe Davis
                                                                                                                                </a>
                                                                                                                        </div>
                                                                                                                </td>
                                                                                                                <td>
                                                                                                                        <div className="flex items-center gap-1.5 text-gray-800 font-normal">
                                                                                                                                <i className="ki-filled ki-chrome">
                                                                                                                                </i>
                                                                                                                                Chrome on iOS 14
                                                                                                                        </div>
                                                                                                                </td>
                                                                                                                <td className="text-gray-800 font-normal">
                                                                                                                        246.44.68.100
                                                                                                                </td>
                                                                                                                <td>
                                                                                                                        <div className="flex items-center gap-1.5 text-gray-800 font-normal">
                                                                                                                                <img className="rounded-full size-4 shrink-0" src="assets/media/flags/india.svg" />
                                                                                                                                India
                                                                                                                        </div>
                                                                                                                </td>
                                                                                                                <td className="text-gray-800 font-normal">
                                                                                                                        Month ago
                                                                                                                </td>
                                                                                                                <td>
                                                                                                                        <div className="menu" data-menu="true">
                                                                                                                                <div className="menu-item" data-menu-item-offset="0, 10px" data-menu-item-placement="bottom-end" data-menu-item-toggle="dropdown" data-menu-item-trigger="click|lg:click">
                                                                                                                                        <button className="menu-toggle btn btn-sm btn-icon btn-light btn-clear">
                                                                                                                                                <i className="ki-filled ki-dots-vertical">
                                                                                                                                                </i>
                                                                                                                                        </button>
                                                                                                                                        <div className="menu-dropdown menu-default w-full max-w-[175px]" data-menu-dismiss="true">
                                                                                                                                                <div className="menu-item">
                                                                                                                                                        <a className="menu-link" href="#">
                                                                                                                                                                <span className="menu-icon">
                                                                                                                                                                        <i className="ki-filled ki-search-list">
                                                                                                                                                                        </i>
                                                                                                                                                                </span>
                                                                                                                                                                <span className="menu-title">
                                                                                                                                                                        View
                                                                                                                                                                </span>
                                                                                                                                                        </a>
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-item">
                                                                                                                                                        <a className="menu-link" href="#">
                                                                                                                                                                <span className="menu-icon">
                                                                                                                                                                        <i className="ki-filled ki-file-up">
                                                                                                                                                                        </i>
                                                                                                                                                                </span>
                                                                                                                                                                <span className="menu-title">
                                                                                                                                                                        Export
                                                                                                                                                                </span>
                                                                                                                                                        </a>
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-separator">
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-item">
                                                                                                                                                        <a className="menu-link" href="#">
                                                                                                                                                                <span className="menu-icon">
                                                                                                                                                                        <i className="ki-filled ki-pencil">
                                                                                                                                                                        </i>
                                                                                                                                                                </span>
                                                                                                                                                                <span className="menu-title">
                                                                                                                                                                        Edit
                                                                                                                                                                </span>
                                                                                                                                                        </a>
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-item">
                                                                                                                                                        <a className="menu-link" href="#">
                                                                                                                                                                <span className="menu-icon">
                                                                                                                                                                        <i className="ki-filled ki-copy">
                                                                                                                                                                        </i>
                                                                                                                                                                </span>
                                                                                                                                                                <span className="menu-title">
                                                                                                                                                                        Make a copy
                                                                                                                                                                </span>
                                                                                                                                                        </a>
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-separator">
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-item">
                                                                                                                                                        <a className="menu-link" href="#">
                                                                                                                                                                <span className="menu-icon">
                                                                                                                                                                        <i className="ki-filled ki-trash">
                                                                                                                                                                        </i>
                                                                                                                                                                </span>
                                                                                                                                                                <span className="menu-title">
                                                                                                                                                                        Remove
                                                                                                                                                                </span>
                                                                                                                                                        </a>
                                                                                                                                                </div>
                                                                                                                                        </div>
                                                                                                                                </div>
                                                                                                                        </div>
                                                                                                                </td>
                                                                                                        </tr>
                                                                                                        <tr>
                                                                                                                <td className="text-center">
                                                                                                                        <input className="checkbox checkbox-sm" data-datatable-row-check="true" type="checkbox" defaultValue={6} />
                                                                                                                </td>
                                                                                                                <td>
                                                                                                                        <div className="flex items-center gap-2.5">
                                                                                                                                <img className="rounded-full size-7 shrink-0" src="assets/media/avatars/300-6.png" />
                                                                                                                                <a className="text-sm font-medium text-gray-900 hover:text-primary-active" href="#">
                                                                                                                                        William Wilson
                                                                                                                                </a>
                                                                                                                        </div>
                                                                                                                </td>
                                                                                                                <td>
                                                                                                                        <div className="flex items-center gap-1.5 text-gray-800 font-normal">
                                                                                                                                <i className="ki-filled ki-chrome">
                                                                                                                                </i>
                                                                                                                                Chrome on Windows 11
                                                                                                                        </div>
                                                                                                                </td>
                                                                                                                <td className="text-gray-800 font-normal">
                                                                                                                        233.182.185.28
                                                                                                                </td>
                                                                                                                <td>
                                                                                                                        <div className="flex items-center gap-1.5 text-gray-800 font-normal">
                                                                                                                                <img className="rounded-full size-4 shrink-0" src="assets/media/flags/united-states.svg" />
                                                                                                                                USA
                                                                                                                        </div>
                                                                                                                </td>
                                                                                                                <td className="text-gray-800 font-normal">
                                                                                                                        Today, 15:02
                                                                                                                </td>
                                                                                                                <td>
                                                                                                                        <div className="menu" data-menu="true">
                                                                                                                                <div className="menu-item" data-menu-item-offset="0, 10px" data-menu-item-placement="bottom-end" data-menu-item-toggle="dropdown" data-menu-item-trigger="click|lg:click">
                                                                                                                                        <button className="menu-toggle btn btn-sm btn-icon btn-light btn-clear">
                                                                                                                                                <i className="ki-filled ki-dots-vertical">
                                                                                                                                                </i>
                                                                                                                                        </button>
                                                                                                                                        <div className="menu-dropdown menu-default w-full max-w-[175px]" data-menu-dismiss="true">
                                                                                                                                                <div className="menu-item">
                                                                                                                                                        <a className="menu-link" href="#">
                                                                                                                                                                <span className="menu-icon">
                                                                                                                                                                        <i className="ki-filled ki-search-list">
                                                                                                                                                                        </i>
                                                                                                                                                                </span>
                                                                                                                                                                <span className="menu-title">
                                                                                                                                                                        View
                                                                                                                                                                </span>
                                                                                                                                                        </a>
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-item">
                                                                                                                                                        <a className="menu-link" href="#">
                                                                                                                                                                <span className="menu-icon">
                                                                                                                                                                        <i className="ki-filled ki-file-up">
                                                                                                                                                                        </i>
                                                                                                                                                                </span>
                                                                                                                                                                <span className="menu-title">
                                                                                                                                                                        Export
                                                                                                                                                                </span>
                                                                                                                                                        </a>
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-separator">
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-item">
                                                                                                                                                        <a className="menu-link" href="#">
                                                                                                                                                                <span className="menu-icon">
                                                                                                                                                                        <i className="ki-filled ki-pencil">
                                                                                                                                                                        </i>
                                                                                                                                                                </span>
                                                                                                                                                                <span className="menu-title">
                                                                                                                                                                        Edit
                                                                                                                                                                </span>
                                                                                                                                                        </a>
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-item">
                                                                                                                                                        <a className="menu-link" href="#">
                                                                                                                                                                <span className="menu-icon">
                                                                                                                                                                        <i className="ki-filled ki-copy">
                                                                                                                                                                        </i>
                                                                                                                                                                </span>
                                                                                                                                                                <span className="menu-title">
                                                                                                                                                                        Make a copy
                                                                                                                                                                </span>
                                                                                                                                                        </a>
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-separator">
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-item">
                                                                                                                                                        <a className="menu-link" href="#">
                                                                                                                                                                <span className="menu-icon">
                                                                                                                                                                        <i className="ki-filled ki-trash">
                                                                                                                                                                        </i>
                                                                                                                                                                </span>
                                                                                                                                                                <span className="menu-title">
                                                                                                                                                                        Remove
                                                                                                                                                                </span>
                                                                                                                                                        </a>
                                                                                                                                                </div>
                                                                                                                                        </div>
                                                                                                                                </div>
                                                                                                                        </div>
                                                                                                                </td>
                                                                                                        </tr>
                                                                                                        <tr>
                                                                                                                <td className="text-center">
                                                                                                                        <input className="checkbox checkbox-sm" data-datatable-row-check="true" type="checkbox" defaultValue={7} />
                                                                                                                </td>
                                                                                                                <td>
                                                                                                                        <div className="flex items-center gap-2.5">
                                                                                                                                <img className="rounded-full size-7 shrink-0" src="assets/media/avatars/300-34.png" />
                                                                                                                                <a className="text-sm font-medium text-gray-900 hover:text-primary-active" href="#">
                                                                                                                                        Olivia Martin
                                                                                                                                </a>
                                                                                                                        </div>
                                                                                                                </td>
                                                                                                                <td>
                                                                                                                        <div className="flex items-center gap-1.5 text-gray-800 font-normal">
                                                                                                                                <i className="ki-filled ki-chrome">
                                                                                                                                </i>
                                                                                                                                Chrome on Android 16
                                                                                                                        </div>
                                                                                                                </td>
                                                                                                                <td className="text-gray-800 font-normal">
                                                                                                                        76.216.214.248
                                                                                                                </td>
                                                                                                                <td>
                                                                                                                        <div className="flex items-center gap-1.5 text-gray-800 font-normal">
                                                                                                                                <img className="rounded-full size-4 shrink-0" src="assets/media/flags/turkey.svg" />
                                                                                                                                Turkey
                                                                                                                        </div>
                                                                                                                </td>
                                                                                                                <td className="text-gray-800 font-normal">
                                                                                                                        Current session
                                                                                                                </td>
                                                                                                                <td>
                                                                                                                        <div className="menu" data-menu="true">
                                                                                                                                <div className="menu-item" data-menu-item-offset="0, 10px" data-menu-item-placement="bottom-end" data-menu-item-toggle="dropdown" data-menu-item-trigger="click|lg:click">
                                                                                                                                        <button className="menu-toggle btn btn-sm btn-icon btn-light btn-clear">
                                                                                                                                                <i className="ki-filled ki-dots-vertical">
                                                                                                                                                </i>
                                                                                                                                        </button>
                                                                                                                                        <div className="menu-dropdown menu-default w-full max-w-[175px]" data-menu-dismiss="true">
                                                                                                                                                <div className="menu-item">
                                                                                                                                                        <a className="menu-link" href="#">
                                                                                                                                                                <span className="menu-icon">
                                                                                                                                                                        <i className="ki-filled ki-search-list">
                                                                                                                                                                        </i>
                                                                                                                                                                </span>
                                                                                                                                                                <span className="menu-title">
                                                                                                                                                                        View
                                                                                                                                                                </span>
                                                                                                                                                        </a>
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-item">
                                                                                                                                                        <a className="menu-link" href="#">
                                                                                                                                                                <span className="menu-icon">
                                                                                                                                                                        <i className="ki-filled ki-file-up">
                                                                                                                                                                        </i>
                                                                                                                                                                </span>
                                                                                                                                                                <span className="menu-title">
                                                                                                                                                                        Export
                                                                                                                                                                </span>
                                                                                                                                                        </a>
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-separator">
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-item">
                                                                                                                                                        <a className="menu-link" href="#">
                                                                                                                                                                <span className="menu-icon">
                                                                                                                                                                        <i className="ki-filled ki-pencil">
                                                                                                                                                                        </i>
                                                                                                                                                                </span>
                                                                                                                                                                <span className="menu-title">
                                                                                                                                                                        Edit
                                                                                                                                                                </span>
                                                                                                                                                        </a>
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-item">
                                                                                                                                                        <a className="menu-link" href="#">
                                                                                                                                                                <span className="menu-icon">
                                                                                                                                                                        <i className="ki-filled ki-copy">
                                                                                                                                                                        </i>
                                                                                                                                                                </span>
                                                                                                                                                                <span className="menu-title">
                                                                                                                                                                        Make a copy
                                                                                                                                                                </span>
                                                                                                                                                        </a>
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-separator">
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-item">
                                                                                                                                                        <a className="menu-link" href="#">
                                                                                                                                                                <span className="menu-icon">
                                                                                                                                                                        <i className="ki-filled ki-trash">
                                                                                                                                                                        </i>
                                                                                                                                                                </span>
                                                                                                                                                                <span className="menu-title">
                                                                                                                                                                        Remove
                                                                                                                                                                </span>
                                                                                                                                                        </a>
                                                                                                                                                </div>
                                                                                                                                        </div>
                                                                                                                                </div>
                                                                                                                        </div>
                                                                                                                </td>
                                                                                                        </tr>
                                                                                                        <tr>
                                                                                                                <td className="text-center">
                                                                                                                        <input className="checkbox checkbox-sm" data-datatable-row-check="true" type="checkbox" defaultValue={8} />
                                                                                                                </td>
                                                                                                                <td>
                                                                                                                        <div className="flex items-center gap-2.5">
                                                                                                                                <img className="rounded-full size-7 shrink-0" src="assets/media/avatars/300-4.png" />
                                                                                                                                <a className="text-sm font-medium text-gray-900 hover:text-primary-active" href="#">
                                                                                                                                        Ethan Garcia
                                                                                                                                </a>
                                                                                                                        </div>
                                                                                                                </td>
                                                                                                                <td>
                                                                                                                        <div className="flex items-center gap-1.5 text-gray-800 font-normal">
                                                                                                                                <i className="ki-filled ki-chrome">
                                                                                                                                </i>
                                                                                                                                Safari on Mac OS X
                                                                                                                        </div>
                                                                                                                </td>
                                                                                                                <td className="text-gray-800 font-normal">
                                                                                                                        102.150.137.255
                                                                                                                </td>
                                                                                                                <td>
                                                                                                                        <div className="flex items-center gap-1.5 text-gray-800 font-normal">
                                                                                                                                <img className="rounded-full size-4 shrink-0" src="assets/media/flags/brazil.svg" />
                                                                                                                                Brasil
                                                                                                                        </div>
                                                                                                                </td>
                                                                                                                <td className="text-gray-800 font-normal">
                                                                                                                        Current session
                                                                                                                </td>
                                                                                                                <td>
                                                                                                                        <div className="menu" data-menu="true">
                                                                                                                                <div className="menu-item" data-menu-item-offset="0, 10px" data-menu-item-placement="bottom-end" data-menu-item-toggle="dropdown" data-menu-item-trigger="click|lg:click">
                                                                                                                                        <button className="menu-toggle btn btn-sm btn-icon btn-light btn-clear">
                                                                                                                                                <i className="ki-filled ki-dots-vertical">
                                                                                                                                                </i>
                                                                                                                                        </button>
                                                                                                                                        <div className="menu-dropdown menu-default w-full max-w-[175px]" data-menu-dismiss="true">
                                                                                                                                                <div className="menu-item">
                                                                                                                                                        <a className="menu-link" href="#">
                                                                                                                                                                <span className="menu-icon">
                                                                                                                                                                        <i className="ki-filled ki-search-list">
                                                                                                                                                                        </i>
                                                                                                                                                                </span>
                                                                                                                                                                <span className="menu-title">
                                                                                                                                                                        View
                                                                                                                                                                </span>
                                                                                                                                                        </a>
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-item">
                                                                                                                                                        <a className="menu-link" href="#">
                                                                                                                                                                <span className="menu-icon">
                                                                                                                                                                        <i className="ki-filled ki-file-up">
                                                                                                                                                                        </i>
                                                                                                                                                                </span>
                                                                                                                                                                <span className="menu-title">
                                                                                                                                                                        Export
                                                                                                                                                                </span>
                                                                                                                                                        </a>
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-separator">
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-item">
                                                                                                                                                        <a className="menu-link" href="#">
                                                                                                                                                                <span className="menu-icon">
                                                                                                                                                                        <i className="ki-filled ki-pencil">
                                                                                                                                                                        </i>
                                                                                                                                                                </span>
                                                                                                                                                                <span className="menu-title">
                                                                                                                                                                        Edit
                                                                                                                                                                </span>
                                                                                                                                                        </a>
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-item">
                                                                                                                                                        <a className="menu-link" href="#">
                                                                                                                                                                <span className="menu-icon">
                                                                                                                                                                        <i className="ki-filled ki-copy">
                                                                                                                                                                        </i>
                                                                                                                                                                </span>
                                                                                                                                                                <span className="menu-title">
                                                                                                                                                                        Make a copy
                                                                                                                                                                </span>
                                                                                                                                                        </a>
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-separator">
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-item">
                                                                                                                                                        <a className="menu-link" href="#">
                                                                                                                                                                <span className="menu-icon">
                                                                                                                                                                        <i className="ki-filled ki-trash">
                                                                                                                                                                        </i>
                                                                                                                                                                </span>
                                                                                                                                                                <span className="menu-title">
                                                                                                                                                                        Remove
                                                                                                                                                                </span>
                                                                                                                                                        </a>
                                                                                                                                                </div>
                                                                                                                                        </div>
                                                                                                                                </div>
                                                                                                                        </div>
                                                                                                                </td>
                                                                                                        </tr>
                                                                                                        <tr>
                                                                                                                <td className="text-center">
                                                                                                                        <input className="checkbox checkbox-sm" data-datatable-row-check="true" type="checkbox" defaultValue={9} />
                                                                                                                </td>
                                                                                                                <td>
                                                                                                                        <div className="flex items-center gap-2.5">
                                                                                                                                <img className="rounded-full size-7 shrink-0" src="assets/media/avatars/300-13.png" />
                                                                                                                                <a className="text-sm font-medium text-gray-900 hover:text-primary-active" href="#">
                                                                                                                                        Ava Rodriguez
                                                                                                                                </a>
                                                                                                                        </div>
                                                                                                                </td>
                                                                                                                <td>
                                                                                                                        <div className="flex items-center gap-1.5 text-gray-800 font-normal">
                                                                                                                                <i className="ki-filled ki-chrome">
                                                                                                                                </i>
                                                                                                                                Safari on Mac OS X
                                                                                                                        </div>
                                                                                                                </td>
                                                                                                                <td className="text-gray-800 font-normal">
                                                                                                                        75.243.106.80
                                                                                                                </td>
                                                                                                                <td>
                                                                                                                        <div className="flex items-center gap-1.5 text-gray-800 font-normal">
                                                                                                                                <img className="rounded-full size-4 shrink-0" src="assets/media/flags/latvia.svg" />
                                                                                                                                Latvia
                                                                                                                        </div>
                                                                                                                </td>
                                                                                                                <td className="text-gray-800 font-normal">
                                                                                                                        Week ago
                                                                                                                </td>
                                                                                                                <td>
                                                                                                                        <div className="menu" data-menu="true">
                                                                                                                                <div className="menu-item" data-menu-item-offset="0, 10px" data-menu-item-placement="bottom-end" data-menu-item-toggle="dropdown" data-menu-item-trigger="click|lg:click">
                                                                                                                                        <button className="menu-toggle btn btn-sm btn-icon btn-light btn-clear">
                                                                                                                                                <i className="ki-filled ki-dots-vertical">
                                                                                                                                                </i>
                                                                                                                                        </button>
                                                                                                                                        <div className="menu-dropdown menu-default w-full max-w-[175px]" data-menu-dismiss="true">
                                                                                                                                                <div className="menu-item">
                                                                                                                                                        <a className="menu-link" href="#">
                                                                                                                                                                <span className="menu-icon">
                                                                                                                                                                        <i className="ki-filled ki-search-list">
                                                                                                                                                                        </i>
                                                                                                                                                                </span>
                                                                                                                                                                <span className="menu-title">
                                                                                                                                                                        View
                                                                                                                                                                </span>
                                                                                                                                                        </a>
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-item">
                                                                                                                                                        <a className="menu-link" href="#">
                                                                                                                                                                <span className="menu-icon">
                                                                                                                                                                        <i className="ki-filled ki-file-up">
                                                                                                                                                                        </i>
                                                                                                                                                                </span>
                                                                                                                                                                <span className="menu-title">
                                                                                                                                                                        Export
                                                                                                                                                                </span>
                                                                                                                                                        </a>
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-separator">
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-item">
                                                                                                                                                        <a className="menu-link" href="#">
                                                                                                                                                                <span className="menu-icon">
                                                                                                                                                                        <i className="ki-filled ki-pencil">
                                                                                                                                                                        </i>
                                                                                                                                                                </span>
                                                                                                                                                                <span className="menu-title">
                                                                                                                                                                        Edit
                                                                                                                                                                </span>
                                                                                                                                                        </a>
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-item">
                                                                                                                                                        <a className="menu-link" href="#">
                                                                                                                                                                <span className="menu-icon">
                                                                                                                                                                        <i className="ki-filled ki-copy">
                                                                                                                                                                        </i>
                                                                                                                                                                </span>
                                                                                                                                                                <span className="menu-title">
                                                                                                                                                                        Make a copy
                                                                                                                                                                </span>
                                                                                                                                                        </a>
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-separator">
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-item">
                                                                                                                                                        <a className="menu-link" href="#">
                                                                                                                                                                <span className="menu-icon">
                                                                                                                                                                        <i className="ki-filled ki-trash">
                                                                                                                                                                        </i>
                                                                                                                                                                </span>
                                                                                                                                                                <span className="menu-title">
                                                                                                                                                                        Remove
                                                                                                                                                                </span>
                                                                                                                                                        </a>
                                                                                                                                                </div>
                                                                                                                                        </div>
                                                                                                                                </div>
                                                                                                                        </div>
                                                                                                                </td>
                                                                                                        </tr>
                                                                                                        <tr>
                                                                                                                <td className="text-center">
                                                                                                                        <input className="checkbox checkbox-sm" data-datatable-row-check="true" type="checkbox" defaultValue={10} />
                                                                                                                </td>
                                                                                                                <td>
                                                                                                                        <div className="flex items-center gap-2.5">
                                                                                                                                <img className="rounded-full size-7 shrink-0" src="assets/media/avatars/300-31.png" />
                                                                                                                                <a className="text-sm font-medium text-gray-900 hover:text-primary-active" href="#">
                                                                                                                                        Matthew Martinez
                                                                                                                                </a>
                                                                                                                        </div>
                                                                                                                </td>
                                                                                                                <td>
                                                                                                                        <div className="flex items-center gap-1.5 text-gray-800 font-normal">
                                                                                                                                <i className="ki-filled ki-chrome">
                                                                                                                                </i>
                                                                                                                                Chrome on Mac OS X
                                                                                                                        </div>
                                                                                                                </td>
                                                                                                                <td className="text-gray-800 font-normal">
                                                                                                                        214.219.147.46
                                                                                                                </td>
                                                                                                                <td>
                                                                                                                        <div className="flex items-center gap-1.5 text-gray-800 font-normal">
                                                                                                                                <img className="rounded-full size-4 shrink-0" src="assets/media/flags/uruguay.svg" />
                                                                                                                                Uruguay
                                                                                                                        </div>
                                                                                                                </td>
                                                                                                                <td className="text-gray-800 font-normal">
                                                                                                                        Current session
                                                                                                                </td>
                                                                                                                <td>
                                                                                                                        <div className="menu" data-menu="true">
                                                                                                                                <div className="menu-item" data-menu-item-offset="0, 10px" data-menu-item-placement="bottom-end" data-menu-item-toggle="dropdown" data-menu-item-trigger="click|lg:click">
                                                                                                                                        <button className="menu-toggle btn btn-sm btn-icon btn-light btn-clear">
                                                                                                                                                <i className="ki-filled ki-dots-vertical">
                                                                                                                                                </i>
                                                                                                                                        </button>
                                                                                                                                        <div className="menu-dropdown menu-default w-full max-w-[175px]" data-menu-dismiss="true">
                                                                                                                                                <div className="menu-item">
                                                                                                                                                        <a className="menu-link" href="#">
                                                                                                                                                                <span className="menu-icon">
                                                                                                                                                                        <i className="ki-filled ki-search-list">
                                                                                                                                                                        </i>
                                                                                                                                                                </span>
                                                                                                                                                                <span className="menu-title">
                                                                                                                                                                        View
                                                                                                                                                                </span>
                                                                                                                                                        </a>
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-item">
                                                                                                                                                        <a className="menu-link" href="#">
                                                                                                                                                                <span className="menu-icon">
                                                                                                                                                                        <i className="ki-filled ki-file-up">
                                                                                                                                                                        </i>
                                                                                                                                                                </span>
                                                                                                                                                                <span className="menu-title">
                                                                                                                                                                        Export
                                                                                                                                                                </span>
                                                                                                                                                        </a>
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-separator">
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-item">
                                                                                                                                                        <a className="menu-link" href="#">
                                                                                                                                                                <span className="menu-icon">
                                                                                                                                                                        <i className="ki-filled ki-pencil">
                                                                                                                                                                        </i>
                                                                                                                                                                </span>
                                                                                                                                                                <span className="menu-title">
                                                                                                                                                                        Edit
                                                                                                                                                                </span>
                                                                                                                                                        </a>
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-item">
                                                                                                                                                        <a className="menu-link" href="#">
                                                                                                                                                                <span className="menu-icon">
                                                                                                                                                                        <i className="ki-filled ki-copy">
                                                                                                                                                                        </i>
                                                                                                                                                                </span>
                                                                                                                                                                <span className="menu-title">
                                                                                                                                                                        Make a copy
                                                                                                                                                                </span>
                                                                                                                                                        </a>
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-separator">
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-item">
                                                                                                                                                        <a className="menu-link" href="#">
                                                                                                                                                                <span className="menu-icon">
                                                                                                                                                                        <i className="ki-filled ki-trash">
                                                                                                                                                                        </i>
                                                                                                                                                                </span>
                                                                                                                                                                <span className="menu-title">
                                                                                                                                                                        Remove
                                                                                                                                                                </span>
                                                                                                                                                        </a>
                                                                                                                                                </div>
                                                                                                                                        </div>
                                                                                                                                </div>
                                                                                                                        </div>
                                                                                                                </td>
                                                                                                        </tr>
                                                                                                        <tr>
                                                                                                                <td className="text-center">
                                                                                                                        <input className="checkbox checkbox-sm" data-datatable-row-check="true" type="checkbox" defaultValue={11} />
                                                                                                                </td>
                                                                                                                <td>
                                                                                                                        <div className="flex items-center gap-2.5">
                                                                                                                                <img className="rounded-full size-7 shrink-0" src="assets/media/avatars/300-15.png" />
                                                                                                                                <a className="text-sm font-medium text-gray-900 hover:text-primary-active" href="#">
                                                                                                                                        Henry Clark
                                                                                                                                </a>
                                                                                                                        </div>
                                                                                                                </td>
                                                                                                                <td>
                                                                                                                        <div className="flex items-center gap-1.5 text-gray-800 font-normal">
                                                                                                                                <i className="ki-filled ki-chrome">
                                                                                                                                </i>
                                                                                                                                Chrome on Mac OS X
                                                                                                                        </div>
                                                                                                                </td>
                                                                                                                <td className="text-gray-800 font-normal">
                                                                                                                        192.168.1.2
                                                                                                                </td>
                                                                                                                <td>
                                                                                                                        <div className="flex items-center gap-1.5 text-gray-800 font-normal">
                                                                                                                                <img className="rounded-full size-4 shrink-0" src="assets/media/flags/italy.svg" />
                                                                                                                                Italy
                                                                                                                        </div>
                                                                                                                </td>
                                                                                                                <td className="text-gray-800 font-normal">
                                                                                                                        Yesterday
                                                                                                                </td>
                                                                                                                <td>
                                                                                                                        <div className="menu" data-menu="true">
                                                                                                                                <div className="menu-item" data-menu-item-offset="0, 10px" data-menu-item-placement="bottom-end" data-menu-item-toggle="dropdown" data-menu-item-trigger="click|lg:click">
                                                                                                                                        <button className="menu-toggle btn btn-sm btn-icon btn-light btn-clear">
                                                                                                                                                <i className="ki-filled ki-dots-vertical">
                                                                                                                                                </i>
                                                                                                                                        </button>
                                                                                                                                        <div className="menu-dropdown menu-default w-full max-w-[175px]" data-menu-dismiss="true">
                                                                                                                                                <div className="menu-item">
                                                                                                                                                        <a className="menu-link" href="#">
                                                                                                                                                                <span className="menu-icon">
                                                                                                                                                                        <i className="ki-filled ki-search-list">
                                                                                                                                                                        </i>
                                                                                                                                                                </span>
                                                                                                                                                                <span className="menu-title">
                                                                                                                                                                        View
                                                                                                                                                                </span>
                                                                                                                                                        </a>
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-item">
                                                                                                                                                        <a className="menu-link" href="#">
                                                                                                                                                                <span className="menu-icon">
                                                                                                                                                                        <i className="ki-filled ki-file-up">
                                                                                                                                                                        </i>
                                                                                                                                                                </span>
                                                                                                                                                                <span className="menu-title">
                                                                                                                                                                        Export
                                                                                                                                                                </span>
                                                                                                                                                        </a>
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-separator">
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-item">
                                                                                                                                                        <a className="menu-link" href="#">
                                                                                                                                                                <span className="menu-icon">
                                                                                                                                                                        <i className="ki-filled ki-pencil">
                                                                                                                                                                        </i>
                                                                                                                                                                </span>
                                                                                                                                                                <span className="menu-title">
                                                                                                                                                                        Edit
                                                                                                                                                                </span>
                                                                                                                                                        </a>
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-item">
                                                                                                                                                        <a className="menu-link" href="#">
                                                                                                                                                                <span className="menu-icon">
                                                                                                                                                                        <i className="ki-filled ki-copy">
                                                                                                                                                                        </i>
                                                                                                                                                                </span>
                                                                                                                                                                <span className="menu-title">
                                                                                                                                                                        Make a copy
                                                                                                                                                                </span>
                                                                                                                                                        </a>
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-separator">
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-item">
                                                                                                                                                        <a className="menu-link" href="#">
                                                                                                                                                                <span className="menu-icon">
                                                                                                                                                                        <i className="ki-filled ki-trash">
                                                                                                                                                                        </i>
                                                                                                                                                                </span>
                                                                                                                                                                <span className="menu-title">
                                                                                                                                                                        Remove
                                                                                                                                                                </span>
                                                                                                                                                        </a>
                                                                                                                                                </div>
                                                                                                                                        </div>
                                                                                                                                </div>
                                                                                                                        </div>
                                                                                                                </td>
                                                                                                        </tr>
                                                                                                        <tr>
                                                                                                                <td className="text-center">
                                                                                                                        <input className="checkbox checkbox-sm" data-datatable-row-check="true" type="checkbox" defaultValue={12} />
                                                                                                                </td>
                                                                                                                <td>
                                                                                                                        <div className="flex items-center gap-2.5">
                                                                                                                                <img className="rounded-full size-7 shrink-0" src="assets/media/avatars/300-16.png" />
                                                                                                                                <a className="text-sm font-medium text-gray-900 hover:text-primary-active" href="#">
                                                                                                                                        Amelia Lewis
                                                                                                                                </a>
                                                                                                                        </div>
                                                                                                                </td>
                                                                                                                <td>
                                                                                                                        <div className="flex items-center gap-1.5 text-gray-800 font-normal">
                                                                                                                                <i className="ki-filled ki-chrome">
                                                                                                                                </i>
                                                                                                                                Chrome on Mac OS X
                                                                                                                        </div>
                                                                                                                </td>
                                                                                                                <td className="text-gray-800 font-normal">
                                                                                                                        192.168.1.3
                                                                                                                </td>
                                                                                                                <td>
                                                                                                                        <div className="flex items-center gap-1.5 text-gray-800 font-normal">
                                                                                                                                <img className="rounded-full size-4 shrink-0" src="assets/media/flags/spain.svg" />
                                                                                                                                Spain
                                                                                                                        </div>
                                                                                                                </td>
                                                                                                                <td className="text-gray-800 font-normal">
                                                                                                                        2 days ago
                                                                                                                </td>
                                                                                                                <td>
                                                                                                                        <div className="menu" data-menu="true">
                                                                                                                                <div className="menu-item" data-menu-item-offset="0, 10px" data-menu-item-placement="bottom-end" data-menu-item-toggle="dropdown" data-menu-item-trigger="click|lg:click">
                                                                                                                                        <button className="menu-toggle btn btn-sm btn-icon btn-light btn-clear">
                                                                                                                                                <i className="ki-filled ki-dots-vertical">
                                                                                                                                                </i>
                                                                                                                                        </button>
                                                                                                                                        <div className="menu-dropdown menu-default w-full max-w-[175px]" data-menu-dismiss="true">
                                                                                                                                                <div className="menu-item">
                                                                                                                                                        <a className="menu-link" href="#">
                                                                                                                                                                <span className="menu-icon">
                                                                                                                                                                        <i className="ki-filled ki-search-list">
                                                                                                                                                                        </i>
                                                                                                                                                                </span>
                                                                                                                                                                <span className="menu-title">
                                                                                                                                                                        View
                                                                                                                                                                </span>
                                                                                                                                                        </a>
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-item">
                                                                                                                                                        <a className="menu-link" href="#">
                                                                                                                                                                <span className="menu-icon">
                                                                                                                                                                        <i className="ki-filled ki-file-up">
                                                                                                                                                                        </i>
                                                                                                                                                                </span>
                                                                                                                                                                <span className="menu-title">
                                                                                                                                                                        Export
                                                                                                                                                                </span>
                                                                                                                                                        </a>
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-separator">
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-item">
                                                                                                                                                        <a className="menu-link" href="#">
                                                                                                                                                                <span className="menu-icon">
                                                                                                                                                                        <i className="ki-filled ki-pencil">
                                                                                                                                                                        </i>
                                                                                                                                                                </span>
                                                                                                                                                                <span className="menu-title">
                                                                                                                                                                        Edit
                                                                                                                                                                </span>
                                                                                                                                                        </a>
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-item">
                                                                                                                                                        <a className="menu-link" href="#">
                                                                                                                                                                <span className="menu-icon">
                                                                                                                                                                        <i className="ki-filled ki-copy">
                                                                                                                                                                        </i>
                                                                                                                                                                </span>
                                                                                                                                                                <span className="menu-title">
                                                                                                                                                                        Make a copy
                                                                                                                                                                </span>
                                                                                                                                                        </a>
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-separator">
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-item">
                                                                                                                                                        <a className="menu-link" href="#">
                                                                                                                                                                <span className="menu-icon">
                                                                                                                                                                        <i className="ki-filled ki-trash">
                                                                                                                                                                        </i>
                                                                                                                                                                </span>
                                                                                                                                                                <span className="menu-title">
                                                                                                                                                                        Remove
                                                                                                                                                                </span>
                                                                                                                                                        </a>
                                                                                                                                                </div>
                                                                                                                                        </div>
                                                                                                                                </div>
                                                                                                                        </div>
                                                                                                                </td>
                                                                                                        </tr>
                                                                                                        <tr>
                                                                                                                <td className="text-center">
                                                                                                                        <input className="checkbox checkbox-sm" data-datatable-row-check="true" type="checkbox" defaultValue={13} />
                                                                                                                </td>
                                                                                                                <td>
                                                                                                                        <div className="flex items-center gap-2.5">
                                                                                                                                <img className="rounded-full size-7 shrink-0" src="assets/media/avatars/300-17.png" />
                                                                                                                                <a className="text-sm font-medium text-gray-900 hover:text-primary-active" href="#">
                                                                                                                                        Lucas Walker
                                                                                                                                </a>
                                                                                                                        </div>
                                                                                                                </td>
                                                                                                                <td>
                                                                                                                        <div className="flex items-center gap-1.5 text-gray-800 font-normal">
                                                                                                                                <i className="ki-filled ki-chrome">
                                                                                                                                </i>
                                                                                                                                Chrome on Mac OS X
                                                                                                                        </div>
                                                                                                                </td>
                                                                                                                <td className="text-gray-800 font-normal">
                                                                                                                        192.168.1.4
                                                                                                                </td>
                                                                                                                <td>
                                                                                                                        <div className="flex items-center gap-1.5 text-gray-800 font-normal">
                                                                                                                                <img className="rounded-full size-4 shrink-0" src="assets/media/flags/france.svg" />
                                                                                                                                France
                                                                                                                        </div>
                                                                                                                </td>
                                                                                                                <td className="text-gray-800 font-normal">
                                                                                                                        Today, 8:45 am
                                                                                                                </td>
                                                                                                                <td>
                                                                                                                        <div className="menu" data-menu="true">
                                                                                                                                <div className="menu-item" data-menu-item-offset="0, 10px" data-menu-item-placement="bottom-end" data-menu-item-toggle="dropdown" data-menu-item-trigger="click|lg:click">
                                                                                                                                        <button className="menu-toggle btn btn-sm btn-icon btn-light btn-clear">
                                                                                                                                                <i className="ki-filled ki-dots-vertical">
                                                                                                                                                </i>
                                                                                                                                        </button>
                                                                                                                                        <div className="menu-dropdown menu-default w-full max-w-[175px]" data-menu-dismiss="true">
                                                                                                                                                <div className="menu-item">
                                                                                                                                                        <a className="menu-link" href="#">
                                                                                                                                                                <span className="menu-icon">
                                                                                                                                                                        <i className="ki-filled ki-search-list">
                                                                                                                                                                        </i>
                                                                                                                                                                </span>
                                                                                                                                                                <span className="menu-title">
                                                                                                                                                                        View
                                                                                                                                                                </span>
                                                                                                                                                        </a>
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-item">
                                                                                                                                                        <a className="menu-link" href="#">
                                                                                                                                                                <span className="menu-icon">
                                                                                                                                                                        <i className="ki-filled ki-file-up">
                                                                                                                                                                        </i>
                                                                                                                                                                </span>
                                                                                                                                                                <span className="menu-title">
                                                                                                                                                                        Export
                                                                                                                                                                </span>
                                                                                                                                                        </a>
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-separator">
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-item">
                                                                                                                                                        <a className="menu-link" href="#">
                                                                                                                                                                <span className="menu-icon">
                                                                                                                                                                        <i className="ki-filled ki-pencil">
                                                                                                                                                                        </i>
                                                                                                                                                                </span>
                                                                                                                                                                <span className="menu-title">
                                                                                                                                                                        Edit
                                                                                                                                                                </span>
                                                                                                                                                        </a>
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-item">
                                                                                                                                                        <a className="menu-link" href="#">
                                                                                                                                                                <span className="menu-icon">
                                                                                                                                                                        <i className="ki-filled ki-copy">
                                                                                                                                                                        </i>
                                                                                                                                                                </span>
                                                                                                                                                                <span className="menu-title">
                                                                                                                                                                        Make a copy
                                                                                                                                                                </span>
                                                                                                                                                        </a>
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-separator">
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-item">
                                                                                                                                                        <a className="menu-link" href="#">
                                                                                                                                                                <span className="menu-icon">
                                                                                                                                                                        <i className="ki-filled ki-trash">
                                                                                                                                                                        </i>
                                                                                                                                                                </span>
                                                                                                                                                                <span className="menu-title">
                                                                                                                                                                        Remove
                                                                                                                                                                </span>
                                                                                                                                                        </a>
                                                                                                                                                </div>
                                                                                                                                        </div>
                                                                                                                                </div>
                                                                                                                        </div>
                                                                                                                </td>
                                                                                                        </tr>
                                                                                                        <tr>
                                                                                                                <td className="text-center">
                                                                                                                        <input className="checkbox checkbox-sm" data-datatable-row-check="true" type="checkbox" defaultValue={14} />
                                                                                                                </td>
                                                                                                                <td>
                                                                                                                        <div className="flex items-center gap-2.5">
                                                                                                                                <img className="rounded-full size-7 shrink-0" src="assets/media/avatars/300-18.png" />
                                                                                                                                <a className="text-sm font-medium text-gray-900 hover:text-primary-active" href="#">
                                                                                                                                        Grace Allen
                                                                                                                                </a>
                                                                                                                        </div>
                                                                                                                </td>
                                                                                                                <td>
                                                                                                                        <div className="flex items-center gap-1.5 text-gray-800 font-normal">
                                                                                                                                <i className="ki-filled ki-chrome">
                                                                                                                                </i>
                                                                                                                                Chrome on Mac OS X
                                                                                                                        </div>
                                                                                                                </td>
                                                                                                                <td className="text-gray-800 font-normal">
                                                                                                                        192.168.1.5
                                                                                                                </td>
                                                                                                                <td>
                                                                                                                        <div className="flex items-center gap-1.5 text-gray-800 font-normal">
                                                                                                                                <img className="rounded-full size-4 shrink-0" src="assets/media/flags/germany.svg" />
                                                                                                                                Germany
                                                                                                                        </div>
                                                                                                                </td>
                                                                                                                <td className="text-gray-800 font-normal">
                                                                                                                        Current session
                                                                                                                </td>
                                                                                                                <td>
                                                                                                                        <div className="menu" data-menu="true">
                                                                                                                                <div className="menu-item" data-menu-item-offset="0, 10px" data-menu-item-placement="bottom-end" data-menu-item-toggle="dropdown" data-menu-item-trigger="click|lg:click">
                                                                                                                                        <button className="menu-toggle btn btn-sm btn-icon btn-light btn-clear">
                                                                                                                                                <i className="ki-filled ki-dots-vertical">
                                                                                                                                                </i>
                                                                                                                                        </button>
                                                                                                                                        <div className="menu-dropdown menu-default w-full max-w-[175px]" data-menu-dismiss="true">
                                                                                                                                                <div className="menu-item">
                                                                                                                                                        <a className="menu-link" href="#">
                                                                                                                                                                <span className="menu-icon">
                                                                                                                                                                        <i className="ki-filled ki-search-list">
                                                                                                                                                                        </i>
                                                                                                                                                                </span>
                                                                                                                                                                <span className="menu-title">
                                                                                                                                                                        View
                                                                                                                                                                </span>
                                                                                                                                                        </a>
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-item">
                                                                                                                                                        <a className="menu-link" href="#">
                                                                                                                                                                <span className="menu-icon">
                                                                                                                                                                        <i className="ki-filled ki-file-up">
                                                                                                                                                                        </i>
                                                                                                                                                                </span>
                                                                                                                                                                <span className="menu-title">
                                                                                                                                                                        Export
                                                                                                                                                                </span>
                                                                                                                                                        </a>
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-separator">
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-item">
                                                                                                                                                        <a className="menu-link" href="#">
                                                                                                                                                                <span className="menu-icon">
                                                                                                                                                                        <i className="ki-filled ki-pencil">
                                                                                                                                                                        </i>
                                                                                                                                                                </span>
                                                                                                                                                                <span className="menu-title">
                                                                                                                                                                        Edit
                                                                                                                                                                </span>
                                                                                                                                                        </a>
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-item">
                                                                                                                                                        <a className="menu-link" href="#">
                                                                                                                                                                <span className="menu-icon">
                                                                                                                                                                        <i className="ki-filled ki-copy">
                                                                                                                                                                        </i>
                                                                                                                                                                </span>
                                                                                                                                                                <span className="menu-title">
                                                                                                                                                                        Make a copy
                                                                                                                                                                </span>
                                                                                                                                                        </a>
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-separator">
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-item">
                                                                                                                                                        <a className="menu-link" href="#">
                                                                                                                                                                <span className="menu-icon">
                                                                                                                                                                        <i className="ki-filled ki-trash">
                                                                                                                                                                        </i>
                                                                                                                                                                </span>
                                                                                                                                                                <span className="menu-title">
                                                                                                                                                                        Remove
                                                                                                                                                                </span>
                                                                                                                                                        </a>
                                                                                                                                                </div>
                                                                                                                                        </div>
                                                                                                                                </div>
                                                                                                                        </div>
                                                                                                                </td>
                                                                                                        </tr>
                                                                                                        <tr>
                                                                                                                <td className="text-center">
                                                                                                                        <input className="checkbox checkbox-sm" data-datatable-row-check="true" type="checkbox" defaultValue={15} />
                                                                                                                </td>
                                                                                                                <td>
                                                                                                                        <div className="flex items-center gap-2.5">
                                                                                                                                <img className="rounded-full size-7 shrink-0" src="assets/media/avatars/300-19.png" />
                                                                                                                                <a className="text-sm font-medium text-gray-900 hover:text-primary-active" href="#">
                                                                                                                                        Jack Harris
                                                                                                                                </a>
                                                                                                                        </div>
                                                                                                                </td>
                                                                                                                <td>
                                                                                                                        <div className="flex items-center gap-1.5 text-gray-800 font-normal">
                                                                                                                                <i className="ki-filled ki-chrome">
                                                                                                                                </i>
                                                                                                                                Chrome on Mac OS X
                                                                                                                        </div>
                                                                                                                </td>
                                                                                                                <td className="text-gray-800 font-normal">
                                                                                                                        192.168.1.6
                                                                                                                </td>
                                                                                                                <td>
                                                                                                                        <div className="flex items-center gap-1.5 text-gray-800 font-normal">
                                                                                                                                <img className="rounded-full size-4 shrink-0" src="assets/media/flags/netherlands.svg" />
                                                                                                                                Netherlands
                                                                                                                        </div>
                                                                                                                </td>
                                                                                                                <td className="text-gray-800 font-normal">
                                                                                                                        Week ago
                                                                                                                </td>
                                                                                                                <td>
                                                                                                                        <div className="menu" data-menu="true">
                                                                                                                                <div className="menu-item" data-menu-item-offset="0, 10px" data-menu-item-placement="bottom-end" data-menu-item-toggle="dropdown" data-menu-item-trigger="click|lg:click">
                                                                                                                                        <button className="menu-toggle btn btn-sm btn-icon btn-light btn-clear">
                                                                                                                                                <i className="ki-filled ki-dots-vertical">
                                                                                                                                                </i>
                                                                                                                                        </button>
                                                                                                                                        <div className="menu-dropdown menu-default w-full max-w-[175px]" data-menu-dismiss="true">
                                                                                                                                                <div className="menu-item">
                                                                                                                                                        <a className="menu-link" href="#">
                                                                                                                                                                <span className="menu-icon">
                                                                                                                                                                        <i className="ki-filled ki-search-list">
                                                                                                                                                                        </i>
                                                                                                                                                                </span>
                                                                                                                                                                <span className="menu-title">
                                                                                                                                                                        View
                                                                                                                                                                </span>
                                                                                                                                                        </a>
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-item">
                                                                                                                                                        <a className="menu-link" href="#">
                                                                                                                                                                <span className="menu-icon">
                                                                                                                                                                        <i className="ki-filled ki-file-up">
                                                                                                                                                                        </i>
                                                                                                                                                                </span>
                                                                                                                                                                <span className="menu-title">
                                                                                                                                                                        Export
                                                                                                                                                                </span>
                                                                                                                                                        </a>
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-separator">
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-item">
                                                                                                                                                        <a className="menu-link" href="#">
                                                                                                                                                                <span className="menu-icon">
                                                                                                                                                                        <i className="ki-filled ki-pencil">
                                                                                                                                                                        </i>
                                                                                                                                                                </span>
                                                                                                                                                                <span className="menu-title">
                                                                                                                                                                        Edit
                                                                                                                                                                </span>
                                                                                                                                                        </a>
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-item">
                                                                                                                                                        <a className="menu-link" href="#">
                                                                                                                                                                <span className="menu-icon">
                                                                                                                                                                        <i className="ki-filled ki-copy">
                                                                                                                                                                        </i>
                                                                                                                                                                </span>
                                                                                                                                                                <span className="menu-title">
                                                                                                                                                                        Make a copy
                                                                                                                                                                </span>
                                                                                                                                                        </a>
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-separator">
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-item">
                                                                                                                                                        <a className="menu-link" href="#">
                                                                                                                                                                <span className="menu-icon">
                                                                                                                                                                        <i className="ki-filled ki-trash">
                                                                                                                                                                        </i>
                                                                                                                                                                </span>
                                                                                                                                                                <span className="menu-title">
                                                                                                                                                                        Remove
                                                                                                                                                                </span>
                                                                                                                                                        </a>
                                                                                                                                                </div>
                                                                                                                                        </div>
                                                                                                                                </div>
                                                                                                                        </div>
                                                                                                                </td>
                                                                                                        </tr>
                                                                                                        <tr>
                                                                                                                <td className="text-center">
                                                                                                                        <input className="checkbox checkbox-sm" data-datatable-row-check="true" type="checkbox" defaultValue={16} />
                                                                                                                </td>
                                                                                                                <td>
                                                                                                                        <div className="flex items-center gap-2.5">
                                                                                                                                <img className="rounded-full size-7 shrink-0" src="assets/media/avatars/300-20.png" />
                                                                                                                                <a className="text-sm font-medium text-gray-900 hover:text-primary-active" href="#">
                                                                                                                                        Charlotte Young
                                                                                                                                </a>
                                                                                                                        </div>
                                                                                                                </td>
                                                                                                                <td>
                                                                                                                        <div className="flex items-center gap-1.5 text-gray-800 font-normal">
                                                                                                                                <i className="ki-filled ki-chrome">
                                                                                                                                </i>
                                                                                                                                Chrome on Mac OS X
                                                                                                                        </div>
                                                                                                                </td>
                                                                                                                <td className="text-gray-800 font-normal">
                                                                                                                        192.168.1.7
                                                                                                                </td>
                                                                                                                <td>
                                                                                                                        <div className="flex items-center gap-1.5 text-gray-800 font-normal">
                                                                                                                                <img className="rounded-full size-4 shrink-0" src="assets/media/flags/sweden.svg" />
                                                                                                                                Sweden
                                                                                                                        </div>
                                                                                                                </td>
                                                                                                                <td className="text-gray-800 font-normal">
                                                                                                                        Month ago
                                                                                                                </td>
                                                                                                                <td>
                                                                                                                        <div className="menu" data-menu="true">
                                                                                                                                <div className="menu-item" data-menu-item-offset="0, 10px" data-menu-item-placement="bottom-end" data-menu-item-toggle="dropdown" data-menu-item-trigger="click|lg:click">
                                                                                                                                        <button className="menu-toggle btn btn-sm btn-icon btn-light btn-clear">
                                                                                                                                                <i className="ki-filled ki-dots-vertical">
                                                                                                                                                </i>
                                                                                                                                        </button>
                                                                                                                                        <div className="menu-dropdown menu-default w-full max-w-[175px]" data-menu-dismiss="true">
                                                                                                                                                <div className="menu-item">
                                                                                                                                                        <a className="menu-link" href="#">
                                                                                                                                                                <span className="menu-icon">
                                                                                                                                                                        <i className="ki-filled ki-search-list">
                                                                                                                                                                        </i>
                                                                                                                                                                </span>
                                                                                                                                                                <span className="menu-title">
                                                                                                                                                                        View
                                                                                                                                                                </span>
                                                                                                                                                        </a>
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-item">
                                                                                                                                                        <a className="menu-link" href="#">
                                                                                                                                                                <span className="menu-icon">
                                                                                                                                                                        <i className="ki-filled ki-file-up">
                                                                                                                                                                        </i>
                                                                                                                                                                </span>
                                                                                                                                                                <span className="menu-title">
                                                                                                                                                                        Export
                                                                                                                                                                </span>
                                                                                                                                                        </a>
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-separator">
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-item">
                                                                                                                                                        <a className="menu-link" href="#">
                                                                                                                                                                <span className="menu-icon">
                                                                                                                                                                        <i className="ki-filled ki-pencil">
                                                                                                                                                                        </i>
                                                                                                                                                                </span>
                                                                                                                                                                <span className="menu-title">
                                                                                                                                                                        Edit
                                                                                                                                                                </span>
                                                                                                                                                        </a>
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-item">
                                                                                                                                                        <a className="menu-link" href="#">
                                                                                                                                                                <span className="menu-icon">
                                                                                                                                                                        <i className="ki-filled ki-copy">
                                                                                                                                                                        </i>
                                                                                                                                                                </span>
                                                                                                                                                                <span className="menu-title">
                                                                                                                                                                        Make a copy
                                                                                                                                                                </span>
                                                                                                                                                        </a>
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-separator">
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-item">
                                                                                                                                                        <a className="menu-link" href="#">
                                                                                                                                                                <span className="menu-icon">
                                                                                                                                                                        <i className="ki-filled ki-trash">
                                                                                                                                                                        </i>
                                                                                                                                                                </span>
                                                                                                                                                                <span className="menu-title">
                                                                                                                                                                        Remove
                                                                                                                                                                </span>
                                                                                                                                                        </a>
                                                                                                                                                </div>
                                                                                                                                        </div>
                                                                                                                                </div>
                                                                                                                        </div>
                                                                                                                </td>
                                                                                                        </tr>
                                                                                                        <tr>
                                                                                                                <td className="text-center">
                                                                                                                        <input className="checkbox checkbox-sm" data-datatable-row-check="true" type="checkbox" defaultValue={17} />
                                                                                                                </td>
                                                                                                                <td>
                                                                                                                        <div className="flex items-center gap-2.5">
                                                                                                                                <img className="rounded-full size-7 shrink-0" src="assets/media/avatars/300-21.png" />
                                                                                                                                <a className="text-sm font-medium text-gray-900 hover:text-primary-active" href="#">
                                                                                                                                        Benjamin Harris
                                                                                                                                </a>
                                                                                                                        </div>
                                                                                                                </td>
                                                                                                                <td>
                                                                                                                        <div className="flex items-center gap-1.5 text-gray-800 font-normal">
                                                                                                                                <i className="ki-filled ki-chrome">
                                                                                                                                </i>
                                                                                                                                Chrome on Mac OS X
                                                                                                                        </div>
                                                                                                                </td>
                                                                                                                <td className="text-gray-800 font-normal">
                                                                                                                        192.168.1.8
                                                                                                                </td>
                                                                                                                <td>
                                                                                                                        <div className="flex items-center gap-1.5 text-gray-800 font-normal">
                                                                                                                                <img className="rounded-full size-4 shrink-0" src="assets/media/flags/switzerland.svg" />
                                                                                                                                Switzerland
                                                                                                                        </div>
                                                                                                                </td>
                                                                                                                <td className="text-gray-800 font-normal">
                                                                                                                        Today, 14:10
                                                                                                                </td>
                                                                                                                <td>
                                                                                                                        <div className="menu" data-menu="true">
                                                                                                                                <div className="menu-item" data-menu-item-offset="0, 10px" data-menu-item-placement="bottom-end" data-menu-item-toggle="dropdown" data-menu-item-trigger="click|lg:click">
                                                                                                                                        <button className="menu-toggle btn btn-sm btn-icon btn-light btn-clear">
                                                                                                                                                <i className="ki-filled ki-dots-vertical">
                                                                                                                                                </i>
                                                                                                                                        </button>
                                                                                                                                        <div className="menu-dropdown menu-default w-full max-w-[175px]" data-menu-dismiss="true">
                                                                                                                                                <div className="menu-item">
                                                                                                                                                        <a className="menu-link" href="#">
                                                                                                                                                                <span className="menu-icon">
                                                                                                                                                                        <i className="ki-filled ki-search-list">
                                                                                                                                                                        </i>
                                                                                                                                                                </span>
                                                                                                                                                                <span className="menu-title">
                                                                                                                                                                        View
                                                                                                                                                                </span>
                                                                                                                                                        </a>
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-item">
                                                                                                                                                        <a className="menu-link" href="#">
                                                                                                                                                                <span className="menu-icon">
                                                                                                                                                                        <i className="ki-filled ki-file-up">
                                                                                                                                                                        </i>
                                                                                                                                                                </span>
                                                                                                                                                                <span className="menu-title">
                                                                                                                                                                        Export
                                                                                                                                                                </span>
                                                                                                                                                        </a>
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-separator">
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-item">
                                                                                                                                                        <a className="menu-link" href="#">
                                                                                                                                                                <span className="menu-icon">
                                                                                                                                                                        <i className="ki-filled ki-pencil">
                                                                                                                                                                        </i>
                                                                                                                                                                </span>
                                                                                                                                                                <span className="menu-title">
                                                                                                                                                                        Edit
                                                                                                                                                                </span>
                                                                                                                                                        </a>
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-item">
                                                                                                                                                        <a className="menu-link" href="#">
                                                                                                                                                                <span className="menu-icon">
                                                                                                                                                                        <i className="ki-filled ki-copy">
                                                                                                                                                                        </i>
                                                                                                                                                                </span>
                                                                                                                                                                <span className="menu-title">
                                                                                                                                                                        Make a copy
                                                                                                                                                                </span>
                                                                                                                                                        </a>
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-separator">
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-item">
                                                                                                                                                        <a className="menu-link" href="#">
                                                                                                                                                                <span className="menu-icon">
                                                                                                                                                                        <i className="ki-filled ki-trash">
                                                                                                                                                                        </i>
                                                                                                                                                                </span>
                                                                                                                                                                <span className="menu-title">
                                                                                                                                                                        Remove
                                                                                                                                                                </span>
                                                                                                                                                        </a>
                                                                                                                                                </div>
                                                                                                                                        </div>
                                                                                                                                </div>
                                                                                                                        </div>
                                                                                                                </td>
                                                                                                        </tr>
                                                                                                        <tr>
                                                                                                                <td className="text-center">
                                                                                                                        <input className="checkbox checkbox-sm" data-datatable-row-check="true" type="checkbox" defaultValue={18} />
                                                                                                                </td>
                                                                                                                <td>
                                                                                                                        <div className="flex items-center gap-2.5">
                                                                                                                                <img className="rounded-full size-7 shrink-0" src="assets/media/avatars/300-22.png" />
                                                                                                                                <a className="text-sm font-medium text-gray-900 hover:text-primary-active" href="#">
                                                                                                                                        James Martinez
                                                                                                                                </a>
                                                                                                                        </div>
                                                                                                                </td>
                                                                                                                <td>
                                                                                                                        <div className="flex items-center gap-1.5 text-gray-800 font-normal">
                                                                                                                                <i className="ki-filled ki-chrome">
                                                                                                                                </i>
                                                                                                                                Chrome on Mac OS X
                                                                                                                        </div>
                                                                                                                </td>
                                                                                                                <td className="text-gray-800 font-normal">
                                                                                                                        192.168.1.9
                                                                                                                </td>
                                                                                                                <td>
                                                                                                                        <div className="flex items-center gap-1.5 text-gray-800 font-normal">
                                                                                                                                <img className="rounded-full size-4 shrink-0" src="assets/media/flags/portugal.svg" />
                                                                                                                                Portugal
                                                                                                                        </div>
                                                                                                                </td>
                                                                                                                <td className="text-gray-800 font-normal">
                                                                                                                        Yesterday
                                                                                                                </td>
                                                                                                                <td>
                                                                                                                        <div className="menu" data-menu="true">
                                                                                                                                <div className="menu-item" data-menu-item-offset="0, 10px" data-menu-item-placement="bottom-end" data-menu-item-toggle="dropdown" data-menu-item-trigger="click|lg:click">
                                                                                                                                        <button className="menu-toggle btn btn-sm btn-icon btn-light btn-clear">
                                                                                                                                                <i className="ki-filled ki-dots-vertical">
                                                                                                                                                </i>
                                                                                                                                        </button>
                                                                                                                                        <div className="menu-dropdown menu-default w-full max-w-[175px]" data-menu-dismiss="true">
                                                                                                                                                <div className="menu-item">
                                                                                                                                                        <a className="menu-link" href="#">
                                                                                                                                                                <span className="menu-icon">
                                                                                                                                                                        <i className="ki-filled ki-search-list">
                                                                                                                                                                        </i>
                                                                                                                                                                </span>
                                                                                                                                                                <span className="menu-title">
                                                                                                                                                                        View
                                                                                                                                                                </span>
                                                                                                                                                        </a>
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-item">
                                                                                                                                                        <a className="menu-link" href="#">
                                                                                                                                                                <span className="menu-icon">
                                                                                                                                                                        <i className="ki-filled ki-file-up">
                                                                                                                                                                        </i>
                                                                                                                                                                </span>
                                                                                                                                                                <span className="menu-title">
                                                                                                                                                                        Export
                                                                                                                                                                </span>
                                                                                                                                                        </a>
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-separator">
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-item">
                                                                                                                                                        <a className="menu-link" href="#">
                                                                                                                                                                <span className="menu-icon">
                                                                                                                                                                        <i className="ki-filled ki-pencil">
                                                                                                                                                                        </i>
                                                                                                                                                                </span>
                                                                                                                                                                <span className="menu-title">
                                                                                                                                                                        Edit
                                                                                                                                                                </span>
                                                                                                                                                        </a>
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-item">
                                                                                                                                                        <a className="menu-link" href="#">
                                                                                                                                                                <span className="menu-icon">
                                                                                                                                                                        <i className="ki-filled ki-copy">
                                                                                                                                                                        </i>
                                                                                                                                                                </span>
                                                                                                                                                                <span className="menu-title">
                                                                                                                                                                        Make a copy
                                                                                                                                                                </span>
                                                                                                                                                        </a>
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-separator">
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-item">
                                                                                                                                                        <a className="menu-link" href="#">
                                                                                                                                                                <span className="menu-icon">
                                                                                                                                                                        <i className="ki-filled ki-trash">
                                                                                                                                                                        </i>
                                                                                                                                                                </span>
                                                                                                                                                                <span className="menu-title">
                                                                                                                                                                        Remove
                                                                                                                                                                </span>
                                                                                                                                                        </a>
                                                                                                                                                </div>
                                                                                                                                        </div>
                                                                                                                                </div>
                                                                                                                        </div>
                                                                                                                </td>
                                                                                                        </tr>
                                                                                                        <tr>
                                                                                                                <td className="text-center">
                                                                                                                        <input className="checkbox checkbox-sm" data-datatable-row-check="true" type="checkbox" defaultValue={19} />
                                                                                                                </td>
                                                                                                                <td>
                                                                                                                        <div className="flex items-center gap-2.5">
                                                                                                                                <img className="rounded-full size-7 shrink-0" src="assets/media/avatars/300-24.png" />
                                                                                                                                <a className="text-sm font-medium text-gray-900 hover:text-primary-active" href="#">
                                                                                                                                        Aiden King
                                                                                                                                </a>
                                                                                                                        </div>
                                                                                                                </td>
                                                                                                                <td>
                                                                                                                        <div className="flex items-center gap-1.5 text-gray-800 font-normal">
                                                                                                                                <i className="ki-filled ki-chrome">
                                                                                                                                </i>
                                                                                                                                Chrome on Mac OS X
                                                                                                                        </div>
                                                                                                                </td>
                                                                                                                <td className="text-gray-800 font-normal">
                                                                                                                        192.168.1.10
                                                                                                                </td>
                                                                                                                <td>
                                                                                                                        <div className="flex items-center gap-1.5 text-gray-800 font-normal">
                                                                                                                                <img className="rounded-full size-4 shrink-0" src="assets/media/flags/norway.svg" />
                                                                                                                                Norway
                                                                                                                        </div>
                                                                                                                </td>
                                                                                                                <td className="text-gray-800 font-normal">
                                                                                                                        2 days ago
                                                                                                                </td>
                                                                                                                <td>
                                                                                                                        <div className="menu" data-menu="true">
                                                                                                                                <div className="menu-item" data-menu-item-offset="0, 10px" data-menu-item-placement="bottom-end" data-menu-item-toggle="dropdown" data-menu-item-trigger="click|lg:click">
                                                                                                                                        <button className="menu-toggle btn btn-sm btn-icon btn-light btn-clear">
                                                                                                                                                <i className="ki-filled ki-dots-vertical">
                                                                                                                                                </i>
                                                                                                                                        </button>
                                                                                                                                        <div className="menu-dropdown menu-default w-full max-w-[175px]" data-menu-dismiss="true">
                                                                                                                                                <div className="menu-item">
                                                                                                                                                        <a className="menu-link" href="#">
                                                                                                                                                                <span className="menu-icon">
                                                                                                                                                                        <i className="ki-filled ki-search-list">
                                                                                                                                                                        </i>
                                                                                                                                                                </span>
                                                                                                                                                                <span className="menu-title">
                                                                                                                                                                        View
                                                                                                                                                                </span>
                                                                                                                                                        </a>
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-item">
                                                                                                                                                        <a className="menu-link" href="#">
                                                                                                                                                                <span className="menu-icon">
                                                                                                                                                                        <i className="ki-filled ki-file-up">
                                                                                                                                                                        </i>
                                                                                                                                                                </span>
                                                                                                                                                                <span className="menu-title">
                                                                                                                                                                        Export
                                                                                                                                                                </span>
                                                                                                                                                        </a>
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-separator">
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-item">
                                                                                                                                                        <a className="menu-link" href="#">
                                                                                                                                                                <span className="menu-icon">
                                                                                                                                                                        <i className="ki-filled ki-pencil">
                                                                                                                                                                        </i>
                                                                                                                                                                </span>
                                                                                                                                                                <span className="menu-title">
                                                                                                                                                                        Edit
                                                                                                                                                                </span>
                                                                                                                                                        </a>
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-item">
                                                                                                                                                        <a className="menu-link" href="#">
                                                                                                                                                                <span className="menu-icon">
                                                                                                                                                                        <i className="ki-filled ki-copy">
                                                                                                                                                                        </i>
                                                                                                                                                                </span>
                                                                                                                                                                <span className="menu-title">
                                                                                                                                                                        Make a copy
                                                                                                                                                                </span>
                                                                                                                                                        </a>
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-separator">
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-item">
                                                                                                                                                        <a className="menu-link" href="#">
                                                                                                                                                                <span className="menu-icon">
                                                                                                                                                                        <i className="ki-filled ki-trash">
                                                                                                                                                                        </i>
                                                                                                                                                                </span>
                                                                                                                                                                <span className="menu-title">
                                                                                                                                                                        Remove
                                                                                                                                                                </span>
                                                                                                                                                        </a>
                                                                                                                                                </div>
                                                                                                                                        </div>
                                                                                                                                </div>
                                                                                                                        </div>
                                                                                                                </td>
                                                                                                        </tr>
                                                                                                        <tr>
                                                                                                                <td className="text-center">
                                                                                                                        <input className="checkbox checkbox-sm" data-datatable-row-check="true" type="checkbox" defaultValue={20} />
                                                                                                                </td>
                                                                                                                <td>
                                                                                                                        <div className="flex items-center gap-2.5">
                                                                                                                                <img className="rounded-full size-7 shrink-0" src="assets/media/avatars/300-25.png" />
                                                                                                                                <a className="text-sm font-medium text-gray-900 hover:text-primary-active" href="#">
                                                                                                                                        Avery Green
                                                                                                                                </a>
                                                                                                                        </div>
                                                                                                                </td>
                                                                                                                <td>
                                                                                                                        <div className="flex items-center gap-1.5 text-gray-800 font-normal">
                                                                                                                                <i className="ki-filled ki-chrome">
                                                                                                                                </i>
                                                                                                                                Chrome on Mac OS X
                                                                                                                        </div>
                                                                                                                </td>
                                                                                                                <td className="text-gray-800 font-normal">
                                                                                                                        192.168.1.11
                                                                                                                </td>
                                                                                                                <td>
                                                                                                                        <div className="flex items-center gap-1.5 text-gray-800 font-normal">
                                                                                                                                <img className="rounded-full size-4 shrink-0" src="assets/media/flags/denmark.svg" />
                                                                                                                                Denmark
                                                                                                                        </div>
                                                                                                                </td>
                                                                                                                <td className="text-gray-800 font-normal">
                                                                                                                        Today, 11:53 am
                                                                                                                </td>
                                                                                                                <td>
                                                                                                                        <div className="menu" data-menu="true">
                                                                                                                                <div className="menu-item" data-menu-item-offset="0, 10px" data-menu-item-placement="bottom-end" data-menu-item-toggle="dropdown" data-menu-item-trigger="click|lg:click">
                                                                                                                                        <button className="menu-toggle btn btn-sm btn-icon btn-light btn-clear">
                                                                                                                                                <i className="ki-filled ki-dots-vertical">
                                                                                                                                                </i>
                                                                                                                                        </button>
                                                                                                                                        <div className="menu-dropdown menu-default w-full max-w-[175px]" data-menu-dismiss="true">
                                                                                                                                                <div className="menu-item">
                                                                                                                                                        <a className="menu-link" href="#">
                                                                                                                                                                <span className="menu-icon">
                                                                                                                                                                        <i className="ki-filled ki-search-list">
                                                                                                                                                                        </i>
                                                                                                                                                                </span>
                                                                                                                                                                <span className="menu-title">
                                                                                                                                                                        View
                                                                                                                                                                </span>
                                                                                                                                                        </a>
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-item">
                                                                                                                                                        <a className="menu-link" href="#">
                                                                                                                                                                <span className="menu-icon">
                                                                                                                                                                        <i className="ki-filled ki-file-up">
                                                                                                                                                                        </i>
                                                                                                                                                                </span>
                                                                                                                                                                <span className="menu-title">
                                                                                                                                                                        Export
                                                                                                                                                                </span>
                                                                                                                                                        </a>
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-separator">
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-item">
                                                                                                                                                        <a className="menu-link" href="#">
                                                                                                                                                                <span className="menu-icon">
                                                                                                                                                                        <i className="ki-filled ki-pencil">
                                                                                                                                                                        </i>
                                                                                                                                                                </span>
                                                                                                                                                                <span className="menu-title">
                                                                                                                                                                        Edit
                                                                                                                                                                </span>
                                                                                                                                                        </a>
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-item">
                                                                                                                                                        <a className="menu-link" href="#">
                                                                                                                                                                <span className="menu-icon">
                                                                                                                                                                        <i className="ki-filled ki-copy">
                                                                                                                                                                        </i>
                                                                                                                                                                </span>
                                                                                                                                                                <span className="menu-title">
                                                                                                                                                                        Make a copy
                                                                                                                                                                </span>
                                                                                                                                                        </a>
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-separator">
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-item">
                                                                                                                                                        <a className="menu-link" href="#">
                                                                                                                                                                <span className="menu-icon">
                                                                                                                                                                        <i className="ki-filled ki-trash">
                                                                                                                                                                        </i>
                                                                                                                                                                </span>
                                                                                                                                                                <span className="menu-title">
                                                                                                                                                                        Remove
                                                                                                                                                                </span>
                                                                                                                                                        </a>
                                                                                                                                                </div>
                                                                                                                                        </div>
                                                                                                                                </div>
                                                                                                                        </div>
                                                                                                                </td>
                                                                                                        </tr>
                                                                                                        <tr>
                                                                                                                <td className="text-center">
                                                                                                                        <input className="checkbox checkbox-sm" data-datatable-row-check="true" type="checkbox" defaultValue={21} />
                                                                                                                </td>
                                                                                                                <td>
                                                                                                                        <div className="flex items-center gap-2.5">
                                                                                                                                <img className="rounded-full size-7 shrink-0" src="assets/media/avatars/300-26.png" />
                                                                                                                                <a className="text-sm font-medium text-gray-900 hover:text-primary-active" href="#">
                                                                                                                                        Ella White
                                                                                                                                </a>
                                                                                                                        </div>
                                                                                                                </td>
                                                                                                                <td>
                                                                                                                        <div className="flex items-center gap-1.5 text-gray-800 font-normal">
                                                                                                                                <i className="ki-filled ki-chrome">
                                                                                                                                </i>
                                                                                                                                Chrome on Mac OS X
                                                                                                                        </div>
                                                                                                                </td>
                                                                                                                <td className="text-gray-800 font-normal">
                                                                                                                        192.168.1.12
                                                                                                                </td>
                                                                                                                <td>
                                                                                                                        <div className="flex items-center gap-1.5 text-gray-800 font-normal">
                                                                                                                                <img className="rounded-full size-4 shrink-0" src="assets/media/flags/belgium.svg" />
                                                                                                                                Belgium
                                                                                                                        </div>
                                                                                                                </td>
                                                                                                                <td className="text-gray-800 font-normal">
                                                                                                                        Current session
                                                                                                                </td>
                                                                                                                <td>
                                                                                                                        <div className="menu" data-menu="true">
                                                                                                                                <div className="menu-item" data-menu-item-offset="0, 10px" data-menu-item-placement="bottom-end" data-menu-item-toggle="dropdown" data-menu-item-trigger="click|lg:click">
                                                                                                                                        <button className="menu-toggle btn btn-sm btn-icon btn-light btn-clear">
                                                                                                                                                <i className="ki-filled ki-dots-vertical">
                                                                                                                                                </i>
                                                                                                                                        </button>
                                                                                                                                        <div className="menu-dropdown menu-default w-full max-w-[175px]" data-menu-dismiss="true">
                                                                                                                                                <div className="menu-item">
                                                                                                                                                        <a className="menu-link" href="#">
                                                                                                                                                                <span className="menu-icon">
                                                                                                                                                                        <i className="ki-filled ki-search-list">
                                                                                                                                                                        </i>
                                                                                                                                                                </span>
                                                                                                                                                                <span className="menu-title">
                                                                                                                                                                        View
                                                                                                                                                                </span>
                                                                                                                                                        </a>
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-item">
                                                                                                                                                        <a className="menu-link" href="#">
                                                                                                                                                                <span className="menu-icon">
                                                                                                                                                                        <i className="ki-filled ki-file-up">
                                                                                                                                                                        </i>
                                                                                                                                                                </span>
                                                                                                                                                                <span className="menu-title">
                                                                                                                                                                        Export
                                                                                                                                                                </span>
                                                                                                                                                        </a>
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-separator">
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-item">
                                                                                                                                                        <a className="menu-link" href="#">
                                                                                                                                                                <span className="menu-icon">
                                                                                                                                                                        <i className="ki-filled ki-pencil">
                                                                                                                                                                        </i>
                                                                                                                                                                </span>
                                                                                                                                                                <span className="menu-title">
                                                                                                                                                                        Edit
                                                                                                                                                                </span>
                                                                                                                                                        </a>
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-item">
                                                                                                                                                        <a className="menu-link" href="#">
                                                                                                                                                                <span className="menu-icon">
                                                                                                                                                                        <i className="ki-filled ki-copy">
                                                                                                                                                                        </i>
                                                                                                                                                                </span>
                                                                                                                                                                <span className="menu-title">
                                                                                                                                                                        Make a copy
                                                                                                                                                                </span>
                                                                                                                                                        </a>
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-separator">
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-item">
                                                                                                                                                        <a className="menu-link" href="#">
                                                                                                                                                                <span className="menu-icon">
                                                                                                                                                                        <i className="ki-filled ki-trash">
                                                                                                                                                                        </i>
                                                                                                                                                                </span>
                                                                                                                                                                <span className="menu-title">
                                                                                                                                                                        Remove
                                                                                                                                                                </span>
                                                                                                                                                        </a>
                                                                                                                                                </div>
                                                                                                                                        </div>
                                                                                                                                </div>
                                                                                                                        </div>
                                                                                                                </td>
                                                                                                        </tr>
                                                                                                        <tr>
                                                                                                                <td className="text-center">
                                                                                                                        <input className="checkbox checkbox-sm" data-datatable-row-check="true" type="checkbox" defaultValue={22} />
                                                                                                                </td>
                                                                                                                <td>
                                                                                                                        <div className="flex items-center gap-2.5">
                                                                                                                                <img className="rounded-full size-7 shrink-0" src="assets/media/avatars/300-27.png" />
                                                                                                                                <a className="text-sm font-medium text-gray-900 hover:text-primary-active" href="#">
                                                                                                                                        Henry King
                                                                                                                                </a>
                                                                                                                        </div>
                                                                                                                </td>
                                                                                                                <td>
                                                                                                                        <div className="flex items-center gap-1.5 text-gray-800 font-normal">
                                                                                                                                <i className="ki-filled ki-chrome">
                                                                                                                                </i>
                                                                                                                                Chrome on Mac OS X
                                                                                                                        </div>
                                                                                                                </td>
                                                                                                                <td className="text-gray-800 font-normal">
                                                                                                                        192.168.1.13
                                                                                                                </td>
                                                                                                                <td>
                                                                                                                        <div className="flex items-center gap-1.5 text-gray-800 font-normal">
                                                                                                                                <img className="rounded-full size-4 shrink-0" src="assets/media/flags/austria.svg" />
                                                                                                                                Austria
                                                                                                                        </div>
                                                                                                                </td>
                                                                                                                <td className="text-gray-800 font-normal">
                                                                                                                        Month ago
                                                                                                                </td>
                                                                                                                <td>
                                                                                                                        <div className="menu" data-menu="true">
                                                                                                                                <div className="menu-item" data-menu-item-offset="0, 10px" data-menu-item-placement="bottom-end" data-menu-item-toggle="dropdown" data-menu-item-trigger="click|lg:click">
                                                                                                                                        <button className="menu-toggle btn btn-sm btn-icon btn-light btn-clear">
                                                                                                                                                <i className="ki-filled ki-dots-vertical">
                                                                                                                                                </i>
                                                                                                                                        </button>
                                                                                                                                        <div className="menu-dropdown menu-default w-full max-w-[175px]" data-menu-dismiss="true">
                                                                                                                                                <div className="menu-item">
                                                                                                                                                        <a className="menu-link" href="#">
                                                                                                                                                                <span className="menu-icon">
                                                                                                                                                                        <i className="ki-filled ki-search-list">
                                                                                                                                                                        </i>
                                                                                                                                                                </span>
                                                                                                                                                                <span className="menu-title">
                                                                                                                                                                        View
                                                                                                                                                                </span>
                                                                                                                                                        </a>
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-item">
                                                                                                                                                        <a className="menu-link" href="#">
                                                                                                                                                                <span className="menu-icon">
                                                                                                                                                                        <i className="ki-filled ki-file-up">
                                                                                                                                                                        </i>
                                                                                                                                                                </span>
                                                                                                                                                                <span className="menu-title">
                                                                                                                                                                        Export
                                                                                                                                                                </span>
                                                                                                                                                        </a>
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-separator">
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-item">
                                                                                                                                                        <a className="menu-link" href="#">
                                                                                                                                                                <span className="menu-icon">
                                                                                                                                                                        <i className="ki-filled ki-pencil">
                                                                                                                                                                        </i>
                                                                                                                                                                </span>
                                                                                                                                                                <span className="menu-title">
                                                                                                                                                                        Edit
                                                                                                                                                                </span>
                                                                                                                                                        </a>
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-item">
                                                                                                                                                        <a className="menu-link" href="#">
                                                                                                                                                                <span className="menu-icon">
                                                                                                                                                                        <i className="ki-filled ki-copy">
                                                                                                                                                                        </i>
                                                                                                                                                                </span>
                                                                                                                                                                <span className="menu-title">
                                                                                                                                                                        Make a copy
                                                                                                                                                                </span>
                                                                                                                                                        </a>
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-separator">
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-item">
                                                                                                                                                        <a className="menu-link" href="#">
                                                                                                                                                                <span className="menu-icon">
                                                                                                                                                                        <i className="ki-filled ki-trash">
                                                                                                                                                                        </i>
                                                                                                                                                                </span>
                                                                                                                                                                <span className="menu-title">
                                                                                                                                                                        Remove
                                                                                                                                                                </span>
                                                                                                                                                        </a>
                                                                                                                                                </div>
                                                                                                                                        </div>
                                                                                                                                </div>
                                                                                                                        </div>
                                                                                                                </td>
                                                                                                        </tr>
                                                                                                        <tr>
                                                                                                                <td className="text-center">
                                                                                                                        <input className="checkbox checkbox-sm" data-datatable-row-check="true" type="checkbox" defaultValue={23} />
                                                                                                                </td>
                                                                                                                <td>
                                                                                                                        <div className="flex items-center gap-2.5">
                                                                                                                                <img className="rounded-full size-7 shrink-0" src="assets/media/avatars/300-28.png" />
                                                                                                                                <a className="text-sm font-medium text-gray-900 hover:text-primary-active" href="#">
                                                                                                                                        Olivia Green
                                                                                                                                </a>
                                                                                                                        </div>
                                                                                                                </td>
                                                                                                                <td>
                                                                                                                        <div className="flex items-center gap-1.5 text-gray-800 font-normal">
                                                                                                                                <i className="ki-filled ki-chrome">
                                                                                                                                </i>
                                                                                                                                Chrome on Mac OS X
                                                                                                                        </div>
                                                                                                                </td>
                                                                                                                <td className="text-gray-800 font-normal">
                                                                                                                        192.168.1.14
                                                                                                                </td>
                                                                                                                <td>
                                                                                                                        <div className="flex items-center gap-1.5 text-gray-800 font-normal">
                                                                                                                                <img className="rounded-full size-4 shrink-0" src="assets/media/flags/poland.svg" />
                                                                                                                                Poland
                                                                                                                        </div>
                                                                                                                </td>
                                                                                                                <td className="text-gray-800 font-normal">
                                                                                                                        Today, 15:02
                                                                                                                </td>
                                                                                                                <td>
                                                                                                                        <div className="menu" data-menu="true">
                                                                                                                                <div className="menu-item" data-menu-item-offset="0, 10px" data-menu-item-placement="bottom-end" data-menu-item-toggle="dropdown" data-menu-item-trigger="click|lg:click">
                                                                                                                                        <button className="menu-toggle btn btn-sm btn-icon btn-light btn-clear">
                                                                                                                                                <i className="ki-filled ki-dots-vertical">
                                                                                                                                                </i>
                                                                                                                                        </button>
                                                                                                                                        <div className="menu-dropdown menu-default w-full max-w-[175px]" data-menu-dismiss="true">
                                                                                                                                                <div className="menu-item">
                                                                                                                                                        <a className="menu-link" href="#">
                                                                                                                                                                <span className="menu-icon">
                                                                                                                                                                        <i className="ki-filled ki-search-list">
                                                                                                                                                                        </i>
                                                                                                                                                                </span>
                                                                                                                                                                <span className="menu-title">
                                                                                                                                                                        View
                                                                                                                                                                </span>
                                                                                                                                                        </a>
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-item">
                                                                                                                                                        <a className="menu-link" href="#">
                                                                                                                                                                <span className="menu-icon">
                                                                                                                                                                        <i className="ki-filled ki-file-up">
                                                                                                                                                                        </i>
                                                                                                                                                                </span>
                                                                                                                                                                <span className="menu-title">
                                                                                                                                                                        Export
                                                                                                                                                                </span>
                                                                                                                                                        </a>
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-separator">
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-item">
                                                                                                                                                        <a className="menu-link" href="#">
                                                                                                                                                                <span className="menu-icon">
                                                                                                                                                                        <i className="ki-filled ki-pencil">
                                                                                                                                                                        </i>
                                                                                                                                                                </span>
                                                                                                                                                                <span className="menu-title">
                                                                                                                                                                        Edit
                                                                                                                                                                </span>
                                                                                                                                                        </a>
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-item">
                                                                                                                                                        <a className="menu-link" href="#">
                                                                                                                                                                <span className="menu-icon">
                                                                                                                                                                        <i className="ki-filled ki-copy">
                                                                                                                                                                        </i>
                                                                                                                                                                </span>
                                                                                                                                                                <span className="menu-title">
                                                                                                                                                                        Make a copy
                                                                                                                                                                </span>
                                                                                                                                                        </a>
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-separator">
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-item">
                                                                                                                                                        <a className="menu-link" href="#">
                                                                                                                                                                <span className="menu-icon">
                                                                                                                                                                        <i className="ki-filled ki-trash">
                                                                                                                                                                        </i>
                                                                                                                                                                </span>
                                                                                                                                                                <span className="menu-title">
                                                                                                                                                                        Remove
                                                                                                                                                                </span>
                                                                                                                                                        </a>
                                                                                                                                                </div>
                                                                                                                                        </div>
                                                                                                                                </div>
                                                                                                                        </div>
                                                                                                                </td>
                                                                                                        </tr>
                                                                                                        <tr>
                                                                                                                <td className="text-center">
                                                                                                                        <input className="checkbox checkbox-sm" data-datatable-row-check="true" type="checkbox" defaultValue={24} />
                                                                                                                </td>
                                                                                                                <td>
                                                                                                                        <div className="flex items-center gap-2.5">
                                                                                                                                <img className="rounded-full size-7 shrink-0" src="assets/media/avatars/300-29.png" />
                                                                                                                                <a className="text-sm font-medium text-gray-900 hover:text-primary-active" href="#">
                                                                                                                                        Mason Lewis
                                                                                                                                </a>
                                                                                                                        </div>
                                                                                                                </td>
                                                                                                                <td>
                                                                                                                        <div className="flex items-center gap-1.5 text-gray-800 font-normal">
                                                                                                                                <i className="ki-filled ki-chrome">
                                                                                                                                </i>
                                                                                                                                Chrome on Mac OS X
                                                                                                                        </div>
                                                                                                                </td>
                                                                                                                <td className="text-gray-800 font-normal">
                                                                                                                        192.168.1.15
                                                                                                                </td>
                                                                                                                <td>
                                                                                                                        <div className="flex items-center gap-1.5 text-gray-800 font-normal">
                                                                                                                                <img className="rounded-full size-4 shrink-0" src="assets/media/flags/finland.svg" />
                                                                                                                                Finland
                                                                                                                        </div>
                                                                                                                </td>
                                                                                                                <td className="text-gray-800 font-normal">
                                                                                                                        Current session
                                                                                                                </td>
                                                                                                                <td>
                                                                                                                        <div className="menu" data-menu="true">
                                                                                                                                <div className="menu-item" data-menu-item-offset="0, 10px" data-menu-item-placement="bottom-end" data-menu-item-toggle="dropdown" data-menu-item-trigger="click|lg:click">
                                                                                                                                        <button className="menu-toggle btn btn-sm btn-icon btn-light btn-clear">
                                                                                                                                                <i className="ki-filled ki-dots-vertical">
                                                                                                                                                </i>
                                                                                                                                        </button>
                                                                                                                                        <div className="menu-dropdown menu-default w-full max-w-[175px]" data-menu-dismiss="true">
                                                                                                                                                <div className="menu-item">
                                                                                                                                                        <a className="menu-link" href="#">
                                                                                                                                                                <span className="menu-icon">
                                                                                                                                                                        <i className="ki-filled ki-search-list">
                                                                                                                                                                        </i>
                                                                                                                                                                </span>
                                                                                                                                                                <span className="menu-title">
                                                                                                                                                                        View
                                                                                                                                                                </span>
                                                                                                                                                        </a>
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-item">
                                                                                                                                                        <a className="menu-link" href="#">
                                                                                                                                                                <span className="menu-icon">
                                                                                                                                                                        <i className="ki-filled ki-file-up">
                                                                                                                                                                        </i>
                                                                                                                                                                </span>
                                                                                                                                                                <span className="menu-title">
                                                                                                                                                                        Export
                                                                                                                                                                </span>
                                                                                                                                                        </a>
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-separator">
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-item">
                                                                                                                                                        <a className="menu-link" href="#">
                                                                                                                                                                <span className="menu-icon">
                                                                                                                                                                        <i className="ki-filled ki-pencil">
                                                                                                                                                                        </i>
                                                                                                                                                                </span>
                                                                                                                                                                <span className="menu-title">
                                                                                                                                                                        Edit
                                                                                                                                                                </span>
                                                                                                                                                        </a>
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-item">
                                                                                                                                                        <a className="menu-link" href="#">
                                                                                                                                                                <span className="menu-icon">
                                                                                                                                                                        <i className="ki-filled ki-copy">
                                                                                                                                                                        </i>
                                                                                                                                                                </span>
                                                                                                                                                                <span className="menu-title">
                                                                                                                                                                        Make a copy
                                                                                                                                                                </span>
                                                                                                                                                        </a>
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-separator">
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-item">
                                                                                                                                                        <a className="menu-link" href="#">
                                                                                                                                                                <span className="menu-icon">
                                                                                                                                                                        <i className="ki-filled ki-trash">
                                                                                                                                                                        </i>
                                                                                                                                                                </span>
                                                                                                                                                                <span className="menu-title">
                                                                                                                                                                        Remove
                                                                                                                                                                </span>
                                                                                                                                                        </a>
                                                                                                                                                </div>
                                                                                                                                        </div>
                                                                                                                                </div>
                                                                                                                        </div>
                                                                                                                </td>
                                                                                                        </tr>
                                                                                                        <tr>
                                                                                                                <td className="text-center">
                                                                                                                        <input className="checkbox checkbox-sm" data-datatable-row-check="true" type="checkbox" defaultValue={25} />
                                                                                                                </td>
                                                                                                                <td>
                                                                                                                        <div className="flex items-center gap-2.5">
                                                                                                                                <img className="rounded-full size-7 shrink-0" src="assets/media/avatars/300-30.png" />
                                                                                                                                <a className="text-sm font-medium text-gray-900 hover:text-primary-active" href="#">
                                                                                                                                        Sophia Lee
                                                                                                                                </a>
                                                                                                                        </div>
                                                                                                                </td>
                                                                                                                <td>
                                                                                                                        <div className="flex items-center gap-1.5 text-gray-800 font-normal">
                                                                                                                                <i className="ki-filled ki-chrome">
                                                                                                                                </i>
                                                                                                                                Chrome on Mac OS X
                                                                                                                        </div>
                                                                                                                </td>
                                                                                                                <td className="text-gray-800 font-normal">
                                                                                                                        192.168.1.16
                                                                                                                </td>
                                                                                                                <td>
                                                                                                                        <div className="flex items-center gap-1.5 text-gray-800 font-normal">
                                                                                                                                <img className="rounded-full size-4 shrink-0" src="assets/media/flags/ireland.svg" />
                                                                                                                                Ireland
                                                                                                                        </div>
                                                                                                                </td>
                                                                                                                <td className="text-gray-800 font-normal">
                                                                                                                        Week ago
                                                                                                                </td>
                                                                                                                <td>
                                                                                                                        <div className="menu" data-menu="true">
                                                                                                                                <div className="menu-item" data-menu-item-offset="0, 10px" data-menu-item-placement="bottom-end" data-menu-item-toggle="dropdown" data-menu-item-trigger="click|lg:click">
                                                                                                                                        <button className="menu-toggle btn btn-sm btn-icon btn-light btn-clear">
                                                                                                                                                <i className="ki-filled ki-dots-vertical">
                                                                                                                                                </i>
                                                                                                                                        </button>
                                                                                                                                        <div className="menu-dropdown menu-default w-full max-w-[175px]" data-menu-dismiss="true">
                                                                                                                                                <div className="menu-item">
                                                                                                                                                        <a className="menu-link" href="#">
                                                                                                                                                                <span className="menu-icon">
                                                                                                                                                                        <i className="ki-filled ki-search-list">
                                                                                                                                                                        </i>
                                                                                                                                                                </span>
                                                                                                                                                                <span className="menu-title">
                                                                                                                                                                        View
                                                                                                                                                                </span>
                                                                                                                                                        </a>
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-item">
                                                                                                                                                        <a className="menu-link" href="#">
                                                                                                                                                                <span className="menu-icon">
                                                                                                                                                                        <i className="ki-filled ki-file-up">
                                                                                                                                                                        </i>
                                                                                                                                                                </span>
                                                                                                                                                                <span className="menu-title">
                                                                                                                                                                        Export
                                                                                                                                                                </span>
                                                                                                                                                        </a>
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-separator">
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-item">
                                                                                                                                                        <a className="menu-link" href="#">
                                                                                                                                                                <span className="menu-icon">
                                                                                                                                                                        <i className="ki-filled ki-pencil">
                                                                                                                                                                        </i>
                                                                                                                                                                </span>
                                                                                                                                                                <span className="menu-title">
                                                                                                                                                                        Edit
                                                                                                                                                                </span>
                                                                                                                                                        </a>
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-item">
                                                                                                                                                        <a className="menu-link" href="#">
                                                                                                                                                                <span className="menu-icon">
                                                                                                                                                                        <i className="ki-filled ki-copy">
                                                                                                                                                                        </i>
                                                                                                                                                                </span>
                                                                                                                                                                <span className="menu-title">
                                                                                                                                                                        Make a copy
                                                                                                                                                                </span>
                                                                                                                                                        </a>
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-separator">
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-item">
                                                                                                                                                        <a className="menu-link" href="#">
                                                                                                                                                                <span className="menu-icon">
                                                                                                                                                                        <i className="ki-filled ki-trash">
                                                                                                                                                                        </i>
                                                                                                                                                                </span>
                                                                                                                                                                <span className="menu-title">
                                                                                                                                                                        Remove
                                                                                                                                                                </span>
                                                                                                                                                        </a>
                                                                                                                                                </div>
                                                                                                                                        </div>
                                                                                                                                </div>
                                                                                                                        </div>
                                                                                                                </td>
                                                                                                        </tr>
                                                                                                        <tr>
                                                                                                                <td className="text-center">
                                                                                                                        <input className="checkbox checkbox-sm" data-datatable-row-check="true" type="checkbox" defaultValue={26} />
                                                                                                                </td>
                                                                                                                <td>
                                                                                                                        <div className="flex items-center gap-2.5">
                                                                                                                                <img className="rounded-full size-7 shrink-0" src="assets/media/avatars/300-31.png" />
                                                                                                                                <a className="text-sm font-medium text-gray-900 hover:text-primary-active" href="#">
                                                                                                                                        Matthew Martinez
                                                                                                                                </a>
                                                                                                                        </div>
                                                                                                                </td>
                                                                                                                <td>
                                                                                                                        <div className="flex items-center gap-1.5 text-gray-800 font-normal">
                                                                                                                                <i className="ki-filled ki-chrome">
                                                                                                                                </i>
                                                                                                                                Chrome on Mac OS X
                                                                                                                        </div>
                                                                                                                </td>
                                                                                                                <td className="text-gray-800 font-normal">
                                                                                                                        192.168.1.17
                                                                                                                </td>
                                                                                                                <td>
                                                                                                                        <div className="flex items-center gap-1.5 text-gray-800 font-normal">
                                                                                                                                <img className="rounded-full size-4 shrink-0" src="assets/media/flags/italy.svg" />
                                                                                                                                Italy
                                                                                                                        </div>
                                                                                                                </td>
                                                                                                                <td className="text-gray-800 font-normal">
                                                                                                                        Month ago
                                                                                                                </td>
                                                                                                                <td>
                                                                                                                        <div className="menu" data-menu="true">
                                                                                                                                <div className="menu-item" data-menu-item-offset="0, 10px" data-menu-item-placement="bottom-end" data-menu-item-toggle="dropdown" data-menu-item-trigger="click|lg:click">
                                                                                                                                        <button className="menu-toggle btn btn-sm btn-icon btn-light btn-clear">
                                                                                                                                                <i className="ki-filled ki-dots-vertical">
                                                                                                                                                </i>
                                                                                                                                        </button>
                                                                                                                                        <div className="menu-dropdown menu-default w-full max-w-[175px]" data-menu-dismiss="true">
                                                                                                                                                <div className="menu-item">
                                                                                                                                                        <a className="menu-link" href="#">
                                                                                                                                                                <span className="menu-icon">
                                                                                                                                                                        <i className="ki-filled ki-search-list">
                                                                                                                                                                        </i>
                                                                                                                                                                </span>
                                                                                                                                                                <span className="menu-title">
                                                                                                                                                                        View
                                                                                                                                                                </span>
                                                                                                                                                        </a>
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-item">
                                                                                                                                                        <a className="menu-link" href="#">
                                                                                                                                                                <span className="menu-icon">
                                                                                                                                                                        <i className="ki-filled ki-file-up">
                                                                                                                                                                        </i>
                                                                                                                                                                </span>
                                                                                                                                                                <span className="menu-title">
                                                                                                                                                                        Export
                                                                                                                                                                </span>
                                                                                                                                                        </a>
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-separator">
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-item">
                                                                                                                                                        <a className="menu-link" href="#">
                                                                                                                                                                <span className="menu-icon">
                                                                                                                                                                        <i className="ki-filled ki-pencil">
                                                                                                                                                                        </i>
                                                                                                                                                                </span>
                                                                                                                                                                <span className="menu-title">
                                                                                                                                                                        Edit
                                                                                                                                                                </span>
                                                                                                                                                        </a>
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-item">
                                                                                                                                                        <a className="menu-link" href="#">
                                                                                                                                                                <span className="menu-icon">
                                                                                                                                                                        <i className="ki-filled ki-copy">
                                                                                                                                                                        </i>
                                                                                                                                                                </span>
                                                                                                                                                                <span className="menu-title">
                                                                                                                                                                        Make a copy
                                                                                                                                                                </span>
                                                                                                                                                        </a>
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-separator">
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-item">
                                                                                                                                                        <a className="menu-link" href="#">
                                                                                                                                                                <span className="menu-icon">
                                                                                                                                                                        <i className="ki-filled ki-trash">
                                                                                                                                                                        </i>
                                                                                                                                                                </span>
                                                                                                                                                                <span className="menu-title">
                                                                                                                                                                        Remove
                                                                                                                                                                </span>
                                                                                                                                                        </a>
                                                                                                                                                </div>
                                                                                                                                        </div>
                                                                                                                                </div>
                                                                                                                        </div>
                                                                                                                </td>
                                                                                                        </tr>
                                                                                                        <tr>
                                                                                                                <td className="text-center">
                                                                                                                        <input className="checkbox checkbox-sm" data-datatable-row-check="true" type="checkbox" defaultValue={27} />
                                                                                                                </td>
                                                                                                                <td>
                                                                                                                        <div className="flex items-center gap-2.5">
                                                                                                                                <img className="rounded-full size-7 shrink-0" src="assets/media/avatars/300-32.png" />
                                                                                                                                <a className="text-sm font-medium text-gray-900 hover:text-primary-active" href="#">
                                                                                                                                        Noah Wilson
                                                                                                                                </a>
                                                                                                                        </div>
                                                                                                                </td>
                                                                                                                <td>
                                                                                                                        <div className="flex items-center gap-1.5 text-gray-800 font-normal">
                                                                                                                                <i className="ki-filled ki-chrome">
                                                                                                                                </i>
                                                                                                                                Chrome on Mac OS X
                                                                                                                        </div>
                                                                                                                </td>
                                                                                                                <td className="text-gray-800 font-normal">
                                                                                                                        192.168.1.18
                                                                                                                </td>
                                                                                                                <td>
                                                                                                                        <div className="flex items-center gap-1.5 text-gray-800 font-normal">
                                                                                                                                <img className="rounded-full size-4 shrink-0" src="assets/media/flags/sweden.svg" />
                                                                                                                                Sweden
                                                                                                                        </div>
                                                                                                                </td>
                                                                                                                <td className="text-gray-800 font-normal">
                                                                                                                        Today, 14:10
                                                                                                                </td>
                                                                                                                <td>
                                                                                                                        <div className="menu" data-menu="true">
                                                                                                                                <div className="menu-item" data-menu-item-offset="0, 10px" data-menu-item-placement="bottom-end" data-menu-item-toggle="dropdown" data-menu-item-trigger="click|lg:click">
                                                                                                                                        <button className="menu-toggle btn btn-sm btn-icon btn-light btn-clear">
                                                                                                                                                <i className="ki-filled ki-dots-vertical">
                                                                                                                                                </i>
                                                                                                                                        </button>
                                                                                                                                        <div className="menu-dropdown menu-default w-full max-w-[175px]" data-menu-dismiss="true">
                                                                                                                                                <div className="menu-item">
                                                                                                                                                        <a className="menu-link" href="#">
                                                                                                                                                                <span className="menu-icon">
                                                                                                                                                                        <i className="ki-filled ki-search-list">
                                                                                                                                                                        </i>
                                                                                                                                                                </span>
                                                                                                                                                                <span className="menu-title">
                                                                                                                                                                        View
                                                                                                                                                                </span>
                                                                                                                                                        </a>
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-item">
                                                                                                                                                        <a className="menu-link" href="#">
                                                                                                                                                                <span className="menu-icon">
                                                                                                                                                                        <i className="ki-filled ki-file-up">
                                                                                                                                                                        </i>
                                                                                                                                                                </span>
                                                                                                                                                                <span className="menu-title">
                                                                                                                                                                        Export
                                                                                                                                                                </span>
                                                                                                                                                        </a>
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-separator">
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-item">
                                                                                                                                                        <a className="menu-link" href="#">
                                                                                                                                                                <span className="menu-icon">
                                                                                                                                                                        <i className="ki-filled ki-pencil">
                                                                                                                                                                        </i>
                                                                                                                                                                </span>
                                                                                                                                                                <span className="menu-title">
                                                                                                                                                                        Edit
                                                                                                                                                                </span>
                                                                                                                                                        </a>
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-item">
                                                                                                                                                        <a className="menu-link" href="#">
                                                                                                                                                                <span className="menu-icon">
                                                                                                                                                                        <i className="ki-filled ki-copy">
                                                                                                                                                                        </i>
                                                                                                                                                                </span>
                                                                                                                                                                <span className="menu-title">
                                                                                                                                                                        Make a copy
                                                                                                                                                                </span>
                                                                                                                                                        </a>
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-separator">
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-item">
                                                                                                                                                        <a className="menu-link" href="#">
                                                                                                                                                                <span className="menu-icon">
                                                                                                                                                                        <i className="ki-filled ki-trash">
                                                                                                                                                                        </i>
                                                                                                                                                                </span>
                                                                                                                                                                <span className="menu-title">
                                                                                                                                                                        Remove
                                                                                                                                                                </span>
                                                                                                                                                        </a>
                                                                                                                                                </div>
                                                                                                                                        </div>
                                                                                                                                </div>
                                                                                                                        </div>
                                                                                                                </td>
                                                                                                        </tr>
                                                                                                        <tr>
                                                                                                                <td className="text-center">
                                                                                                                        <input className="checkbox checkbox-sm" data-datatable-row-check="true" type="checkbox" defaultValue={28} />
                                                                                                                </td>
                                                                                                                <td>
                                                                                                                        <div className="flex items-center gap-2.5">
                                                                                                                                <img className="rounded-full size-7 shrink-0" src="assets/media/avatars/300-33.png" />
                                                                                                                                <a className="text-sm font-medium text-gray-900 hover:text-primary-active" href="#">
                                                                                                                                        Mia Brown
                                                                                                                                </a>
                                                                                                                        </div>
                                                                                                                </td>
                                                                                                                <td>
                                                                                                                        <div className="flex items-center gap-1.5 text-gray-800 font-normal">
                                                                                                                                <i className="ki-filled ki-chrome">
                                                                                                                                </i>
                                                                                                                                Chrome on Mac OS X
                                                                                                                        </div>
                                                                                                                </td>
                                                                                                                <td className="text-gray-800 font-normal">
                                                                                                                        192.168.1.19
                                                                                                                </td>
                                                                                                                <td>
                                                                                                                        <div className="flex items-center gap-1.5 text-gray-800 font-normal">
                                                                                                                                <img className="rounded-full size-4 shrink-0" src="assets/media/flags/switzerland.svg" />
                                                                                                                                Switzerland
                                                                                                                        </div>
                                                                                                                </td>
                                                                                                                <td className="text-gray-800 font-normal">
                                                                                                                        Yesterday
                                                                                                                </td>
                                                                                                                <td>
                                                                                                                        <div className="menu" data-menu="true">
                                                                                                                                <div className="menu-item" data-menu-item-offset="0, 10px" data-menu-item-placement="bottom-end" data-menu-item-toggle="dropdown" data-menu-item-trigger="click|lg:click">
                                                                                                                                        <button className="menu-toggle btn btn-sm btn-icon btn-light btn-clear">
                                                                                                                                                <i className="ki-filled ki-dots-vertical">
                                                                                                                                                </i>
                                                                                                                                        </button>
                                                                                                                                        <div className="menu-dropdown menu-default w-full max-w-[175px]" data-menu-dismiss="true">
                                                                                                                                                <div className="menu-item">
                                                                                                                                                        <a className="menu-link" href="#">
                                                                                                                                                                <span className="menu-icon">
                                                                                                                                                                        <i className="ki-filled ki-search-list">
                                                                                                                                                                        </i>
                                                                                                                                                                </span>
                                                                                                                                                                <span className="menu-title">
                                                                                                                                                                        View
                                                                                                                                                                </span>
                                                                                                                                                        </a>
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-item">
                                                                                                                                                        <a className="menu-link" href="#">
                                                                                                                                                                <span className="menu-icon">
                                                                                                                                                                        <i className="ki-filled ki-file-up">
                                                                                                                                                                        </i>
                                                                                                                                                                </span>
                                                                                                                                                                <span className="menu-title">
                                                                                                                                                                        Export
                                                                                                                                                                </span>
                                                                                                                                                        </a>
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-separator">
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-item">
                                                                                                                                                        <a className="menu-link" href="#">
                                                                                                                                                                <span className="menu-icon">
                                                                                                                                                                        <i className="ki-filled ki-pencil">
                                                                                                                                                                        </i>
                                                                                                                                                                </span>
                                                                                                                                                                <span className="menu-title">
                                                                                                                                                                        Edit
                                                                                                                                                                </span>
                                                                                                                                                        </a>
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-item">
                                                                                                                                                        <a className="menu-link" href="#">
                                                                                                                                                                <span className="menu-icon">
                                                                                                                                                                        <i className="ki-filled ki-copy">
                                                                                                                                                                        </i>
                                                                                                                                                                </span>
                                                                                                                                                                <span className="menu-title">
                                                                                                                                                                        Make a copy
                                                                                                                                                                </span>
                                                                                                                                                        </a>
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-separator">
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-item">
                                                                                                                                                        <a className="menu-link" href="#">
                                                                                                                                                                <span className="menu-icon">
                                                                                                                                                                        <i className="ki-filled ki-trash">
                                                                                                                                                                        </i>
                                                                                                                                                                </span>
                                                                                                                                                                <span className="menu-title">
                                                                                                                                                                        Remove
                                                                                                                                                                </span>
                                                                                                                                                        </a>
                                                                                                                                                </div>
                                                                                                                                        </div>
                                                                                                                                </div>
                                                                                                                        </div>
                                                                                                                </td>
                                                                                                        </tr>
                                                                                                        <tr>
                                                                                                                <td className="text-center">
                                                                                                                        <input className="checkbox checkbox-sm" data-datatable-row-check="true" type="checkbox" defaultValue={29} />
                                                                                                                </td>
                                                                                                                <td>
                                                                                                                        <div className="flex items-center gap-2.5">
                                                                                                                                <img className="rounded-full size-7 shrink-0" src="assets/media/avatars/300-34.png" />
                                                                                                                                <a className="text-sm font-medium text-gray-900 hover:text-primary-active" href="#">
                                                                                                                                        Oliver Taylor
                                                                                                                                </a>
                                                                                                                        </div>
                                                                                                                </td>
                                                                                                                <td>
                                                                                                                        <div className="flex items-center gap-1.5 text-gray-800 font-normal">
                                                                                                                                <i className="ki-filled ki-chrome">
                                                                                                                                </i>
                                                                                                                                Chrome on Mac OS X
                                                                                                                        </div>
                                                                                                                </td>
                                                                                                                <td className="text-gray-800 font-normal">
                                                                                                                        192.168.1.20
                                                                                                                </td>
                                                                                                                <td>
                                                                                                                        <div className="flex items-center gap-1.5 text-gray-800 font-normal">
                                                                                                                                <img className="rounded-full size-4 shrink-0" src="assets/media/flags/portugal.svg" />
                                                                                                                                Portugal
                                                                                                                        </div>
                                                                                                                </td>
                                                                                                                <td className="text-gray-800 font-normal">
                                                                                                                        2 days ago
                                                                                                                </td>
                                                                                                                <td>
                                                                                                                        <div className="menu" data-menu="true">
                                                                                                                                <div className="menu-item" data-menu-item-offset="0, 10px" data-menu-item-placement="bottom-end" data-menu-item-toggle="dropdown" data-menu-item-trigger="click|lg:click">
                                                                                                                                        <button className="menu-toggle btn btn-sm btn-icon btn-light btn-clear">
                                                                                                                                                <i className="ki-filled ki-dots-vertical">
                                                                                                                                                </i>
                                                                                                                                        </button>
                                                                                                                                        <div className="menu-dropdown menu-default w-full max-w-[175px]" data-menu-dismiss="true">
                                                                                                                                                <div className="menu-item">
                                                                                                                                                        <a className="menu-link" href="#">
                                                                                                                                                                <span className="menu-icon">
                                                                                                                                                                        <i className="ki-filled ki-search-list">
                                                                                                                                                                        </i>
                                                                                                                                                                </span>
                                                                                                                                                                <span className="menu-title">
                                                                                                                                                                        View
                                                                                                                                                                </span>
                                                                                                                                                        </a>
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-item">
                                                                                                                                                        <a className="menu-link" href="#">
                                                                                                                                                                <span className="menu-icon">
                                                                                                                                                                        <i className="ki-filled ki-file-up">
                                                                                                                                                                        </i>
                                                                                                                                                                </span>
                                                                                                                                                                <span className="menu-title">
                                                                                                                                                                        Export
                                                                                                                                                                </span>
                                                                                                                                                        </a>
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-separator">
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-item">
                                                                                                                                                        <a className="menu-link" href="#">
                                                                                                                                                                <span className="menu-icon">
                                                                                                                                                                        <i className="ki-filled ki-pencil">
                                                                                                                                                                        </i>
                                                                                                                                                                </span>
                                                                                                                                                                <span className="menu-title">
                                                                                                                                                                        Edit
                                                                                                                                                                </span>
                                                                                                                                                        </a>
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-item">
                                                                                                                                                        <a className="menu-link" href="#">
                                                                                                                                                                <span className="menu-icon">
                                                                                                                                                                        <i className="ki-filled ki-copy">
                                                                                                                                                                        </i>
                                                                                                                                                                </span>
                                                                                                                                                                <span className="menu-title">
                                                                                                                                                                        Make a copy
                                                                                                                                                                </span>
                                                                                                                                                        </a>
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-separator">
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-item">
                                                                                                                                                        <a className="menu-link" href="#">
                                                                                                                                                                <span className="menu-icon">
                                                                                                                                                                        <i className="ki-filled ki-trash">
                                                                                                                                                                        </i>
                                                                                                                                                                </span>
                                                                                                                                                                <span className="menu-title">
                                                                                                                                                                        Remove
                                                                                                                                                                </span>
                                                                                                                                                        </a>
                                                                                                                                                </div>
                                                                                                                                        </div>
                                                                                                                                </div>
                                                                                                                        </div>
                                                                                                                </td>
                                                                                                        </tr>
                                                                                                        <tr>
                                                                                                                <td className="text-center">
                                                                                                                        <input className="checkbox checkbox-sm" data-datatable-row-check="true" type="checkbox" defaultValue={30} />
                                                                                                                </td>
                                                                                                                <td>
                                                                                                                        <div className="flex items-center gap-2.5">
                                                                                                                                <img className="rounded-full size-7 shrink-0" src="assets/media/avatars/300-1.png" />
                                                                                                                                <a className="text-sm font-medium text-gray-900 hover:text-primary-active" href="#">
                                                                                                                                        Ella White
                                                                                                                                </a>
                                                                                                                        </div>
                                                                                                                </td>
                                                                                                                <td>
                                                                                                                        <div className="flex items-center gap-1.5 text-gray-800 font-normal">
                                                                                                                                <i className="ki-filled ki-chrome">
                                                                                                                                </i>
                                                                                                                                Chrome on Mac OS X
                                                                                                                        </div>
                                                                                                                </td>
                                                                                                                <td className="text-gray-800 font-normal">
                                                                                                                        192.168.1.21
                                                                                                                </td>
                                                                                                                <td>
                                                                                                                        <div className="flex items-center gap-1.5 text-gray-800 font-normal">
                                                                                                                                <img className="rounded-full size-4 shrink-0" src="assets/media/flags/norway.svg" />
                                                                                                                                Norway
                                                                                                                        </div>
                                                                                                                </td>
                                                                                                                <td className="text-gray-800 font-normal">
                                                                                                                        Today, 11:53 am
                                                                                                                </td>
                                                                                                                <td>
                                                                                                                        <div className="menu" data-menu="true">
                                                                                                                                <div className="menu-item" data-menu-item-offset="0, 10px" data-menu-item-placement="bottom-end" data-menu-item-toggle="dropdown" data-menu-item-trigger="click|lg:click">
                                                                                                                                        <button className="menu-toggle btn btn-sm btn-icon btn-light btn-clear">
                                                                                                                                                <i className="ki-filled ki-dots-vertical">
                                                                                                                                                </i>
                                                                                                                                        </button>
                                                                                                                                        <div className="menu-dropdown menu-default w-full max-w-[175px]" data-menu-dismiss="true">
                                                                                                                                                <div className="menu-item">
                                                                                                                                                        <a className="menu-link" href="#">
                                                                                                                                                                <span className="menu-icon">
                                                                                                                                                                        <i className="ki-filled ki-search-list">
                                                                                                                                                                        </i>
                                                                                                                                                                </span>
                                                                                                                                                                <span className="menu-title">
                                                                                                                                                                        View
                                                                                                                                                                </span>
                                                                                                                                                        </a>
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-item">
                                                                                                                                                        <a className="menu-link" href="#">
                                                                                                                                                                <span className="menu-icon">
                                                                                                                                                                        <i className="ki-filled ki-file-up">
                                                                                                                                                                        </i>
                                                                                                                                                                </span>
                                                                                                                                                                <span className="menu-title">
                                                                                                                                                                        Export
                                                                                                                                                                </span>
                                                                                                                                                        </a>
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-separator">
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-item">
                                                                                                                                                        <a className="menu-link" href="#">
                                                                                                                                                                <span className="menu-icon">
                                                                                                                                                                        <i className="ki-filled ki-pencil">
                                                                                                                                                                        </i>
                                                                                                                                                                </span>
                                                                                                                                                                <span className="menu-title">
                                                                                                                                                                        Edit
                                                                                                                                                                </span>
                                                                                                                                                        </a>
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-item">
                                                                                                                                                        <a className="menu-link" href="#">
                                                                                                                                                                <span className="menu-icon">
                                                                                                                                                                        <i className="ki-filled ki-copy">
                                                                                                                                                                        </i>
                                                                                                                                                                </span>
                                                                                                                                                                <span className="menu-title">
                                                                                                                                                                        Make a copy
                                                                                                                                                                </span>
                                                                                                                                                        </a>
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-separator">
                                                                                                                                                </div>
                                                                                                                                                <div className="menu-item">
                                                                                                                                                        <a className="menu-link" href="#">
                                                                                                                                                                <span className="menu-icon">
                                                                                                                                                                        <i className="ki-filled ki-trash">
                                                                                                                                                                        </i>
                                                                                                                                                                </span>
                                                                                                                                                                <span className="menu-title">
                                                                                                                                                                        Remove
                                                                                                                                                                </span>
                                                                                                                                                        </a>
                                                                                                                                                </div>
                                                                                                                                        </div>
                                                                                                                                </div>
                                                                                                                        </div>
                                                                                                                </td>
                                                                                                        </tr>
                                                                                                </tbody>
                                                                                        </table>
                                                                                </div>
                                                                                <div className="card-footer justify-center md:justify-between flex-col md:flex-row gap-5 text-gray-600 text-2sm font-medium">
                                                                                        <div className="flex items-center gap-2 order-2 md:order-1">
                                                                                                Show
                                                                                                <select className="select select-sm w-16" data-datatable-size="true" name="perpage">
                                                                                                </select>
                                                                                                per page
                                                                                        </div>
                                                                                        <div className="flex items-center gap-4 order-1 md:order-2">
                                                                                                <span data-datatable-info="true">
                                                                                                </span>
                                                                                                <div className="pagination" data-datatable-pagination="true">
                                                                                                </div>
                                                                                        </div>
                                                                                </div>
                                                                        </div>
                                                                </div>
                                                        </div>
                                                </div>
                                        </div>
                                </div>

                        </div>

                </>
        )
}
