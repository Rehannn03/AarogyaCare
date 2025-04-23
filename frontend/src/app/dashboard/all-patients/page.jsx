"use client";

import React from "react";
import apiClient from "@/api-client/apiClient";
import { useEffect, useState } from "react";
import { FaUserCircle, FaSync, FaSearch } from "react-icons/fa";
import { useUserStore } from "@/stores/store";
import { useToast } from "@/components/ui/use-toast";

// UI Components
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const PatientManagementPage = () => {
  const { user } = useUserStore();
  const [allPatients, setAllPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const { toast } = useToast();

  const getAllPatients = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get("/admin/getPatients");
      
      if (response.data?.data?.patients) {
        const patientListResponse = response.data.data.patients;
        setAllPatients(patientListResponse);
        
        if (refreshing) {
          toast({
            title: "Success",
            description: `${patientListResponse.length} patients loaded successfully`,
            variant: "success",
          });
        }
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error("Error fetching patients:", error);
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to fetch patients. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    getAllPatients();
  };

  useEffect(() => {
    if (user) {
      getAllPatients();
    }
  }, [user]);

  // Filter patients based on search and active tab
  const filteredPatients = allPatients.filter(patient => {
    const matchesSearch = 
      patient.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
      patient.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.phone?.includes(searchQuery);
    
    if (activeTab === "all") return matchesSearch;
    if (activeTab === "active") return patient.active && matchesSearch;
    if (activeTab === "inactive") return !patient.active && matchesSearch;
    
    return matchesSearch;
  });

  // Get patient status statistics
  const activePatientCount = allPatients.filter(p => p.active).length;
  const inactivePatientCount = allPatients.length - activePatientCount;

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 flex items-center">
            <FaUserCircle className="mr-3 text-blue-600" />
            Patient Management
          </h1>
          <p className="text-gray-500 mt-1">View and manage all patients in the system</p>
        </div>
        
        <Button
          onClick={handleRefresh}
          disabled={loading || refreshing}
          variant="outline"
          className="mt-4 md:mt-0 flex items-center gap-2 border-2"
        >
          <FaSync className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
          {refreshing ? 'Refreshing...' : 'Refresh Patients'}
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-blue-600">Total Patients</p>
                {loading ? (
                  <Skeleton className="h-9 w-16 mt-1" />
                ) : (
                  <h3 className="text-3xl font-bold text-gray-900 mt-1">{allPatients.length}</h3>
                )}
                <p className="text-sm text-blue-700 mt-1">All registered</p>
              </div>
              <div className="p-3 bg-blue-500/10 rounded-full">
                <FaUserCircle className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-green-600">Active Patients</p>
                {loading ? (
                  <Skeleton className="h-9 w-16 mt-1" />
                ) : (
                  <h3 className="text-3xl font-bold text-gray-900 mt-1">{activePatientCount}</h3>
                )}
                <p className="text-sm text-green-700 mt-1">Currently active</p>
              </div>
              <div className="p-3 bg-green-500/10 rounded-full">
                <FaUserCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-amber-600">Inactive Patients</p>
                {loading ? (
                  <Skeleton className="h-9 w-16 mt-1" />
                ) : (
                  <h3 className="text-3xl font-bold text-gray-900 mt-1">{inactivePatientCount}</h3>
                )}
                <p className="text-sm text-amber-700 mt-1">Not currently active</p>
              </div>
              <div className="p-3 bg-amber-500/10 rounded-full">
                <FaUserCircle className="h-6 w-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Card className="shadow-md">
        <CardHeader className="border-b bg-gray-50 flex flex-col md:flex-row justify-between space-y-3 md:space-y-0">
          <div>
            <CardTitle className="text-xl font-bold">Patient Directory</CardTitle>
            <CardDescription>Complete list of registered patients</CardDescription>
          </div>
          
          <div className="relative">
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
            <Input
              placeholder="Search patients..."
              className="pl-10 w-full md:w-[300px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 max-w-md mx-4 mt-4">
              <TabsTrigger value="all" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
                All Patients ({allPatients.length})
              </TabsTrigger>
              <TabsTrigger value="active" className="data-[state=active]:bg-green-50 data-[state=active]:text-green-700">
                Active ({activePatientCount})
              </TabsTrigger>
              <TabsTrigger value="inactive" className="data-[state=active]:bg-amber-50 data-[state=active]:text-amber-700">
                Inactive ({inactivePatientCount})
              </TabsTrigger>
            </TabsList>
            
            <div className="p-4">
              {loading ? (
                <div className="space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex items-center space-x-4 p-4 border rounded-lg">
                      <Skeleton className="h-12 w-12 rounded-full" />
                      <div className="space-y-2 flex-1">
                        <Skeleton className="h-4 w-48" />
                        <Skeleton className="h-4 w-64" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : filteredPatients.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <FaUserCircle className="mx-auto h-16 w-16 text-gray-300" />
                  <h3 className="mt-4 text-lg font-medium text-gray-600">No patients found</h3>
                  <p className="mt-1 text-gray-500">
                    {searchQuery ? "Try adjusting your search terms" : "No patients in this category yet"}
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50">
                        <TableHead>Patient</TableHead>
                        <TableHead>Contact Info</TableHead>
                        <TableHead>Gender</TableHead>
                        <TableHead>Age</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPatients.map((patient) => (
                        <TableRow key={patient._id} className="hover:bg-gray-50">
                          <TableCell>
                            <div className="flex items-center space-x-3">
                              <Avatar>
                                <AvatarFallback className="bg-blue-100 text-blue-700">
                                  {patient.name?.charAt(0) || "P"}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{patient.name}</div>
                                <div className="text-sm text-gray-500">
                                  Patient ID: {patient._id.substring(0, 8)}...
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">
                              <div>{patient.email}</div>
                              <div className="text-gray-500">{patient.phone || "No phone"}</div>
                            </div>
                          </TableCell>
                          <TableCell>{patient.gender || "Not specified"}</TableCell>
                          <TableCell>
                            {patient.dob ? new Date().getFullYear() - new Date(patient.dob).getFullYear() : "N/A"}
                          </TableCell>
                          <TableCell>
                            <Badge 
                              className={
                                patient.active 
                                  ? "bg-green-100 text-green-800 border-green-200" 
                                  : "bg-amber-100 text-amber-800 border-amber-200"
                              }
                            >
                              {patient.active ? "Active" : "Inactive"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default PatientManagementPage;
