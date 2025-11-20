import {supabase} from "../supabase/client.ts"
import logo from '../assets/logo.png'
import { useNavigate } from "react-router-dom";
import {useState} from "react"

async function handleLogin(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });


  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true, user: data.user };
}

export default function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await handleLogin(email, password);
    
    if(!result.success) {
      setErrorMsg("Incorrect email or password.");
      return;
    }

    navigate("/");

  }
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white px-4 py-12">
        <div className="bg-white flex flex-col gap-6 rounded-xl border w-full max-w-md shadow-sm">
          
          {/* Header */}
          <div className="px-6 pt-6 pb-2 text-center">
            <div className="flex justify-center mb-4">
              <img
                src={logo}
                alt="Logo"
                className="h-20 w-auto"
                onClick={() => navigate('/')}
              />
            </div>
            <h4 className="text-2xl font-semibold">Welcome Back</h4>
            <p className="text-gray-500">Sign in to your account</p>
          </div>
  
          {/* Form */}
          <div className="px-6 pb-6">
            <form className="space-y-4" onSubmit={submitForm}>

              {errorMsg && (<div className="text-red-600 text-sm">{errorMsg}</div>)}

              {/* Email */}
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  autoComplete="email"
                  className="w-full h-10 rounded-md border px-3 py-1 bg-white text-sm outline-none
                             placeholder:text-gray-400
                             focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
  
              {/* Password */}
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  className="w-full h-10 rounded-md border px-3 py-1 bg-white text-sm outline-none
                             placeholder:text-gray-400
                             focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
  
              {/* Forgot Password */}
              <div className="flex justify-end">
                <button type="button" className="text-sm text-blue-600 hover:underline">
                  Forgot password?
                </button>
              </div>
  
              {/* Submit Button */}
              <button
                type="submit"
                className="w-full h-10 rounded-md bg-gray-950 text-white text-sm font-medium
                           hover:bg-gray-700 transition"
              >
                Sign In
              </button>
  
              {/* Sign Up */}
              <div className="text-center text-sm text-gray-600">
                Don't have an account?{" "}
                <button type="button" onClick={() => navigate("/signup")} className="text-blue-600 hover:underline">
                  Sign up
                </button>
              </div>
  
            </form>
          </div>
  
        </div>
      </div>
    );
  }