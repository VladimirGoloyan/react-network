import React from "react";
import PropTypes from "prop-types";
import { Modal, Button } from "@material-ui/core";

import "./ItemModal.scss";

const ItemModal = ({
  isOpen,
  titleValue = "",
  bodyValue = "",
  changeValue,
  action,
  onClose,
  buttonTitle,
  checkBox = false,
}) => {
  return (
    <Modal className="modal" open={isOpen} onClose={onClose}>
      <div className="modal__inner">
        <input
          name="titleValue"
          onChange={changeValue}
          className="modal__input"
          value={titleValue}
        ></input>
        {checkBox ? (
          <>
            <span>Completed</span>
            <input
              type="checkbox"
              name="completedValue"
              onChange={changeValue}
              className="modal__input"
              value={bodyValue}
            ></input>
          </>
        ) : (
          <input
            name="bodyValue"
            onChange={changeValue}
            className="modal__input"
            value={bodyValue}
          ></input>
        )}

        <Button
          variant="contained"
          color="primary"
          onClick={action}
          title={buttonTitle}
        >
          {buttonTitle}
        </Button>
      </div>
    </Modal>
  );
};

ItemModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  titleValue: PropTypes.string,
  bodyValue: PropTypes.string,
  changeValue: PropTypes.func,
  action: PropTypes.func,
  onClose: PropTypes.func,
  buttonTitle: PropTypes.string.isRequired,
};

export default ItemModal;
