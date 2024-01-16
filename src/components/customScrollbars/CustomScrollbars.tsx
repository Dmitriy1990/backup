import React, {
  ChangeEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Scrollbar from "react-scrollbars-custom";

export const CustomScrollbars = ({
  children,
  forwardedRef,
  onScroll,
  style,
  className,
}: any) => {
  return (
    <Scrollbar
      className={className}
      style={style}
      scrollerProps={{
        renderer: (props) => {
          const { elementRef, onScroll: rscOnScroll, ...restProps } = props;

          return (
            <span
              {...restProps}
              onScroll={(e) => {
                onScroll(e);
                // rscOnScroll(e);
              }}
              ref={(ref) => {
                forwardedRef(ref);
                elementRef!(ref as any);
              }}
            />
          );
        },
      }}
    >
      {children}
    </Scrollbar>
  );
};

export const CustomScrollbarsVirtualList = React.forwardRef((props, ref) => (
  <CustomScrollbars {...props} forwardedRef={ref} />
));

const listRef = React.createRef<any>();
const outerRef = React.createRef<any>();
