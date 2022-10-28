import Swal from 'sweetalert2';
import colors from '../../styles/_colors.module.scss';
import './index.scss';

/*
    Swal Customized
    * We take the default swal2 configuration and add some customizations to its CSS

    Props can be:
    * title
    * text : A description for the popup. ( If text and html parameters are provided in the same time, html will be used. )
    * html : A HTML description for the popup. ( If text and html parameters are provided in the same time, html will be used. )
    * icon ( success, error, warning, info, question )
    * toast : If true, the popup will be displayed as a toast. (normally coupled with the position parameter and a timer.)
    * position: Popup window position ( 'top', 'top-start', 'top-end', 'center', 'center-start', 'center-end', 'bottom', 'bottom-start' or 'bottom-end' )
    *

*/
const { Primary, Error } = colors;

const SwalCustom = Swal.mixin({
	title: '¿Desea continuar?',
	showConfirmButton: true,
	confirmButtonText: 'Continuar',
	confirmButtonColor: Primary,
	showDenyButton: true,
	denyButtonText: 'Cancelar',
	denyButtonColor: Error,
	toast: false,
	customClass: {
		popup: 'swal-popup-custom',
		title: 'swal-title-custom',
		htmlContainer: 'swal-html-container-custom',
		confirmButton: 'swal-button-custom',
		denyButton: 'swal-button-custom',
		icon: 'swal-icon-custom',
		container: 'swal-container-custom',
		validationMessage: 'swal-validation-msg-custom',
	},
});

export default SwalCustom;
