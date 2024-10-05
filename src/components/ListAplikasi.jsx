export default function ListAplikasi({ required = false, listAplikasi = [], ...props }) {
        return (
                <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
                        <label className="form-label max-w-56">
                                List Aplikasi
                        </label>
                        <select
                                required={required}
                                className="select"
                                {...props}
                        >
                                <option value=''>
                                        Pilih Aplikasi
                                </option>
                                {
                                        listAplikasi && listAplikasi.map((app, index) => (
                                                <option key={index} value={app.id_master_aplikasi}>
                                                        {app.nama_aplikasi}
                                                </option>
                                        ))
                                }
                        </select>
                </div>
        )
}
