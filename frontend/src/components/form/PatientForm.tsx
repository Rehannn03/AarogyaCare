"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signUpSchema } from "@/schemas/signUpSchema";
import SubmitButton from "../ui/SubmitButton";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import CustomFormField from "../ui/CustomFormField";
import { FaUserMd, FaUser } from "react-icons/fa";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { useToast } from "@/components/ui/use-toast";// Adjust based on your setup
import apiClient from '@/api-client/apiClient';
// Adjust import path
import { useUserStore } from "@/stores/store";// If using Zustand/Context API

export enum FormFieldType {
  INPUT = "input",
  TEXTAREA = "textarea",
  PHONE_INPUT = "phoneInput",
  CHECKBOX = "checkbox",
  DATE_PICKER = "datePicker",
  SELECT = "select",
  SKELETON = "skeleton",
  PASSWORD = "password",
}

const PatientForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user, update } = useUserStore();
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      password: "",
      email: "",
      role: "patient",
    },
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const { name,email,password, role } = data;
      const tempProfile = { name, role,email};
      update(tempProfile);
      console.log("This is raw data from form: ", data);
      const response = await apiClient.post("/users/register", { ...data });
      toast({
        title: "Success",
        description: "Sign Up Successful",
      });
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="name"
          label="Full name"
          placeholder="John Doe"
          iconSrc="/assets/icons/user.svg"
          iconAlt="user"
        />
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="email"
          label="Email"
          placeholder="example123@gmail.com"
          iconSrc="/assets/icons/email.svg"
          iconAlt="email"
        />
        <CustomFormField
          fieldType={FormFieldType.PASSWORD}
          control={form.control}
          name="password"
          label="Password"
          placeholder="Enter your password"
          iconSrc="/assets/icons/lock.svg"
          iconAlt="password"
        />

        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <FormControl>
                <div className="flex flex-row space-x-6">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <Input
                      type="radio"
                      value="doctor"
                      checked={field.value === "doctor"}
                      onChange={() => field.onChange("doctor")}
                      id="role-doctor"
                      className="sr-only"
                    />
                    <div
                      className={`w-6 h-6 flex items-center justify-center border-2 border-gray-300 rounded-full ${
                        field.value === "doctor" ? "bg-blue-600" : "bg-white"
                      } transition-colors`}
                    >
                      <FaUserMd
                        className={`text-xl ${
                          field.value === "doctor" ? "text-white" : "text-gray-700"
                        } transition-colors`}
                      />
                    </div>
                    <span className="text-gray-700">Doctor</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <Input
                      type="radio"
                      value="patient"
                      checked={field.value === "patient"}
                      onChange={() => field.onChange("patient")}
                      id="role-patient"
                      className="sr-only"
                    />
                    <div
                      className={`w-6 h-6 flex items-center justify-center border-2 border-gray-300 rounded-full ${
                        field.value === "patient" ? "bg-blue-600" : "bg-white"
                      } transition-colors`}
                    >
                      <FaUser
                        className={`text-xl ${
                          field.value === "patient" ? "text-white" : "text-gray-700"
                        } transition-colors`}
                      />
                    </div>
                    <span className="text-gray-700">Patient</span>
                  </label>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
      </form>
    </Form>
  );
};

export default PatientForm;
