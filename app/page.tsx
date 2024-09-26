import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center  py-24 ">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-4 sm:px-6 md:px-8 lg:px-20 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold max-w-3xl mb-6">
          Affordable SaaS Starter Kit for your projects
        </h1>
        <div className="mt-8 sm:mt-12">
          <Link href="/auth/sign-up" className="bg-[#35b474] hover:bg-[#35b474]/50 text-black/70 font-bold py-3 px-4 sm:py-4 sm:px-6 text-xl sm:text-2xl md:text-3xl rounded">
            Get Started
          </Link>
        </div>
        <div className="mt-6 mx-auto w-full max-w-4xl">
          <img
            src="https://utfs.io/f/EL3X3oHV1dJpHW7np4LFtK8bIWFkhOU0yT3jRMf9pdlG5Nrc"
            alt="Demo"
            width={800}
            height={450}
            className="rounded-lg shadow-lg"
          />
        </div>
      </main>
    </div>
  )
}