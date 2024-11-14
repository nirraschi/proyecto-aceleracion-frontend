import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <title>LookBack</title>
      <h1>Hola</h1>

      <div className="flex-1 space-y-4 ">
          <Link
            key='/start'
            href='/start'
            className='flex items-center px-4 py-2 text-sm rounded-md bg-blue-500 text-white'
          >
            Empezar
          </Link>

      </div>


    </div>
  );
}
