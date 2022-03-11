import React, { useRef } from "react";
import Pdf from "react-to-pdf";
import "./pdf.scss";
const PDF = (props) => {
  const ref = useRef();
  return (
    <>
      <div className='app__pdf' ref={ref}>
        <div className='app__pdf-title'>
          <h3>Devis Provisoire </h3>
          <p>10 mars 2022</p>
        </div>
        <div className='app__pdf-address'>
          <div className='address'>
            <div className='title'>Émetteur</div>
            <div className='description'>
              Société : Votre contact : Adresse : Pays : Adresse email : BrandTk
              Mootassam Boughdiri Tunis 1200 Kasserine Tunisie
              mootassame@gmail.com
            </div>
          </div>
          <div className='address'>
            <div className='title'>Destinataire</div>
            <div className='description'>
              Société : Votre contact : Adresse : Pays : Adresse email : BrandTk
              Mootassam Boughdiri Tunis 1200 Kasserine Tunisie
              mootassame@gmail.com
            </div>
          </div>
        </div>

        <div className='app__pdf-table'>
          <div className='table-title'>Détail</div>
          
        </div>
      </div>

      {/* <Pdf targetRef={ref} filename='post.pdf'>
        {({ toPdf }) => <button onClick={toPdf}>Capture as PDF</button>}
      </Pdf> */}
    </>
  );
};

export default PDF;
