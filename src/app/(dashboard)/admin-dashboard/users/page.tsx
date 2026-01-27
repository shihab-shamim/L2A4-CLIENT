import Button from "@/componets/dashboard/Button";
import { userService } from "@/service/user.service";

export type User = {
  id: string;
  name: string;
  email: string;
  role: "STUDENT" | "TUTOR" | "ADMIN";
  status: "ACTIVE" | "BANNED";
  emailVerified: boolean;
  createdAt: string;
};

const userPage = async () => {
  const { data, error } = await userService.getAllUsers();

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <table className="min-w-full border-collapse">
        {/* ===== Head ===== */}
        <thead className="bg-gray-100">
          <tr>
            {[
              "Name",
              "Email",
              "Role",
              "Status",
              "Verified",
              "Created At",
              "Action",
            ].map((head) => (
              <th
                key={head}
                className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-600"
              >
                {head}
              </th>
            ))}
          </tr>
        </thead>

        {/* ===== Body ===== */}
        <tbody className="divide-y divide-gray-100">
          {data?.data.map((user: User) => (
            <tr key={user.id} className="transition hover:bg-gray-50">
              <td className="px-5 py-3 text-sm font-medium text-gray-900">
                {user.name}
              </td>

              <td className="px-5 py-3 text-sm text-gray-700">
                {user.email}
              </td>

              <td className="px-5 py-3 text-sm">
                <span className="rounded-md bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-800">
                  {user.role}
                </span>
              </td>

              <td className="px-5 py-3 text-sm">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    user.status === "ACTIVE"
                      ? "bg-gray-900 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {user.status}
                </span>
              </td>

              <td className="px-5 py-3 text-sm text-gray-700">
                {user.emailVerified ? "Yes" : "No"}
              </td>

              <td className="px-5 py-3 text-sm text-gray-500">
                {new Date(user.createdAt).toLocaleDateString()}
              </td>

              
              <td className="px-5 py-3 text-sm">
              <Button user={user}/>
              </td>
            </tr>
          ))}

          {/* Empty State */}
          {data?.data.length === 0 && (
            <tr>
              <td
                colSpan={7}
                className="px-5 py-10 text-center text-sm text-gray-500"
              >
                No users found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default userPage;
