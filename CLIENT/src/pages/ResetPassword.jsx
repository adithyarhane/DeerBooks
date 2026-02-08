import React, { useState } from "react";

import ResetPasswordRequest from "../components/features/resetPassword/ResetPasswordRequest";
import ResetOTPVerify from "../components/features/resetPassword/ResetOtpVerify";
import UpdatePasswordForm from "../components/features/resetPassword/UpdatePasswordForm";
import { useAuthContext } from "../context/AuthContext";
import useTitle from "../components/useTitle";

const ResetPassword = () => {
  useTitle("Reset Password");
  const { isEmailSent, isOtpSubmitted } = useAuthContext();
  const [email, setEmail] = useState();

  return (
    <div>
      {!isEmailSent && !isOtpSubmitted && (
        <ResetPasswordRequest email={email} setEmail={setEmail} />
      )}
      {isEmailSent && !isOtpSubmitted && <ResetOTPVerify />}
      {isEmailSent && isOtpSubmitted && <UpdatePasswordForm email={email} />}
    </div>
  );
};

export default ResetPassword;
