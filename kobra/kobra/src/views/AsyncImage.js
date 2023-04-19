import React, { useState, useEffect } from "react";

const AsyncImage = ({ src, alt = "" }) => {
  const [imageSrc, setImageSrc] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const image = new Image();
    image.onload = () => {
      setLoading(false);
      setImageSrc(src);
    };
    image.src = src;
  }, [src]);

  return (
    <div className="async-image-container">
      {loading && <div className="loading-indicator">Loading...</div>}
      <img className="async-image" src={imageSrc} alt={alt} style={loading ? { display: "none" } : {}} />
    </div>
  );
};

export default AsyncImage;
