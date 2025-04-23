"use client"
import React, { useEffect, useState } from "react"
import apiClient from "@/api-client/apiClient"
import { useUserStore } from "@/stores/store"
import { FaCheckCircle } from "react-icons/fa"
import { MdEdit, MdPhotoCamera } from "react-icons/md"
import { useToast } from "@/components/ui/use-toast"

import { fetchAndSetUserStore } from "@/lib/fetchAndSetUserStore"
import { useCurrent } from "@/features/getCurrent"

const page = () => {
  const { user } = useUserStore()
  const [doctor, setDoctor] = useState(null)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [role, setRole] = useState("")
  const [age, setAge] = useState(0)
  const [contact, setContact] = useState("")
  const [address, setAddress] = useState("")
  const [gender, setGender] = useState("")
  const [city, setCity] = useState("")
  const [avatar, setAvatar] = useState("")
  const [rating, setRating] = useState(0)
  const [reviews, setReviews] = useState(0)
  const [specialization, setSpecialization] = useState("")
  const [experience, setExperience] = useState(0)
  const [qualification, setQualification] = useState("")
  const [consultationFee, setConsultationFee] = useState(0)
  const [newDegree, setNewDegree] = useState("")

  const [degree, setDegree] = useState("") // For the current degree URL
  const degreeFileInputRef = React.createRef() // Missing ref

  const [newProfilePicture, setNewProfilePicture] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const fileInputRef = React.createRef()
  const { toast } = useToast()

  const { User, isPending } = useCurrent()

  console.log(User)

  const setData = (data) => {
    console.log("data", data)
    setName(data.userId.name)
    setEmail(data.userId.email)
    setAge(data.userId.profile.age)
    setContact(data.userId.profile.contact)
    setAddress(data.userId.profile.address)
    setCity(data.userId.profile.city)
    setGender(data.userId.profile.gender)
    setAvatar(data.userId.avatar)
    setSpecialization(data.specialization)
    setExperience(data.experience)
    setQualification(data.qualification)
    setConsultationFee(data.consultationFee)
    setRating(data.rating)
    setReviews(data.reviews)
    setDegree(data.degree)
  }

  const handleEditClick = async () => {
    if (isEditing) {
      try {
        // Validate required fields
        if (!specialization || !qualification || !experience || !consultationFee) {
          toast({
            title: "Missing required fields",
            description: "Please fill in all required doctor information fields.",
            variant: "destructive",
          })
          return
        }

        // Create basic profile data
        const formDataToSend = {
          specialization: specialization || "",
          experience: Number(experience) || 0,
          qualification: qualification || "",
          consultationFee: Number(consultationFee) || 0,
        }

        console.log("Sending data:", formDataToSend)
        
        // Update doctor information
        await apiClient.post("/doctors/updateInfo", formDataToSend)

        // If a new degree file is selected, upload it separately
        if (newDegree) {
          const formData = new FormData()
          formData.append("degree", newDegree)
          await apiClient.patch("/doctors/degree", formData, {
            headers: { "Content-Type": "multipart/form-data" },
          })
        }

        toast({
          title: "Profile updated.",
          description: "Your profile has been updated successfully.",
          variant: "success",
        })

        // Refresh doctor data
        const response = await apiClient("/doctors/getDoctor")
        setData(response.data.data.doctor)
        setNewDegree(null) // Reset the file selection
        setIsEditing(false)
      } catch (error) {
        console.error("Error updating profile:", error)
        toast({
          title: "Update failed.",
          description: error.response?.data?.message || "There was a problem updating your profile.",
          variant: "destructive",
        })
      }
    } else {
      setIsEditing(true)
    }
  }

  const handleDegreeChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setNewDegree(e.target.files[0])
    }
  }// already declared

  const handleDegreeUpload = async () => {
    if (!degreeFileInputRef.current?.files[0]) {
      alert("Please select a degree file to upload.");
      return;
    }
  
    const formData = new FormData();
    // Use 'file' instead of 'degree' to match multer's expected field name
    formData.append("degree", degreeFileInputRef.current.files[0]);
  
    try {
      const response = await apiClient.patch("/doctors/degree", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      
      if(response.status === 200) {
        // Update the local state to show the new degree
        setDegree(response.data.data.doctor.degree);
        setNewDegree(null);
        
        toast({
          title: "Degree Uploaded",
          description: "Your degree file has been uploaded successfully.",
          variant: "success",
        });
      }
    } catch (error) {
      console.error("Error uploading degree:", error);
      toast({
        title: "Upload Failed",
        description: error.response?.data?.message || "Failed to upload degree.",
        variant: "destructive",
      });
    }
  };


  useEffect(() => {
    if (!user) return
    const getDoctor = async () => {
      try {
        const response = await apiClient("/doctors/getDoctor")
        console.log(response.data.data.doctor)
        setData(response.data.data.doctor)
      } catch (error) {
        console.error(error)
      }
    }
    getDoctor()
  }, [user]) // Removed setData from the dependency array

  return (
    <div className="min-h-screen p-6 flex flex-col items-center">
      <div className="w-full max-w-4xl flex flex-col lg:flex-row gap-10">
        {/* Profile Section */}
        <div className="flex flex-col items-center w-full lg:w-1/3">
          <div className="h-72 w-72 p-2 flex justify-center items-center overflow-hidden rounded-full shadow-md bg-white border">
            <img
              src={newProfilePicture || avatar}
              alt="Profile"
              className="object-cover w-full h-full bg-white rounded-full"
            />
          </div>
          <div className="mt-6">
            <h2 className="text-center text-2xl font-bold">{name}</h2>
          </div>
          <div className="mt-6 flex flex-col justify-center items-center px-4">
            <label htmlFor="image-upload" className="mb-2 text-base text-gray-700 font-medium">
              Upload New Image
            </label>
            <input
              type="file"
              id="image-upload"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
            />
            <button
              className="text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150 py-2 px-4 cursor-pointer"
              onClick={() => fileInputRef.current.click()}
            >
              <MdPhotoCamera className="h-5 w-5 inline" /> Choose Image
            </button>
          </div>
          {/* Degree Upload Section */}
          <div className="mt-8 w-full flex flex-col justify-center items-center px-4">
            <label htmlFor="degree-upload" className="mb-2 text-base text-gray-700 font-medium">
              Degree Certificate
            </label>
            <div
              className={`w-full h-32 border-2 border-dashed rounded-lg flex flex-col items-center justify-center p-4 transition-colors ${
                isEditing
                  ? degree
                    ? "border-indigo-300 bg-indigo-50"
                    : "border-gray-300 hover:border-indigo-300 hover:bg-indigo-50"
                  : "border-gray-200 bg-gray-50 cursor-not-allowed"
              }`}
              onDragOver={(e) => {
                if (isEditing) {
                  e.preventDefault()
                  e.stopPropagation()
                  e.currentTarget.classList.add("border-indigo-500", "bg-indigo-50")
                }
              }}
              onDragLeave={(e) => {
                if (isEditing) {
                  e.preventDefault()
                  e.stopPropagation()
                  e.currentTarget.classList.remove("border-indigo-500", "bg-indigo-50")
                }
              }}
              onDrop={(e) => {
                if (isEditing) {
                  e.preventDefault()
                  e.stopPropagation()
                  e.currentTarget.classList.remove("border-indigo-500", "bg-indigo-50")
                  if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                    setNewDegree(e.dataTransfer.files[0])
                  }
                }
              }}
              onClick={() => {
                if (isEditing) {
                  degreeFileInputRef.current.click()
                }
              }}
            >
              {newDegree ? (
                <div className="flex flex-col items-center gap-2">
                  <div className="text-indigo-600 font-medium">{newDegree.name}</div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      setNewDegree(null)
                    }}
                    className="text-xs text-red-500 hover:text-red-700"
                    disabled={!isEditing}
                  >
                    Remove
                  </button>
                </div>
              ) : degree ? (
                <div className="flex flex-col items-center gap-2">
                  <a
                    href={degree}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:underline text-center"
                    onClick={(e) => e.stopPropagation()}
                  >
                    View Current Certificate
                  </a>
                  {isEditing && <div className="text-sm text-gray-500">Drag & drop to replace or click to browse</div>}
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <div className="text-gray-500">
                    {isEditing ? "Drag & drop your degree certificate here" : "No certificate uploaded"}
                  </div>
                  {isEditing && <div className="text-sm text-gray-500">or click to browse</div>}
                </div>
              )}
              <input
                type="file"
                id="degree-upload"
                ref={degreeFileInputRef}
                className="hidden"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleDegreeChange}
                disabled={!isEditing}
              />
            </div>

            {/* Add prominent upload button */}
            {isEditing && (
              <button
                type="button"
                className="mt-4 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150 py-2 px-4 cursor-pointer w-full max-w-[250px]"
                onClick={() => degreeFileInputRef.current.click()}
              >
                {newDegree ? "Change Selected File" : "Upload Degree Certificate"}
              </button>
            )}

            {/* Show selected file name */}
            {isEditing && newDegree && (
              <div className="mt-2 text-sm text-gray-600">Selected file: {newDegree.name}</div>
            )}
            {isEditing && newDegree && (
  <>
    <button
      type="button"
      onClick={handleDegreeUpload}
      className="mt-2 text-white font-medium bg-green-600 hover:bg-green-500 active:bg-green-700 rounded-lg duration-150 py-2 px-4 cursor-pointer w-full max-w-[250px]"
    >
      Upload Now
    </button>
  </>
)}

          </div>
        </div>

        {/* Profile Details Section */}
        <div className="w-full lg:w-2/3">
          <div className="flex justify-between px-4">
            <h1 className="text-3xl font-bold">Profile Details</h1>
            <button
              className="w-40 px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
              onClick={handleEditClick}
            >
              {isEditing ? <FaCheckCircle className="h-5 w-5 inline" /> : <MdEdit className="h-5 w-5 inline" />}{" "}
              {isEditing ? "Save Changes" : "Edit"}
            </button>
          </div>
          <form className="p-4 space-y-5">
            <div>
              <label className="font-medium">Name</label>
              <input
                type="text"
                name="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={true}
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-[rgba(0,0,0,0.1)] cursor-not-allowed outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
            </div>
            <div>
              <label className="font-medium">Email Address</label>
              <input
                type="email"
                name="email"
                required
                value={email}
                disabled={true}
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-[rgba(0,0,0,0.1)] cursor-not-allowed outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
            </div>
            <div>
              <label className="font-medium">Phone Number</label>
              <input
                type="tel"
                name="contact"
                required
                maxLength={10}
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                disabled={!isEditing}
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
            </div>
            <div>
              <label className="font-medium">Address</label>
              <textarea
                name="address"
                required
                rows={5}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                disabled={!isEditing}
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
            </div>
            <div>
              <label className="font-medium">City</label>
              <input
                type="text"
                name="city"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                disabled={!isEditing}
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
            </div>
            <div>
              <label className="font-medium">Specialization</label>
              <input
                type="text"
                name="specialization"
                required
                value={specialization}
                onChange={(e) => setSpecialization(e.target.value)}
                disabled={!isEditing}
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
            </div>
            <div>
              <label className="font-medium">Experience (years)</label>
              <input
                type="number"
                name="experience"
                required
                value={experience}
                onChange={(e) => setExperience(Number(e.target.value))}
                disabled={!isEditing}
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
            </div>
            <div>
              <label className="font-medium">Qualification</label>
              <input
                type="text"
                name="qualification"
                required
                value={qualification}
                onChange={(e) => setQualification(e.target.value)}
                disabled={!isEditing}
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
            </div>
            <div>
              <label className="font-medium">Consultation Fee</label>
              <input
                name="consultationFee"
                required
                value={consultationFee}
                onChange={(e) => setConsultationFee(Number(e.target.value))}
                disabled={!isEditing}
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
export default page

