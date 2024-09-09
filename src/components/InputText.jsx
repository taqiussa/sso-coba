import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function InputText(
        { type = 'text', name, id, value, message, className, required, isFocused, handleChange, label, disabled, ...props },
        ref
) {

        const input = ref ? ref : useRef();

        useEffect(() => {

                if (isFocused) {

                        input.current.focus();

                }

        }, []);

        return (
                <div className='flex flex-col capitalize text-slate-600 space-y-1'>
                        <div>
                                {label}
                        </div>
                        <div>
                                <input
                                        type={type}
                                        name={name}
                                        id={id}
                                        value={value}
                                        className={
                                                `border-gray-300 focus:border-emerald-500 focus:ring-emerald-300 focus:ring shadow-emerald-300 rounded-md shadow-md w-full p-2 ${disabled && 'bg-gray-200'
                                                } ` + className
                                        }
                                        ref={input}
                                        required={required}
                                        disabled={disabled}
                                        onChange={(e) => handleChange(e)}
                                        {...props}
                                />

                        </div>
                        {message ?
                                <div className='text-sm text-red-600'>
                                        {message}
                                </div>
                                :
                                null
                        }
                </div>
        )
});
