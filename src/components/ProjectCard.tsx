"use client";

import { Card, CardHeader, CardBody } from "@nextui-org/react";

export function ProjectCard() {
  return (
    <Card
      className="bg-content1 border border-divider hover:border-primary/60 transition-all"
    >
      <CardHeader className="font-heading text-large text-primary">
        Data Marketplace API
      </CardHeader>
      <CardBody className="text-secondary">
        Django + React platform enabling secure data sharing with Stripe
        integration.
      </CardBody>
    </Card>
  );
}
