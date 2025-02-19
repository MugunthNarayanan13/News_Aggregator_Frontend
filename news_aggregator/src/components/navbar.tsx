import Image from "next/image";
import Link from "next/link";
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
  } from "@heroui/react";
  import { Search, Mic, Settings, HelpCircle, UserCircle } from "lucide-react";
  
  

  export default function NavBar() {
    return (
      <>
      <div className="bg-background  px-6 pb-3 flex justify-between items-center  mx-auto mt-2 rounded-3xl">
        
        {/* Left Side - Logo & Links */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-[30px] text-black mb-3">News </span>
            <span className="text-[30px] font-bold text-black mb-3">Daily</span>
          </div>
  
        </div>

        <div className="flex-1 flex items-center gap-6 -ml-10">
          {/* Search Bar */}
          <div className="hidden sm:flex mx-auto items-center bg-white rounded-[20px] px-4 py-2 w-[20%] sm:w-[30rem] justify-end border border-2 border-foreground_light">
            <Search size={18} className="text-black" />
            <input
              type="text"
              placeholder="Search for topics,locations"
              className="ml-2 w-full  bg-transparent  text-black placeholder-black"
            />
            <Mic size={18} className="text-black cursor-pointer" />
          </div>
        </div> 
        <div className="flex items-center gap-6 ml-auto">
          <button>
            <HelpCircle size={22} className="text-black hover:text-black" />
          </button>
          <button>
            <Settings size={22} className="text-black hover:text-black" />
          </button>
          <button>
            <UserCircle size={22} className="text-black hover:text-black" />
          </button>
        </div>

      </div>
      <div className="bg-foreground_light py-3 rounded-3xl w-fit px-5 mx-auto mt-2">
        <div className="container mx-auto flex justify-center gap-6 text-sm">
          <Link href="#" className="text-black hover:text-black">
            World
          </Link>
          <Link href="#" className="text-black hover:text-black">
            Politics
          </Link>
          <Link href="#" className="text-black hover:text-black">
            Technology
          </Link>
          <Link href="#" className="text-black hover:text-black">
            Business
          </Link>
          <Link href="#" className="text-black hover:text-black">
            Sports
          </Link>
          <Link href="#" className="text-black hover:text-black">
            Entertainment
          </Link>
        </div>
      </div>
    </>
    );
  }
  