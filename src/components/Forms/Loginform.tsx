"use client";

import signIn from "@/hooks/signIn";
import { LoginType } from "@/lib/types";
import { loginSchema } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeOffIcon, Loader2Icon, LockIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Button } from "../shadcnui/button";
import { Checkbox } from "../shadcnui/checkbox";
import { Field, FieldError, FieldLabel } from "../shadcnui/field";
import { Input } from "../shadcnui/input";

const LoginForm = () => {
	const [showPassword, setShowPassword] = useState(false);

	const { replace } = useRouter();

	const {
		handleSubmit,
		control,
		formState: { isSubmitting },
		reset,
	} = useForm({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
			rememberMe: true,
		},
		mode: "all",
	});

	const loginButtonHandeler = async (loginData: LoginType) => {
		const { isSuccess, message } = await signIn(loginData);

		if (!isSuccess) {
			toast.error(message);
		}

		if (isSuccess) {
			toast.success(message);
			replace("/dashboard");
			reset();
		}
	};

	return (
		<form
			onSubmit={handleSubmit(loginButtonHandeler)}
			className="grid gap-6"
			noValidate>
			{/* Email field */}
			<Controller
				name="email"
				control={control}
				render={({ field, fieldState }) => (
					<Field data-invalid={fieldState.invalid}>
						<FieldLabel htmlFor={field.name}>
							Email <span className="font-bold text-red-500">*</span>
						</FieldLabel>
						<Input
							{...field}
							id={field.name}
							aria-invalid={fieldState.invalid}
							type="email"
							placeholder="Enter your email"
							autoComplete="email"
						/>
						{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
					</Field>
				)}
			/>

			{/* Password field */}
			<Controller
				name="password"
				control={control}
				render={({ field, fieldState }) => (
					<Field data-invalid={fieldState.invalid}>
						<FieldLabel htmlFor={field.name}>
							Password <span className="font-bold text-red-500">*</span>
						</FieldLabel>
						<div className="relative">
							<Input
								{...field}
								id={field.name}
								aria-invalid={fieldState.invalid}
								type={showPassword ? "text" : "password"}
								placeholder="Enter your password"
								autoComplete="current-password"
							/>
							{/* Show / Hide Toggle */}

							<button
								type="button"
								// variant="ghost"
								onClick={() => setShowPassword(!showPassword)}
								className="absolute top-1/2 right-2 h-6 w-6 -translate-y-1/2 cursor-pointer">
								{showPassword ? (
									<EyeIcon className="h-5 w-5" />
								) : (
									<EyeOffIcon className="h-5 w-5" />
								)}
							</button>
						</div>

						{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
					</Field>
				)}
			/>

			{/* Checkbox field */}
			<Controller
				name="rememberMe"
				control={control}
				render={({ field, fieldState }) => (
					<Field
						data-invalid={fieldState.invalid}
						orientation={"horizontal"}>
						<Checkbox
							checked={field.value}
							onCheckedChange={field.onChange}
							className="cursor-pointer"
						/>
						<FieldLabel htmlFor={field.name}>Keep me signed in</FieldLabel>

						{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
					</Field>
				)}
			/>

			<Button
				className="w-full cursor-pointer"
				type="submit"
				disabled={isSubmitting}>
				{isSubmitting ? (
					<>
						<Loader2Icon className="animate-spin" /> Submitting..
					</>
				) : (
					<>
						<LockIcon /> Submit
					</>
				)}
			</Button>
		</form>
	);
};

export default LoginForm;
