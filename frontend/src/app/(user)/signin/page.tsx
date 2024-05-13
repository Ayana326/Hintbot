"use client";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import { Container } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SignIn() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (error) {
      router.push("/");
    }
  }, [error, router]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(true);
  };

  return (
    <>
      <Container className="min-h-screen">
        <div className="px-6 flex justify-center">
          <div className="flex flex-col items-center w-1/2 min-w-80 mt-16 ring-1 ring-gray-300 py-10 px-16 rounded-md shadow-lg">
            <h1 className="text-3xl font-bold leading-9 tracking-tight text-gray-900">
              ログイン
            </h1>
            <form
              action=""
              method="POST"
              className="w-full"
              onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
                handleSubmit(e)
              }
            >
              <div className="mt-12 relative">
                <label htmlFor="mail" className="text-md">
                  メールアドレス
                </label>
                <input
                  id="email"
                  type="email"
                  className="block h-10 w-full pl-10 pr-2 rounded-md border-0 py-2.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset text-md"
                />
                <span className="absolute left-2 bottom-2 flex items-center">
                  <EmailIcon className="text-gray-400" />
                </span>
              </div>

              <div className="mt-6 relative">
                <label htmlFor="password" className="text-md">
                  パスワード
                </label>
                <input
                  id="password"
                  type="password"
                  className="block h-10 w-full pl-10 pr-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset text-md"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span className="absolute left-2 bottom-2 flex items-center">
                  <LockIcon className="text-gray-400" />
                </span>
              </div>
              <div>
                <button
                  type="submit"
                  className="mt-12 flex w-full rounded-md bg-green-500 px-3 py-2 text-white text-md shadow-sm hover:bg-green-700 focus:ring"
                >
                  ログイン
                </button>
                <div className="text-end mt-2">
                  <a href="signup" className="text-blue-500">
                    まだ登録していない方
                  </a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </>
  );
}
