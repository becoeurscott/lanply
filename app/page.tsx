import { Renderer } from "@/components/Renderer";
import { demoSpec } from "@/lib/demo-spec";

export default function Page() {
  return <Renderer spec={demoSpec} />;
}
