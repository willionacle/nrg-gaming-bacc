'use client';
import { ButtonProps, Group } from '@mantine/core';
import { modals } from '@mantine/modals';
import ActionButton from './action-button';
interface Props {
  closeBtnProps?: ButtonProps;
  saveBtnProps?: ButtonProps;
  onSave?: () => void;
  onClose?: () => void;
  hasSave?: boolean;
  confirmLabel?: string;
}

const ModalFooterBtns = ({
  closeBtnProps,
  saveBtnProps,
  hasSave = true,
  onSave,
  onClose,
}: Props) => {
  return (
    <Group gap="sm" wrap="nowrap" justify="center" className="modal-footer-btns">
      <ActionButton
        onClick={() => {
          onClose && onClose(), modals.closeAll();
        }}
        colorClass="purple-btn"
        label="close"
        {...closeBtnProps}
      />
      {hasSave && (
        <ActionButton
          onClick={() => {
            onSave && onSave(), modals.closeAll();
          }}
          colorClass="green-btn"
          label="confirm"
          {...saveBtnProps}
        />
      )}
    </Group>
  );
};

export default ModalFooterBtns;
