import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { cn } from "@/lib/utils";

interface IBox {
  className?: string;
  title?: string;
  children?: React.ReactNode;
}

export default function Box({ className, title, children }: IBox) {
  return (
    <Card className="w-full">
      <CardHeader className="p-4 md:p-6">
        <CardTitle className="text-sm font-medium md:text-base">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className={cn("p-4 md:p-6", className)}>
        {children}
      </CardContent>
    </Card>
  );
}
