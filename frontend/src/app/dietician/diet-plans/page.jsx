import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Search, Filter, ArrowUpDown } from "lucide-react"
import { DietPlanList } from "@/features/dietician/components/diet-plan-list"
import { DietPlanTemplates } from "@/features/dietician/components/diet-plan-templates"

export default function DietPlansPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Diet Plans</h2>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create New Plan
        </Button>
      </div>

      <Tabs defaultValue="active" className="space-y-4">
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="active">Active Plans</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="archived">Archived</TabsTrigger>
          </TabsList>

          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search plans..." className="w-[200px] pl-8 md:w-[300px]" />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
              <span className="sr-only">Filter</span>
            </Button>
            <Button variant="outline" size="icon">
              <ArrowUpDown className="h-4 w-4" />
              <span className="sr-only">Sort</span>
            </Button>
          </div>
        </div>

        <TabsContent value="active" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Active Diet Plans</CardTitle>
              <CardDescription>Manage your patients' active diet plans</CardDescription>
            </CardHeader>
            <CardContent>
              <DietPlanList />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Diet Plan Templates</CardTitle>
              <CardDescription>Reusable diet plan templates for common conditions</CardDescription>
            </CardHeader>
            <CardContent>
              <DietPlanTemplates />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="archived" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Archived Diet Plans</CardTitle>
              <CardDescription>Previously used diet plans that are no longer active</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-40">
                <p className="text-muted-foreground">No archived plans found</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

