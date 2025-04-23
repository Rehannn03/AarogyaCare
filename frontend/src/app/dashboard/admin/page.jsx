"use client";

import React, { useEffect, useState } from "react";
import { useUserStore } from "@/stores/store";
import { useToast } from "@/components/ui/use-toast";
import apiClient from "@/api-client/apiClient";
import Link from "next/link";

// UI Components
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BarChart3, Users, Activity, Calendar, TrendingUp, Settings, BookOpen, RefreshCw, UserCog, UserPlus, Stethoscope } from "lucide-react";
import { FaCalendarCheck, FaChartBar, FaUserMd } from "react-icons/fa";

const AdminDashboard = () => {
  const { user } = useUserStore();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [stats, setStats] = useState({
    doctors: 0,
    patients: 0,
    appointments: 0,
    earnings: 0,
    pendingApprovals: 0,
    todayAppointments: 0
  });
  const [recentAppointments, setRecentAppointments] = useState([]);
  const [recentDoctors, setRecentDoctors] = useState([]);

  const fetchDashboardData = async () => {
    try {
      const [statsResponse, appointmentsResponse, doctorsResponse] = await Promise.all([
        apiClient.get("/admin/dashboard-stats"),
        apiClient.get("/admin/getAppointments?limit=5"),
        apiClient.get("/admin/getDoctors?limit=5")
      ]);

      if (statsResponse.status === 200) {
        setStats(statsResponse.data.data);
      }

      if (appointmentsResponse.status === 200) {
        setRecentAppointments(appointmentsResponse.data.data.appointments);
      }

      if (doctorsResponse.status === 200) {
        setRecentDoctors(doctorsResponse.data.data.doctors);
      }

      if (refreshing) {
        toast({
          title: "Dashboard Updated",
          description: "Latest data has been loaded",
          variant: "success",
        });
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      toast({
        title: "Error",
        description: "Failed to load dashboard data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchDashboardData();
  };

  useEffect(() => {
    if (user && user.role === "admin") {
      fetchDashboardData();
    }
  }, [user]);

  // Format date helper
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const quickAccessCards = [
    {
      title: "Doctor Management",
      description: "Add, edit, approve doctors",
      icon: <Stethoscope className="h-10 w-10 text-blue-500" />,
      bgClass: "bg-blue-50 border-blue-200",
      link: "/dashboard/all-doctors"
    },
    {
      title: "Patient Records",
      description: "View all patient information",
      icon: <Users className="h-10 w-10 text-purple-500" />,
      bgClass: "bg-purple-50 border-purple-200",
      link: "/dashboard/all-patients"
    },
    {
      title: "Appointment Schedule",
      description: "Manage upcoming appointments",
      icon: <FaCalendarCheck className="h-10 w-10 text-green-500" />,
      bgClass: "bg-green-50 border-green-200",
      link: "/dashboard/appointments"
    },
    {
      title: "Analytics",
      description: "View statistics and reports",
      icon: <FaChartBar className="h-10 w-10 text-amber-500" />,
      bgClass: "bg-amber-50 border-amber-200",
      link: "/dashboard/analytics"
    }
  ];

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
          <p className="text-gray-500 mt-1">
            Welcome back, {user?.name || "Admin"}
          </p>
        </div>
        
        <Button 
          variant="outline" 
          className="mt-4 md:mt-0 flex items-center gap-2 border-2"
          onClick={handleRefresh}
          disabled={refreshing || loading}
        >
          <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
          {refreshing ? 'Refreshing...' : 'Refresh Dashboard'}
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5 mb-8">
        <StatsCard 
          title="Doctors"
          value={stats.doctors}
          icon={<Stethoscope className="h-5 w-5" />}
          description="Total registered"
          loading={loading}
          colorClass="bg-blue-500"
        />
        
        <StatsCard 
          title="Patients"
          value={stats.patients}
          icon={<Users className="h-5 w-5" />}
          description="Total registered"
          loading={loading}
          colorClass="bg-purple-500"
        />
        
        <StatsCard 
          title="Appointments"
          value={stats.appointments}
          icon={<Calendar className="h-5 w-5" />}
          description="Total booked"
          loading={loading}
          colorClass="bg-green-500"
        />
        
        <StatsCard 
          title="Earnings"
          value={`$${stats.earnings}`}
          icon={<TrendingUp className="h-5 w-5" />}
          description="Total revenue"
          loading={loading}
          colorClass="bg-amber-500"
        />
        
        <StatsCard 
          title="Pending Approvals"
          value={stats.pendingApprovals}
          icon={<UserCog className="h-5 w-5" />}
          description="Doctors awaiting verification"
          loading={loading}
          colorClass="bg-orange-500"
        />
        
        <StatsCard 
          title="Today's Appointments"
          value={stats.todayAppointments}
          icon={<BookOpen className="h-5 w-5" />}
          description="Scheduled for today"
          loading={loading}
          colorClass="bg-cyan-500"
        />
      </div>

      {/* Quick Access Cards */}
      <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Access</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {quickAccessCards.map((card, index) => (
          <Link href={card.link} key={index}>
            <Card className={`shadow-sm hover:shadow-md transition-all duration-200 border-2 ${card.bgClass} cursor-pointer h-full`}>
              <CardContent className="flex flex-col items-center justify-center p-6">
                <div className="mb-4 p-3 bg-white rounded-full shadow-sm">
                  {card.icon}
                </div>
                <h3 className="text-lg font-bold text-center">{card.title}</h3>
                <p className="text-gray-500 text-center text-sm mt-1">{card.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Appointments */}
        <Card className="shadow-md">
          <CardHeader className="border-b bg-gray-50">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-xl font-bold">Recent Appointments</CardTitle>
                <CardDescription>Latest patient appointments</CardDescription>
              </div>
              <Link href="/dashboard/appointments">
                <Button variant="outline" size="sm">View All</Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {loading ? (
              <div className="p-6 space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-center space-x-4 p-4 border-b last:border-0">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="space-y-2 flex-1">
                      <Skeleton className="h-4 w-48" />
                      <Skeleton className="h-4 w-32" />
                    </div>
                    <Skeleton className="h-8 w-20" />
                  </div>
                ))}
              </div>
            ) : recentAppointments.length === 0 ? (
              <div className="p-8 text-center">
                <Calendar className="mx-auto h-12 w-12 text-gray-300 mb-3" />
                <p className="text-gray-500">No recent appointments found</p>
              </div>
            ) : (
              <div>
                {recentAppointments.map((appointment, index) => (
                  <div 
                    key={appointment._id} 
                    className={`flex items-center justify-between p-4 ${
                      index !== recentAppointments.length - 1 ? 'border-b' : ''
                    }`}
                  >
                    <div className="flex items-center">
                      <Avatar className="h-10 w-10 mr-3">
                        <AvatarFallback className="bg-blue-100 text-blue-600">
                          {appointment.patient?.name?.charAt(0) || "P"}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{appointment.patient?.name}</p>
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="h-3 w-3 mr-1" />
                          {formatDate(appointment.date)} - {appointment.time}
                        </div>
                      </div>
                    </div>
                    <Badge className={
                      appointment.status === "completed" ? "bg-green-100 text-green-800" : 
                      appointment.status === "cancelled" ? "bg-red-100 text-red-800" : 
                      "bg-amber-100 text-amber-800"
                    }>
                      {appointment.status}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Doctors */}
        <Card className="shadow-md">
          <CardHeader className="border-b bg-gray-50">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-xl font-bold">Recent Doctors</CardTitle>
                <CardDescription>Recently registered doctors</CardDescription>
              </div>
              <Link href="/dashboard/all-doctors">
                <Button variant="outline" size="sm">View All</Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {loading ? (
              <div className="p-6 space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-center space-x-4 p-4 border-b last:border-0">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="space-y-2 flex-1">
                      <Skeleton className="h-4 w-48" />
                      <Skeleton className="h-4 w-32" />
                    </div>
                    <Skeleton className="h-8 w-20" />
                  </div>
                ))}
              </div>
            ) : recentDoctors.length === 0 ? (
              <div className="p-8 text-center">
                <Stethoscope className="mx-auto h-12 w-12 text-gray-300 mb-3" />
                <p className="text-gray-500">No recent doctors found</p>
              </div>
            ) : (
              <div>
                {recentDoctors.map((doctor, index) => (
                  <div 
                    key={doctor._id} 
                    className={`flex items-center justify-between p-4 ${
                      index !== recentDoctors.length - 1 ? 'border-b' : ''
                    }`}
                  >
                    <div className="flex items-center">
                      <Avatar className="h-10 w-10 mr-3">
                        <AvatarFallback className="bg-purple-100 text-purple-600">
                          {doctor.profile?.name?.charAt(0) || "D"}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">Dr. {doctor.profile?.name}</p>
                        <p className="text-sm text-gray-500">{doctor.specialization}</p>
                      </div>
                    </div>
                    <Badge className={
                      doctor.verified ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"
                    }>
                      {doctor.verified ? "Verified" : "Pending"}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const StatsCard = ({ title, value, icon, description, loading, colorClass }) => {
  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-0">
        <div className="relative overflow-hidden">
          <div className={`${colorClass} absolute top-0 left-0 w-2 h-full`}></div>
          <div className="p-6 pl-8">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-500">{title}</h3>
              <div className={`p-2 rounded-full ${colorClass} bg-opacity-15`}>
                {React.cloneElement(icon, { className: `h-4 w-4 ${colorClass} text-opacity-90` })}
              </div>
            </div>
            {loading ? (
              <Skeleton className="h-8 w-16 mb-1" />
            ) : (
              <p className="text-2xl font-bold">{value}</p>
            )}
            <p className="text-xs text-gray-500">{description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminDashboard;