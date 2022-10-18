import React from 'react';
import { MdClear } from 'react-icons/md';
import ReactModal from 'react-modal';
import './index.scss';

interface IProps {
	isOpen: boolean;
	children: React.ReactNode;
	contentLabel?: string;
	onRequestClose: () => void;
	headerTitle?: string;
}

const CustomModal = ({
	isOpen,
	children,
	onRequestClose,
	contentLabel = 'Dialog',
	headerTitle,
}: IProps) => {
	return (
		<ReactModal
			isOpen={isOpen} /* Boolean describing if the modal should be shown or not. */
			onRequest
			contentLabel={
				contentLabel
			} /* String indicating how the content container should be announced to screenreaders */
			onRequestClose={onRequestClose} /* Function that will be run when the modal is requested
			//  to be closed (either by clicking on overlay or pressing ESC).Note: It is not called if isOpen is changed by other means. */
		>
			<header className='modal_header'>
				{headerTitle && <h3 className='modal_header__title'>{headerTitle}</h3>}
				<button
					className='modal_header__close_button'
					onClick={onRequestClose}
					type='button'
					aria-label='Cerrar modal'
				>
					<MdClear size={30} />
				</button>
			</header>

			{children}
		</ReactModal>
	);
};
export default CustomModal;
