// 추후에 사용할 프로바이더를 묶을 레이아웃 모음
function ProviderLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}

export default ProviderLayout;
