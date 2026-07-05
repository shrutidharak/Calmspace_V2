import { privacy } from "../../lib/data";

export default function PrivacyPolicyPage() {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        Privacy Policy
      </h1>

      {privacy.map((item, index) => (
        <p key={index} className="mb-4">
          {item.desc}
        </p>
      ))}
    </main>
  );
}