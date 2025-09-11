export default function Contact() {
  return (
    <main className="container-page py-10">
      <h1 className="mb-4 text-3xl font-bold">Contact</h1>
      <form className="grid max-w-xl gap-4">
        <label className="grid gap-1">
          <span className="text-sm">Name</span>
          <input className="border-border bg-background rounded-md border px-3 py-2" />
        </label>
        <label className="grid gap-1">
          <span className="text-sm">Email</span>
          <input type="email" className="border-border bg-background rounded-md border px-3 py-2" />
        </label>
        <label className="grid gap-1">
          <span className="text-sm">Message</span>
          <textarea className="border-border bg-background min-h-[120px] rounded-md border px-3 py-2"></textarea>
        </label>
        <button className="btn btn-primary w-fit">Send</button>
      </form>
    </main>
  );
}
