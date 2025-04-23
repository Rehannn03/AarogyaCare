import { authToken, apiBaseUrl } from "../config/constants"

// Types
export interface MedicineFrequency {
  time: string
  hour: number
  minute: number
  _id?: string
}

export interface Medicine {
  _id?: string
  id?: string
  medicineName: string
  dosage: string
  timing: string
  frequency: MedicineFrequency[] | string
  startDate: string
  endDate: string
  notes?: string
  status?: "active" | "inactive"
  active?: boolean
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

// API Error handling
class ApiError extends Error {
  status: number

  constructor(message: string, status: number) {
    super(message)
    this.status = status
    this.name = "ApiError"
  }
}

// Helper function for API requests
async function apiRequest<T>(endpoint: string, method = "GET", data?: any): Promise<ApiResponse<T>> {
  try {
    const url = `${apiBaseUrl}${endpoint}`
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    }

    const options: RequestInit = {
      method,
      headers,
      body: data ? JSON.stringify(data) : undefined,
    }

    console.log(`Making ${method} request to: ${url}`)
    if (data) console.log("Request data:", data)

    const response = await fetch(url, options)

    // Handle non-JSON responses (like HTML error pages)
    const contentType = response.headers.get("content-type")
    if (contentType && contentType.indexOf("application/json") === -1) {
      console.log(`Received non-JSON response: ${contentType}`)
      return {
        success: false,
        error: `Server returned ${response.status}: ${response.statusText}`,
      }
    }

    const responseData = await response.json()
    console.log("Response:", responseData)

    if (!response.ok) {
      throw new ApiError(responseData.message || "An error occurred", response.status)
    }

    return {
      success: true,
      data: responseData.data || responseData,
      message: responseData.message,
    }
  } catch (error) {
    console.error("API Error:", error)
    if (error instanceof ApiError) {
      return {
        success: false,
        error: error.message,
      }
    }
    return {
      success: false,
      error: "Network error or server unavailable",
    }
  }
}

// Medicine API functions
export const MedicineApi = {
  // Add a new medicine
  addMedicine: async (medicineData: Omit<Medicine, "id" | "status">): Promise<ApiResponse<Medicine>> => {
    // Convert the timing and frequency to the format expected by the API
    const formattedData = {
      medicineName: medicineData.medicineName,
      dosage: medicineData.dosage,
      timing: "after_meal", // Using the expected value from the example
      frequency: [
        {
          time: "morning",
          hour: new Date(medicineData.timing).getHours(),
          minute: new Date(medicineData.timing).getMinutes(),
        },
      ],
      startDate: new Date(medicineData.startDate).toISOString(),
      endDate: new Date(medicineData.endDate).toISOString(),
      notes: medicineData.notes,
    }

    return apiRequest<Medicine>("patients/addMedicine", "POST", formattedData)
  },

  // Get all medicines for the current user
  getMedicines: async (): Promise<ApiResponse<Medicine[]>> => {
    return apiRequest<Medicine[]>("patients/viewMedicine")
  },

  // Delete a medicine
  deleteMedicine: async (medicineId: string): Promise<ApiResponse<null>> => {
    return apiRequest<null>(`patients/deleteMedicine/${medicineId}`, "DELETE")
  },

  // Deactivate a medicine
  deactivateMedicine: async (medicineId: string): Promise<ApiResponse<null>> => {
    return apiRequest<null>(`patients/deactivateMedicine/${medicineId}`, "PATCH")
  },

  // Edit a medicine
  editMedicine: async (
    medicineId: string,
    medicineData: Omit<Medicine, "id" | "status">,
  ): Promise<ApiResponse<null>> => {
    // Convert the timing and frequency to the format expected by the API
    const formattedData = {
      medicineName: medicineData.medicineName,
      dosage: medicineData.dosage,
      timing: "after_meal", // Using the expected value from the example
      frequency: [
        {
          time: "morning",
          hour: new Date(medicineData.timing).getHours(),
          minute: new Date(medicineData.timing).getMinutes(),
        },
      ],
      startDate: new Date(medicineData.startDate).toISOString(),
      endDate: new Date(medicineData.endDate).toISOString(),
      notes: medicineData.notes,
    }

    return apiRequest<null>(`patients/editMedicine/${medicineId}`, "PUT", formattedData)
  },
}
