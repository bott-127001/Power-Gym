import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/standard")({
  beforeLoad: () => {
    throw redirect({
      to: "/franchise",
      statusCode: 301,
    });
  },
  head: () => ({
    meta: [
      { title: "PowerUp Fitness Franchise — Build With PowerUp" },
      {
        name: "description",
        content: "Partner with Pune's elite fitness and athletic transformation brand.",
      },
    ],
  }),
  component: StandardRedirect,
});

function StandardRedirect() {
  return null;
}
