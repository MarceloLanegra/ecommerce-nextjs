"use client"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { useTRPC } from "@/trpc/client"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Poppins } from "next/font/google"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { loginSchema } from "../../schemas"
import { z } from "zod"
import { toast } from "sonner"
import { zodResolver } from "@hookform/resolvers/zod"

const poppins = Poppins({ subsets: ["latin"], weight: "700" })

function SignInView() {
  const router = useRouter()

  const trpc = useTRPC()
  const queryClient = useQueryClient()

  const login = useMutation(
    trpc.auth.login.mutationOptions({
      onError: (error) => toast.error(error.message),
      onSuccess: async () => {
        await queryClient.invalidateQueries(trpc.auth.session.queryFilter())
        router.push("/")
      },
    })
  )

  // Other way to implement Log in
  // const login = useMutation({
  //   mutationFn: async (values: z.infer<typeof loginSchema>) => {
  //     const response = await fetch('/api/users/login', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(values),
  //     })

  //     if (!response.ok) {
  //       const error = await response.json()
  //       throw new Error(error.message)
  //     }

  //     return response.json()
  //   },
  //   onError: (error) => toast.error(error.message),
  //   onSuccess: () => router.push("/"),
  // })

  const form = useForm<z.infer<typeof loginSchema>>({
    mode: "all",
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    login.mutate(values)
  }

  return (
    <div className='grid grid-cols-1 lg:grid-cols-5'>
      <div className='bg-[#F4F4F0] h-screen w-full lg:col-span-3 overflow-y-auto'>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='flex flex-col gap-8 p-4 lg:p-16'
          >
            <div className='flex items-center justify-between mb-8'>
              <Link href='/'>
                <span
                  className={cn(poppins.className, "text-2xl font-semibold")}
                >
                  funroad
                </span>
              </Link>
              <Button
                variant='ghost'
                size='sm'
                className='text-base border-none underline'
                asChild
              >
                <Link prefetch href='/sign-up'>
                  Sign up
                </Link>
              </Button>
            </div>
            <h1 className='text-4xl font-medium'>Welcome back to funroad.</h1>
            <FormField
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-base'>Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-base'>Password</FormLabel>
                  <FormControl>
                    <Input {...field} type='password' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              disabled={login.isPending}
              type='submit'
              size='lg'
              className='bg-black text-white hover:bg-pink-400 hover:text-primary'
              variant='elevated'
            >
              Log in
            </Button>
          </form>
        </Form>
      </div>
      <div className='h-screen w-full lg:col-span-2 hidden lg:flex items-center justify-center p-4'>
        <Image
          src='/sign-up-bg.svg'
          alt='Sign up background'
          width={600}
          height={600}
        />
      </div>
    </div>
  )
}

export default SignInView
