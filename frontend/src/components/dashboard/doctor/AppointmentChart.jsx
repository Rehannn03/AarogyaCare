"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { day: "Mon", scheduled: 8, completed: 6, cancelled: 2 },
  { day: "Tue", scheduled: 10, completed: 8, cancelled: 1 },
  { day: "Wed", scheduled: 12, completed: 10, cancelled: 2 },
  { day: "Thu", scheduled: 9, completed: 7, cancelled: 1 },
  { day: "Fri", scheduled: 11, completed: 9, cancelled: 2 },
  { day: "Sat", scheduled: 6, completed: 5, cancelled: 1 },
  { day: "Sun", scheduled: 4, completed: 4, cancelled: 0 },
]

export function AppointmentChart() {
  return (
    <ChartContainer
      config={{
        scheduled: {
          label: "Scheduled",
          color: "hsl(var(--chart-1))",
        },
        completed: {
          label: "Completed",
          color: "hsl(var(--chart-2))",
        },
        cancelled: {
          label: "Cancelled",
          color: "hsl(var(--chart-3))",
        },
      }}
      className="h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="day" />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="scheduled" fill="var(--color-scheduled)" radius={[4, 4, 0, 0]} />
          <Bar dataKey="completed" fill="var(--color-completed)" radius={[4, 4, 0, 0]} />
          <Bar dataKey="cancelled" fill="var(--color-cancelled)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

