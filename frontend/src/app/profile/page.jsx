"use client"
import { useState, useRef, useEffect } from "react"
import {
  FaCalendarAlt,
  FaHeartbeat,
  FaAllergies,
  FaCheckCircle,
  FaTimesCircle,
  FaGenderless,
  FaGraduationCap,
  FaStethoscope,
  FaBriefcase,
  FaMoneyBillWave,
  FaFileUpload,
  FaFilePdf,
} from "react-icons/fa"
import { MdPhotoCamera, MdEdit } from "react-icons/md"
import { BsGenderMale, BsGenderFemale } from "react-icons/bs"
import { useUserStore } from "@/stores/store"
import { fetchAndSetUserStore } from "@/lib/fetchAndSetUserStore"
import { useToast } from "@/components/ui/use-toast"
import apiClient from "@/api-client/apiClient"
import { InputTags } from "@/components/appointments"

const Profile = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [selectedImg, setSelectedImg] = useState("")
  const [userImg, setUserImg] = useState(null)
  const [preview, setPreview] = useState(false)
  const { user, update } = useUserStore()
  const { toast } = useToast()
  const [newProfilePicture, setNewProfilePicture] = useState(null)
  const fileInputRef = useRef(null)
  const degreeFileInputRef = useRef(null)

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [contact, setContact] = useState("")
  const [address, setAddress] = useState("")
  const [city, setCity] = useState("")
  const [age, setAge] = useState("")
  const [gender, setGender] = useState("")
  const [existingDiseases, setExistingDiseases] = useState([])
  const [allergies, setAllergies] = useState([])
  const [isDiabetic, setIsDiabetic] = useState("")
  const [isPregnant, setIsPregnant] = useState("")
  const [isBP, setIsBP] = useState("")
  const [profilePicture, setProfilePicture] = useState("")
  const [isEditing, setIsEditing] = useState(false)
  const ref = useRef(null)

  // Doctor specific states
  const [isDoctorSectionVisible, setIsDoctorSectionVisible] = useState(false)
  const [specialization, setSpecialization] = useState("")
  const [experience, setExperience] = useState("")
  const [qualification, setQualification] = useState("")
  const [consultationFee, setConsultationFee] = useState("")
  const [selectedDegree, setSelectedDegree] = useState(null)
  const [degreeFileName, setDegreeFileName] = useState("")
  const [degreeUrl, setDegreeUrl] = useState("")
  const [isSubmittingDegree, setIsSubmittingDegree] = useState(false)
  const [doctorData, setDoctorData] = useState(null)

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true)
      try {
        await fetchAndSetUserStore((user) => {
          if (!user) return // Prevent setting empty state

          setName(user.name || "")
          setEmail(user.email || "")
          setAge(user.profile?.age || "")
          setContact(user.profile?.contact || "")
          setAddress(user.profile?.address || "")
          setGender(user.profile?.gender || "")
          setCity(user.profile?.city || "")
          setExistingDiseases(user.profile?.existingDiseases || [])
          setAllergies(user.profile?.allergies || [])
          setIsDiabetic(user.profile?.isDiabetic || "")
          setIsPregnant(user.profile?.isPregnant || "")
          setIsBP(user.profile?.isBP || "")
          setProfilePicture(user.avatar || "https://www.kindpng.com/picc/m/78-785827_user-profile-avatar-login-account")

          // Check if user is a doctor
          if (user.role === "doctor") {
            setIsDoctorSectionVisible(true)
            fetchDoctorData()
          }
        })
      } catch (error) {
        console.error("Error fetching user data:", error)
        toast({
          title: "Error",
          description: "Failed to load user data. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchUser()
  }, [toast])

  const fetchDoctorData = async () => {
    try {
      const response = await apiClient.get("/doctors")
      const doctorData = response.data?.data?.doctor

      if (doctorData) {
        setDoctorData(doctorData)
        setSpecialization(doctorData.specialization || "")
        setExperience(doctorData.experience || "")
        setQualification(doctorData.qualification || "")
        setConsultationFee(doctorData.consultationFee || "")
        setDegreeUrl(doctorData.degree || "")

        // Extract filename from URL if available
        if (doctorData.degree) {
          const urlParts = doctorData.degree.split("/")
          setDegreeFileName(urlParts[urlParts.length - 1])
        }
      }
    } catch (error) {
      console.error("Error fetching doctor data:", error)
      // Don't show error toast as the user might not be a doctor yet
    }
  }

  const triggerFileInput = () => {
    setPreview(true)
    fileInputRef.current.click()
  }

  const triggerDegreeFileInput = () => {
    degreeFileInputRef.current.click()
  }

  const handleEditClick = async () => {
    if (isEditing) {
      try {
        console.log({
          age,
          contact,
          address,
          city,
          gender,
          existingDiseases,
          allergies,
          isDiabetic,
          isPregnant,
          isBP,
        })

        const formDataToSend = {
          age,
          contact,
          address,
          city,
          gender,
          existingDiseases,
          allergies,
          isDiabetic,
          isPregnant,
          isBP,
        }

        await apiClient.patch("/users/profile", formDataToSend)

        toast({
          title: "Profile updated.",
          description: "Your profile has been updated successfully.",
          variant: "success",
        })

        // Update user data in the store
        fetchAndSetUserStore((updatedUser) => {
          setEmail(updatedUser.email || "")
          setAge(updatedUser.profile.age || "")
          setContact(updatedUser.profile.contact || "")
          setAddress(updatedUser.profile.address || "")
          setGender(updatedUser.profile.gender || "")
          setCity(updatedUser.profile.city || "")
          setExistingDiseases(updatedUser.profile.existingDiseases || [])
          setAllergies(updatedUser.profile.allergies || [])
          setIsDiabetic(updatedUser.profile.isDiabetic || "")
          setIsPregnant(updatedUser.profile.isPregnant || "")
          setIsBP(updatedUser.profile.isBP || "")
          setProfilePicture(
            updatedUser.avatar || "https://www.kindpng.com/picc/m/78-785827_user-profile-avatar-login-account",
          )
        })

        setIsEditing(false)
      } catch (error) {
        console.error("Error updating profile:", error)
        toast({
          title: "Update failed.",
          description: "There was a problem updating your profile.",
          variant: "destructive",
        })
      }
    } else {
      setIsEditing(true)
    }
  }

  const onConfirm = async () => {
    if (!fileInputRef.current?.files[0]) {
      alert("Please select an image first.")
      return
    }

    const formData = new FormData()
    formData.append("avatar", fileInputRef.current.files[0])

    try {
      const response = await apiClient.patch("/users/profile/pfp", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })

      const updatedAvatar = response.data?.data?.user?.avatar

      setProfilePicture(updatedAvatar)
      fetchAndSetUserStore((updatedUser) => {
        setProfilePicture(updatedUser.avatar)
      })

      toast({
        title: "Profile Picture Updated",
        description: "Your profile picture has been updated successfully.",
        variant: "success",
      })

      setPreview(false)
      setSelectedImg("")
    } catch (error) {
      console.error("Error updating profile picture:", error)
      toast({
        title: "Update Failed",
        description: "Failed to update profile picture.",
        variant: "destructive",
      })
    }
  }

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    console.log(file)

    const reader = new FileReader()
    reader.onloadend = () => {
      setSelectedImg(reader.result)
    }
    reader.readAsDataURL(file)
  }

  const handleDegreeFileUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      setSelectedDegree(file)
      setDegreeFileName(file.name)
    }
  }

  const handleDoctorInfoSubmit = async (e) => {
    e.preventDefault()

    if (!specialization || !experience || !qualification || !consultationFee) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    setIsSubmittingDegree(true)

    try {
      const formData = new FormData()

      // Only append the file if a new one is selected
      if (selectedDegree) {
        formData.append("degree", selectedDegree)
      }

      formData.append("specialization", specialization)
      formData.append("experience", experience)
      formData.append("qualification", qualification)
      formData.append("consultationFee", consultationFee)

      const response = await apiClient.post("/doctors/updateInfo", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })

      const updatedDoctor = response.data?.data?.doctor

      if (updatedDoctor) {
        setDoctorData(updatedDoctor)
        setDegreeUrl(updatedDoctor.degree || "")
      }

      toast({
        title: "Doctor Information Updated",
        description: "Your professional information has been updated successfully.",
        variant: "success",
      })

      // Refresh doctor data
      fetchDoctorData()
    } catch (error) {
      console.error("Error updating doctor information:", error)
      toast({
        title: "Update Failed",
        description: error.response?.data?.message || "Failed to update doctor information.",
        variant: "destructive",
      })
    } finally {
      setIsSubmittingDegree(false)
    }
  }

  const openDegreePreview = () => {
    if (degreeUrl) {
      window.open(degreeUrl, "_blank")
    }
  }

  return (
    <div className="min-h-screen p-6 flex flex-col items-center">
      {isLoading ? (
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      ) : (
        <div className="w-full max-w-4xl flex flex-col lg:flex-row gap-10">
          {/* Profile Section */}
          <div className="flex flex-col items-center w-full lg:w-1/3">
            <div className="h-72 w-72 p-2 flex justify-center items-center overflow-hidden rounded-full shadow-md bg-white border">
              <img
                src={selectedImg || user?.avatar}
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
                onChange={handleFileUpload}
              />
              <button
                className="text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150 py-2 px-4 cursor-pointer"
                onClick={triggerFileInput}
              >
                <MdPhotoCamera className="h-5 w-5 inline" /> Choose Image
              </button>
              {selectedImg && preview && (
                <button
                  className="text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150 py-2 px-4 cursor-pointer mt-3"
                  onClick={onConfirm}
                >
                  <MdPhotoCamera className="h-5 w-5 inline" /> Confirm
                </button>
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
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
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
            </form>
          </div>
        </div>
      )}

      {/* Health Details Section */}
      {!isLoading && (
        <div className="mt-10 w-full max-w-4xl p-6">
          <h2 className="text-2xl font-bold mb-4">Health Details</h2>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <FaCalendarAlt className="h-6 w-6 text-gray-500" />
              <div>
                <label className="font-medium">Age:</label>
                <input
                  type="text"
                  name="age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  disabled={!isEditing}
                  className="ml-2 px-2 py-1 border rounded-md"
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <label className="font-medium">Gender:</label>
              <div className="relative w-full">
                <select
                  name="gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg pr-10"
                >
                  <option value="M">Male</option>
                  <option value="F">Female</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  {gender === "M" ? (
                    <BsGenderMale className="h-6 w-6 text-gray-500" />
                  ) : gender === "F" ? (
                    <BsGenderFemale className="h-6 w-6 text-gray-500" />
                  ) : (
                    <FaGenderless className="h-6 w-6 text-gray-500" />
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <FaHeartbeat className="h-6 w-6 text-gray-500" />
              <div>
                <label className="font-medium">Existing Diseases:</label>
                <InputTags
                  value={existingDiseases}
                  onChange={setExistingDiseases}
                  ref={ref}
                  disabled={!isEditing}
                  id="existingDiseases"
                />
              </div>
            </div>
            <div className="overflow-y-auto p-2 flex gap-2 flex-wrap items-center">
              <div className="flex items-center space-x-2">
                <FaAllergies className="h-6 w-6 text-gray-500" />
                <div>
                  <label className="font-medium">Allergies:</label>
                  <InputTags value={allergies} onChange={setAllergies} ref={ref} disabled={!isEditing} id="allergies" />
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {isDiabetic === "true" ? (
                <FaCheckCircle className="h-6 w-6 text-green-500" />
              ) : (
                <FaTimesCircle className="h-6 w-6 text-red-500" />
              )}
              <div>
                <label className="font-medium">Diabetic:</label>
                <select
                  name="isDiabetic"
                  value={isDiabetic}
                  onChange={(e) => setIsDiabetic(e.target.value)}
                  disabled={!isEditing}
                  className="ml-2 px-2 py-1 border rounded-md"
                >
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {isPregnant === "true" ? (
                <FaCheckCircle className="h-6 w-6 text-green-500" />
              ) : (
                <FaTimesCircle className="h-6 w-6 text-red-500" />
              )}
              <div>
                <label className="font-medium">Pregnant:</label>
                <select
                  name="isPregnant"
                  value={isPregnant}
                  onChange={(e) => setIsPregnant(e.target.value)}
                  disabled={!isEditing}
                  className="ml-2 px-2 py-1 border rounded-md"
                >
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {isBP === "true" ? (
                <FaCheckCircle className="h-6 w-6 text-green-500" />
              ) : (
                <FaTimesCircle className="h-6 w-6 text-red-500" />
              )}
              <div>
                <label className="font-medium">Blood Pressure:</label>
                <select
                  name="isBP"
                  value={isBP}
                  onChange={(e) => setIsBP(e.target.value)}
                  disabled={!isEditing}
                  className="ml-2 px-2 py-1 border rounded-md"
                >
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Doctor Professional Details Section */}
      {!isLoading && isDoctorSectionVisible && (
        <div className="mt-10 w-full max-w-4xl p-6 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl shadow-md">
          <div className="flex items-center mb-6">
            <FaGraduationCap className="h-8 w-8 text-indigo-600 mr-3" />
            <h2 className="text-2xl font-bold text-indigo-700">Professional Details</h2>
          </div>

          <form onSubmit={handleDoctorInfoSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="flex items-center">
                  <FaStethoscope className="h-5 w-5 text-indigo-500 mr-2" />
                  <label className="font-medium text-gray-700">Specialization</label>
                </div>
                <input
                  type="text"
                  value={specialization}
                  onChange={(e) => setSpecialization(e.target.value)}
                  placeholder="e.g. Cardiology, Neurology"
                  className="w-full px-4 py-3 text-gray-700 bg-white border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center">
                  <FaBriefcase className="h-5 w-5 text-indigo-500 mr-2" />
                  <label className="font-medium text-gray-700">Experience (years)</label>
                </div>
                <input
                  type="number"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  placeholder="e.g. 5"
                  className="w-full px-4 py-3 text-gray-700 bg-white border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                  min="0"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center">
                  <FaGraduationCap className="h-5 w-5 text-indigo-500 mr-2" />
                  <label className="font-medium text-gray-700">Qualification</label>
                </div>
                <input
                  type="text"
                  value={qualification}
                  onChange={(e) => setQualification(e.target.value)}
                  placeholder="e.g. MD, MBBS"
                  className="w-full px-4 py-3 text-gray-700 bg-white border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center">
                  <FaMoneyBillWave className="h-5 w-5 text-indigo-500 mr-2" />
                  <label className="font-medium text-gray-700">Consultation Fee (₹)</label>
                </div>
                <input
                  type="number"
                  value={consultationFee}
                  onChange={(e) => setConsultationFee(e.target.value)}
                  placeholder="e.g. 1000"
                  className="w-full px-4 py-3 text-gray-700 bg-white border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                  min="0"
                />
              </div>
            </div>

            <div className="mt-8 space-y-4">
              <div className="flex items-center">
                <FaFilePdf className="h-5 w-5 text-indigo-500 mr-2" />
                <label className="font-medium text-gray-700">Degree Certificate</label>
              </div>

              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="flex-1">
                  <div
                    className={`p-4 border-2 border-dashed rounded-lg ${selectedDegree || degreeUrl ? "border-green-300 bg-green-50" : "border-indigo-300 bg-indigo-50"} flex items-center justify-between`}
                  >
                    <div className="flex items-center">
                      <FaFilePdf
                        className={`h-8 w-8 ${selectedDegree || degreeUrl ? "text-green-500" : "text-indigo-400"} mr-3`}
                      />
                      <div>
                        <p className="font-medium">{degreeFileName || "No file selected"}</p>
                        <p className="text-xs text-gray-500">Upload your degree certificate (PDF, JPG, PNG)</p>
                      </div>
                    </div>

                    <input
                      type="file"
                      id="degree-upload"
                      ref={degreeFileInputRef}
                      className="hidden"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleDegreeFileUpload}
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={triggerDegreeFileInput}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition-colors flex items-center"
                  >
                    <FaFileUpload className="mr-2" /> Browse
                  </button>

                  {degreeUrl && (
                    <button
                      type="button"
                      onClick={openDegreePreview}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                      View Current
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-8">
              <button
                type="submit"
                disabled={isSubmittingDegree}
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition-colors flex items-center shadow-md"
              >
                {isSubmittingDegree ? (
                  <>
                    <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                    Updating...
                  </>
                ) : (
                  <>
                    <FaCheckCircle className="mr-2" /> Save Professional Details
                  </>
                )}
              </button>
            </div>
          </form>

          {doctorData?.verified === true && (
            <div className="mt-6 p-4 bg-green-100 border border-green-300 rounded-lg flex items-center">
              <FaCheckCircle className="h-6 w-6 text-green-500 mr-3" />
              <p className="text-green-700">Your doctor profile has been verified. You can now accept appointments.</p>
            </div>
          )}

          {doctorData?.verified === false && (
            <div className="mt-6 p-4 bg-yellow-100 border border-yellow-300 rounded-lg flex items-center">
              <FaTimesCircle className="h-6 w-6 text-yellow-500 mr-3" />
              <p className="text-yellow-700">
                Your doctor profile is pending verification. You'll be notified once it's approved.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Profile
