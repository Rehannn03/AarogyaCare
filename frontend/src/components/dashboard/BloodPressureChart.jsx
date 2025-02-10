"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { name: "Mon", systolic: 120, diastolic: 80 },
  { name: "Tue", systolic: 122, diastolic: 82 },
  { name: "Wed", systolic: 118, diastolic: 79 },
  { name: "Thu", systolic: 121, diastolic: 81 },
  { name: "Fri", systolic: 119, diastolic: 80 },
  { name: "Sat", systolic: 123, diastolic: 83 },
  { name: "Sun", systolic: 120, diastolic: 81 },
]

export function BloodPressureChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Blood Pressure</CardTitle>
        <CardDescription>Weekly Blood Pressure Readings</CardDescription>
      </CardHeader>
      <CardContent className="pb-4">
        <ChartContainer
          config={{
            systolic: {
              label: "Systolic",
              color: "hsl(var(--chart-1))",
            },
            diastolic: {
              label: "Diastolic",
              color: "hsl(var(--chart-2))",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="name" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="systolic" fill="var(--color-systolic)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="diastolic" fill="var(--color-diastolic)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

