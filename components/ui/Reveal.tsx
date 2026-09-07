"use client";

import { Children, cloneElement, isValidElement, useEffect, useRef, useState } from "react";

type RevealProps = {
  /** Precies één element (bv. een <div>, <a>, <li>). Reveal voegt geen eigen wrapper toe,
   * zodat grid/flex-layouts van de ouder niet verstoord worden. */
  children: React.ReactElement;
  /** Vertraging in ms, handig om kaarten na elkaar te laten verschijnen. */
  delay?: number;
  className?: string;
};

export default function Reveal({ children, delay = 0, className = "" }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const child = Children.only(children);
  if (!isValidElement(child)) return children;

  const props = child.props as Record<string, unknown>;
  const existingClassName = typeof props.className === "string" ? props.className : "";
  const existingStyle = (props.style as React.CSSProperties) || {};

  return cloneElement(child as React.ReactElement<any>, {
    ref: (node: HTMLElement | null) => {
      ref.current = node;
    },
    className: `${existingClassName} reveal ${visible ? "is-visible" : ""} ${className}`.trim(),
    style: { ...existingStyle, transitionDelay: `${delay}ms` },
  });
}
