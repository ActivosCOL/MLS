"use client";
import React from "react";
import { Puck } from "@measured/puck/react";

const puckConfig = {
  components: {
    paragraph: {
      render: ({ children }: any) => <p>{children}</p>,
      fields: {},
    },
    heading: {
      render: ({ children }: any) => <h2>{children}</h2>,
      fields: {},
    },
    image: {
      render: ({ src }: any) => <img src={src} alt="" style={{ maxWidth: "100%" }} />,
      fields: {
        src: { type: "text", label: "URL de la imagen" },
      },
    },
    link: {
      render: ({ href, children }: any) => (
        <a href={href} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      ),
      fields: {
        href: { type: "text", label: "URL" },
      },
    },
  },
};

const PuckContent = ({ content }: { content: string }) => {
  let parsedValue;
  try {
    parsedValue = JSON.parse(content);
  } catch {
    parsedValue = [];
  }

  return (
    <Puck
      config={puckConfig}
      value={parsedValue}
      readOnly
    />
  );
};

export default PuckContent; 