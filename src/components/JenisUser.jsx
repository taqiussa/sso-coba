export default function JenisUser({ required = false, ...props }) {
        return (
                <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
                        <label className="form-label max-w-56">
                                Jenis User
                        </label>
                        <select
                                required={required}
                                className="select"
                                {...props}
                        >
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
        )
}
