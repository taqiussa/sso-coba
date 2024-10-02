import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

export const showAlert = ({
        icon = 'success',
        title = 'Berhasil',
        text = 'Berhasil Simpan Data',
        konfirmasi = 'Ya, Hapus',
        confirm = false,
        onConfirm = () => { },
        options = {},
}) => {
        if (confirm) {
                MySwal.fire({
                        icon,
                        title,
                        text,
                        showCancelButton: true,
                        confirmButtonText: konfirmasi,
                        cancelButtonText: 'Batal',
                        ...options,
                }).then(async (result) => {
                        if (result.isConfirmed) {
                                try {
                                        await onConfirm();
                                        MySwal.fire('Terhapus!', 'Berhasil Menghapus Data.', 'success');
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
