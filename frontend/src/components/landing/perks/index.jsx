import { Blend, Shapes } from "lucide-react";

import { LandingCard } from "@components/landing/landingcard";

import "./style.css";

export function Perks() {
  const perks = [
    {
      icon: Blend,
      title: "Transparency",
      description: [
        "All issues are visible to everyone within the",
        "organization, along with their status and progress.",
      ].join(" "),
    },
    {
      icon: Shapes,
      title: "Minimalism",
      description: [
        "Tickets are the only focus of the platform,",
        "ensuring a clean and distraction-free experience.",
      ].join(" "),
    },
  ];

  return (<>
    <div className="perks">
      <h2 className="perks-title">
        Why Tikets?
      </h2>

      <div className="perks-content">
        {perks.map(perk => <LandingCard key={perk.title} {...perk} />)}
      </div>
    </div>
  </>);
}

