import { refund } from "../../lib/data";

export default function RefundPolicyPage() {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        Refund & Return Policy
      </h1>

      {refund.map((item, index) => (
        <div key={index} className="mb-6">
          {item.mainHeading && (
            <h2 className="text-2xl font-bold">
              {item.mainHeading}
            </h2>
          )}

          <h3 className="text-xl font-semibold">
            {item.heading}
          </h3>

          <p>{item.desc}</p>
        </div>
      ))}
    </main>
  );
}