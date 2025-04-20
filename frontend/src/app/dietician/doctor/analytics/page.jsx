"use client";
import React from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Mock data for analytics
const patientGrowthData = [
  { month: 'Jan', patients: 12 },
  { month: 'Feb', patients: 15 },
  { month: 'Mar', patients: 18 },
  { month: 'Apr', patients: 22 },
  { month: 'May', patients: 25 },
  { month: 'Jun', patients: 28 },
  { month: 'Jul', patients: 30 },
  { month: 'Aug', patients: 32 },
];

const appointmentData = [
  { month: 'Jan', scheduled: 45, completed: 42, canceled: 3 },
  { month: 'Feb', scheduled: 50, completed: 45, canceled: 5 },
  { month: 'Mar', scheduled: 60, completed: 52, canceled: 8 },
  { month: 'Apr', scheduled: 70, completed: 65, canceled: 5 },
  { month: 'May', scheduled: 65, completed: 58, canceled: 7 },
  { month: 'Jun', scheduled: 80, completed: 72, canceled: 8 },
  { month: 'Jul', scheduled: 85, completed: 80, canceled: 5 },
  { month: 'Aug', scheduled: 90, completed: 82, canceled: 8 },
];

const patientProgressData = [
  { category: 'Excellent', value: 25, color: '#10b981' },
  { category: 'Good', value: 40, color: '#3b82f6' },
  { category: 'Average', value: 20, color: '#f59e0b' },
  { category: 'Needs Improvement', value: 15, color: '#ef4444' },
];

const dietPlanData = [
  { plan: 'Weight Loss', patients: 35 },
  { plan: 'Mediterranean', patients: 25 },
  { plan: 'Low Carb', patients: 15 },
  { plan: 'Diabetes', patients: 12 },
  { plan: 'High Protein', patients: 8 },
  { plan: 'Other', patients: 5 },
];

const Analytics = () => {
  return (
    <>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
          <Select defaultValue="6months">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="3months">Last 3 months</SelectItem>
              <SelectItem value="6months">Last 6 months</SelectItem>
              <SelectItem value="1year">Last 1 year</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Patients</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">32</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-green-500">↑ 12%</span> from last month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Appointments this Month</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">90</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-green-500">↑ 5%</span> from last month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Average Patient Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">68%</div>
              <p className="text-xs text-muted-foreground mt-1">
                Based on all active patients
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Completion Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">91%</div>
              <p className="text-xs text-muted-foreground mt-1">
                Of scheduled appointments
              </p>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="patients">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="patients">Patients</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="diet-plans">Diet Plans</TabsTrigger>
          </TabsList>
          
          <TabsContent value="patients" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Patient Growth</CardTitle>
                  <CardDescription>Total patients over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={patientGrowthData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="patients" 
                          name="Patient Count"
                          stroke="#3b82f6" 
                          strokeWidth={2}
                          activeDot={{ r: 6 }} 
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Patient Progress Distribution</CardTitle>
                  <CardDescription>Progress categories of active patients</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={patientProgressData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                          nameKey="category"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {patientProgressData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="appointments" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Appointment Statistics</CardTitle>
                <CardDescription>Scheduled, completed, and canceled appointments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={appointmentData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="scheduled" name="Scheduled" fill="#3b82f6" />
                      <Bar dataKey="completed" name="Completed" fill="#10b981" />
                      <Bar dataKey="canceled" name="Canceled" fill="#ef4444" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="diet-plans" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Diet Plans Distribution</CardTitle>
                <CardDescription>Distribution of patients by diet plan</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={dietPlanData} layout="vertical" margin={{ top: 20, right: 30, left: 100, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis type="category" dataKey="plan" />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="patients" name="Number of Patients" fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default Analytics;