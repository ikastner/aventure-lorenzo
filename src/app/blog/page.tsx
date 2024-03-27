import Header from "@/components/header.component";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <>
      <Header />
        <Link href="/blog/newform">
          <div className="flex items-center justify-center ">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-center">
              Nouveau post
            </button>
          </div>        
        </Link>
    </>
  );
}
