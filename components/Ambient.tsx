export default function Ambient() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-ink">
      <div className="absolute -top-32 -left-20 h-72 w-72 rounded-full bg-plum2/60 blur-3xl animate-drift" />
      <div
        className="absolute top-1/3 -right-24 h-80 w-80 rounded-full bg-blush/10 blur-3xl animate-drift"
        style={{ animationDelay: "1.2s" }}
      />
      <div
        className="absolute bottom-0 left-1/4 h-64 w-64 rounded-full bg-amber/10 blur-3xl animate-drift"
        style={{ animationDelay: "2.4s" }}
      />
      <div className="absolute inset-0 bg-grain opacity-40" />
    </div>
  );
}
