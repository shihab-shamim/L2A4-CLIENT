"use client"
export type User = {
  id: string;
  name: string;
  email: string;
  role: "STUDENT" | "TUTOR" | "ADMIN";
  status: "ACTIVE" | "BANNED";
  emailVerified: boolean;
  createdAt: string;
};

const Button = ({user}:{user:User}) => {
    return (
          <button
                  className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                    user.status === "ACTIVE"
                      ? "bg-gray-200 text-gray-800 hover:bg-gray-300"
                      : "bg-gray-900 text-white hover:bg-gray-800"
                  }`}
                  onClick={() => {
                    console.log(
                      user.status === "ACTIVE"
                        ? "Ban user"
                        : "Activate user",
                      user.id
                    );
                  }}
                 >

                  {user.status === "ACTIVE" ? "Banned" : "Activate"}
                </button>
    );
};

export default Button;