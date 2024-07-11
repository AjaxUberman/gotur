import { SignIn } from "@clerk/nextjs";
import Image from "next/image";
import mainImg from "@/public/loginpagecat.png";

export default async function Page() {
  return (
    <section className="bg-white overflow-x-hidden ">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <section className="relative flex items-end h-screen bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
          <Image
            alt=""
            src={mainImg}
            className="absolute inset-0 h-full min-h-screen w-full object-cover opacity-80"
          />

          <div className="hidden lg:relative lg:block lg:p-12 md:bg-black rounded-lg md:bg-opacity-20">
            <h2 className=" text-2xl font-bold sm:text-3xl md:text-4xl pb-4 text-purple-300 ">
              Welcome to Gotur 🍧
            </h2>

            <p className="mt-4 leading-relaxed text-white/90 font-semibold tracking-wide drop-shadow-2xl">
              Get your favorite meals delivered to your doorstep with just a few
              taps. Fast, fresh, and convenient—experience the best of local and
              international cuisine anytime, anywhere. Log in now to start your
              delicious journey!
            </p>
          </div>
        </section>
        <main className="flex md:relative md:top-0 md:left-0  absolute top-40 pl-4 items-center justify-center py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6 ">
          <SignIn />
        </main>
      </div>
    </section>
  );
}
