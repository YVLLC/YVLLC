import { createContext, useContext, useState, ReactNode } from "react";

interface OrderModalContextType {
  open: boolean;
  platform: string | null;
  service: string | null;
  openOrderModal: (platform?: string, service?: string) => void;
  closeOrderModal: () => void;
}

const OrderModalContext = createContext<OrderModalContextType>({
  open: false,
  platform: null,
  service: null,
  openOrderModal: () => {},
  closeOrderModal: () => {},
});

export function OrderModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [platform, setPlatform] = useState<string | null>(null);
  const [service, setService] = useState<string | null>(null);

  // Params optional here too!
  const openOrderModal = (platform?: string, service?: string) => {
    setPlatform(platform ?? null);
    setService(service ?? null);
    setOpen(true);
  };

  const closeOrderModal = () => setOpen(false);

  return (
    <OrderModalContext.Provider
      value={{ open, platform, service, openOrderModal, closeOrderModal }}
    >
      {children}
    </OrderModalContext.Provider>
  );
}

export function useOrderModal() {
  return useContext(OrderModalContext);
}
