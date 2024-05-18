"use client";

import { signup } from "@/firebase/auth";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import { Container } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignUp() {
  const [sex, setSex] = useState<"man" | "woman">();
  const [age, setAge] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError(true);
      return;
    }

    const UserCredential = await signup(email, password);
    if (UserCredential.user) {
      router.push("/work");
    }
  };
  return (
    <>
      <Container>
        <div className="px-6 flex justify-center">
          <div className="flex flex-col items-center w-1/2 min-w-80 mt-16 ring-1 ring-gray-300 py-10 px-16 rounded-md shadow-lg">
            <h1 className="text-3xl font-bold text-gray-900">新規登録</h1>
            <form
              action=""
              method="POST"
              className="w-full"
              onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                handleSubmit(e);
              }}
            >
              <div className="mt-6">
                <label className="font-bold">
                  名前<span className="text-xs align-top text-red-500">*</span>
                </label>
                <input
                  required
                  id="text"
                  type="text"
                  className="block h-10 w-full pl-2 pr-2 rounded-md border-0 py-2.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset text-md "
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setName(e.target.value);
                  }}
                />
              </div>

              <div className="mt-6 flex">
                <div>
                  <label className="font-bold">
                    性別
                    <span className="text-xs align-top text-red-500">*</span>
                  </label>
                  <div className="flex">
                    <div className="flex items-center me-4">
                      <input
                        required
                        id="radio-man"
                        type="radio"
                        value="man"
                        name="radio-sex"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        onClick={(e) => {
                          setSex(e.currentTarget.value as "man");
                        }}
                      />
                      <label htmlFor="radio-man" className="ms-2 text-md">
                        男性
                      </label>
                    </div>
                    <div className="flex items-center me-4">
                      <input
                        id="radio-woman"
                        type="radio"
                        value="woman"
                        name="radio-sex"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        onClick={(e) => {
                          setSex(e.currentTarget.value as "woman");
                        }}
                      />
                      <label htmlFor="radio-man" className="ms-2 text-md">
                        女性
                      </label>
                    </div>
                  </div>
                </div>

                <div className="ml-12">
                  <label className="font-bold">
                    年齢
                    <span className="text-xs align-top text-red-500">*</span>
                  </label>
                  <input
                    required
                    type="number"
                    id="age-field"
                    className="block w-16 pl-1 ring-1 rounded-sm ring-gray-400"
                    min="0"
                    max="100"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setAge(e.target.value);
                    }}
                  />
                </div>
              </div>

              <div className="mt-6 relative">
                <label htmlFor="mail" className="font-bold">
                  メールアドレス{" "}
                  <span className="text-xs align-top text-red-500">*</span>
                </label>
                <input
                  required
                  id="email"
                  type="email"
                  className="block h-10 w-full pl-10 pr-2 rounded-md border-0 py-2.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset text-md "
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setEmail(e.target.value);
                  }}
                />
                <span className="absolute left-2 bottom-2 flex items-center">
                  <EmailIcon className="text-gray-400" />
                </span>
              </div>

              <div className="mt-6 relative">
                <label htmlFor="password" className="font-bold">
                  パスワード
                  <span className="text-xs align-top text-red-500">*</span>
                </label>
                <input
                  required
                  id="password"
                  type="password"
                  className="block h-10 w-full pl-10 pr-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset text-md"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setPassword(e.target.value);
                  }}
                />
                <span className="absolute left-2 bottom-2 flex items-center">
                  <LockIcon className="text-gray-400" />
                </span>
              </div>

              <div className="mt-6 relative">
                <label htmlFor="password" className="font-bold">
                  パスワード(確認)
                  <span className="text-xs align-top text-red-500">*</span>
                </label>
                <input
                  required
                  data-error={error}
                  id="confirm-password"
                  type="password"
                  className="block h-10 w-full pl-10 pr-2 rounded-md border-0 py-1.5 data-[error=true]:ring-red-500 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset text-md"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setConfirmPassword(e.target.value);
                    setError(false);
                  }}
                />
                <span className="absolute left-2 bottom-8 flex items-center">
                  <LockIcon className="text-gray-400" />
                </span>

                <span
                  data-error={error}
                  className="text-sm text-red-500 data-[error=false]:invisible"
                >
                  パスワードが一致していません
                </span>
              </div>

              <button
                type="submit"
                className="mt-4 flex w-full rounded-md bg-green-500 px-3 py-2 text-white text-md shadow-sm hover:bg-green-700 focus:ring"
              >
                登録
              </button>
              <div className="text-end mt-2">
                <a href="signin" className="text-blue-500">
                  既に登録済みの方
                </a>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </>
  );
}
