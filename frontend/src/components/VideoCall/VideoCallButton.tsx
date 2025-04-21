"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Video } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import apiClient from "@/api-client/apiClient"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

interface VideoCallButtonProps {
  appointmentId: string
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
  className?: string
}

const VideoCallButton = ({
  appointmentId,
  variant = "default",
  size = "default",
  className = "",
}: VideoCallButtonProps) => {
  const { toast } = useToast()
  const [isGenerating, setIsGenerating] = useState(false)
  const [showDialog, setShowDialog] = useState(false)
  const [videoLink, setVideoLink] = useState("")
  const [isCustomLink, setIsCustomLink] = useState(false)
  
  // Generate ZEGO Cloud link automatically
  const generateZegoLink = async () => {
    try {
      // This generates a random room ID that will be part of the ZEGO link
      const roomId = Math.floor(100000 + Math.random() * 900000).toString()
      
      // Create a ZEGO Cloud meeting link
      // Format: https://zegocloud.page.link/?roomID=123456&role=Host
      const link = `https://zegocloud.page.link/?roomID=${roomId}&role=Host`
      setVideoLink(link)
    } catch (error) {
      console.error("Failed to generate ZEGO link:", error)
      setVideoLink("")
      toast({
        title: "Error",
        description: "Failed to generate video link. Please try again or enter manually.",
        variant: "destructive",
      })
    }
  }

  // Handle the click on the video call button
  const handleVideoCall = () => {
    setShowDialog(true)
    // Auto-generate a link when dialog opens
    generateZegoLink()
  }

  // Activate the appointment with the video link
  const activateAppointment = async () => {
    if (!videoLink.trim()) {
      toast({
        title: "Error",
        description: "Please provide a valid video link",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)
    try {
      const response = await apiClient.patch("/doctors/activateAppointment", {
        appointmentId,
        link: videoLink,
      })

      if (response.status === 200) {
        toast({
          title: "Appointment Activated",
          description: "Video link has been sent to the patient.",
          variant: "success",
        })
        setShowDialog(false)
        
        // Refresh the page to update the appointment status
        window.location.reload()
      }
    } catch (error) {
      console.error("Error activating appointment:", error)
      toast({
        title: "Error",
        description: "Failed to activate appointment. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  // Join an existing video call
  const joinVideoCall = async () => {
    try {
      // First, get the appointment details to check if it has a link
      const response = await apiClient.get(`/doctors/appointment/${appointmentId}`)
      
      if (response.data.data.appointment?.link) {
        window.open(response.data.data.appointment.link, "_blank")
      } else {
        toast({
          title: "No Active Call",
          description: "This appointment doesn't have an active video call yet.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error joining video call:", error)
      toast({
        title: "Error",
        description: "Failed to join video call. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <>
      <Button
        variant={variant}
        size={size}
        className={className}
        onClick={handleVideoCall}
      >
        <Video className="h-4 w-4 mr-1" />
        Start Call
      </Button>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Activate Video Appointment</DialogTitle>
            <DialogDescription>
              Generate or enter a video call link for this appointment.
              This link will be shared with the patient.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            {isCustomLink ? (
              <div className="flex flex-col gap-2">
                <label htmlFor="videoLink" className="text-sm font-medium">
                  Custom Video Link
                </label>
                <Input
                  id="videoLink"
                  value={videoLink}
                  onChange={(e) => setVideoLink(e.target.value)}
                  placeholder="https://meet.google.com/..."
                />
                <p className="text-xs text-gray-500">
                  Enter a custom video conferencing link from your preferred platform
                </p>
                <Button 
                  variant="outline" 
                  className="mt-2"
                  onClick={() => {
                    setIsCustomLink(false)
                    generateZegoLink()
                  }}
                >
                  Use ZEGO Cloud Instead
                </Button>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <label htmlFor="zegoLink" className="text-sm font-medium">
                  ZEGO Cloud Link
                </label>
                <div className="flex gap-2">
                  <Input
                    id="zegoLink"
                    value={videoLink}
                    readOnly
                    className="flex-1"
                  />
                  <Button 
                    variant="outline"
                    onClick={generateZegoLink}
                  >
                    Regenerate
                  </Button>
                </div>
                <p className="text-xs text-gray-500">
                  This link is generated using ZEGO Cloud video service
                </p>
                <Button 
                  variant="outline" 
                  className="mt-2"
                  onClick={() => {
                    setIsCustomLink(true)
                    setVideoLink("")
                  }}
                >
                  Use Custom Link Instead
                </Button>
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDialog(false)}>
              Cancel
            </Button>
            <Button 
              onClick={activateAppointment}
              disabled={isGenerating || !videoLink.trim()}
            >
              {isGenerating ? "Activating..." : "Activate Appointment"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default VideoCallButton
