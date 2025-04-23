"use client"

import { useState, useEffect, useCallback } from "react"
import { MedicineApi, type Medicine } from "../services/api"

export function useMedicines() {
  const [medicines, setMedicines] = useState<Medicine[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Fetch all medicines
  const fetchMedicines = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await MedicineApi.getMedicines()
      console.log("Fetched medicines response:", response)

      if (response.success && response.data) {
        // Handle the nested medicine array in the response
        const medicinesData = response.data.medicine || []

        // Map the API response to our Medicine interface
        const formattedMedicines = medicinesData.map((med) => ({
          _id: med._id,
          id: med._id, // For compatibility with both id formats
          medicineName: med.medicineName,
          dosage: med.dosage,
          timing: med.timing,
          frequency: med.frequency,
          startDate: med.startDate,
          endDate: med.endDate,
          notes: med.notes || "",
          status: med.active ? "active" : "inactive", // Convert active boolean to status string
        }))

        setMedicines(formattedMedicines)
      } else {
        setError(response.error || "Failed to fetch medicines")
      }
    } catch (err) {
      setError("An unexpected error occurred")
      console.error("Error fetching medicines:", err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Add a new medicine
  const addMedicine = useCallback(
    async (medicineData: Omit<Medicine, "id" | "status">) => {
      setIsLoading(true)
      setError(null)

      try {
        const response = await MedicineApi.addMedicine(medicineData)
        console.log("Add medicine response:", response)

        if (response.success) {
          // Refresh the medicines list after adding
          fetchMedicines()
          return { success: true, message: "Medicine added successfully" }
        } else {
          setError(response.error || "Failed to add medicine")
          return { success: false, message: response.error || "Failed to add medicine" }
        }
      } catch (err) {
        const errorMsg = "An unexpected error occurred"
        setError(errorMsg)
        console.error("Error adding medicine:", err)
        return { success: false, message: errorMsg }
      } finally {
        setIsLoading(false)
      }
    },
    [fetchMedicines],
  )

  // Delete a medicine
  const deleteMedicine = useCallback(
    async (medicineId: string) => {
      setIsLoading(true)
      setError(null)

      try {
        const response = await MedicineApi.deleteMedicine(medicineId)
        console.log("Delete medicine response:", response)

        if (response.success) {
          // Refresh the medicines list after deleting
          fetchMedicines()
          return { success: true, message: "Medicine deleted successfully" }
        } else {
          setError(response.error || "Failed to delete medicine")
          return { success: false, message: response.error || "Failed to delete medicine" }
        }
      } catch (err) {
        const errorMsg = "An unexpected error occurred"
        setError(errorMsg)
        console.error("Error deleting medicine:", err)
        return { success: false, message: errorMsg }
      } finally {
        setIsLoading(false)
      }
    },
    [fetchMedicines],
  )

  // Deactivate a medicine
  const deactivateMedicine = useCallback(
    async (medicineId: string) => {
      setIsLoading(true)
      setError(null)

      try {
        const response = await MedicineApi.deactivateMedicine(medicineId)
        console.log("Deactivate medicine response:", response)

        if (response.success) {
          // Refresh the medicines list after deactivating
          fetchMedicines()
          return { success: true, message: "Medicine deactivated successfully" }
        } else {
          setError(response.error || "Failed to deactivate medicine")
          return { success: false, message: response.error || "Failed to deactivate medicine" }
        }
      } catch (err) {
        const errorMsg = "An unexpected error occurred"
        setError(errorMsg)
        console.error("Error deactivating medicine:", err)
        return { success: false, message: errorMsg }
      } finally {
        setIsLoading(false)
      }
    },
    [fetchMedicines],
  )

  // Edit a medicine
  const editMedicine = useCallback(
    async (medicineId: string, medicineData: Omit<Medicine, "id" | "status">) => {
      setIsLoading(true)
      setError(null)

      try {
        const response = await MedicineApi.editMedicine(medicineId, medicineData)
        console.log("Edit medicine response:", response)

        if (response.success) {
          // Refresh the medicines list after editing
          fetchMedicines()
          return { success: true, message: "Medicine updated successfully" }
        } else {
          setError(response.error || "Failed to update medicine")
          return { success: false, message: response.error || "Failed to update medicine" }
        }
      } catch (err) {
        const errorMsg = "An unexpected error occurred"
        setError(errorMsg)
        console.error("Error editing medicine:", err)
        return { success: false, message: errorMsg }
      } finally {
        setIsLoading(false)
      }
    },
    [fetchMedicines],
  )

  // Load medicines on component mount
  useEffect(() => {
    fetchMedicines()
  }, [fetchMedicines])

  return {
    medicines,
    isLoading,
    error,
    fetchMedicines,
    addMedicine,
    deleteMedicine,
    deactivateMedicine,
    editMedicine,
  }
}
