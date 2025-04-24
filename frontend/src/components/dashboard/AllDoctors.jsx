import React, { useState, useEffect } from "react";
import apiClient from "@/api-client/apiClient";
import { MdVerified } from "react-icons/md";
import {
  FaBriefcase,
  FaUserMd,
  FaGraduationCap,
  FaFileAlt,
  FaDollarSign,
  FaEye,
  FaCheck,
  FaTrash,
  FaTimes,
  FaUserCircle,
  FaExclamationTriangle,
  FaFilter,
  FaSearch
} from "react-icons/fa";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

const AllDoctors = ({ 
  allDoctors, 
  refreshDoctors, 
  loading, 
  searchTerm,
  setSearchTerm,
  specializations = [],
  specializationFilter,
  setSpecializationFilter,
  totalDoctors
}) => {
  const { toast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [approvingDoctorId, setApprovingDoctorId] = useState(null);
  const [deletingDoctorId, setDeletingDoctorId] = useState(null);
  const [activeTab, setActiveTab] = useState("all");
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [doctorToDelete, setDoctorToDelete] = useState(null);
  const [filteredDoctors, setFilteredDoctors] = useState([]);

  // Filter doctors based on active tab
  const filteredByTab = filteredDoctors.filter(doctor => {
    if (activeTab === "all") return true;
    if (activeTab === "verified") return doctor.verified;
    if (activeTab === "unverified") return !doctor.verified;
    return true;
  });

  // Filter doctors based on search term and specialization
  useEffect(() => {
    if (allDoctors.length > 0) {
      let filtered = [...allDoctors];
      
      // Filter by search term (name or specialization)
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        filtered = filtered.filter(doctor => 
          (doctor.userId?.name?.toLowerCase().includes(term) || 
           doctor.specialization?.toLowerCase().includes(term) ||
           doctor.qualification?.toLowerCase().includes(term))
        );
      }
      
      // Filter by specialization (ignore "all_specializations" which means show all)
      if (specializationFilter && specializationFilter !== "all_specializations") {
        filtered = filtered.filter(doctor => 
          doctor.specialization === specializationFilter
        );
      }
      
      setFilteredDoctors(filtered);
    }
  }, [allDoctors, searchTerm, specializationFilter]);

  const openModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  const handleApprove = async (doctorId) => {
    setApprovingDoctorId(doctorId);
    try {
      const response = await apiClient.post("/admin/verify-doctor", {
        doctorId,
      });
      if (response.status === 200) {
        toast({
          title: "Doctor Approved",
          description: "The doctor has been successfully verified.",
          variant: "success",
        });
        setApprovingDoctorId(doctorId);
      }
    } catch (error) {
      console.error("Failed to approve doctor:", error);
      toast({
        title: "Approval Failed",
        description: "Could not approve the doctor. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Handle doctor deletion
  const handleDelete = async (doctorId) => {
    setDeletingDoctorId(doctorId);
    try {
      const response = await apiClient.delete(`/admin/delete-doctor/${doctorId}`);
      
      if (response.status === 200) {
        toast({
          title: "Doctor Deleted",
          description: "The doctor has been successfully removed from the system.",
          variant: "success",
        });
        refreshDoctors();
      } else {
        throw new Error("Failed to delete doctor");
      }
    } catch (error) {
      console.error("Error deleting doctor:", error);
      toast({
        title: "Deletion Failed",
        description: "Could not delete the doctor. Please try again.",
        variant: "destructive",
      });
    } finally {
      setDeletingDoctorId(null);
      setConfirmDeleteOpen(false);
      setDoctorToDelete(null);
    }
  };

  // Open confirmation dialog before deleting
  const confirmDelete = (doctor) => {
    setDoctorToDelete(doctor);
    setConfirmDeleteOpen(true);
  };
  
  useEffect(() => {
    if (approvingDoctorId) {
      refreshDoctors();
      setApprovingDoctorId(null);
    }
  }, [approvingDoctorId, refreshDoctors]);

  // Helper to safely get doctor name
  const getDoctorName = (doctor) => {
    return doctor.userId?.name || "Doctor (Info Unavailable)";
  };

  // Helper to safely get doctor avatar
  const getDoctorAvatar = (doctor) => {
    return doctor.userId?.avatar || "";
  };

  // Helper to safely get doctor email
  const getDoctorEmail = (doctor) => {
    return doctor.userId?.email || "Email unavailable";
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-md">
        <CardHeader className="border-b bg-gray-50">
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle className="text-xl font-bold">Doctor Directory</CardTitle>
              <p className="text-gray-500 text-sm">
                {filteredByTab.length} {activeTab === "all" ? "doctors" : activeTab === "verified" ? "verified doctors" : "pending doctors"} 
                {totalDoctors > filteredByTab.length ? ` (filtered from ${totalDoctors})` : ""}
              </p>
            </div>
            
            <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2 w-full md:w-auto">
              {/* Search */}
              <div className="relative flex-grow md:max-w-xs">
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search doctors..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              {/* Specialization filter */}
              {specializations.length > 0 && (
                <Select
                  value={specializationFilter}
                  onValueChange={(value) => setSpecializationFilter(value)}
                >
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <div className="flex items-center">
                      <FaFilter className="mr-2 h-3.5 w-3.5 text-gray-500" />
                      <span>{specializationFilter || "All Specializations"}</span>
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all_specializations">All Specializations</SelectItem>
                    {specializations.map((specialization) => (
                      <SelectItem key={specialization} value={specialization}>
                        {specialization}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
              
              {/* Refresh Button */}
              <Button 
                variant="outline" 
                onClick={refreshDoctors}
                disabled={loading}
                className="border-2"
              >
                {loading ? "Loading..." : "Refresh"}
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-6">
          <Tabs defaultValue="all" className="mb-6" onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 w-full sm:w-[400px]">
              <TabsTrigger value="all" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
                All Doctors ({allDoctors.length})
              </TabsTrigger>
              <TabsTrigger value="verified" className="data-[state=active]:bg-green-50 data-[state=active]:text-green-700">
                Verified ({allDoctors.filter(doc => doc.verified).length})
              </TabsTrigger>
              <TabsTrigger value="unverified" className="data-[state=active]:bg-amber-50 data-[state=active]:text-amber-700">
                Pending ({allDoctors.filter(doc => !doc.verified).length})
              </TabsTrigger>
            </TabsList>
          </Tabs>
          
          {loading ? (
            // Loading skeleton
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <Card key={i} className="overflow-hidden shadow border-2 border-gray-100">
                  <div className="flex items-start p-6">
                    <div className="h-20 w-20 rounded-full bg-gray-200 animate-pulse mr-4" />
                    <div className="flex-1">
                      <div className="h-6 bg-gray-200 rounded w-1/2 mb-2 animate-pulse" />
                      <div className="h-4 bg-gray-200 rounded w-1/3 mb-4 animate-pulse" />
                      <div className="grid grid-cols-2 gap-4">
                        {[1, 2, 3, 4].map((j) => (
                          <div key={j} className="h-4 bg-gray-200 rounded animate-pulse" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 flex justify-between items-center border-t">
                    <div className="h-8 bg-gray-200 rounded w-1/3 animate-pulse" />
                    <div className="h-8 bg-gray-200 rounded w-1/4 animate-pulse" />
                  </div>
                </Card>
              ))}
            </div>
          ) : filteredByTab.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <FaUserMd className="mx-auto h-16 w-16 text-gray-300" />
              <h3 className="mt-4 text-lg font-medium text-gray-600">No doctors found</h3>
              <p className="mt-1 text-gray-500">
                {searchTerm || specializationFilter ? "Try adjusting your search or filter terms" : "No doctors in this category yet"}
              </p>
              {(searchTerm || specializationFilter) && (
                <Button 
                  variant="outline" 
                  className="mt-4" 
                  onClick={() => {
                    setSearchTerm("");
                    setSpecializationFilter("");
                  }}
                >
                  Clear Filters
                </Button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredByTab.map((doctor) => (
                <Card key={doctor._id} className="overflow-hidden shadow hover:shadow-md transition-all duration-200 border-2 border-gray-100">
                  <div className="flex items-start p-6">
                    <Avatar className="h-20 w-20 mr-4 border-2 border-gray-200">
                      <AvatarImage src={getDoctorAvatar(doctor)} alt={getDoctorName(doctor)} />
                      <AvatarFallback className="bg-blue-100 text-blue-700 text-xl font-bold">
                        {getDoctorName(doctor).charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold">{getDoctorName(doctor)}</h3>
                        <Badge variant={doctor.verified ? "success" : "warning"} className={doctor.verified ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"}>
                          {doctor.verified ? (
                            <><FaCheck size={12} className="mr-1" /> Verified</>
                          ) : (
                            <><FaTimes size={12} className="mr-1" /> Pending</>
                          )}
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-gray-500 mt-1">
                        {getDoctorEmail(doctor)}
                      </p>
                      
                      <div className="mt-4 grid grid-cols-2 gap-4">
                        <div className="flex items-center text-sm">
                          <FaUserMd className="h-4 w-4 text-blue-600 mr-2" />
                          <span className="font-medium">{doctor.specialization}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <FaBriefcase className="h-4 w-4 text-blue-600 mr-2" />
                          <span>{doctor.experience} years exp.</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <FaGraduationCap className="h-4 w-4 text-blue-600 mr-2" />
                          <span>{doctor.qualification}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <FaDollarSign className="h-4 w-4 text-blue-600 mr-2" />
                          <span>${doctor.consultationFee}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 flex justify-between items-center border-t">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => doctor.degree ? openModal(doctor.degree) : toast({ title: "No credentials available", variant: "warning" })}
                      className="flex items-center"
                      disabled={!doctor.degree}
                    >
                      <FaFileAlt className="mr-2 h-4 w-4" /> View Credentials
                    </Button>
                    
                    <div className="space-x-2">
                      {!doctor.verified && (
                        <Button
                          variant="success"
                          size="sm"
                          onClick={() => handleApprove(doctor._id)}
                          disabled={approvingDoctorId === doctor._id}
                          className="bg-green-600 text-white hover:bg-green-700"
                        >
                          {approvingDoctorId === doctor._id ? "Approving..." : "Approve Doctor"}
                        </Button>
                      )}
                      <Button
                        variant="destructive"
                        size="sm"
                        className="bg-red-600 text-white hover:bg-red-700"
                        onClick={() => confirmDelete(doctor)}
                        disabled={deletingDoctorId === doctor._id}
                      >
                        {deletingDoctorId === doctor._id ? (
                          <span className="flex items-center">Deleting...</span>
                        ) : (
                          <FaTrash className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Document Viewer Dialog */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Doctor Credentials</DialogTitle>
          </DialogHeader>
          <div className="p-2 bg-gray-100 rounded-md">
            {selectedImage ? (
              <img
                src={selectedImage}
                alt="Credential Document"
                className="w-full h-auto max-h-[70vh] object-contain"
              />
            ) : (
              <div className="flex items-center justify-center h-64 text-gray-500">
                No credential document available
              </div>
            )}
          </div>
          <DialogFooter>
            <Button onClick={closeModal}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={confirmDeleteOpen} onOpenChange={setConfirmDeleteOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-red-600 flex items-center">
              <FaExclamationTriangle className="mr-2" /> Confirm Deletion
            </DialogTitle>
            <DialogDescription className="text-gray-600 mt-2">
              Are you sure you want to delete Dr. {getDoctorName(doctorToDelete || {})}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          <div className="bg-red-50 border border-red-100 rounded-md p-4 my-4">
            <p className="text-sm text-red-800">
              This will permanently remove the doctor from the system, including all their records and appointments.
            </p>
          </div>
          
          <DialogFooter className="flex justify-between sm:justify-end gap-2">
            <Button 
              variant="outline" 
              onClick={() => setConfirmDeleteOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              className="bg-red-600 hover:bg-red-700"
              onClick={() => doctorToDelete && handleDelete(doctorToDelete._id)}
              disabled={deletingDoctorId !== null}
            >
              {deletingDoctorId ? "Deleting..." : "Delete Doctor"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AllDoctors;
