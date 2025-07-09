// context/OrderModalContext.tsx

import { createContext, useContext, useState } from "react";

type OrderModalContextType = {
  open: boolean;
  openOrderModal: (platform: string, service: string) => void;
  closeOrderModal: () => void;
  platform: string | null;
  service: string | null;
};

const OrderModalContext = createContext<OrderModalContextType | undefined>(undefined);

export function useOrderModal() {
  const context = useContext(OrderModalContext);
  if (!context) throw new Error("useOrderModal must be used within OrderModalProvider");
  return context;
}

export function OrderModalProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [platform, setPlatform] = useState<string | null>(null);
  const [service, setService] = useState<string | null>(null);

  const openOrderModal = (platform: string, service: string) => {
    setPlatform(platform);
    setService(service);
    setOpen(true);
  };

  const closeOrderModal = () => setOpen(false);

  return (
    <OrderModalContext.Provider value={{
      open,
      openOrderModal,
      closeOrderModal,
      platform,
      service
    }}>
      {children}
    </OrderModalContext.Provider>
  );
}
