function ContentLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className=" flex flex-col justify-between z-10 h-[100vh]">
      {children}
    </div>
  );
}

export default ContentLayout;
