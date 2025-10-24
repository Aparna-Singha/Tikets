import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LoaderCircle } from "lucide-react";

import { getUserData } from "@api/auth";

import { OrgHero } from "@components/org/orghero";
import { Navbar } from "@components/org/navbar";
import { Tickets } from "@components/org/tickets";

import "./style.css";

export function OrgLanding() {
  const { orgId } = useParams();
  const navigate = useNavigate();

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function validateOrg() {
      try {
        const user = await getUserData();
        if (!user || user.org !== orgId)
          navigate("/");
        setLoaded(true);
      } catch (err) {
        console.log(err);
        setLoaded(false);
      }
    }

    validateOrg();
  }, [navigate, orgId]);

  if (!loaded) return (<>
    <div className="org-landing">
      <LoaderCircle className="org-landing-loader spin" />
    </div>
  </>);

  return (<>
    <OrgHero />
    <Navbar />
    <Tickets />
  </>);
}

