"use client"

import Loader from "@/components/Loader"


export default function Loading() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white z-[9999]">
      <Loader/>
    </div>
  )
}
