import { FC } from "react";
import { UpperCard } from "./upper-section/UpperCard";
import { MainSection } from "./main/MainSection";
import "./index.css"

export const Sections: FC = () => {
  return (
    <>
      <UpperCard />
      <MainSection />
    </>
  );
};
