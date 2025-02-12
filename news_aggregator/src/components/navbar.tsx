import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Link,
  } from "@heroui/react";
  import { Search, Mic } from "lucide-react";
  
  export const AppLogo = () => {
    return (
      <svg
        width="36"
        height="36"
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* First Bar (Pink) */}
        <rect x="6" y="8" width="4" height="20" rx="2" fill="url(#pinkGradient)" />
  
        {/* Second Bar (Orange) */}
        <rect x="12" y="12" width="4" height="16" rx="2" fill="url(#orangeGradient)" />
  
        {/* Third Bar (Yellow) */}
        <rect x="18" y="10" width="4" height="18" rx="2" fill="url(#yellowGradient)" />
  
        {/* Fourth Bar (Blue) */}
        <rect x="24" y="14" width="4" height="14" rx="2" fill="url(#blueGradient)" />
  
        {/* Gradient Definitions */}
        <defs>
          <linearGradient id="pinkGradient" x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="#FF007A" />
            <stop offset="1" stopColor="#FF4B2B" />
          </linearGradient>
          <linearGradient id="orangeGradient" x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="#FF8000" />
            <stop offset="1" stopColor="#FFA500" />
          </linearGradient>
          <linearGradient id="yellowGradient" x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="#FFD700" />
            <stop offset="1" stopColor="#FFAA00" />
          </linearGradient>
          <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="#00AFFF" />
            <stop offset="1" stopColor="#008CFF" />
          </linearGradient>
        </defs>
      </svg>
    );
  };
  
  

  export default function App() {
    return (
      <Navbar className="bg-background_light shadow-md px-6 py-3 flex justify-between items-center">
        
        {/* Left Side - Logo & Links */}
        <div className="flex items-center gap-6">
          <NavbarBrand className="flex items-center gap-2">
            <AppLogo />
          </NavbarBrand>
  
          <NavbarContent className="hidden sm:flex text-foreground_dark gap-6">
            <NavbarItem>
              <Link color="foreground" href="#">
                Home
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link color="foreground" href="#">
                Login
              </Link>
            </NavbarItem>
          </NavbarContent>
        </div>

        <div className="flex items-center gap-6 ml-auto">
        
        {/* Search Bar */}
        <div className="hidden sm:flex items-center bg-foreground_light rounded-lg px-4 py-2 w-[20%] sm:w-[30rem] justify-end">
          <Search size={18} className="text-gray-500" />
          <input
            type="text"
            placeholder="Search..."
            className="ml-2 w-full bg-transparent focus:outline-none text-gray-800"
          />
          <Mic size={18} className="text-gray-500 cursor-pointer" />
        </div>
      </div>

  {/* Login and Sign Up */}

  {/* Right-aligned Login and Sign Up Section */}
{/* <div className="ml-auto flex items-center gap-6 justify-end">
  <NavbarContent justify="end">
    <NavbarItem className="hidden lg:flex text-foreground_dark justify-end">
      <Link href="#">Login</Link>
    </NavbarItem>
    <NavbarItem className="text-foreground_dark ml-auto">
      <Button as={Link} color="primary" href="#" variant="flat">
        Sign Up
      </Button>
    </NavbarItem>
  </NavbarContent>
</div> */}

        
      </Navbar>
    );
  }
  