"use client"
import React, { useEffect, useState } from "react"
import apiClient from "@/api-client/apiClient"
import { useUserStore } from "@/stores/store"
import { FaCheckCircle, FaFilePdf } from "react-icons/fa"
import { MdEdit, MdPhotoCamera } from "react-icons/md"
import { useToast } from "@/components/ui/use-toast"
import { useCurrent } from "@/features/getCurrent"
// import { MdPhotoCamera } from "react-icons/md";
// import { FaCheckCircle } from "react-icons/fa";
// {
//     "_id": "66afb3a35544ce36a1331daa",
//     "userId": {
//         "_id": "66a380a720df8be3620b8437",
//         "name": "Rehan",
//         "email": "rehan@gmail.com",
//         "profile": {
//             "age": 40,
//             "contact": "9876543219",
//             "address": "Powai",
//             "gender": "M",
//             "city": "Mumbai"
//         },
//         "avatar": "https://res.cloudinary.com/projectbackend/image/upload/v1722080184/mxu2ofc6hfors31aniwz.jpg"
//     },
//     "specialization": "Cardiologist",
//     "experience": 5,
//     "qualification": "M.B.B.S MD",
//     "consultationFee": 300,
//     "rating": 0,
//     "reviews": 0,
//     "verified": true,
//     "degree": "https://res.cloudinary.com/projectbackend/image/upload/v1713959229/npgrhrclmnwfn2czr2ry.jpg"
// }

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
  const [degree, setDegree] = useState("")
  const [degreeFileName, setDegreeFileName] = useState("")
  const [selectedDegree, setSelectedDegree] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [newProfilePicture, setNewProfilePicture] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const fileInputRef = React.createRef()
  const degreeFileInputRef = React.createRef()
  const { toast } = useToast()

  const { User, isPending } = useCurrent()

  console.log(User)

  // useEffect(() => {
  //   console.log(user);
  // }
  // ,[user]);

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

    // Extract filename from degree URL if available
    if (data.degree) {
      const urlParts = data.degree.split("/")
      setDegreeFileName(urlParts[urlParts.length - 1])
    }
  }

  const handleEditClick = async () => {
    if (isEditing) {
      try {
        setIsSubmitting(true)

        // Create FormData to handle file upload
        const formData = new FormData()

        // Add all the profile data to the FormData
        formData.append("name", name)
        formData.append("age", age)
        formData.append("contact", contact)
        formData.append("address", address)
        formData.append("city", city)
        formData.append("gender", gender)
        formData.append("specialization", specialization)
        formData.append("experience", experience)
        formData.append("qualification", qualification)
        formData.append("consultationFee", consultationFee)

        // Add the degree file if a new one is selected
        if (selectedDegree) {
          formData.append("degree", selectedDegree)
        }

        console.log("Submitting form data:", Object.fromEntries(formData))

        // Send the update request with FormData
        await apiClient.post("/doctors/updateInfo", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })

        toast({
          title: "Profile updated.",
          description: "Your profile has been updated successfully.",
          variant: "success",
        })

        // Refresh doctor data
        const response = await apiClient("/doctors/getDoctor")
        setData(response.data.data.doctor)

        // Reset selected degree after successful update
        setSelectedDegree(null)
        setIsEditing(false)
      } catch (error) {
        console.error("Error updating profile:", error)
        toast({
          title: "Update failed.",
          description: "There was a problem updating your profile.",
          variant: "destructive",
        })
      } finally {
        setIsSubmitting(false)
      }
    } else {
      setIsEditing(true)
    }
  }

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

  const handleDegreeFileUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      // Validate file type
      const validTypes = ["application/pdf", "image/jpeg", "image/jpg", "image/png"]
      if (!validTypes.includes(file.type)) {
        toast({
          title: "Invalid file type",
          description: "Please upload a PDF, JPG, or PNG file.",
          variant: "destructive",
        })
        return
      }

      // Validate file size (max 5MB)
      const maxSize = 5 * 1024 * 1024 // 5MB in bytes
      if (file.size > maxSize) {
        toast({
          title: "File too large",
          description: "Please upload a file smaller than 5MB.",
          variant: "destructive",
        })
        return
      }

      setSelectedDegree(file)
      setDegreeFileName(file.name)

      toast({
        title: "File selected",
        description: "Click 'Save Changes' to upload your degree certificate.",
        variant: "info",
      })
    }
  }

  const openDegreePreview = () => {
    if (degree) {
      window.open(degree, "_blank")
    }
  }

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
              // onChange={(e) => }
            />
            <button
              className="text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150 py-2 px-4 cursor-pointer"
              onClick={() => fileInputRef.current.click()}
            >
              <MdPhotoCamera className="h-5 w-5 inline" /> Choose Image
            </button>
          </div>
        </div>

        {/* Profile Details Section */}
        <div className="w-full lg:w-2/3">
          <div className="flex justify-between px-4">
            <h1 className="text-3xl font-bold">Profile Details</h1>
            <button
              className="w-40 px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150 flex items-center justify-center"
              onClick={handleEditClick}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                  Saving...
                </>
              ) : isEditing ? (
                <>
                  <FaCheckCircle className="h-5 w-5 mr-2" /> Save Changes
                </>
              ) : (
                <>
                  <MdEdit className="h-5 w-5 mr-2" /> Edit
                </>
              )}
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

            {/* Degree Upload Section */}
            <div className="mt-8 space-y-4 border-t pt-6">
              <div className="flex items-center justify-between">
                <label className="font-medium text-lg">Degree Certificate</label>
                {degree && (
                  <button
                    type="button"
                    onClick={openDegreePreview}
                    className="px-3 py-1 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm"
                  >
                    View Current
                  </button>
                )}
              </div>

              <div
                className={`p-4 border-2 border-dashed rounded-lg ${selectedDegree || degree ? "border-green-300 bg-green-50" : "border-indigo-300 bg-indigo-50"} flex items-center justify-between`}
              >
                <div className="flex items-center">
                  <FaFilePdf
                    className={`h-8 w-8 ${selectedDegree || degree ? "text-green-500" : "text-indigo-400"} mr-3`}
                  />
                  <div>
                    <p className="font-medium">
                      {selectedDegree ? selectedDegree.name : degree ? degreeFileName : "No file selected"}
                    </p>
                    <p className="text-xs text-gray-500">Upload your degree certificate (PDF, JPG, PNG, max 5MB)</p>
                  </div>
                </div>

                <input
                  type="file"
                  id="degree-upload"
                  ref={degreeFileInputRef}
                  className="hidden"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleDegreeFileUpload}
                  disabled={!isEditing}
                />

                {isEditing && (
                  <button
                    type="button"
                    onClick={() => degreeFileInputRef.current.click()}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition-colors flex items-center"
                    disabled={isSubmitting}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                      />
                    </svg>
                    Browse
                  </button>
                )}
              </div>

              {selectedDegree && isEditing && (
                <div className="text-sm text-green-600 flex items-center">
                  <FaCheckCircle className="mr-2" />
                  New degree file selected. Click "Save Changes" to update your profile with this degree.
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default page
