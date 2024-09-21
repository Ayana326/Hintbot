import { FC, ReactNode } from "react";

export const ReturnBox: FC<{
  children?: ReactNode;
}> = ({ children }) => {
  return (
    <div className="w-full border">
      <div>実行結果</div>
      <div>{children}</div>
    </div>
  );
};
