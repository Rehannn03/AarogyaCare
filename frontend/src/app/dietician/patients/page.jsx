import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Plus, Search } from "lucide-react"
import { PatientList } from "@/features/dietician/components/patient-list"


export default function PatientsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div className="flex gap-3">
   
          <h2 className="text-3xl font-bold tracking-tight lg:block">Patients</h2>
          </div>
        
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add New Patient
        </Button>
      </div>

      
      <Card>
        <CardHeader>
          <CardTitle>All Patients</CardTitle>
          <CardDescription>Manage your patients and their diet plans</CardDescription>
        </CardHeader>
        <CardContent>
          <PatientList />
        </CardContent>
      </Card>
    </div>
  )
}

