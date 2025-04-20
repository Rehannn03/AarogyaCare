import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { FileEdit, Copy, MoreHorizontal } from "lucide-react"
import Link from "next/link"

// Mock data for diet plans
const dietPlans = [
  {
    id: "1",
    name: "Low Carb Weight Loss",
    type: "Weight Loss",
    patients: 8,
    compliance: 78,
    lastUpdated: "2 days ago",
    status: "Active",
  },
  {
    id: "2",
    name: "Diabetes Management",
    type: "Medical",
    patients: 12,
    compliance: 92,
    lastUpdated: "1 week ago",
    status: "Active",
  },
  {
    id: "3",
    name: "Heart Health DASH Diet",
    type: "Medical",
    patients: 5,
    compliance: 65,
    lastUpdated: "3 days ago",
    status: "Active",
  },
  {
    id: "4",
    name: "Sports Performance",
    type: "Athletic",
    patients: 3,
    compliance: 89,
    lastUpdated: "5 days ago",
    status: "Active",
  },
  {
    id: "5",
    name: "Gluten-Free Plan",
    type: "Allergy",
    patients: 7,
    compliance: 82,
    lastUpdated: "1 day ago",
    status: "Active",
  },
]

export function DietPlanList() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Plan Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Patients</TableHead>
            <TableHead>Compliance</TableHead>
            <TableHead>Last Updated</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {dietPlans.map((plan) => {
            // Generate a color based on the plan type
            let badgeVariant: "default" | "secondary" | "outline" = "default"
            if (plan.type === "Medical") badgeVariant = "secondary"
            if (plan.type === "Allergy") badgeVariant = "outline"

            return (
              <TableRow key={plan.id}>
                <TableCell className="font-medium">{plan.name}</TableCell>
                <TableCell>
                  <Badge variant={badgeVariant} className="">{plan.type}</Badge>
                </TableCell>
                <TableCell>{plan.patients}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Progress value={plan.compliance} className="h-2 w-[60px]" />
                    <span className="text-sm">{plan.compliance}%</span>
                  </div>
                </TableCell>
                <TableCell>{plan.lastUpdated}</TableCell>
                <TableCell>
                  <Badge variant="default" className="bg-green-500 hover:bg-green-600">
                    {plan.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={`/diet-plans/${plan.id}`}>
                        <FileEdit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Link>
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Copy className="h-4 w-4" />
                      <span className="sr-only">Duplicate</span>
                    </Button>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">More</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}

