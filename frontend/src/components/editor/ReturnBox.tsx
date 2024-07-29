import { FC, ReactNode } from "react";

export const ReturnBox: FC<{
  children?: ReactNode;
}> = ({ children }) => {
  return (
    <div className="w-full border">
      <div>result</div>
      <div>{children}</div>
    </div>
  );
};
