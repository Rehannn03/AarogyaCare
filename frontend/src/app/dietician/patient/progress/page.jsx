"use client";
import React from 'react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Mock data
const weightData = [
  { date: 'Week 1', weight: 183 },
  { date: 'Week 2', weight: 181 },
  { date: 'Week 3', weight: 179 },
  { date: 'Week 4', weight: 180 },
  { date: 'Week 5', weight: 178 },
  { date: 'Week 6', weight: 176 },
  { date: 'Week 7', weight: 175 },
  { date: 'Week 8', weight: 172 },
];

const calorieData = [
  { date: 'Day 1', calories: 2100, goal: 2000 },
  { date: 'Day 2', calories: 1900, goal: 2000 },
  { date: 'Day 3', calories: 2300, goal: 2000 },
  { date: 'Day 4', calories: 1950, goal: 2000 },
  { date: 'Day 5', calories: 1800, goal: 2000 },
  { date: 'Day 6', calories: 2050, goal: 2000 },
  { date: 'Day 7', calories: 2200, goal: 2000 },
];

const macroData = [
  { name: 'Proteins', goal: 25, actual: 23 },
  { name: 'Carbs', goal: 45, actual: 48 },
  { name: 'Fats', goal: 30, actual: 29 },
];

const waterData = [
  { date: 'Day 1', glasses: 6, goal: 8 },
  { date: 'Day 2', glasses: 7, goal: 8 },
  { date: 'Day 3', glasses: 5, goal: 8 },
  { date: 'Day 4', glasses: 8, goal: 8 },
  { date: 'Day 5', glasses: 7, goal: 8 },
  { date: 'Day 6', glasses: 9, goal: 8 },
  { date: 'Day 7', glasses: 7, goal: 8 },
];

const Progress = () => {
  return (
    
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-2xl font-bold">My Progress</h1>
          <Select defaultValue="8weeks">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2weeks">Last 2 weeks</SelectItem>
              <SelectItem value="4weeks">Last 4 weeks</SelectItem>
              <SelectItem value="8weeks">Last 8 weeks</SelectItem>
              <SelectItem value="6months">Last 6 months</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Tabs defaultValue="weight">
  <TabsList className="w-full overflow-x-auto grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
    <TabsTrigger value="weight">Weight</TabsTrigger>
    <TabsTrigger value="calories">Calories</TabsTrigger>
    <TabsTrigger value="macros">Macros</TabsTrigger>
    <TabsTrigger value="water">Water Intake</TabsTrigger>
  </TabsList>

  {/* Weight Tab */}
  <TabsContent value="weight" className="space-y-4">
    <Card>
      <CardHeader>
        <CardTitle>Weight Progress</CardTitle>
        <CardDescription>Your weight progress over time</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={weightData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={['dataMin - 5', 'dataMax + 5']} />
              <Tooltip formatter={(value) => [`${value} lbs`, 'Weight']} />
              <Legend />
              <Line type="monotone" dataKey="weight" stroke="#0ea5e9" strokeWidth={2} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-blue-600">Starting</p>
            <p className="text-xl font-bold">{weightData[0].weight} lbs</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-green-600">Current</p>
            <p className="text-xl font-bold">{weightData[weightData.length - 1].weight} lbs</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="text-sm text-purple-600">Change</p>
            <p className="text-xl font-bold">
              -{weightData[0].weight - weightData[weightData.length - 1].weight} lbs
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  </TabsContent>

  {/* Calories Tab */}
  <TabsContent value="calories" className="space-y-4">
    <Card>
      <CardHeader>
        <CardTitle>Calorie Intake</CardTitle>
        <CardDescription>Daily calorie consumption vs. target</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={calorieData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="calories" stroke="#0ea5e9" fill="#0ea5e9" fillOpacity={0.2} />
              <Line type="monotone" dataKey="goal" stroke="#10b981" strokeWidth={2} strokeDasharray="3 3" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-blue-600">Average</p>
            <p className="text-xl font-bold">
              {Math.round(calorieData.reduce((acc, curr) => acc + curr.calories, 0) / calorieData.length)} kcal
            </p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-green-600">Goal</p>
            <p className="text-xl font-bold">{calorieData[0].goal} kcal</p>
          </div>
          <div className="bg-amber-50 p-4 rounded-lg">
            <p className="text-sm text-amber-600">Variance</p>
            <p className="text-xl font-bold">
              {Math.round(
                calorieData.reduce((acc, curr) => acc + curr.calories, 0) / calorieData.length - calorieData[0].goal
              )} kcal
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  </TabsContent>

  {/* Macros Tab */}
  <TabsContent value="macros" className="space-y-4">
    <Card>
      <CardHeader>
        <CardTitle>Macronutrient Distribution</CardTitle>
        <CardDescription>Average macronutrient percentages vs. targets</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full overflow-x-auto">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={macroData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="goal" name="Target %" fill="#10b981" />
              <Bar dataKey="actual" name="Actual %" fill="#0ea5e9" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  </TabsContent>

  {/* Water Tab */}
  <TabsContent value="water" className="space-y-4">
    <Card>
      <CardHeader>
        <CardTitle>Water Intake</CardTitle>
        <CardDescription>Daily water consumption vs. target</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={waterData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="glasses" name="Glasses" fill="#0ea5e9" />
              <Line type="monotone" dataKey="goal" name="Target" stroke="#10b981" strokeWidth={2} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-blue-600">Average</p>
            <p className="text-xl font-bold">
              {Math.round(waterData.reduce((acc, curr) => acc + curr.glasses, 0) / waterData.length)} glasses
            </p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-green-600">Goal</p>
            <p className="text-xl font-bold">{waterData[0].goal} glasses</p>
          </div>
          <div className="bg-amber-50 p-4 rounded-lg">
            <p className="text-sm text-amber-600">Days on Target</p>
            <p className="text-xl font-bold">
              {waterData.filter((day) => day.glasses >= day.goal).length}/{waterData.length}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  </TabsContent>
</Tabs>

      </div>
  );
};

export default Progress;