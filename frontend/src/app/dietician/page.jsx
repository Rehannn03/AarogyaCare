"use client";
import React from 'react';


import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  Users,
  MessageSquare,
  Calendar,
  TrendingUp,
  Star,
  FileText,
  ChevronRight,
  Activity
} from 'lucide-react';
import { useRouter } from 'next/navigation';


// Mock data
const patientStats = {
  currentWeight: 178,
  targetWeight: 165,
  caloriesConsumed: 1830,
  caloriesGoal: 2100,
  waterConsumed: 6,
  waterGoal: 8,
  daysStreak: 12,
  nextAppointment: 'Tomorrow, 10:00 AM',
  unreadMessages: 3,
  completedTasks: 4,
  totalTasks: 6
};

const doctorStats = {
  totalPatients: 28,
  activePatients: 22,
  pendingAppointments: 5,
  unreadMessages: 7,
  upcomingAppointments: [
    { id: 1, patient: 'Alex Smith', time: 'Today, 2:00 PM', status: 'confirmed' },
    { id: 2, patient: 'Jamie Wilson', time: 'Today, 3:30 PM', status: 'confirmed' },
    { id: 3, patient: 'Jordan Lee', time: 'Tomorrow, 10:00 AM', status: 'pending' }
  ],
  recentPatients: [
    { id: 1, name: 'Alex Smith', status: 'On track', progress: 85 },
    { id: 2, name: 'Jamie Wilson', status: 'Needs attention', progress: 60 },
    { id: 3, name: 'Jordan Lee', status: 'New plan', progress: 15 }
  ]
};

