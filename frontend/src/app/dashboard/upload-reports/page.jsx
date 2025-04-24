"use client";

import React, { useState, useEffect } from "react";
import { useUserStore } from "@/stores/store";
import { fetchAndSetUserStore } from "@/lib/fetchAndSetUserStore";
import apiClient from "@/api-client/apiClient";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

// UI Components
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  AlertDialog, 
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle 
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";

// Icons
import { 
  Upload, Trash2, FileText, Download, Eye, AlertCircle,
  FilePlus, Search, Calendar, FileCheck, Clock
} from "lucide-react";
import { FaFileMedical, FaFileAlt, FaFilePdf, FaFileImage, FaFileWord, FaFileCsv, FaTrashAlt } from "react-icons/fa";

export default function UploadReportsPage() {
  const { user, update } = useUserStore();
  const { toast } = useToast();
  const router = useRouter();
  
  const [loading, setLoading] = useState(true);
  const [reports, setReports] = useState([]);
  const [uploadingReport, setUploadingReport] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [reportToDelete, setReportToDelete] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [uploadDetails, setUploadDetails] = useState({
    title: "",
    description: "",
    details: ""
  });
  const [viewReport, setViewReport] = useState(null);
  
  // Fetch reports on component mount
  useEffect(() => {
    if (!user) {
      fetchAndSetUserStore(update);
    } else {
      fetchReports();
    }
  }, [user]);
  
  // Fetch reports function
  const fetchReports = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get("/patients/viewReports");
      if (response.status === 200) {
        const reportData = response.data?.data?.report?.reports || [];
        // Sort by newest first
        const sortedReports = [...reportData].sort((a, b) => 
          new Date(b.uploadedAt) - new Date(a.uploadedAt)
        );
        setReports(sortedReports);
      }
    } catch (error) {
      console.error("Error fetching reports:", error);
      toast({
        title: "Failed to load reports",
        description: error.response?.data?.message || "Please try again later",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (limit to 10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Maximum file size is 10MB",
          variant: "destructive",
        });
        e.target.value = null;
        return;
      }
      
      // Check file type
      const allowedTypes = [
        'application/pdf', 
        'image/jpeg', 
        'image/png', 
        'image/webp',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ];
      
      if (!allowedTypes.includes(file.type)) {
        toast({
          title: "Unsupported file type",
          description: "Please upload a PDF, image, or document file",
          variant: "destructive",
        });
        e.target.value = null;
        return;
      }
      
      setSelectedFile(file);
    }
  };

  // Upload report
  const handleUploadReport = async (e) => {
    e.preventDefault();
    
    if (!selectedFile) {
      toast({
        title: "No file selected",
        description: "Please select a file to upload",
        variant: "destructive",
      });
      return;
    }
    
    if (!uploadDetails.title.trim()) {
      toast({
        title: "Missing information",
        description: "Please provide a title for your report",
        variant: "destructive",
      });
      return;
    }
    
    setUploadingReport(true);
    
    try {
      const formData = new FormData();
      formData.append("report", selectedFile);
      formData.append("title", uploadDetails.title);
      formData.append("description", uploadDetails.description);
      formData.append("details", uploadDetails.details);
      
      const response = await apiClient.post("/patients/addReports", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      
      if (response.status === 201) {
        toast({
          title: "Report uploaded successfully",
          description: "Your medical report has been added to your records",
          variant: "success",
        });
        
        // Clear form and fetch updated reports
        setSelectedFile(null);
        setUploadDetails({
          title: "",
          description: "",
          details: ""
        });
        setShowUploadDialog(false);
        fetchReports();
      }
    } catch (error) {
      console.error("Error uploading report:", error);
      toast({
        title: "Failed to upload report",
        description: error.response?.data?.message || "Please try again later",
        variant: "destructive",
      });
    } finally {
      setUploadingReport(false);
    }
  };

  // Delete report
  const confirmDeleteReport = (report) => {
    setReportToDelete(report);
    setIsDeleteDialogOpen(true);
  };
  
  const handleDeleteReport = async () => {
    if (!reportToDelete) return;
    
    try {
      const response = await apiClient.delete(`/patients/deleteReport/${reportToDelete._id}`);
      
      if (response.status === 200) {
        toast({
          title: "Report deleted successfully",
          variant: "success",
        });
        
        // Refresh reports list
        fetchReports();
      }
    } catch (error) {
      console.error("Error deleting report:", error);
      toast({
        title: "Failed to delete report",
        description: error.response?.data?.message || "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsDeleteDialogOpen(false);
      setReportToDelete(null);
    }
  };

  // Handle view report
  const handleViewReport = (report) => {
    setViewReport(report);
  };

  // Get appropriate file icon based on fileType
  const getFileIcon = (fileType) => {
    if (fileType.includes('pdf')) {
      return <FaFilePdf className="h-7 w-7 text-red-500" />;
    } else if (fileType.includes('image')) {
      return <FaFileImage className="h-7 w-7 text-blue-500" />;
    } else if (fileType.includes('word') || fileType.includes('document')) {
      return <FaFileWord className="h-7 w-7 text-blue-700" />;
    } else if (fileType.includes('csv') || fileType.includes('excel')) {
      return <FaFileCsv className="h-7 w-7 text-green-600" />;
    }
    return <FaFileAlt className="h-7 w-7 text-gray-600" />;
  };

  // Format file size
  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' bytes';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
  };
  
  // Replace your formatDate function with this more robust version
  const formatDate = (dateStr) => {
    try {
      if (!dateStr) return "No date";
      
      // Try to parse the date string
      const date = new Date(dateStr);
      
      // Check if date is invalid
      if (isNaN(date.getTime())) {
        return "Invalid date";
      }
      
      return new Intl.DateTimeFormat('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric'
      }).format(date);
    } catch (error) {
      console.error("Date formatting error:", error);
      return "Date error";
    }
  };
  
  // Filter reports based on search query
  const filteredReports = reports.filter(report => 
    report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (report.description && report.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Medical Reports</h1>
          <p className="text-gray-500 mt-1">
            Upload and manage your medical reports securely
          </p>
        </div>
        
        <Button 
          onClick={() => setShowUploadDialog(true)} 
          className="mt-4 md:mt-0 bg-primary hover:bg-primary/90"
        >
          <FilePlus className="mr-2 h-4 w-4" /> Upload New Report
        </Button>
      </div>
      
      <div className="mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search reports by title or description..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="p-6">
                  <div className="flex items-center gap-4">
                    <Skeleton className="h-12 w-12 rounded-md" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-40" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                  </div>
                  <div className="mt-4 space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : reports.length === 0 ? (
        <Card className="border-dashed border-2 bg-gray-50">
          <CardContent className="py-12">
            <div className="flex flex-col items-center justify-center text-center">
              <FileText className="h-16 w-16 text-gray-300 mb-4" />
              <h3 className="text-xl font-medium text-gray-700">No reports found</h3>
              <p className="text-gray-500 mt-2 max-w-md">
                You haven't uploaded any medical reports yet. Upload your first report to keep track of your medical history.
              </p>
              <Button 
                onClick={() => setShowUploadDialog(true)} 
                className="mt-6"
              >
                <Upload className="mr-2 h-4 w-4" /> Upload Your First Report
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : filteredReports.length === 0 ? (
        <Card className="border bg-gray-50">
          <CardContent className="py-12">
            <div className="flex flex-col items-center justify-center text-center">
              <Search className="h-16 w-16 text-gray-300 mb-4" />
              <h3 className="text-xl font-medium text-gray-700">No matching reports</h3>
              <p className="text-gray-500 mt-2">
                No reports match your search query. Try adjusting your search terms.
              </p>
              <Button 
                onClick={() => setSearchQuery("")} 
                variant="outline" 
                className="mt-6"
              >
                Clear Search
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredReports.map((report) => (
            <Card key={report._id} className="overflow-hidden hover:shadow-md transition-shadow">
              <CardContent className="p-0">
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div className="flex items-start gap-4">
                      <div className="bg-gray-100 p-3 rounded-md">
                        {getFileIcon(report.fileType)}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">
                          {report.title}
                        </h3>
                        <div className="flex flex-wrap gap-2 mt-1">
                          <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                            {report.fileType.split('/')[1].toUpperCase()}
                          </Badge>
                          <Badge variant="outline" className="text-xs bg-gray-50 text-gray-700 border-gray-200">
                            {formatFileSize(report.size)}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-500 mt-2">
                          {report.description || "No description provided"}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 mt-4 md:mt-0">
                      <p className="text-sm text-gray-500 flex items-center mr-4">
                        <Calendar className="h-4 w-4 mr-1" />
                        {formatDate(report.uploadedAt)}
                      </p>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleViewReport(report)}
                      >
                        <Eye className="h-4 w-4 mr-1" /> View
                      </Button>
                      <Button 
                        size="sm" 
                        variant="destructive"
                        onClick={() => confirmDeleteReport(report)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      
      {/* Upload Report Dialog */}
      <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Upload Medical Report</DialogTitle>
            <DialogDescription>
              Upload your medical reports securely for easy access and sharing with your healthcare providers.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleUploadReport} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="required">Report Title</Label>
              <Input 
                id="title"
                placeholder="e.g., Blood Test Results"
                value={uploadDetails.title}
                onChange={(e) => setUploadDetails({...uploadDetails, title: e.target.value})}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Input 
                id="description"
                placeholder="e.g., Annual checkup blood work"
                value={uploadDetails.description}
                onChange={(e) => setUploadDetails({...uploadDetails, description: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="details">Additional Details (Optional)</Label>
              <Textarea 
                id="details"
                placeholder="Add any notes or important information about this report..."
                value={uploadDetails.details}
                onChange={(e) => setUploadDetails({...uploadDetails, details: e.target.value})}
                rows={3}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="file" className="required">Upload File</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition-colors">
                <input
                  type="file"
                  id="file"
                  className="hidden"
                  onChange={handleFileChange}
                  accept=".pdf,.png,.jpg,.jpeg,.webp,.doc,.docx"
                />
                <label 
                  htmlFor="file" 
                  className="flex flex-col items-center justify-center cursor-pointer"
                >
                  {selectedFile ? (
                    <>
                      <FileCheck className="h-10 w-10 text-green-500 mb-2" />
                      <p className="text-green-600 font-medium">{selectedFile.name}</p>
                      <p className="text-gray-500 text-sm mt-1">
                        {formatFileSize(selectedFile.size)}
                      </p>
                      <p className="text-sm text-blue-600 mt-2 hover:text-blue-800">
                        Click to change file
                      </p>
                    </>
                  ) : (
                    <>
                      <Upload className="h-10 w-10 text-gray-400 mb-2" />
                      <p className="text-gray-600 font-medium">
                        Click to select or drop a file
                      </p>
                      <p className="text-gray-400 text-sm mt-1">
                        Supports PDF, PNG, JPG, WEBP, DOC, DOCX (Max 10MB)
                      </p>
                    </>
                  )}
                </label>
              </div>
            </div>
            
            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setShowUploadDialog(false)}
                disabled={uploadingReport}
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                disabled={!selectedFile || uploadingReport}
                className="ml-2"
              >
                {uploadingReport ? (
                  <>
                    <div className="animate-spin mr-2 h-4 w-4 border-2 border-r-transparent border-white rounded-full" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" /> Upload Report
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      
      {/* View Report Dialog */}
      <Dialog open={!!viewReport} onOpenChange={() => setViewReport(null)}>
        <DialogContent className="sm:max-w-xl">
          {viewReport && (
            <>
              <DialogHeader>
                <DialogTitle>Report Details</DialogTitle>
                <DialogDescription>
                  Viewing details for {viewReport.title}
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 mt-2">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">{viewReport.title}</h3>
                      {viewReport.description && (
                        <p className="text-gray-600 mt-1">{viewReport.description}</p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">
                        Uploaded on {formatDate(viewReport.uploadedAt)}
                      </p>
                      <div className="flex items-center mt-1">
                        {getFileIcon(viewReport.fileType)}
                        <span className="text-xs ml-2">{viewReport.fileType.split('/')[1].toUpperCase()}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {viewReport.details && (
                  <div>
                    <h4 className="font-medium mb-1">Additional Details</h4>
                    <div className="p-4 bg-blue-50 rounded-lg text-gray-700">
                      {viewReport.details}
                    </div>
                  </div>
                )}
                
                <div className="border-t pt-4 flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500 flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      File size: {formatFileSize(viewReport.size)}
                    </p>
                    
                    {viewReport.appointmentId && (
                      <p className="text-sm text-green-600 mt-2">
                        This report was shared with a doctor for an appointment
                      </p>
                    )}
                  </div>
                  
                  <div className="flex gap-2">
                    <a 
                      href={`https://gateway.pinata.cloud/ipfs/${viewReport.fileHash}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                    >
                      <Download className="mr-1.5 h-4 w-4" /> Download
                    </a>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => {
                        setViewReport(null);
                        confirmDeleteReport(viewReport);
                      }}
                    >
                      <Trash2 className="h-4 w-4 mr-1.5" /> Delete
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center text-red-600">
              <AlertCircle className="mr-2 h-5 w-5" /> Delete Report
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this report? This action cannot be undone and the report will be permanently removed from your records.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              className="bg-red-600 text-white hover:bg-red-700"
              onClick={handleDeleteReport}
            >
              <Trash2 className="mr-2 h-4 w-4" /> Delete Report
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}