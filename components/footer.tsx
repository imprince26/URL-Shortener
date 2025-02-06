"use client"

export function Footer(){
  return (
    <div className="flex flex-col items-center justify-center py-6 border-t shadow-2xl">
        <p>&copy; {new Date().getFullYear()} URLify</p>
        <p>Designed & developed by <a className="underline text-blue-500 hover:text-blue-600" href="https://github.com/imprince26" target="_blank">Prince Patel</a></p>
      
    </div>
  )
}