const Dashboard = () => {
    const router = useRouter();
  
    const user = {
      name: "Dr. John", // Replace with actual context value later
      role: "doctor", // or "doctor" or "admin"
    };  

const renderDoctorDashboard = () => (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Welcome back, {user?.name}</h1>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Patients
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Users className="h-4 w-4 text-primary mr-2" />
              <div className="text-2xl font-bold">{doctorStats.totalPatients}</div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {doctorStats.activePatients} active patients
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Unread Messages
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <MessageSquare className="h-4 w-4 text-primary mr-2" />
              <div className="text-2xl font-bold">{doctorStats.unreadMessages}</div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Tap to view your messages</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Appointments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 text-primary mr-2" />
              <div className="text-2xl font-bold">{doctorStats.pendingAppointments}</div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Pending confirmations</p>
          </CardContent>
        </Card>
      </div>

      {/* Appointments and Progress */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Upcoming Appointments */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Upcoming Appointments</CardTitle>
            <CardDescription>Your schedule for the next 24 hours</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {doctorStats.upcomingAppointments.map((appointment) => (
                <div key={appointment.id} className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{appointment.patient}</div>
                    <div className="text-sm text-muted-foreground">{appointment.time}</div>
                  </div>
                  <Button
                    variant={appointment.status === "confirmed" ? "outline" : "default"}
                    size="sm"
                    onClick={() => router.push("/appointments")}
                  >
                    {appointment.status === "confirmed" ? "View" : "Confirm"}
                  </Button>
                </div>
              ))}
            </div>
            <Button
              variant="ghost"
              className="w-full mt-4 flex items-center justify-center"
              onClick={() => router.push("/appointments")}
            >
              View all appointments
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        {/* Patient Progress */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Patient Progress</CardTitle>
            <CardDescription>Recent patient activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {doctorStats.recentPatients.map((patient) => (
                <div key={patient.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">{patient.name}</div>
                    <div className="text-sm text-muted-foreground">{patient.status}</div>
                  </div>
                  <Progress value={patient.progress} className="h-2" />
                </div>
              ))}
            </div>
            <Button
              variant="ghost"
              className="w-full mt-4 flex items-center justify-center"
              onClick={() => router.push("/patients")}
            >
              View all patients
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button
                variant="outline"
                className="h-auto py-4 flex flex-col items-center justify-center"
                onClick={() => router.push("/diet-plans")}
              >
                <FileText className="h-6 w-6 mb-2" />
                <span>Create Diet Plan</span>
              </Button>
              <Button
                variant="outline"
                className="h-auto py-4 flex flex-col items-center justify-center"
                onClick={() => router.push("/messages")}
              >
                <MessageSquare className="h-6 w-6 mb-2" />
                <span>Send Message</span>
              </Button>
              <Button
                variant="outline"
                className="h-auto py-4 flex flex-col items-center justify-center"
                onClick={() => router.push("/appointments")}
              >
                <Calendar className="h-6 w-6 mb-2" />
                <span>Schedule Appointment</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderPatientDashboard = () => (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold">Welcome back, John Doe</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Weight Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <TrendingUp className="h-4 w-4 text-primary mr-2" />
              <div className="text-2xl font-bold">{patientStats.currentWeight} lbs</div>
            </div>
            <div className="mt-2 space-y-1">
              <div className="text-xs text-muted-foreground">
                Target: {patientStats.targetWeight} lbs
              </div>
              <Progress
                value={
                  100 -
                  ((patientStats.currentWeight - patientStats.targetWeight) /
                    (patientStats.currentWeight - patientStats.targetWeight + 30)) *
                    100
                }
                className="h-2"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Daily Streak</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Star className="h-4 w-4 text-primary mr-2" />
              <div className="text-2xl font-bold">{patientStats.daysStreak} days</div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Keep up the good work!</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Next Appointment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{patientStats.nextAppointment}</div>
            <div className="flex items-center mt-1">
              <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
              <p className="text-xs text-muted-foreground">Confirmed with Dr. Sarah</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Today's Progress</CardTitle>
            <CardDescription>Your nutrition and activity tracking</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Calories */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="font-medium">Calories</div>
                  <div className="text-sm">
                    {patientStats.caloriesConsumed} / {patientStats.caloriesGoal} kcal
                  </div>
                </div>
                <Progress
                  value={
                    (patientStats.caloriesConsumed / patientStats.caloriesGoal) * 100
                  }
                  className="h-2"
                />
              </div>

              {/* Water */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="font-medium">Water</div>
                  <div className="text-sm">
                    {patientStats.waterConsumed} / {patientStats.waterGoal} glasses
                  </div>
                </div>
                <Progress
                  value={
                    (patientStats.waterConsumed / patientStats.waterGoal) * 100
                  }
                  className="h-2"
                />
              </div>

              {/* Tasks */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="font-medium">Tasks</div>
                  <div className="text-sm">
                    {patientStats.completedTasks} / {patientStats.totalTasks} completed
                  </div>
                </div>
                <Progress
                  value={
                    (patientStats.completedTasks / patientStats.totalTasks) * 100
                  }
                  className="h-2"
                />
              </div>
            </div>
            <Button
              variant="ghost"
              className="w-full mt-4 flex items-center justify-center"
              onClick={() => router.push('/progress')}
            >
              View detailed progress
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Your Diet Plan</CardTitle>
            <CardDescription>Personalized nutrition plan</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-sm">Breakfast</h3>
                <p className="text-sm text-muted-foreground">
                  Oatmeal with berries and nuts
                </p>
              </div>
              <div>
                <h3 className="font-medium text-sm">Lunch</h3>
                <p className="text-sm text-muted-foreground">
                  Grilled chicken salad with olive oil dressing
                </p>
              </div>
              <div>
                <h3 className="font-medium text-sm">Dinner</h3>
                <p className="text-sm text-muted-foreground">
                  Baked salmon with roasted vegetables
                </p>
              </div>
              <div>
                <h3 className="font-medium text-sm">Snacks</h3>
                <p className="text-sm text-muted-foreground">
                  Greek yogurt, apple with almond butter
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              className="w-full mt-4 flex items-center justify-center"
              onClick={() => router.push('/my-diet-plan')}
            >
              View full diet plan
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button
                variant="outline"
                className="h-auto py-4 flex flex-col items-center justify-center"
                onClick={() => router.push('/progress')}
              >
                <Activity className="h-6 w-6 mb-2" />
                <span>Log Meal</span>
              </Button>
              <Button
                variant="outline"
                className="h-auto py-4 flex flex-col items-center justify-center"
                onClick={() => router.push('/messages')}
              >
                <MessageSquare className="h-6 w-6 mb-2" />
                <span>
                  Message Doctor
                  {patientStats.unreadMessages > 0 && (
                    <span className="inline-block px-1.5 py-0.5 ml-1 text-xs bg-primary text-white rounded-full">
                      {patientStats.unreadMessages}
                    </span>
                  )}
                </span>
              </Button>
              <Button
                variant="outline"
                className="h-auto py-4 flex flex-col items-center justify-center"
                onClick={() => router.push('/appointments')}
              >
                <Calendar className="h-6 w-6 mb-2" />
                <span>Book Appointment</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderAdminDashboard = () => (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>System Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <p>This is the admin dashboard. Here you can manage users and system settings.</p>
            <Button className="mt-4" onClick={() => navigate('/users')}>
              Manage Users
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
        <>
      {user?.role === 'doctor' && renderDoctorDashboard()}
      {user?.role === 'patient' && renderPatientDashboard()}
      {user?.role === 'admin' && renderAdminDashboard()}
      </>
  );
};

export default Dashboard;