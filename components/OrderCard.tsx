type OrderCardProps = {
  orderId: string;
  service: string;
  usernameOrLink: string;
  quantity: number;
  status: string;
  createdAt: string;
};

export default function OrderCard({
  orderId,
  service,
  usernameOrLink,
  quantity,
  status,
  createdAt,
}: OrderCardProps) {
  const statusColors: Record<string, string> = {
    pending: "text-yellow-500",
    processing: "text-blue-500",
    completed: "text-green-600",
    canceled: "text-red-500",
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold text-sm text-[#111]">Order #{orderId}</h3>
        <span className={`text-xs font-semibold ${statusColors[status] || "text-gray-500"}`}>
          {status.toUpperCase()}
        </span>
      </div>

      <div className="text-sm text-[#444] space-y-1">
        <p>
          <strong>Service:</strong> {service}
        </p>
        <p>
          <strong>Target:</strong> {usernameOrLink}
        </p>
        <p>
          <strong>Quantity:</strong> {quantity}
        </p>
        <p>
          <strong>Placed:</strong> {new Date(createdAt).toLocaleString()}
        </p>
      </div>
    </div>
  );
}
