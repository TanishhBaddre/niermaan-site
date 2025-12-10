export default function NotificationsPage() {
  const notifications = [
    { text: "Booking confirmed with John Carter – Dec 24, 10 AM", type: "success" },
    { text: "Your payment was received", type: "info" },
    { text: "Reminder: Session starts in 2 hours", type: "warning" },
  ];

  return (
    <div className="p-10 max-w-3xl mx-auto space-y-6">

      <h1 className="text-4xl font-bold">Notifications</h1>

      <div className="space-y-4">
        {notifications.map((n, i) => (
          <div key={i} className="p-4 bg-white border rounded-xl shadow-sm">
            {n.text}
          </div>
        ))}
      </div>
    </div>
  );
}
