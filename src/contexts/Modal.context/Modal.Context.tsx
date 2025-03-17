import SnowFallEffect from "@/src/components/atoms/SnowFallEffect/SnowFallEffect";
import React, { ReactNode, useContext } from "react";
import {
  createContext,
  useCallback,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import { createPortal } from "react-dom";

interface ModalContextValue {
  open: (ModalElement: React.ReactElement) => void;
  close: () => void;
  isOpen?: boolean;
}

const initValue: ModalContextValue = {
  open: () => {},
  close: () => {},
  isOpen: false,
};

const ModalContext = createContext(initValue);

function ModalProvider({ children }: { children: ReactNode }) {
  const [isMounted, setIsMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [modalElem, setModlElem] = useState<ReactNode>(null);

  const open: ModalContextValue["open"] = useCallback((modalElement) => {
    setModlElem(modalElement);
    setIsOpen(true);
  }, []);

  const close: ModalContextValue["close"] = useCallback(() => {
    setIsOpen(false);
  }, []);

  const value = useMemo(() => ({ open, close, isOpen }), [open, close, isOpen]);

  useLayoutEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <ModalContext.Provider value={value}>
      {children}

      {isMounted &&
        isOpen &&
        createPortal(
          <>
            {modalElem}

            <SnowFallEffect zIndex={50} />
          </>,
          document.body
        )}
    </ModalContext.Provider>
  );
}

export default ModalProvider;

export const useModal = () => useContext(ModalContext);
