export default function Footer() {
  return (
    <footer className="border-border mt-16 border-t">
      <div className="container-page text-muted-foreground py-8 text-sm">
        <p>&copy; {new Date().getFullYear()} HBWA. All rights reserved.</p>
      </div>
    </footer>
  );
}
