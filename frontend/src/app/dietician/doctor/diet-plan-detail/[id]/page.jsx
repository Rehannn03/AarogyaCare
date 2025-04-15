"use client";
import React, { useState } from 'react';

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  ArrowLeft, 
  MessageSquare, 
  PencilIcon, 
  FilePenLine, 
  Copy, 
  Users, 
  Trash2,
  X,
  Save,
  Plus
} from 'lucide-react';
import { toast } from '@/components/ui/use-toast';"";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useRouter } from 'next/navigation';

// Mock data for diet plans - this would come from an API in a real application
const dietPlans = [
  {
    id: 1,
    name: "Weight Loss Plan",
    type: "weight-loss",
    description: "A calorie-restricted plan focused on whole foods and lean proteins",
    dateCreated: "2025-02-15",
    calories: 1800,
    patients: 12,
    featured: true,
    macros: {
      protein: 25,
      carbs: 45,
      fats: 30
    },
    meals: {
      breakfast: [
        { name: "Oatmeal with berries and nuts", calories: 320, protein: 12, carbs: 45, fat: 14 },
        { name: "Greek yogurt with honey and fruits", calories: 280, protein: 18, carbs: 32, fat: 10 }
      ],
      lunch: [
        { name: "Grilled chicken salad with olive oil dressing", calories: 420, protein: 35, carbs: 15, fat: 22 },
        { name: "Quinoa bowl with roasted vegetables and tofu", calories: 380, protein: 18, carbs: 50, fat: 12 }
      ],
      dinner: [
        { name: "Baked salmon with roasted vegetables", calories: 450, protein: 32, carbs: 20, fat: 25 },
        { name: "Lean beef stir fry with brown rice", calories: 480, protein: 30, carbs: 45, fat: 18 }
      ],
      snacks: [
        { name: "Greek yogurt", calories: 120, protein: 15, carbs: 8, fat: 0 },
        { name: "Apple with almond butter", calories: 180, protein: 5, carbs: 20, fat: 10 }
      ]
    },
    recommendations: [
      "Drink at least 8 glasses of water daily",
      "Limit processed foods and added sugars",
      "Eat slowly and mindfully",
      "Include protein with each meal"
    ],
    assignedPatients: [
      { id: 1, name: "Alex Smith", since: "2025-03-15", progress: "Good", avatarUrl: "" },
      { id: 2, name: "Jamie Wilson", since: "2025-03-20", progress: "Excellent", avatarUrl: "" },
      { id: 4, name: "Taylor Morgan", since: "2025-03-25", progress: "Moderate", avatarUrl: "" }
    ]
  },
  {
    id: 2,
    name: "Mediterranean Diet",
    type: "balanced",
    description: "Based on traditional foods of Mediterranean countries with emphasis on plant foods and healthy fats",
    dateCreated: "2025-01-20",
    calories: 2100,
    patients: 8,
    featured: true,
    macros: {
      protein: 20,
      carbs: 50,
      fats: 30
    },
    meals: {
      breakfast: [
        { name: "Whole grain toast with avocado and feta", calories: 350, protein: 10, carbs: 30, fat: 20 },
        { name: "Greek yogurt with honey and walnuts", calories: 300, protein: 20, carbs: 25, fat: 15 }
      ],
      lunch: [
        { name: "Mediterranean salad with olives and chickpeas", calories: 450, protein: 15, carbs: 40, fat: 25 },
        { name: "Lentil soup with whole grain bread", calories: 400, protein: 18, carbs: 60, fat: 10 }
      ],
      dinner: [
        { name: "Baked fish with olive oil and herbs", calories: 420, protein: 30, carbs: 15, fat: 25 },
        { name: "Eggplant moussaka with side salad", calories: 500, protein: 20, carbs: 40, fat: 30 }
      ],
      snacks: [
        { name: "Hummus with vegetable sticks", calories: 150, protein: 8, carbs: 15, fat: 8 },
        { name: "Mixed nuts and dried fruits", calories: 180, protein: 6, carbs: 15, fat: 12 }
      ]
    },
    recommendations: [
      "Use olive oil as the primary source of fat",
      "Consume fish at least twice a week",
      "Limit red meat consumption",
      "Enjoy fruits as dessert instead of processed sweets"
    ],
    assignedPatients: [
      { id: 3, name: "Jordan Lee", since: "2025-02-10", progress: "Excellent", avatarUrl: "" },
      { id: 5, name: "Casey Brown", since: "2025-02-15", progress: "Good", avatarUrl: "" }
    ]
  },
  {
    id: 3,
    name: "Low Carb Plan",
    type: "weight-loss",
    description: "Reduced carbohydrate intake with higher protein and healthy fats",
    dateCreated: "2025-03-05",
    calories: 1900,
    patients: 5,
    featured: false,
    macros: {
      protein: 30,
      carbs: 25,
      fats: 45
    },
    meals: {
      breakfast: [
        { name: "Eggs with avocado and spinach", calories: 350, protein: 20, carbs: 10, fat: 25 },
        { name: "Protein smoothie with berries", calories: 300, protein: 25, carbs: 15, fat: 15 }
      ],
      lunch: [
        { name: "Grilled chicken salad with olive oil", calories: 420, protein: 35, carbs: 10, fat: 25 },
        { name: "Cauliflower rice bowl with steak strips", calories: 450, protein: 30, carbs: 15, fat: 30 }
      ],
      dinner: [
        { name: "Baked salmon with asparagus", calories: 400, protein: 30, carbs: 10, fat: 25 },
        { name: "Zucchini noodles with turkey meatballs", calories: 380, protein: 35, carbs: 15, fat: 20 }
      ],
      snacks: [
        { name: "String cheese", calories: 80, protein: 8, carbs: 1, fat: 6 },
        { name: "Handful of almonds", calories: 160, protein: 6, carbs: 6, fat: 14 }
      ]
    },
    recommendations: [
      "Limit starchy foods and added sugars",
      "Focus on quality protein sources",
      "Include healthy fats with each meal",
      "Stay hydrated throughout the day"
    ],
    assignedPatients: [
      { id: 6, name: "Riley Johnson", since: "2025-03-01", progress: "Good", avatarUrl: "" },
      { id: 8, name: "Morgan Smith", since: "2025-03-10", progress: "Moderate", avatarUrl: "" }
    ]
  }
];

