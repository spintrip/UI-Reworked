import React from "react";
import { img_path } from "../../../environment";

interface Image {
  className?: string;
  src: string;
  alt?: string;
  height?: number;
  width?: number;
  id?: string;
  loading?: "lazy" | "eager"; // Restrict to the specific values
}

const ImageWithBasePath = (props: Image) => {
  // Combine the base path and the provided src to create the full image source URL
  const fullSrc = `${img_path}${props.src}`;
  return (
    <img
      className={props.className}
      src={fullSrc}
      height={props.height}
      alt={props.alt}
      width={props.width}
      id={props.id}
      loading={props.loading || "lazy"} // Apply the loading attribute, defaulting to lazy
    />
  );
};

export default ImageWithBasePath;
