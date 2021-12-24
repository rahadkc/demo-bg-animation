import React, { Fragment } from 'react';
import { Modal } from 'reactstrap';
import cancel from '../../assets/images/icons/cancel.svg';
import crose from '../../assets/images/icons/crose.svg';
import submit from '../../assets/images/icons/submit.svg';
import logo from '../../assets/images/logo.svg';
import whitelogo from '../../assets/images/404-shape.svg';
import './style.scss';
const DeleteAccountModal = (props) => {
    return (
        <Fragment>
            <Modal
                isOpen={props.isOpen}
                toggle={props.toggle}
                centered
                fade={false}
                onClosed={props.onClosed}
                modalClassName='delete_modal'
                backdropClassName='signupModalWrapBackdrop'
                className='blackListModal  blackListModal--premium '
            >
                <span onClick={props.onClosed} className='signupCroseBtn'>
                    <img src={crose} alt='crose' />
                </span>
                <div className='blackListModalWrap'>
                    <h1>Are you sure you want to cancel?</h1>

                    <p>We’d love to see you stay.</p>
                    <ul className='modalBtns'>
                        <li>
                            <button onClick={props.submit} className=' error'>
                                Delete My Account{' '}
                                <svg width='17' height='16' viewBox='0 0 17 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
                                    <path
                                        d='M13.7334 7.03969L0.000432689 7.03969L0.000432617 8.69525L13.7334 8.69526L8.51833 13.902L9.69379 15.0775L16.8955 7.86747L9.69379 0.65747L8.51833 1.83292L13.7334 7.03969Z'
                                        fill='#E26262'
                                    />
                                </svg>
                            </button>
                        </li>
                        <li>
                            <button onClick={props.onClosed} type='button' className='success'>
                                No, Keep It
                                <svg width='14' height='14' viewBox='0 0 14 14' fill='none' xmlns='http://www.w3.org/2000/svg'>
                                    <line x1='1.28131' y1='0.898289' x2='13.2246' y2='12.8416' stroke='#7ADBD1' stroke-width='1.5' />
                                    <line x1='13.2247' y1='0.893123' x2='1.28135' y2='12.8364' stroke='#7ADBD1' stroke-width='1.5' />
                                </svg>
                            </button>
                        </li>
                    </ul>
                </div>
            </Modal>
        </Fragment>
    );
};
export default DeleteAccountModal;
