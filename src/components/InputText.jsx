export default function InputText({ type = 'text', required = false, label, ...props }) {
        return (
                <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
                        <label className="form-label max-w-56">
                                {label}
                        </label>
                        <input
                                {...props}
                                type={type}
                                required={required}
                                className="input"
                        />
                </div>
        )
}
