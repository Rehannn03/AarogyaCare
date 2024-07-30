"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useDebounceCallback, useDebounceValue } from "usehooks-ts";
import { useToast } from "@/components/ui/use-toast";
import apiClient from '@/api-client/apiClient'
// import {Form} from"@/components/ui/form";
import axios, { AxiosError } from "axios";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signUpSchema } from "@/schemas/signUpSchema";
import { Loader2 } from "lucide-react";
import { useUserStore } from "@/stores/store";
// const formSchema = z.object({});

const page = () => {
  const [name, setName] = useState("");
  const [usernameMessage, setUsernameMessage] = useState("");
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const debounced = useDebounceCallback(setName, 300);
  const { toast } = useToast();
  const router = useRouter();
  const { user, update} = useUserStore();

  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      password: "",
      email: "",
    },
  });

  // useEffect(() => {
  //   const checkUsernameUnique = async () => {
  //     if (name) {
  //       setIsCheckingUsername(true);
  //       setUsernameMessage("");
  //       try {
  //         const response = await axios.get(
  //           `/api/check-name-unique?name=${name}`
  //         );
  //         setUsernameMessage(response.data.message);
  //       } catch (error) {
  //         const axiosError = error;
  //         setUsernameMessage(
  //           axiosError.response?.data.message ?? "Axios Error Checking Username"
  //         );
  //       } finally {
  //         setIsCheckingUsername(false);
  //       }
  //     }
  //   };
  //   checkUsernameUnique();
  // }, [name]);
  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      // const response = await axios.post("../../../../../backend/src/controllers/registerUser", data);
      const tempData = {role: "patient", ...data }                                                            // TODO: Remove this line
      const {name, role } =  tempData;
      const tempProfile = {name, role}                                                                        // TODO: Remove this line
      update(tempProfile);                                                                                   
       
      console.log("This is tempData",tempData);                                                               //  TODO: Remove this line 
      console.log("This is raw data from form: ",data);                                                       //  TODO: Remove this line
      const response = await apiClient.post("/users/register", {...data, role: "patient"});
      toast({
        title: "Success",
        description: "Sign Up Successful",
      });
      // router.replace(`/verify/${name}`);
      router.replace(`/appointment`);                                                                   //TODO: If time permits, implement verify by resend
      setIsSubmitting(false);
    } catch (error) {
      const errorMessage = error
      console.log("This is the error",error);                                                                 //  TODO: Remove this line
      toast({
        title: "Sign Up Failed",
        description: errorMessage,
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };
  return (
    <div className=" flex justify-center items-center min-h-screen bg-gray-800">
      <div className=" w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className=" text-center">
        //TODO: Enter website name
          <h1 className=" text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Website Name 
          </h1>
          <p className=" mb-4">Sign up to consult a doctor via video call or access all your medical reports in one place.</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Name"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        debounced(e.target.value);
                      }}
                    />
                    
                  </FormControl>
                  {isCheckingUsername && <Loader2 className="animate-spin" />}
                  <p className={` text-sm ${usernameMessage === "Username is available" ? ' text-green-600': 'text-red-600'}`}>test {usernameMessage}</p>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="example123@mailprovider.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isSubmitting} className=" font-bold">
              {isSubmitting ? (
                <>
                  <Loader2 className=" mr-2 h-4 w-4 animate-spin" /> Please
                  Wait...
                </>
              ) : (
                "Sign-Up"
              )}
            </Button>
          </form>
        </Form>
        <div className=" text-center mt-4">
          <p>
            Already Member?{" "}
            <Link
              href="/sign-in"
              className=" text-[#7A5CFA] hover:text-blue-800"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default page;
