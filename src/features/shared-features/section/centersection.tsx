import React from "react";

const CenterSection = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div
      className="absolute flex items-center justify-center top-0 right-0 min-w-[100vw] h-full
        z-50  p-4 text-white bg-black/10"
      style={{
        backdropFilter: "blur(1px)",
        WebkitBackdropFilter: "blur(1px)",
      }}
    >
      {children}
    </div>
  );
};

export default CenterSection;
