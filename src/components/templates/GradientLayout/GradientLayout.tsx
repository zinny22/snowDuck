function GradientLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center bg-custom-gradient overflow-scroll">
      <section className="max-w-[420px] min-w-[320px] w-full h-[100vh] relative">
        {children}
      </section>
    </div>
  );
}

export default GradientLayout;
