// src/utils/utils.js
export const calculateTotalPages = (totalElements, itemsPerPage) => {
  return Math.ceil(totalElements / itemsPerPage);
};

export const getOrderText = order => {
  return order === 3 ? "최신 순" : "오래된 순";
};
