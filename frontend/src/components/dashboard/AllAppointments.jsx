import React, { useState, useEffect } from "react";
import { FaCalendarDay, FaClock, FaUserMd, FaUser, FaSearch, FaFilter, FaEllipsisV, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { format } from "date-fns";

// UI Components
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const Appointments = ({ allAppt, refreshAppointments }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [sortBy, setSortBy] = useState("date");

  // Filter appointments based on search query and active tab
  const filteredAppointments = allAppt.filter(appointment => {
    const matchesSearch = 
      appointment.doctorInfo?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appointment.patient?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appointment.reason?.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === "all") return matchesSearch;
    if (activeTab === "pending") return appointment.status === "pending" && matchesSearch;
    if (activeTab === "completed") return appointment.status === "completed" && matchesSearch;
    if (activeTab === "cancelled") return appointment.status === "cancelled" && matchesSearch;
    
    return matchesSearch;
  });

  // Sort appointments
  const sortedAppointments = [...filteredAppointments].sort((a, b) => {
    if (sortBy === "date") {
      return new Date(b.date) - new Date(a.date); // Newest first
    } else if (sortBy === "status") {
      return a.status.localeCompare(b.status);
    }
    return 0;
  });

  // Count appointments by status
  const statusCounts = allAppt.reduce((acc, appointment) => {
    acc[appointment.status] = (acc[appointment.status] || 0) + 1;
    return acc;
  }, {});

  const openAppointmentDetails = (appointment) => {
    setSelectedAppointment(appointment);
    setIsDetailsOpen(true);
  };

  // Get badge style based on appointment status
  const getStatusBadge = (status) => {
    switch(status) {
      case "pending":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), "PPP");
    } catch (error) {
      return dateString;
    }
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-md">
        <CardHeader className="border-b bg-gray-50 flex flex-col md:flex-row justify-between space-y-3 md:space-y-0">
          <div>
            <CardTitle className="text-xl font-bold">Appointment Directory</CardTitle>
            <CardDescription>Manage and track patient appointments</CardDescription>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative">
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
              <Input
                placeholder="Search appointments..."
                className="pl-10 w-full md:w-[300px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">Sort by Date</SelectItem>
                <SelectItem value="status">Sort by Status</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        
        <CardContent className="p-0">
          <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-4 max-w-xl mx-4 mt-4">
              <TabsTrigger value="all" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
                All ({allAppt.length})
              </TabsTrigger>
              <TabsTrigger value="pending" className="data-[state=active]:bg-amber-50 data-[state=active]:text-amber-700">
                Pending ({statusCounts.pending || 0})
              </TabsTrigger>
              <TabsTrigger value="completed" className="data-[state=active]:bg-green-50 data-[state=active]:text-green-700">
                Completed ({statusCounts.completed || 0})
              </TabsTrigger>
              <TabsTrigger value="cancelled" className="data-[state=active]:bg-red-50 data-[state=active]:text-red-700">
                Cancelled ({statusCounts.cancelled || 0})
              </TabsTrigger>
            </TabsList>
            
            <div className="p-4">
              {sortedAppointments.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <FaCalendarDay className="mx-auto h-16 w-16 text-gray-300" />
                  <h3 className="mt-4 text-lg font-medium text-gray-600">No appointments found</h3>
                  <p className="mt-1 text-gray-500">
                    {searchQuery ? "Try adjusting your search terms" : "No appointments in this category"}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {sortedAppointments.map((appointment) => (
                    <Card 
                      key={appointment._id} 
                      className={`overflow-hidden border-l-4 hover:shadow-md transition-all duration-200 ${
                        appointment.status === "pending" ? "border-l-amber-400" :
                        appointment.status === "completed" ? "border-l-green-400" :
                        "border-l-red-400"
                      }`}
                    >
                      <CardContent className="p-0">
                        <div className="flex justify-between p-4 border-b bg-gray-50">
                          <div className="flex items-center space-x-2">
                            <Badge className={getStatusBadge(appointment.status)}>
                              {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                            </Badge>
                            <span className="text-sm text-gray-500">
                              ID: {appointment._id.substring(0, 8)}...
                            </span>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <FaEllipsisV className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => openAppointmentDetails(appointment)}>
                                View Details
                              </DropdownMenuItem>
                              {appointment.status === "pending" && (
                                <>
                                  <DropdownMenuItem className="text-green-600">
                                    Mark as Completed
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="text-red-600">
                                    Cancel Appointment
                                  </DropdownMenuItem>
                                </>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        
                        <div className="p-4">
                          <div className="flex flex-col md:flex-row mb-4">
                            {/* Appointment Date & Time */}
                            <div className="flex flex-col mb-4 md:mb-0 md:mr-8">
                              <div className="flex items-center mb-2">
                                <FaCalendarDay className="text-blue-500 h-5 w-5 mr-2" />
                                <span className="font-medium">{formatDate(appointment.date)}</span>
                              </div>
                              <div className="flex items-center">
                                <FaClock className="text-blue-500 h-5 w-5 mr-2" />
                                <span>{appointment.time}</span>
                              </div>
                            </div>
                            
                            {/* Location */}
                            {appointment.location && (
                              <div className="flex items-start">
                                <MdLocationOn className="text-blue-500 h-5 w-5 mr-2 mt-1" />
                                <span className="text-gray-600">{appointment.location}</span>
                              </div>
                            )}
                          </div>
                          
                          {/* Doctor Info */}
                          <div className="flex items-center p-3 bg-blue-50 rounded-lg mb-3">
                            <Avatar className="h-12 w-12 border-2 border-blue-200">
                              <AvatarImage src={appointment.doctorInfo?.avatar} alt={appointment.doctorInfo?.name} />
                              <AvatarFallback className="bg-blue-100 text-blue-600">
                                {appointment.doctorInfo?.name?.charAt(0) || "D"}
                              </AvatarFallback>
                            </Avatar>
                            <div className="ml-3">
                              <div className="flex items-center">
                                <FaUserMd className="text-blue-500 h-4 w-4 mr-1" />
                                <h3 className="font-medium">Dr. {appointment.doctorInfo?.name}</h3>
                              </div>
                              <p className="text-sm text-gray-500">{appointment.doctorInfo?.specialization}</p>
                            </div>
                          </div>
                          
                          {/* Patient Info */}
                          <div className="flex items-center p-3 bg-green-50 rounded-lg">
                            <Avatar className="h-12 w-12 border-2 border-green-200">
                              <AvatarImage src={appointment.patient?.avatar} alt={appointment.patient?.name} />
                              <AvatarFallback className="bg-green-100 text-green-600">
                                {appointment.patient?.name?.charAt(0) || "P"}
                              </AvatarFallback>
                            </Avatar>
                            <div className="ml-3">
                              <div className="flex items-center">
                                <FaUser className="text-green-500 h-4 w-4 mr-1" />
                                <h3 className="font-medium">{appointment.patient?.name}</h3>
                              </div>
                              <p className="text-sm text-gray-500">{appointment.patient?.email}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="border-t p-3 bg-gray-50 flex justify-end">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-blue-600" 
                            onClick={() => openAppointmentDetails(appointment)}
                          >
                            View Details
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </Tabs>
        </CardContent>
      </Card>

      {/* Appointment Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-2xl">
          {selectedAppointment && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl font-bold flex items-center">
                  <FaCalendarDay className="mr-2" /> Appointment Details
                </DialogTitle>
                <DialogDescription>
                  Full information about this appointment
                </DialogDescription>
              </DialogHeader>
              
              <div>
                <div className="flex justify-between items-center mb-4">
                  <Badge className={getStatusBadge(selectedAppointment.status)}>
                    {selectedAppointment.status.charAt(0).toUpperCase() + selectedAppointment.status.slice(1)}
                  </Badge>
                  <span className="text-sm text-gray-500">
                    ID: {selectedAppointment._id}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Date</p>
                    <p className="font-medium">{formatDate(selectedAppointment.date)}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Time</p>
                    <p className="font-medium">{selectedAppointment.time}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Type</p>
                    <p className="font-medium">{selectedAppointment.type || "Regular"}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-medium">{selectedAppointment.location || "Online"}</p>
                  </div>
                </div>
                
                <div className="border rounded-lg overflow-hidden mb-6">
                  <div className="bg-blue-50 p-4 border-b">
                    <h3 className="font-medium flex items-center">
                      <FaUserMd className="text-blue-600 mr-2" /> Doctor Information
                    </h3>
                  </div>
                  <div className="p-4 flex items-start">
                    <Avatar className="h-16 w-16 border-2 border-blue-100">
                      <AvatarImage src={selectedAppointment.doctorInfo?.avatar} />
                      <AvatarFallback className="bg-blue-100 text-blue-600 text-lg">
                        {selectedAppointment.doctorInfo?.name?.charAt(0) || "D"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="ml-4">
                      <p className="font-medium text-lg">Dr. {selectedAppointment.doctorInfo?.name}</p>
                      <p className="text-gray-500">{selectedAppointment.doctorInfo?.email}</p>
                      <p className="text-blue-600 font-medium mt-1">{selectedAppointment.doctorInfo?.specialization}</p>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-lg overflow-hidden mb-6">
                  <div className="bg-green-50 p-4 border-b">
                    <h3 className="font-medium flex items-center">
                      <FaUser className="text-green-600 mr-2" /> Patient Information
                    </h3>
                  </div>
                  <div className="p-4 flex items-start">
                    <Avatar className="h-16 w-16 border-2 border-green-100">
                      <AvatarImage src={selectedAppointment.patient?.avatar} />
                      <AvatarFallback className="bg-green-100 text-green-600 text-lg">
                        {selectedAppointment.patient?.name?.charAt(0) || "P"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="ml-4">
                      <p className="font-medium text-lg">{selectedAppointment.patient?.name}</p>
                      <p className="text-gray-500">{selectedAppointment.patient?.email}</p>
                      <p className="text-gray-500 mt-1">{selectedAppointment.patient?.phone || "No phone provided"}</p>
                    </div>
                  </div>
                </div>
                
                {selectedAppointment.reason && (
                  <div className="border rounded-lg overflow-hidden mb-6">
                    <div className="bg-gray-50 p-4 border-b">
                      <h3 className="font-medium">Appointment Reason</h3>
                    </div>
                    <div className="p-4">
                      <p className="text-gray-700">{selectedAppointment.reason}</p>
                    </div>
                  </div>
                )}
                
                {selectedAppointment.notes && (
                  <div className="border rounded-lg overflow-hidden">
                    <div className="bg-gray-50 p-4 border-b">
                      <h3 className="font-medium">Additional Notes</h3>
                    </div>
                    <div className="p-4">
                      <p className="text-gray-700">{selectedAppointment.notes}</p>
                    </div>
                  </div>
                )}
              </div>
              
              <DialogFooter className="flex justify-between sm:justify-end gap-2">
                {selectedAppointment.status === "pending" && (
                  <>
                    <Button 
                      variant="outline" 
                      className="border-green-600 text-green-600 hover:bg-green-50"
                    >
                      <FaCheckCircle className="mr-2" /> Mark as Completed
                    </Button>
                    <Button 
                      variant="outline" 
                      className="border-red-600 text-red-600 hover:bg-red-50"
                    >
                      <FaTimesCircle className="mr-2" /> Cancel Appointment
                    </Button>
                  </>
                )}
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Appointments;
