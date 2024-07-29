import React, { FC, ComponentType, Fragment, ReactNode } from "react";

type Component = React.JSX.Element | ComponentType<any>;
type Components = Component | [Component, { [key: string]: any }];

export const Compose: FC<{
  components: Components[];
  children?: ReactNode;
}> = ({ components, children }) => {
  return (
    <Fragment>
      {components.reverse().reduce((acc, curr) => {
        const [Provider, props] = Array.isArray(curr)
          ? [curr[0], curr[1]]
          : [curr, {}];
        return <Provider {...props}>{acc}</Provider>;
      }, children)}
    </Fragment>
  );
};
