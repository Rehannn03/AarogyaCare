"use client";

import React from 'react';
import apiClient from '@/api-client/apiClient';
import { useToast } from '@/components/ui/use-toast';
import { useUserStore } from '@/stores/store';
import { useEffect, useState } from 'react';
import BarChartUI from '@/components/Analytics/BarChartUI';
import LineChartUI from '@/components/Analytics/LineChartUI';
import { Component as PieChartUI } from '@/components/Analytics/PieChartUI';
import { AgeChart } from '@/components/Analytics/AgeChartUI';
import { GendersUI } from '@/components/Analytics/GendersUI';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3, 
  LineChart, 
  PieChart, 
  Users, 
  Calendar, 
  TrendingUp, 
  Map,
  Activity,
  RefreshCw
} from "lucide-react";
import { Button } from '@/components/ui/button';

function Analytics() {
    const [loading, setLoading] = useState(true);
    const { user } = useUserStore();
    const { toast } = useToast();
    const [symptoms, setSymptoms] = useState([]);    
    const [dailyAppointments, setDailyAppointments] = useState([]);
    const [city, setCity] = useState([]);    
    const [age, setAge] = useState([]);
    const [gender, setGender] = useState([]);
    const [activeView, setActiveView] = useState("overview");
    const [refreshing, setRefreshing] = useState(false);

    const getSymptoms = async () => {
        try {
            const response = await apiClient.get('/admin/symptoms');
            if(response.status === 200){
                setSymptoms(response.data.data.symptons.slice(0,10));
            } else {
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: "Failed to fetch symptom data"
                });
            }
        } catch (error) {
            console.error(error);
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to fetch symptom data"
            });
        }
    }

    const getDailyAppointments = async () => {
        try {
            const response = await apiClient.get('/admin/daily-appointments');
            if(response.status === 200){
                setDailyAppointments(response.data.data.appointments);
            } else {
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: "Failed to fetch appointment data"
                });
            }
        } catch (error) {
            console.error(error);
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to fetch appointment data"
            });
        }
    }

    const getDemographics = async () => {
        try {
            const response = await apiClient.get('/admin/demographics');
            if(response.status === 200){
                setCity(response.data.data.city);
                setAge(response.data.data.age);
                setGender(response.data.data.gender);
            } else {
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: "Failed to fetch demographic data"
                });
            }
        } catch (error) {
            console.error(error);
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to fetch demographic data"
            });
        }
    }

    const refreshData = async () => {
        setRefreshing(true);
        try {
            await Promise.all([
                getSymptoms(),
                getDailyAppointments(),
                getDemographics()
            ]);
            toast({
                title: "Success",
                description: "Analytics data refreshed",
                variant: "success"
            });
        } catch (error) {
            console.error("Error refreshing data:", error);
        } finally {
            setRefreshing(false);
        }
    };

    // Calculate summaries for stats cards
    const getTotalAppointments = () => {
        return dailyAppointments.reduce((total, item) => total + item.count, 0);
    };
    
    const getTopSymptom = () => {
        if (symptoms.length === 0) return "No data";
        return symptoms[0]?.name || "No data";
    };
    
    const getTopCity = () => {
        if (city.length === 0) return "No data";
        return city[0]?.name || "No data";
    };
    
    // Get most common gender
    const getMostCommonGender = () => {
        if (gender.length === 0) return "No data";
        const sorted = [...gender].sort((a, b) => b.value - a.value);
        return sorted[0]?.name || "No data";
    };

    useEffect(() => {
        if(user){
            setLoading(true);
            Promise.all([
                getSymptoms(),
                getDailyAppointments(),
                getDemographics()
            ])
            .finally(() => {
                setLoading(false);
            });
        }
    }, [user]);  

    return (
        <div className="container mx-auto py-8 px-4 max-w-7xl">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Analytics Dashboard</h1>
                    <p className="text-gray-500 mt-1">Comprehensive health analytics and insights</p>
                </div>
                <Button 
                    variant="outline" 
                    className="mt-4 md:mt-0 flex items-center gap-2 border-2"
                    onClick={refreshData}
                    disabled={refreshing || loading}
                >
                    <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
                    {refreshing ? 'Refreshing...' : 'Refresh Data'}
                </Button>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                    <CardContent className="p-6">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-sm font-medium text-blue-600">Total Appointments</p>
                                {loading ? (
                                    <Skeleton className="h-9 w-16 mt-1" />
                                ) : (
                                    <h3 className="text-3xl font-bold text-gray-900 mt-1">{getTotalAppointments()}</h3>
                                )}
                                <p className="text-sm text-blue-700 mt-1">All time</p>
                            </div>
                            <div className="p-3 bg-blue-500/10 rounded-full">
                                <Calendar className="h-6 w-6 text-blue-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
                
                <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                    <CardContent className="p-6">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-sm font-medium text-purple-600">Top Symptom</p>
                                {loading ? (
                                    <Skeleton className="h-9 w-16 mt-1" />
                                ) : (
                                    <h3 className="text-3xl font-bold text-gray-900 mt-1">{getTopSymptom()}</h3>
                                )}
                                <p className="text-sm text-purple-700 mt-1">Most reported</p>
                            </div>
                            <div className="p-3 bg-purple-500/10 rounded-full">
                                <Activity className="h-6 w-6 text-purple-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
                
                <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
                    <CardContent className="p-6">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-sm font-medium text-amber-600">Top Location</p>
                                {loading ? (
                                    <Skeleton className="h-9 w-16 mt-1" />
                                ) : (
                                    <h3 className="text-3xl font-bold text-gray-900 mt-1">{getTopCity()}</h3>
                                )}
                                <p className="text-sm text-amber-700 mt-1">Most patients</p>
                            </div>
                            <div className="p-3 bg-amber-500/10 rounded-full">
                                <Map className="h-6 w-6 text-amber-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
                
                <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                    <CardContent className="p-6">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-sm font-medium text-green-600">Gender</p>
                                {loading ? (
                                    <Skeleton className="h-9 w-16 mt-1" />
                                ) : (
                                    <h3 className="text-3xl font-bold text-gray-900 mt-1">{getMostCommonGender()}</h3>
                                )}
                                <p className="text-sm text-green-700 mt-1">Most common</p>
                            </div>
                            <div className="p-3 bg-green-500/10 rounded-full">
                                <Users className="h-6 w-6 text-green-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveView}>
                <TabsList className="grid grid-cols-3 lg:w-[400px] mb-8">
                    <TabsTrigger value="overview" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
                        <TrendingUp className="h-4 w-4 mr-2" /> Overview
                    </TabsTrigger>
                    <TabsTrigger value="appointments" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
                        <Calendar className="h-4 w-4 mr-2" /> Appointments
                    </TabsTrigger>
                    <TabsTrigger value="demographics" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
                        <Users className="h-4 w-4 mr-2" /> Demographics
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="overview">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <Card className="shadow-md">
                            <CardHeader className="border-b bg-gray-50">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <CardTitle className="flex items-center">
                                            <BarChart3 className="h-5 w-5 mr-2 text-blue-600" />
                                            Top Symptoms
                                        </CardTitle>
                                        <CardDescription>Most commonly reported patient symptoms</CardDescription>
                                    </div>
                                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                                        Top {symptoms.length}
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="p-6 h-[400px]">
                                {loading ? (
                                    <div className="h-full flex items-center justify-center">
                                        <div className="space-y-3 w-full">
                                            <Skeleton className="h-4 w-full" />
                                            <Skeleton className="h-4 w-[90%]" />
                                            <Skeleton className="h-4 w-[80%]" />
                                            <Skeleton className="h-4 w-[70%]" />
                                            <Skeleton className="h-4 w-[60%]" />
                                        </div>
                                    </div>
                                ) : (
                                    symptoms.length > 0 ? (
                                        <BarChartUI data={symptoms} title="Symptoms" />
                                    ) : (
                                        <div className="h-full flex items-center justify-center">
                                            <p className="text-gray-500">No symptom data available</p>
                                        </div>
                                    )
                                )}
                            </CardContent>
                        </Card>
                        
                        <Card className="shadow-md">
                            <CardHeader className="border-b bg-gray-50">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <CardTitle className="flex items-center">
                                            <PieChart className="h-5 w-5 mr-2 text-purple-600" />
                                            Patient Locations
                                        </CardTitle>
                                        <CardDescription>Distribution of patients by city</CardDescription>
                                    </div>
                                    <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                                        Geographic
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="p-6 h-[400px]">
                                {loading ? (
                                    <div className="h-full flex items-center justify-center">
                                        <div className="h-64 w-64 rounded-full border-8 border-gray-100 relative">
                                            <Skeleton className="absolute top-0 left-0 h-1/2 w-1/2 rounded-tl-full" />
                                            <Skeleton className="absolute top-0 right-0 h-1/2 w-1/2 rounded-tr-full" />
                                            <Skeleton className="absolute bottom-0 left-0 h-1/2 w-1/2 rounded-bl-full" />
                                            <Skeleton className="absolute bottom-0 right-0 h-1/2 w-1/2 rounded-br-full" />
                                        </div>
                                    </div>
                                ) : (
                                    city.length > 0 ? (
                                        <PieChartUI data={city} title="City" />
                                    ) : (
                                        <div className="h-full flex items-center justify-center">
                                            <p className="text-gray-500">No location data available</p>
                                        </div>
                                    )
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
                
                <TabsContent value="appointments">
                    <Card className="shadow-md">
                        <CardHeader className="border-b bg-gray-50">
                            <div className="flex justify-between items-center">
                                <div>
                                    <CardTitle className="flex items-center">
                                        <LineChart className="h-5 w-5 mr-2 text-green-600" />
                                        Appointment Trends
                                    </CardTitle>
                                    <CardDescription>Daily appointment volume over time</CardDescription>
                                </div>
                                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                    Trends
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="p-6 h-[500px]">
                            {loading ? (
                                <div className="space-y-4 w-full">
                                    <div className="flex items-end w-full gap-2">
                                        {[...Array(7)].map((_, i) => (
                                            <Skeleton key={i} className={`h-${20 + Math.floor(Math.random() * 60)}  flex-1 rounded-t-md`} />
                                        ))}
                                    </div>
                                    <Skeleton className="h-8 w-full" />
                                </div>
                            ) : (
                                dailyAppointments.length > 0 ? (
                                    <LineChartUI data={dailyAppointments} />
                                ) : (
                                    <div className="h-full flex items-center justify-center">
                                        <p className="text-gray-500">No appointment data available</p>
                                    </div>
                                )
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>
                
                <TabsContent value="demographics">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <Card className="shadow-md">
                            <CardHeader className="border-b bg-gray-50">
                                <CardTitle className="flex items-center">
                                    <Users className="h-5 w-5 mr-2 text-blue-600" />
                                    Age Distribution
                                </CardTitle>
                                <CardDescription>Patient breakdown by age group</CardDescription>
                            </CardHeader>
                            <CardContent className="p-6 h-[400px]">
                                {loading ? (
                                    <div className="h-full flex items-center justify-center">
                                        <div className="space-y-3 w-full">
                                            <Skeleton className="h-4 w-full" />
                                            <Skeleton className="h-4 w-[90%]" />
                                            <Skeleton className="h-4 w-[80%]" />
                                            <Skeleton className="h-4 w-[70%]" />
                                            <Skeleton className="h-4 w-[60%]" />
                                        </div>
                                    </div>
                                ) : (
                                    age.length > 0 ? (
                                        <AgeChart data={age} title="Age" />
                                    ) : (
                                        <div className="h-full flex items-center justify-center">
                                            <p className="text-gray-500">No age data available</p>
                                        </div>
                                    )
                                )}
                            </CardContent>
                        </Card>
                        
                        <Card className="shadow-md">
                            <CardHeader className="border-b bg-gray-50">
                                <CardTitle className="flex items-center">
                                    <Users className="h-5 w-5 mr-2 text-purple-600" />
                                    Gender Distribution
                                </CardTitle>
                                <CardDescription>Patient breakdown by gender</CardDescription>
                            </CardHeader>
                            <CardContent className="p-6 h-[400px]">
                                {loading ? (
                                    <div className="h-full flex items-center justify-center">
                                        <div className="h-64 w-64 rounded-full border-8 border-gray-100 relative">
                                            <Skeleton className="absolute top-0 left-0 h-1/2 w-1/2 rounded-tl-full" />
                                            <Skeleton className="absolute top-0 right-0 h-1/2 w-1/2 rounded-tr-full" />
                                            <Skeleton className="absolute bottom-0 left-0 h-1/2 w-1/2 rounded-bl-full" />
                                            <Skeleton className="absolute bottom-0 right-0 h-1/2 w-1/2 rounded-br-full" />
                                        </div>
                                    </div>
                                ) : (
                                    gender.length > 0 ? (
                                        <GendersUI data={gender} />
                                    ) : (
                                        <div className="h-full flex items-center justify-center">
                                            <p className="text-gray-500">No gender data available</p>
                                        </div>
                                    )
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}

export default Analytics;