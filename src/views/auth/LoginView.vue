<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { AuthService } from '@/api'

const formSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(5, 'Password must be at least 5 characters').max(100, 'Password must be less than 100 characters'),
})

const validationSchema = toTypedSchema(formSchema)

type FormData = z.infer<typeof formSchema>

const onSubmit = async (values: Record<string, unknown>) => {
  await AuthService.login(values as FormData)
}
</script>
<template>
  <Card class="mx-auto max-w-sm w-full">
    <CardHeader>
      <CardTitle class="text-2xl">
        Login
      </CardTitle>
      <CardDescription>
        Enter your email below to login to your account
      </CardDescription>
    </CardHeader>
    <CardContent>
      <Form @submit="onSubmit" :validation-schema="validationSchema" class="grid gap-4">
        <FormField v-slot="{ componentField }" name="email">
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input type="email" placeholder="your@email.com" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="password">
          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
              <Input type="password" placeholder="••••••••" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <Button type="submit" class="w-full">
          Login
        </Button>
        <Button variant="outline" class="w-full" type="button">
          Login with Google
        </Button>
      </Form>
      <div class="mt-4 text-center text-sm">
        Don't have an account?
        <a href="/register" class="underline">
          Sign up
        </a>
      </div>
    </CardContent>
  </Card>
</template>
