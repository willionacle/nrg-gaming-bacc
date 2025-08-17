import { ModalFooterBtns } from '@/components';
import { Box } from '@mantine/core';
import { modals } from '@mantine/modals';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const ModalContentWrapper2 = ({
  children,
  title,
  onClose,
  onSave,
  hasSave = false,
  hasBtns = true,
  autoClose = false,
}: {
  children: React.ReactNode;
  title?: React.ReactNode;
  onClose?: (data?: any) => void;
  onSave?: (data?: any) => void;
  hasSave?: boolean;
  hasBtns?: boolean;
  autoClose?: boolean;
}) => {
  const { t } = useTranslation();

  useEffect(() => {
    if (autoClose) {
      let timeOut = setTimeout(() => {
        modals.closeAll();
        clearTimeout(timeOut);
      }, 2000);
    }
  }, [autoClose]);

  return (
    <Box className="custom-modal2">
      <Box className="inner" pt={hasBtns ? 0 : 20}>
        {title && (
          <Box color="#f70075" className="custom-modal-title">
            {title === typeof String ? t(`${title}`) : title}
          </Box>
        )}
        {children}
        {hasBtns && <ModalFooterBtns onSave={onSave} onClose={onClose} hasSave={hasSave} />}
      </Box>
    </Box>
  );
};

export default ModalContentWrapper2;
