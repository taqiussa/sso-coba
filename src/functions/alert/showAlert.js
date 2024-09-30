// src/utils/alert.js
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

/**
 * Function to show SweetAlert2 notifications
 * @param {string} icon - The type of alert (success, error, warning, info, question)
 * @param {string} title - The title of the alert
 * @param {string} text - The text content of the alert
 */
export const showAlert = (icon ='success', title='Berhasil', text='Berhasil Simpan Data') => {
        MySwal.fire({
                icon,
                title,
                text,
                confirmButtonText: 'OK',
        });
};
