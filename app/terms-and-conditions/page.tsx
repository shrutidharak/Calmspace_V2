import { terms } from "../../lib/data";

export default function TermsPage() {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        Terms & Conditions
      </h1>

      {terms.map((item, index) => (
        <p key={index} className="mb-4">
          {item.desc}
        </p>
      ))}
    </main>
  );
}