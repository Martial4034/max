export function HeaderSkeleton() {
  return (
    <header className="sticky top-0 z-50">
      <div className="flex items-center justify-between px-4 py-4">
        <div className="flex space-x-6">
          <div className="w-12 h-4 bg-gray-200 dark:bg-gray-800 rounded"></div>
          <div className="w-16 h-4 bg-gray-200 dark:bg-gray-800 rounded"></div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="w-24 h-6 bg-gray-200 dark:bg-gray-800 rounded"></div>
          <div className="w-8 h-8 bg-gray-200 dark:bg-gray-800 rounded-md"></div>
        </div>
      </div>
      <div className="h-[1px] w-full bg-gray-200 dark:bg-gray-800" />
    </header>
  )
} 