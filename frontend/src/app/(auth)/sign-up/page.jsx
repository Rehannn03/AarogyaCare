'use client'
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useDebounceCallback } from "usehooks-ts";
import { useToast } from "@/components/ui/use-toast";
import apiClient from '@/api-client/apiClient';


import { useState } from "react";
import { useRouter } from "next/navigation";
import { signUpSchema } from "@/schemas/signUpSchema";
import { Loader2 } from "lucide-react";
import { useUserStore } from "@/stores/store";
import { FaUserMd, FaUser } from "react-icons/fa";
import Image from "next/image";
import PatientForm from "@/components/form/PatientForm";

const page = () => {
  const [name, setName] = useState("");
  const [usernameMessage, setUsernameMessage] = useState("");
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const debounced = useDebounceCallback(setName, 300);
  const { toast } = useToast();
  const router = useRouter();
  const {update } = useUserStore();


  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const { name,email,password, role } = data;
      const tempProfile = { name, role };
      update(tempProfile);
      console.log("This is raw data from form: ", data);
      const response = await apiClient.post("/users/register", { ...data });
      if(response.ok){
      toast({
        title: "Success",
        description: "Sign Up Successful",
      });
    }
      router.replace(`/sign-in`);
      setIsSubmitting(false);
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Sign Up Failed";
      toast({
        title: "Sign Up Failed",
        description: errorMessage,
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex h-screen max-h-screen bg-slate-200 font-title overflow-hidden">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          <Image
            src="/ArogayaCareLogo.svg"
            height={1000}
            width={1000}
            className="mb-12 h-10 w-fit"
            alt="doctor Image"
            priority
          />
            <section className="mb-5 space-y-4 ">
            <h1 className="text-[37px] font-bold md:text-[40px] md:font-bold ">Hi there ...</h1>
            <p className="text-dark-700">Schedule your first appointment.</p>
        </section>
          <PatientForm/>
          <div className="text-center mt-4">
          <p>
            Already a Member?{" "}
            <Link
              href="/sign-in"
              className="text-[#7A5CFA] hover:text-blue-800"
            >
              Sign In
            </Link>
          </p>
        </div>
        </div>
      </section>

      <Image
      src="/assets/images/onboarding-img.png"
      height={1000}
      width={1000}
      alt="paitent"
      className="side-img max-w-[50%]"
      />
    </div>
  );
};

export default page;
