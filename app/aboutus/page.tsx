import { teamMembers } from "../../lib/data";

export default function AboutUsPage() {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        About Us
      </h1>

      <p className="mb-8">
        CalmSpace is a mental wellness platform
        connecting clients with professional
        counselors and mental health experts.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teamMembers.map((member) => (
          <div
            key={member.id}
            className="border rounded-lg p-4 shadow"
          >
            <h2 className="font-bold text-lg">
              {member.name}
            </h2>

            <p>{member.designation}</p>
          </div>
        ))}
      </div>
    </main>
  );
}