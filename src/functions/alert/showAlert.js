import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

/**
 * Function to show SweetAlert2 notifications with optional confirmation.
 * @param {string} icon - The type of alert (success, error, warning, info, question).
 * @param {string} title - The title of the alert.
 * @param {string} text - The text content of the alert.
 * @param {boolean} confirm - Set true if confirmation is needed (default: false).
 * @param {function} onConfirm - The function to call if confirmation is accepted (e.g., for deletion).
 * @param {object} options - Additional SweetAlert2 options for customization.
 */
export const showAlert = (
        icon = 'success',
        title = 'Berhasil',
        text = 'Berhasil Simpan Data',
        confirm = false,
        onConfirm = () => { },
        options = {},
) => {
        if (confirm) {
                MySwal.fire({
                        icon,
                        title,
                        text,
                        showCancelButton: true,
                        confirmButtonText: 'Yes, do it!',
                        cancelButtonText: 'Cancel',
                        ...options,
                }).then(async (result) => {
                        if (result.isConfirmed) {
                                try {
                                        await onConfirm();
                                        MySwal.fire('Deleted!', 'Your user has been deleted.', 'success');
                                } catch (error) {
                                        MySwal.fire('Error!', 'There was a problem deleting the item.', 'error');
                                }
                        }
                });
        } else {
                MySwal.fire({
                        icon,
                        title,
                        text,
                        confirmButtonText: 'OK',
                        ...options,
                });
        }
};
