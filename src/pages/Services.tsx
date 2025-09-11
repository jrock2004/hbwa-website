export default function Services() {
  return (
    <main className="container-page py-10">
      <h1 className="mb-4 text-3xl font-bold">Services</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="card p-6">
            <h2 className="font-semibold">Service {i}</h2>
            <p className="text-muted-foreground text-sm">Describe the service and who it helps.</p>
          </div>
        ))}
      </div>
    </main>
  );
}
