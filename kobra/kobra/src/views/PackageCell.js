import React from "react";

const PackageCell = ({ packageWithImage }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  return (
    <div>
      <h3>{packageWithImage.medal}</h3>
      <p>{formatPrice(packageWithImage.price)}</p>
      <img src={packageWithImage.imageUrl} alt={packageWithImage.medal} />
    </div>
  );
};

export default PackageCell;
