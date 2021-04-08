import { Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';


export default function ModalDialog({ body, changeValue, setChangeValue }) {
  const [show, setShow] = useState(changeValue);

  const change = () => {
    setShow('none');
    setChangeValue('none');
  };

  useEffect(() => {
    if (changeValue == 'block') setShow('block')
    else change();

  }, [changeValue]);

  return (
    <>
      <div className="modal" id="exampleModal" role="dialog" tabIndex="-1" style={{ display: show }}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={change}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              {body}
            </div>
            <div className="modal-footer">
            </div>
          </div>
        </div>
      </div >
    </>
  );
}
