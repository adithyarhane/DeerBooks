const generateOrderId = () => {
  return `ARC-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;
};

export default generateOrderId;
