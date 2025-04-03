"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"


export function PatientProgressChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis domain={["dataMin - 5", "dataMax + 5"]} />
        <Tooltip />
        <Line type="monotone" dataKey="weight" stroke="hsl(var(--primary))" activeDot={{ r: 8 }} strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  )
}

