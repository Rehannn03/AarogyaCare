"use client"

import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { name: "Mon", heartRate: 65, steps: 4000 },
  { name: "Tue", heartRate: 68, steps: 3000 },
  { name: "Wed", heartRate: 70, steps: 5000 },
  { name: "Thu", heartRate: 72, steps: 4500 },
  { name: "Fri", heartRate: 69, steps: 3500 },
  { name: "Sat", heartRate: 75, steps: 6000 },
  { name: "Sun", heartRate: 71, steps: 5500 },
]

export function HealthTrendsChart() {
  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">Health Trends</CardTitle>
        <CardDescription>Heart Rate and Steps</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ChartContainer
            config={{
              heartRate: {
                label: "Heart Rate",
                color: "hsl(var(--chart-1))",
              },
              steps: {
                label: "Steps",
                color: "hsl(var(--chart-2))",
              },
            }}
          >
            <ResponsiveContainer>
              <LineChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" orientation="left" stroke="hsl(var(--chart-1))" />
                <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--chart-2))" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="heartRate"
                  stroke="hsl(var(--chart-1))"
                  strokeWidth={2}
                  dot={{ strokeWidth: 2 }}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="steps"
                  stroke="hsl(var(--chart-2))"
                  strokeWidth={2}
                  dot={{ strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  )
}

