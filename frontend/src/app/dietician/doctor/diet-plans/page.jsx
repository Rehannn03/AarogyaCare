"use client";
import React from 'react';
import { useRouter } from 'next/navigation';

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, Plus, Copy, Pencil, MoreVertical } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock data for diet plans
const dietPlans = [
  {
    id: 1,
    name: "Weight Loss Plan",
    type: "weight-loss",
    description: "A calorie-restricted plan focused on whole foods and lean proteins",
    dateCreated: "2025-02-15",
    calories: 1800,
    patients: 12,
    featured: true
  },
  {
    id: 2,
    name: "Mediterranean Diet",
    type: "balanced",
    description: "Based on traditional foods of Mediterranean countries with emphasis on plant foods and healthy fats",
    dateCreated: "2025-01-20",
    calories: 2100,
    patients: 8,
    featured: true
  },
  {
    id: 3,
    name: "Low Carb Plan",
    type: "weight-loss",
    description: "Reduced carbohydrate intake with higher protein and healthy fats",
    dateCreated: "2025-03-05",
    calories: 1900,
    patients: 5,
    featured: false
  },
  {
    id: 4,
    name: "Diabetes Management",
    type: "medical",
    description: "Carefully balanced diet for blood sugar control with consistent carbohydrate intake",
    dateCreated: "2025-02-28",
    calories: 2000,
    patients: 7,
    featured: false
  },
  {
    id: 5,
    name: "High Protein Plan",
    type: "athletic",
    description: "Higher protein intake for muscle maintenance and recovery",
    dateCreated: "2025-03-12",
    calories: 2400,
    patients: 3,
    featured: false
  }
];

// Mock data for recently assigned patients
const recentAssignments = [
  {
    id: 1,
    patientName: "Alex Smith",
    dietPlan: "Weight Loss Plan",
    dateAssigned: "2025-04-01",
    avatarUrl: "",
    patientId: 1
  },
  {
    id: 2,
    patientName: "Jamie Wilson",
    dietPlan: "Mediterranean Diet",
    dateAssigned: "2025-03-30",
    avatarUrl: "",
    patientId: 2
  },
  {
    id: 3,
    patientName: "Taylor Morgan",
    dietPlan: "Low Carb Plan",
    dateAssigned: "2025-03-28",
    avatarUrl: "",
    patientId: 4
  }
];

const DietPlans = () => {
  const navigate = useRouter();

  return (
    <>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h1 className="text-2xl font-bold">Diet Plans</h1>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Create New Plan
          </Button>
        </div>
        
        <Tabs defaultValue="all">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
            <TabsList>
              <TabsTrigger value="all">All Plans</TabsTrigger>
              <TabsTrigger value="weight-loss">Weight Loss</TabsTrigger>
              <TabsTrigger value="balanced">Balanced</TabsTrigger>
              <TabsTrigger value="medical">Medical</TabsTrigger>
              <TabsTrigger value="athletic">Athletic</TabsTrigger>
            </TabsList>
            
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search plans..."
                className="pl-8"
              />
            </div>
          </div>
          
          <TabsContent value="all" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dietPlans.map((plan) => (
                <Card key={plan.id} className="flex flex-col">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <CardTitle>{plan.name}</CardTitle>
                        <CardDescription>{plan.description}</CardDescription>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem 
                            onClick={() => navigate.push(`/diet-plans/${plan.id}`)}
                            className="cursor-pointer"
                          >
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer">
                            <Copy className="mr-2 h-4 w-4" />
                            Duplicate
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-3 flex-grow">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <p className="text-muted-foreground">Type</p>
                        <p className="font-medium capitalize">{plan.type.replace('-', ' ')}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Calories</p>
                        <p className="font-medium">{plan.calories} kcal</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Created</p>
                        <p className="font-medium">
                          {new Date(plan.dateCreated).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Patients</p>
                        <p className="font-medium">{plan.patients}</p>
                      </div>
                    </div>
                    {plan.featured && (
                      <Badge className="mt-3 bg-primary">Featured</Badge>
                    )}
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => navigate.push(`/dietician/doctor/diet-plan-detail/${plan.id}`)}
                    >
                      View Details
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          {["weight-loss", "balanced", "medical", "athletic"].map((type) => (
            <TabsContent key={type} value={type} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {dietPlans
                  .filter((plan) => plan.type === type)
                  .map((plan) => (
                    <Card key={plan.id} className="flex flex-col">
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-start">
                          <div className="space-y-1">
                            <CardTitle>{plan.name}</CardTitle>
                            <CardDescription>{plan.description}</CardDescription>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem 
                                onClick={() => navigate.push(`/diet-plans/${plan.id}`)}
                                className="cursor-pointer"
                              >
                                <Pencil className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem className="cursor-pointer">
                                <Copy className="mr-2 h-4 w-4" />
                                Duplicate
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-3 flex-grow">
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <p className="text-muted-foreground">Type</p>
                            <p className="font-medium capitalize">{plan.type.replace('-', ' ')}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Calories</p>
                            <p className="font-medium">{plan.calories} kcal</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Created</p>
                            <p className="font-medium">
                              {new Date(plan.dateCreated).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric'
                              })}
                            </p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Patients</p>
                            <p className="font-medium">{plan.patients}</p>
                          </div>
                        </div>
                        {plan.featured && (
                          <Badge className="mt-3 bg-primary">Featured</Badge>
                        )}
                      </CardContent>
                      <CardFooter className="pt-0">
                        <Button 
                          variant="outline" 
                          className="w-full"
                          onClick={() => navigate.push(`/diet-plans/${plan.id}`)}
                        >
                          View Details
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
        
        <Card>
          <CardHeader>
            <CardTitle>Recently Assigned Plans</CardTitle>
            <CardDescription>Patients who were recently assigned diet plans</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentAssignments.map((assignment) => (
                <div key={assignment.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={assignment.avatarUrl} />
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {assignment.patientName.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{assignment.patientName}</div>
                      <div className="text-sm text-muted-foreground">
                        Assigned: {new Date(assignment.dateAssigned).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric'
                        })}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{assignment.dietPlan}</div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => navigate.push(`/patients/${assignment.patientId}`)}
                    >
                      View Patient
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default DietPlans;