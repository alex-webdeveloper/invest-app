export default function Loading() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-center space-y-4">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-foreground mx-auto" />
        <p className="text-foreground text-sm">Загрузка страницы...</p>
      </div>
    </div>
  );
}