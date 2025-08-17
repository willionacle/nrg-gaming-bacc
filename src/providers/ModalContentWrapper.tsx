import { Box } from '@mantine/core';
import React from 'react';

const ModalContentWrapper = ({
  children,
  title,
  isConfirmation = false,
}: {
  children: React.ReactNode;
  title: string;
  isConfirmation?: boolean;
}) => {
  return (
    <Box className="custom-modal">
      <div className="corner top-left"></div>
      <div className="corner top-right"></div>
      <div className="corner bottom-left"></div>
      <div className="corner bottom-right"></div>
      {!isConfirmation && (
        <>
          <div className="modal-torch left"></div>
          <div className="modal-torch right"></div>
          <Box className="custom-modal-title">
            <span>{title}</span>
          </Box>
        </>
      )}
      {children}
    </Box>
  );
};

export default ModalContentWrapper;
