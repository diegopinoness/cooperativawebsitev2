import { createFileRoute } from "@tanstack/react-router";
import CooperativaHome from "@/components/cooperativa/CooperativaHome";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return <CooperativaHome />;
}
