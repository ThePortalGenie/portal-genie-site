"use client";

import dynamic from "next/dynamic";

const Genie = dynamic(
  () => import("@/components/genie/Genie").then((module) => module.Genie),
  { ssr: false },
);

export function GenieClientRoot() {
  return <Genie />;
}
