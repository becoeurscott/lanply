import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Renderer } from "@/components/Renderer";
import { loadSpec } from "@/lib/store";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const spec = await loadSpec(id);
  if (!spec) return { title: "Page not found" };
  return { title: spec.meta.title, description: spec.meta.description };
}

export default async function PreviewPage({ params }: Props) {
  const { id } = await params;
  const spec = await loadSpec(id);
  if (!spec) notFound();
  return <Renderer spec={spec} />;
}
