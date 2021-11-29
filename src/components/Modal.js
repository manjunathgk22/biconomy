import {useEffect} from 'react';
import './Style.css';

export const  POSITION = {
  CENTER: 'center',
  BOTTOM: 'bottom'
}
export default function Modal({  position=POSITION.CENTER, showModal = false, onOverlayClick = () => {}, ...props }) {
  useEffect(() => {
    const body = document.body;
    body.style.height = '100vh';
    body.style.overflowY = 'hidden';
    return () => {
      body.style.height = 'auto';
      body.style.overflowY = 'initial';
    };
  }, []);
  return (
    <div className={'full-width-height-viewport flex z-index-100 overlay fixed modal '} onClick={onOverlayClick}>
      <div
        onClick={(event) => {
          event.stopPropagation();
        }}
        className={`${position} align-center flex one-flx`}
      >
        {props.children}
      </div>
    </div>
  );
}
