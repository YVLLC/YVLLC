import { createContext, useContext, useState, ReactNode } from "react";

interface OrderModalContextType {
  open: boolean;
  platform: string | null;
  service: string | null;
  quantity: number | null;          // 🔥 ADDED
  openOrderModal: (platform?: string, service?: string, quantity?: number) => void; // 🔥 quantity allowed
  closeOrderModal: () => void;
}

const OrderModalContext = createContext<OrderModalContextType>({
  open: false,
  platform: null,
  service: null,
  quantity: null,
  openOrderModal: () => {},
  closeOrderModal: () => {},
});

export function OrderModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [platform, setPlatform] = useState<string | null>(null);
  const [service, setService] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number | null>(null); // 🔥

  const openOrderModal = (
    platform?: string,
    service?: string,
    quantity?: number
  ) => {
    setPlatform(platform ?? null);
    setService(service ?? null);
    setQuantity(quantity ?? null);   // 🔥 store clicked amount
    setOpen(true);
  };

  const closeOrderModal = () => setOpen(false);

  return (
    <OrderModalContext.Provider
      value={{
        open,
        platform,
        service,
        quantity,          // 🔥 expose quantity
        openOrderModal,
        closeOrderModal,
      }}
    >
      {children}
    </OrderModalContext.Provider>
  );
}

export function useOrderModal() {
  return useContext(OrderModalContext);
}