// Mock data for all patients - this would come from an API in a real application
const allPatients = [
  { id: 1, name: "Alex Smith", avatarUrl: "" },
  { id: 2, name: "Jamie Wilson", avatarUrl: "" },
  { id: 3, name: "Jordan Lee", avatarUrl: "" },
  { id: 4, name: "Taylor Morgan", avatarUrl: "" },
  { id: 5, name: "Casey Brown", avatarUrl: "" },
  { id: 6, name: "Riley Johnson", avatarUrl: "" },
  { id: 7, name: "Morgan Chen", avatarUrl: "" },
  { id: 8, name: "Morgan Smith", avatarUrl: "" },
  { id: 9, name: "Alex Johnson", avatarUrl: "" },
  { id: 10, name: "Jordan Smith", avatarUrl: "" }
];

const DietPlanDetails = ({params}) => {
  const { id } = params;
  const navigate = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editedPlan, setEditedPlan] = useState(null);
  
  // New state variables for additional functionality
  const [isEditMealDialogOpen, setIsEditMealDialogOpen] = useState(false);
  const [selectedMealType, setSelectedMealType] = useState('');
  const [selectedMealIndex, setSelectedMealIndex] = useState(-1);
  const [editedMeal, setEditedMeal] = useState(null);
  
  const [isAddMealDialogOpen, setIsAddMealDialogOpen] = useState(false);
  const [newMeal, setNewMeal] = useState({
    name: '',
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0
  });
  
  const [isAddRecommendationDialogOpen, setIsAddRecommendationDialogOpen] = useState(false);
  const [newRecommendation, setNewRecommendation] = useState('');
  const [isEditRecommendationDialogOpen, setIsEditRecommendationDialogOpen] = useState(false);
  const [selectedRecommendationIndex, setSelectedRecommendationIndex] = useState(-1);
  const [editedRecommendation, setEditedRecommendation] = useState('');
  
  const [isAssignPatientDialogOpen, setIsAssignPatientDialogOpen] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  
  // Find the diet plan based on the ID from the URL
  
  
  const dietPlan = dietPlans.find(plan => plan.id === Number(id));
  console.log(dietPlan);
  // Filter available patients (not already assigned)
  const availablePatients = dietPlan 
    ? allPatients.filter(patient => 
        !dietPlan.assignedPatients.some(assigned => assigned.id === patient.id)
      )
    : [];
  
  if (!dietPlan) {
    return (
      <>
        <div className="p-4 text-center">
          <h2 className="text-xl font-bold">Diet Plan Not Found</h2>
          <p className="mt-2">The diet plan you're looking for doesn't exist.</p>
          <Button 
            className="mt-4"
            onClick={() => navigate.push('/diet-plans')}
          >
            Back to Diet Plans
          </Button>
        </div>
      </>
    );
  }

  const handleDuplicatePlan = () => {
    // In a real app, this would create a new plan in the database
    // Here we'll just show a success message and redirect to the diet plans page
    toast.success(`Diet plan "${dietPlan.name}" duplicated successfully`);
    
    // In a real app, we would navigate to the newly created plan
    // For now, we'll just navigate back to the diet plans list
    setTimeout(() => {
      navigate.push('/diet-plans');
    }, 1500);
  };

  const handleDeletePlan = () => {
    // Close the dialog first
    setIsDeleteDialogOpen(false);
    
    // In a real app, this would delete the plan from the database
    // Here we'll just show a success message and redirect to the diet plans page
    toast.success(`Diet plan "${dietPlan.name}" deleted successfully`);
    
    // Navigate back to the diet plans list
    setTimeout(() => {
      navigate.push('/diet-plans');
    }, 1500);
  };

  const handleEditPlan = () => {
    // Initialize the edited plan with the current plan data
    setEditedPlan({
      name: dietPlan.name,
      description: dietPlan.description,
      type: dietPlan.type,
      calories: dietPlan.calories,
      featured: dietPlan.featured
    });
    
    // Open the edit dialog
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    // In a real app, this would update the plan in the database
    // Here we'll just show a success message
    toast.success(`Diet plan "${editedPlan.name}" updated successfully`);
    
    // Close the dialog
    setIsEditDialogOpen(false);
    
    // In a real app, we would refresh the data from the API
    // For now, we'll just reload the page to simulate the update
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  };

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    
    // Handle checkbox input separately
    if (type === 'checkbox') {
      const checked = (e.target).checked;
      setEditedPlan(prev => ({ ...prev, [name]: checked }));
    } else {
      setEditedPlan(prev => ({ ...prev, [name]: value }));
    }
  };

  // New handler functions for meal editing
  const handleEditMeal = (mealType, index) => {
    setSelectedMealType(mealType);
    setSelectedMealIndex(index);
    setEditedMeal({ ...dietPlan.meals[mealType][index] });
    setIsEditMealDialogOpen(true);
  };

  const handleSaveMealEdit = () => {
    // In a real app, this would update the meal in the database
    // Here we'll just show a success message
    toast.success(`Meal "${editedMeal.name}" updated successfully`);
    
    // Close the dialog
    setIsEditMealDialogOpen(false);
    
    // In a real app, we would refresh the data from the API
    // For now, we'll just reload the page to simulate the update
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  };

  const handleMealInputChange = (e) => {
    const { name, value } = e.target;
    setEditedMeal(prev => ({ 
      ...prev, 
      [name]: name === 'name' ? value : parseInt(value) || 0 
    }));
  };

  const handleAddMeal = (mealType) => {
    setSelectedMealType(mealType);
    setNewMeal({
      name: '',
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0
    });
    setIsAddMealDialogOpen(true);
  };

  const handleSaveNewMeal = () => {
    // In a real app, this would add the meal to the database
    // Here we'll just show a success message
    toast.success(`New meal "${newMeal.name}" added successfully`);
    
    // Close the dialog
    setIsAddMealDialogOpen(false);
    
    // In a real app, we would refresh the data from the API
    // For now, we'll just reload the page to simulate the update
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  };

  const handleNewMealInputChange = (e) => {
    const { name, value } = e.target;
    setNewMeal(prev => ({ 
      ...prev, 
      [name]: name === 'name' ? value : parseInt(value) || 0 
    }));
  };

  // New handler functions for recommendation editing
  const handleAddRecommendation = () => {
    setNewRecommendation('');
    setIsAddRecommendationDialogOpen(true);
  };

  const handleSaveNewRecommendation = () => {
    if (!newRecommendation.trim()) {
      toast.error("Recommendation cannot be empty");
      return;
    }
    
    // In a real app, this would add the recommendation to the database
    // Here we'll just show a success message
    toast.success("New recommendation added successfully");
    
    // Close the dialog
    setIsAddRecommendationDialogOpen(false);
    
    // In a real app, we would refresh the data from the API
    // For now, we'll just reload the page to simulate the update
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  };

  const handleEditRecommendation = (index) => {
    setSelectedRecommendationIndex(index);
    setEditedRecommendation(dietPlan.recommendations[index]);
    setIsEditRecommendationDialogOpen(true);
  };

  const handleSaveEditedRecommendation = () => {
    if (!editedRecommendation.trim()) {
      toast.error("Recommendation cannot be empty");
      return;
    }
    
    // In a real app, this would update the recommendation in the database
    // Here we'll just show a success message
    toast.success("Recommendation updated successfully");
    
    // Close the dialog
    setIsEditRecommendationDialogOpen(false);
    
    // In a real app, we would refresh the data from the API
    // For now, we'll just reload the page to simulate the update
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  };

  const handleDeleteRecommendation = (index) => {
    // In a real app, this would delete the recommendation from the database
    // Here we'll just show a success message
    toast.success("Recommendation deleted successfully");
    
    // In a real app, we would refresh the data from the API
    // For now, we'll just reload the page to simulate the update
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  };

  // New handler functions for patient assignment
  const handleAssignPatient = () => {
    setSelectedPatientId(null);
    setIsAssignPatientDialogOpen(true);
  };

  const handleSavePatientAssignment = () => {
    if (!selectedPatientId) {
      toast.error("Please select a patient");
      return;
    }
    
    // In a real app, this would assign the patient to the diet plan in the database
    // Here we'll just show a success message
    const selectedPatient = allPatients.find(patient => patient.id === selectedPatientId);
    toast.success(`Patient "${selectedPatient?.name}" assigned to diet plan successfully`);
    
    // Close the dialog
    setIsAssignPatientDialogOpen(false);
    
    // In a real app, we would refresh the data from the API
    // For now, we'll just reload the page to simulate the update
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  };

  const handleRemovePatient = (patientId) => {
    // In a real app, this would remove the patient from the diet plan in the database
    // Here we'll just show a success message
    const patient = dietPlan.assignedPatients.find(p => p.id === patientId);
    toast.success(`Patient "${patient?.name}" removed from diet plan successfully`);
    
    // In a real app, we would refresh the data from the API
    // For now, we'll just reload the page to simulate the update
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  };

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => navigate.push('/dietician/doctor/diet-plans')}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">{dietPlan.name}</h1>
            <p className="text-muted-foreground">
              Created on {new Date(dietPlan.dateCreated).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
              })}
            </p>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="meals">Meal Plan</TabsTrigger>
              <TabsTrigger value="patients">Assigned Patients ({dietPlan.assignedPatients.length})</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Plan Details</CardTitle>
                  <CardDescription>Information about this diet plan</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-medium text-sm text-muted-foreground">Description</h3>
                        <p>{dietPlan.description}</p>
                      </div>
                      
                      <div>
                        <h3 className="font-medium text-sm text-muted-foreground">Type</h3>
                        <p className="capitalize">{dietPlan.type.replace('-', ' ')}</p>
                      </div>
                      
                      <div>
                        <h3 className="font-medium text-sm text-muted-foreground">Daily Calorie Target</h3>
                        <p>{dietPlan.calories} kcal</p>
                      </div>
                      
                      {dietPlan.featured && (
                        <Badge className="bg-primary">Featured</Badge>
                      )}
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-sm text-muted-foreground mb-3">Macronutrient Breakdown</h3>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="bg-blue-50 p-3 rounded-lg">
                          <p className="text-sm text-blue-600">Protein</p>
                          <p className="text-xl font-bold">{dietPlan.macros.protein}%</p>
                        </div>
                        <div className="bg-green-50 p-3 rounded-lg">
                          <p className="text-sm text-green-600">Carbs</p>
                          <p className="text-xl font-bold">{dietPlan.macros.carbs}%</p>
                        </div>
                        <div className="bg-amber-50 p-3 rounded-lg">
                          <p className="text-sm text-amber-600">Fats</p>
                          <p className="text-xl font-bold">{dietPlan.macros.fats}%</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Recommendations</CardTitle>
                    <CardDescription>Dietary guidelines for this plan</CardDescription>
                  </div>
                  <Button 
                    className="flex items-center gap-2"
                    onClick={handleAddRecommendation}
                  >
                    <Plus className="h-4 w-4" />
                    Add Recommendation
                  </Button>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {dietPlan.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start justify-between group">
                        <div className="flex items-start gap-2">
                          <div className="h-5 w-5 mt-0.5 text-green-500 flex-shrink-0">•</div>
                          <span>{rec}</span>
                        </div>
                        <div className="hidden group-hover:flex items-center gap-2">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8"
                            onClick={() => handleEditRecommendation(index)}
                          >
                            <PencilIcon className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-destructive"
                            onClick={() => handleDeleteRecommendation(index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="meals" className="space-y-6">
              <Tabs defaultValue="breakfast">
                <TabsList className="grid grid-cols-4 mb-4">
                  <TabsTrigger value="breakfast">Breakfast</TabsTrigger>
                  <TabsTrigger value="lunch">Lunch</TabsTrigger>
                  <TabsTrigger value="dinner">Dinner</TabsTrigger>
                  <TabsTrigger value="snacks">Snacks</TabsTrigger>
                </TabsList>
                
                {Object.entries(dietPlan.meals).map(([mealType, options]) => (
                  <TabsContent key={mealType} value={mealType} className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h2 className="text-lg font-semibold capitalize">{mealType} Options</h2>
                      <Button 
                        size="sm" 
                        className="flex items-center gap-2"
                        onClick={() => handleAddMeal(mealType)}
                      >
                        <Plus className="h-4 w-4" />
                        Add Option
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {options.map((meal, index) => (
                        <Card key={index} className="group">
                          <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                              <CardTitle className="text-base">{meal.name}</CardTitle>
                              <div className="hidden group-hover:flex items-center gap-2">
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className="h-8 w-8"
                                  onClick={() => handleEditMeal(mealType, index)}
                                >
                                  <PencilIcon className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="grid grid-cols-4 text-sm">
                              <div>
                                <p className="text-muted-foreground">Calories</p>
                                <p className="font-medium">{meal.calories}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">Protein</p>
                                <p className="font-medium">{meal.protein}g</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">Carbs</p>
                                <p className="font-medium">{meal.carbs}g</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">Fat</p>
                                <p className="font-medium">{meal.fat}g</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </TabsContent>
            
            <TabsContent value="patients" className="space-y-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Assigned Patients</CardTitle>
                    <CardDescription>Patients currently following this diet plan</CardDescription>
                  </div>
                  <Button 
                    className="flex items-center gap-2"
                    onClick={handleAssignPatient}  
                  >
                    <Users className="h-4 w-4" />
                    Assign to Patient
                  </Button>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Patient</TableHead>
                        <TableHead>Assigned Since</TableHead>
                        <TableHead>Progress</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {dietPlan.assignedPatients.map((patient) => (
                        <TableRow key={patient.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar>
                                <AvatarImage src={patient.avatarUrl} />
                                <AvatarFallback className="bg-primary text-primary-foreground">
                                  {patient.name.substring(0, 2).toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                              <div>{patient.name}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            {new Date(patient.since).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </TableCell>
                          <TableCell>
                            <Badge 
                              className={
                                patient.progress === "Excellent" ? "bg-green-500" :
                                patient.progress === "Good" ? "bg-blue-500" :
                                "bg-amber-500"
                              }
                            >
                              {patient.progress}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => navigate.push(`/patients/${patient.id}`)}
                              >
                                <Users className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => navigate.push(`/messages?patient=${patient.id}`)}
                              >
                                <MessageSquare className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-destructive"
                                onClick={() => handleRemovePatient(patient.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={handleDuplicatePlan}
            >
              <Copy className="h-4 w-4" />
              Duplicate Plan
            </Button>
            <Button 
              variant="destructive" 
              className="flex items-center gap-2"
              onClick={() => setIsDeleteDialogOpen(true)}
            >
              <Trash2 className="h-4 w-4" />
              Delete Plan
            </Button>
          </div>
          <Button 
            className="flex items-center gap-2"
            onClick={handleEditPlan}
          >
            <FilePenLine className="h-4 w-4" />
            Edit Plan
          </Button>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this diet plan?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the diet plan
              "{dietPlan.name}" and remove it from all assigned patients.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeletePlan} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Edit Diet Plan Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Diet Plan</DialogTitle>
            <DialogDescription>
              Make changes to the diet plan here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          
          {editedPlan && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={editedPlan.name}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right">
                  Type
                </Label>
                <select
                  id="type"
                  name="type"
                  value={editedPlan.type}
                  onChange={handleInputChange}
                  className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="weight-loss">Weight Loss</option>
                  <option value="balanced">Balanced</option>
                  <option value="medical">Medical</option>
                  <option value="athletic">Athletic</option>
                </select>
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="calories" className="text-right">
                  Calories
                </Label>
                <Input
                  id="calories"
                  name="calories"
                  type="number"
                  value={editedPlan.calories}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  value={editedPlan.description}
                  onChange={handleInputChange}
                  className="col-span-3"
                  rows={3}
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <div className="text-right">
                  <Label htmlFor="featured">Featured</Label>
                </div>
                <div className="col-span-3 flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="featured"
                    name="featured"
                    checked={editedPlan.featured}
                    onChange={(e) => setEditedPlan(prev => ({ ...prev, featured: e.target.checked }))}
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <Label htmlFor="featured">Mark as featured plan</Label>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>
            <Button onClick={handleSaveEdit}>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Meal Dialog */}
      <Dialog open={isEditMealDialogOpen} onOpenChange={setIsEditMealDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Meal</DialogTitle>
            <DialogDescription>
              Make changes to the meal details here.
            </DialogDescription>
          </DialogHeader>
          
          {editedMeal && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="meal-name" className="text-right">
                  Name
                </Label>
                <Input
                  id="meal-name"
                  name="name"
                  value={editedMeal.name}
                  onChange={handleMealInputChange}
                  className="col-span-3"
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="meal-calories" className="text-right">
                  Calories
                </Label>
                <Input
                  id="meal-calories"
                  name="calories"
                  type="number"
                  value={editedMeal.calories}
                  onChange={handleMealInputChange}
                  className="col-span-3"
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="meal-protein" className="text-right">
                  Protein (g)
                </Label>
                <Input
                  id="meal-protein"
                  name="protein"
                  type="number"
                  value={editedMeal.protein}
                  onChange={handleMealInputChange}
                  className="col-span-3"
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="meal-carbs" className="text-right">
                  Carbs (g)
                </Label>
                <Input
                  id="meal-carbs"
                  name="carbs"
                  type="number"
                  value={editedMeal.carbs}
                  onChange={handleMealInputChange}
                  className="col-span-3"
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="meal-fat" className="text-right">
                  Fat (g)
                </Label>
                <Input
                  id="meal-fat"
                  name="fat"
                  type="number"
                  value={editedMeal.fat}
                  onChange={handleMealInputChange}
                  className="col-span-3"
                />
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditMealDialogOpen(false)}>
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>
            <Button onClick={handleSaveMealEdit}>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Meal Dialog */}
      <Dialog open={isAddMealDialogOpen} onOpenChange={setIsAddMealDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New {selectedMealType && selectedMealType.charAt(0).toUpperCase() + selectedMealType.slice(1)} Option</DialogTitle>
            <DialogDescription>
              Add details for the new meal option.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-meal-name" className="text-right">
                Name
              </Label>
              <Input
                id="new-meal-name"
                name="name"
                value={newMeal.name}
                onChange={handleNewMealInputChange}
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-meal-calories" className="text-right">
                Calories
              </Label>
              <Input
                id="new-meal-calories"
                name="calories"
                type="number"
                value={newMeal.calories}
                onChange={handleNewMealInputChange}
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-meal-protein" className="text-right">
                Protein (g)
              </Label>
              <Input
                id="new-meal-protein"
                name="protein"
                type="number"
                value={newMeal.protein}
                onChange={handleNewMealInputChange}
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-meal-carbs" className="text-right">
                Carbs (g)
              </Label>
              <Input
                id="new-meal-carbs"
                name="carbs"
                type="number"
                value={newMeal.carbs}
                onChange={handleNewMealInputChange}
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-meal-fat" className="text-right">
                Fat (g)
              </Label>
              <Input
                id="new-meal-fat"
                name="fat"
                type="number"
                value={newMeal.fat}
                onChange={handleNewMealInputChange}
                className="col-span-3"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddMealDialogOpen(false)}>
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>
            <Button onClick={handleSaveNewMeal}>
              <Save className="mr-2 h-4 w-4" />
              Add Meal
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Recommendation Dialog */}
      <Dialog open={isAddRecommendationDialogOpen} onOpenChange={setIsAddRecommendationDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Recommendation</DialogTitle>
            <DialogDescription>
              Add a new dietary guideline for this plan.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-recommendation" className="text-right">
                Recommendation
              </Label>
              <Textarea
                id="new-recommendation"
                value={newRecommendation}
                onChange={(e) => setNewRecommendation(e.target.value)}
                className="col-span-3"
                rows={3}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddRecommendationDialogOpen(false)}>
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>
            <Button onClick={handleSaveNewRecommendation}>
              <Save className="mr-2 h-4 w-4" />
              Add Recommendation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Recommendation Dialog */}
      <Dialog open={isEditRecommendationDialogOpen} onOpenChange={setIsEditRecommendationDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Recommendation</DialogTitle>
            <DialogDescription>
              Update the dietary guideline for this plan.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-recommendation" className="text-right">
                Recommendation
              </Label>
              <Textarea
                id="edit-recommendation"
                value={editedRecommendation}
                onChange={(e) => setEditedRecommendation(e.target.value)}
                className="col-span-3"
                rows={3}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditRecommendationDialogOpen(false)}>
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>
            <Button onClick={handleSaveEditedRecommendation}>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Assign Patient Dialog */}
      <Dialog open={isAssignPatientDialogOpen} onOpenChange={setIsAssignPatientDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Assign Patient to Diet Plan</DialogTitle>
            <DialogDescription>
              Select a patient to assign to "{dietPlan.name}" diet plan.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="patient-select" className="text-right">
                Patient
              </Label>
              <select
                id="patient-select"
                value={selectedPatientId || ''}
                onChange={(e) => setSelectedPatientId(parseInt(e.target.value))}
                className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="">Select a patient</option>
                {availablePatients.map((patient) => (
                  <option key={patient.id} value={patient.id}>
                    {patient.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAssignPatientDialogOpen(false)}>
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>
            <Button onClick={handleSavePatientAssignment}>
              <Save className="mr-2 h-4 w-4" />
              Assign Patient
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
    </>
  );
};

export default DietPlanDetails;