import { headers } from "next/headers";
import { isMobile } from "../utils/isMobile";
import Page from "./page";

export default function ServerComponent() {
  const userAgent = headers().get("user-agent") || "";
  const mobileCheck = isMobile(userAgent);

  return <Page isMobile={mobileCheck} />;
}
