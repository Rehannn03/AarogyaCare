"use client"

import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { name: "Mon", glucose: 95 },
  { name: "Tue", glucose: 102 },
  { name: "Wed", glucose: 98 },
  { name: "Thu", glucose: 103 },
  { name: "Fri", glucose: 97 },
  { name: "Sat", glucose: 100 },
  { name: "Sun", glucose: 99 },
]

export function GlucoseLevelChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Glucose Level</CardTitle>
        <CardDescription>Weekly Glucose Readings</CardDescription>
      </CardHeader>
      <CardContent className="pb-4">
        <ChartContainer
          config={{
            glucose: {
              label: "Glucose",
              color: "hsl(var(--chart-1))",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis dataKey="name" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line type="monotone" dataKey="glucose" stroke="var(--color-glucose)" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

