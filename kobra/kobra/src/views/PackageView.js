import React from "react";
import { usePackageViewModel } from "./PackageViewModel";
import PackageCell from "./PackageCell";

const PackageView = () => {
  const { packages, isLoading } = usePackageViewModel();

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {packages.map((packageWithImage) => (
            <PackageCell key={packageWithImage.id} packageWithImage={packageWithImage} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PackageView;
