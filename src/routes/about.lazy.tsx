import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/about')({
  component: About,
});

function About() {
  return <div className="p-10">Nothing here yet!</div>;
}
