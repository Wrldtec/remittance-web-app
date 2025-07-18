import { FormIcons } from "@/components/icons/Icons";
import FormHeadingDescription from "@/components/shared/FormHeadingDescription";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem } from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  selectAuthEmail,
  selectAuthPassword,
  setCredentials,
} from "@/features/auth/auth.slice";
import {
  useResendOTPMutation,
  useVerifyOTPMutation,
} from "@/features/auth/authApi.slice";
import useRouteGuard from "@/hooks/use-route-guard";
import { OTPSchema, OTPSchemaType } from "@/lib/schemas/user/verifyOtp";
import { FormDescription, ResponseError } from "@/lib/type";
import { showError, showSuccess } from "@/utils/toaster";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

interface VerifyOTPState {
  verificationMode: "auth" | "forgot-password";
}

const VerifyOtp = () => {
  const { state } = useLocation();
  const { verificationMode } = (state as VerifyOTPState) || {};

  const email = useSelector(selectAuthEmail);
  const password = useSelector(selectAuthPassword);

  useRouteGuard({
    primaryCondition: email,
    secondaryCondition: verificationMode === "auth" ? password : true,
    navigateTo: "/",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const form = useForm<OTPSchemaType>({
    resolver: zodResolver(OTPSchema),
    mode: "all",
    defaultValues: { otp: "" },
  });

  const [verifyOTP, { isLoading: otpLoading }] = useVerifyOTPMutation();
  const [resendOTP, { isLoading: resendOtpLoading }] = useResendOTPMutation();

  async function onSubmit(data: OTPSchemaType) {
    try {
      if (verificationMode === "auth") {
        const credentials = {
          emailAddress: email,
          otpCode: data.otp,
          password,
        };

        const response = await verifyOTP(credentials).unwrap();

        if (response) {
          showSuccess("Verification Successful", "You are being redirected.");

          if (response?.data) {
            dispatch(setCredentials({ ...response?.data }));

            if (!response?.data?.isKycCompleted) {
              navigate("/complete-profile");
            } else {
              navigate("/dashboard");
            }
          }
        }
      } else if (verificationMode === "forgot-password") {
        navigate("/reset-password", { state: { otpCode: data.otp } });
      }
    } catch (e) {
      const { status } = e as ResponseError;

      if (verificationMode === "auth") {
        if (status === 400 || status === 401) {
          showError("Invalid OTP", "Please enter a valid OTP.");
        } else {
          showError("Verification Failed", "Please try again later.");
        }
      }

      if (verificationMode === "forgot-password") {
        if (status === 400) {
          showError("Invalid OTP", "Please enter a valid OTP.");
        } else {
          showError("Verification Failed", "Please try again later.");
        }
      }

      showError("Something went wrong", "Please try again later.");
    }
  }

  async function handleResendOTP() {
    try {
      const credentials = {
        emailAddress: email,
      };
      const response = await resendOTP(credentials).unwrap();

      if (response) {
        showSuccess("OTP sent successfully", "Please check your email.");
      } else {
        showError("Something went wrong", "Please try again later.");
      }
    } catch (e) {
      const { status } = e as ResponseError;

      if (status === 400) {
        showError("Invalid Email", "Please enter a valid email address.");
      }

      showError("Something went wrong", "Please try again later.");
    }
  }

  const formDescription: FormDescription = {
    Icon: FormIcons.Lock,
    title: "Verify your otp",
    links: {
      title: "Back to Login",
      to: "/login",
    },
    subtitle: (
      <span>
        Enter the six digit code that you received in your mail{" "}
        <span className="text-[#1B1B1B]">{email}</span> ,and click verify to
      </span>
    ),
  };

  return (
    <section className="mt-7 px-5">
      <div className="flex items-center justify-center">
        <div className="sm:max-w-[31.35rem] w-full flex flex-col gap-14 items-center">
          {/* ---------- FORM DESCRIPTION ---------- */}

          <FormHeadingDescription formDescription={formDescription} />

          <div className="flex flex-col gap-5 items-center">
            {/* ---------- FORM CONTAINER ---------- */}
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="sm:w-full flex flex-col items-center gap-[18px]"
              >
                <FormField
                  control={form.control}
                  name="otp"
                  render={({ field }) => (
                    <FormItem>
                      <InputOTP maxLength={6} {...field}>
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormItem>
                  )}
                />
                <Button
                  className="cursor-pointer font-inter tracking-[-0.18px] hover:bg-[#3333c1e0] bg-[#3333C1] rounded-[6px] max-w-[29rem] w-full h-11 text-white"
                  type="submit"
                  disabled={otpLoading || resendOtpLoading}
                >
                  Submit
                </Button>
              </form>
            </Form>

            <div className="flex flex-col gap-4 justify-between w-full">
              <Button
                variant="link"
                className="w-fit text-[#3333C1] font-inter font-[475] text-sm leading-[22px] tracking-[-0.18px] p-0"
                onClick={handleResendOTP}
                disabled={resendOtpLoading || otpLoading}
              >
                Resend OTP
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VerifyOtp;
