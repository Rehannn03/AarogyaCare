"use client"

import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { month: "Jan", consultations: 65, followUps: 40 },
  { month: "Feb", consultations: 75, followUps: 45 },
  { month: "Mar", consultations: 85, followUps: 55 },
  { month: "Apr", consultations: 78, followUps: 48 },
  { month: "May", consultations: 90, followUps: 60 },
  { month: "Jun", consultations: 95, followUps: 65 },
]

export function ConsultationTrends() {
  return (
    <ChartContainer
      config={{
        consultations: {
          label: "New Consultations",
          color: "hsl(var(--chart-1))",
        },
        followUps: {
          label: "Follow-ups",
          color: "hsl(var(--chart-2))",
        },
      }}
      className="h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Line
            type="monotone"
            dataKey="consultations"
            stroke="var(--color-consultations)"
            strokeWidth={2}
            dot={{ strokeWidth: 2 }}
          />
          <Line
            type="monotone"
            dataKey="followUps"
            stroke="var(--color-followUps)"
            strokeWidth={2}
            dot={{ strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

