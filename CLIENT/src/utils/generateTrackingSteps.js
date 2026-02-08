const generateTrackingSteps = (order) => {
  const placed = new Date(order.placedAt);
  const expected = new Date(order.expectedDeliveryDate);
  const delivered = order.deliveredAt ? new Date(order.deliveredAt) : null;

  const steps = [
    {
      status: "Order Confirmed",
      date: placed.toDateString(),
      desc: "Your order has been successfully placed.",
      completed: false,
    },
    {
      status: "Processing",
      date: new Date(placed.getTime() + 2 * 60 * 60 * 1000).toDateString(),
      desc: "Your books are being prepared and packed.",
      completed: false,
    },
    {
      status: "Shipped",
      date: new Date(placed.getTime() + 24 * 60 * 60 * 1000).toDateString(),
      desc: "Your order has left our warehouse.",
      completed: false,
    },
    {
      status: "Out for Delivery",
      date: expected.toDateString(),
      desc: "Your books are on the way to you.",
      completed: false,
    },
    {
      status: "Delivered",
      date: delivered ? delivered.toDateString() : "TBD",
      desc: "Your books have been delivered.",
      completed: false,
    },
  ];

  // status logic
  if (order.status === "paid") {
    steps[0].completed = true;
    steps[0].current = true;
  } else {
    let current = false;
    steps.forEach((s, index) => {
      if (!s.status.toLowerCase().includes(order.status) && !current) {
        steps[index].completed = true;
      } else if (s.status.toLowerCase().includes(order.status)) {
        steps[index].completed = true;
        steps[index].current = true;
        current = index;
      }
    });
  }

  return steps;
};

export default generateTrackingSteps;
