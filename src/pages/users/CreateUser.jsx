import PageTitle from '@/layouts/partials/PageTitle'
import React from 'react'
import { Link } from 'react-router-dom'

export default function CreateUser() {
        return (
                <>
                        <PageTitle title='Tambah User' />
                        <h1 className="text-xl font-semibold leading-none text-gray-900 mb-3">
                                Master User
                        </h1>
                        <Link className="btn btn-sm btn-light" to="/master_user">
                                <i class="ki-filled ki-black-left-line"></i>
                                <div>
                                        Batal
                                </div>
                        </Link>
                </>
        )
}
