export function MovieDetailSkeleton() {
  return (
    <div className="h-full grid grid-cols-12 md:gap-10 gap-y-10 md:px-8 px-4 animate-pulse">
      <div className="col-span-12 md:col-span-6">
        <div className="rounded-2xl bg-gray-700/60 md:h-full h-80 w-full" />
      </div>

      <div className="col-span-12 md:col-span-6 flex flex-col gap-4">
        <div className="h-10 bg-gray-700/60 rounded-md w-3/4" />

        <div className="flex gap-3">
          <div className="h-6 w-16 bg-gray-700/60 rounded-full" />
          <div className="h-6 w-20 bg-gray-700/60 rounded-full" />
          <div className="h-6 w-12 bg-gray-700/60 rounded-full" />
        </div>

        <div className="space-y-2">
          <div className="h-5 bg-gray-700/60 rounded-md w-2/3" />
          <div className="flex items-center gap-2">
            <div className="h-5 bg-gray-700/60 rounded-md w-1/2" />
            <div className="h-5 bg-gray-600/70 rounded-md w-12" />
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <div className="h-7 bg-gray-700/60 rounded-md w-40" />
          <div className="space-y-2">
            <div className="h-4 bg-gray-700/60 rounded-md w-full" />
            <div className="h-4 bg-gray-700/60 rounded-md w-11/12" />
            <div className="h-4 bg-gray-700/60 rounded-md w-10/12" />
            <div className="h-4 bg-gray-700/60 rounded-md w-9/12" />
          </div>
        </div>

        {/* Botão de Favoritar */}
        <div className="mt-6 h-10 w-40 bg-gray-700/60 rounded-lg" />
      </div>
    </div>
  );
}
