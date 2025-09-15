import * as React from "react";
import * as Menubar from "@radix-ui/react-menubar";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Link } from "react-router-dom";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import banner from "../assets/banner.png";
import iosplus from "../assets/iconIOSPlusWit.png";

const GlobalNavbar = () => {
  const menuItemStyle = {
    color: 'white',
    textDecoration: 'none',
    padding: '8px 12px',
    borderRadius: '4px',
    transition: 'color 0.2s ease',
  };

  const menuItemHoverStyle = {
    color: '#93c5fd', // blue-300
  };

  const reizenItemStyle = {
    ...menuItemStyle,
    color: '#f87171', // red-400
    textDecoration: 'underline',
  };

  const reizenItemHoverStyle = {
    color: '#fca5a5', // red-300
  };

  return (
    <div className="sticky top-0 z-50 bg-[#162b58] h-14 flex items-center">
      {/* Logo */}
      <div className="absolute left-4 lg:static lg:mr-4 flex w-full justify-center lg:justify-start items-center">
        <a href="https://focus-wtv.be" className="cursor-pointer">
          <img src={banner} alt="Logo" className="h-14" />
        </a>
      </div>

      {/* Menubar for large screens */}
      <Menubar.Root className="hidden lg:flex w-full justify-center text-2xl text-white items-center p-[8px] space-x-2">
        <Menubar.Menu>
          <Menubar.Trigger 
            className="flex select-none items-center justify-between gap-0.5 rounded px-3 py-2 text-lg font-medium leading-none outline-none"
            style={menuItemStyle}
            onMouseEnter={(e) => e.target.style.color = menuItemHoverStyle.color}
            onMouseLeave={(e) => e.target.style.color = menuItemStyle.color}
          >
            <Link to="https://focus-wtv.be/nieuws" style={{color: 'inherit', textDecoration: 'inherit'}}>Nieuws</Link>
          </Menubar.Trigger>
        </Menubar.Menu>

        <Menubar.Menu>
          <Menubar.Trigger 
            className="flex select-none items-center justify-between gap-0.5 rounded px-3 py-2 text-lg font-medium leading-none outline-none"
            style={menuItemStyle}
            onMouseEnter={(e) => e.target.style.color = menuItemHoverStyle.color}
            onMouseLeave={(e) => e.target.style.color = menuItemStyle.color}
          >
            <Link to="https://focus-wtv.be/sport" style={{color: 'inherit', textDecoration: 'inherit'}}>Sport</Link>
          </Menubar.Trigger>
        </Menubar.Menu>

        <Menubar.Menu>
          <Menubar.Trigger 
            className="flex select-none items-center justify-between gap-0.5 rounded px-3 py-2 text-lg font-medium leading-none outline-none"
            style={menuItemStyle}
            onMouseEnter={(e) => e.target.style.color = menuItemHoverStyle.color}
            onMouseLeave={(e) => e.target.style.color = menuItemStyle.color}
          >
            <Link to="https://focus-wtv.be/tendens" style={{color: 'inherit', textDecoration: 'inherit'}}>Tendens</Link>
          </Menubar.Trigger>
        </Menubar.Menu>

        <Menubar.Menu>
          <Menubar.Trigger 
            className="flex select-none items-center justify-between gap-0.5 rounded px-3 py-2 text-lg font-medium leading-none outline-none"
            style={menuItemStyle}
            onMouseEnter={(e) => e.target.style.color = menuItemHoverStyle.color}
            onMouseLeave={(e) => e.target.style.color = menuItemStyle.color}
          >
            <Link to="https://focus-wtv.be/programmas" style={{color: 'inherit', textDecoration: 'inherit'}}>Programmas</Link>
          </Menubar.Trigger>
        </Menubar.Menu>

        <Menubar.Menu>
          <Menubar.Trigger 
            className="flex select-none items-center justify-between gap-0.5 rounded px-3 py-2 text-lg font-medium leading-none outline-none"
            style={reizenItemStyle}
            onMouseEnter={(e) => e.target.style.color = reizenItemHoverStyle.color}
            onMouseLeave={(e) => e.target.style.color = reizenItemStyle.color}
          >
            <Link to="/" style={{color: 'inherit', textDecoration: 'inherit'}}>Reizen</Link>
          </Menubar.Trigger>
        </Menubar.Menu>
      </Menubar.Root>

      {/* IOSPlus */}
      <div className="hidden lg:flex absolute right-4 lg:static lg:ml-4 flex w-full mr-4 justify-center lg:justify-end items-center">
        <a href="https://focus-wtv.be/tv-zone" className="cursor-pointer">
          <img src={iosplus} alt="Logo" className="h-12 rounded-full" />
        </a>
      </div>

      {/* DropdownMenu for small screens */}
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button
            className="lg:hidden absolute right-4 top-2 inline-flex size-[35px] bg-white text-[#002855] items-center justify-center rounded-full shadow-[0_2px_10px] shadow-blackA4 outline-none hover:bg-violet3 focus:shadow-[0_0_0_2px] focus:shadow-black"
            aria-label="Customise options"
          >
            <HamburgerMenuIcon />
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content
            className="min-w-[220px] rounded-md bg-white p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade data-[side=right]:animate-slideLeftAndFade data-[side=top]:animate-slideDownAndFade"
            sideOffset={5}
          >
            <DropdownMenu.Item className="group relative text-lg flex h-[25px] cursor-pointer select-none items-center rounded-[3px] p-4 text-[15px]">
              <Link to={"https://focus-wtv.be/nieuws"}>Nieuws</Link>
            </DropdownMenu.Item>
            <DropdownMenu.Item className="group relative text-lg flex h-[25px] cursor-pointer select-none items-center rounded-[3px] p-4 text-[15px]">
              <Link to={"https://focus-wtv.be/sport"}>Sport</Link>
            </DropdownMenu.Item>
            <DropdownMenu.Item className="group relative text-lg flex h-[25px] cursor-pointer select-none items-center rounded-[3px] p-4 text-[15px]">
              <Link to={"https://focus-wtv.be/tendens"}>Tendens</Link>
            </DropdownMenu.Item>

            <DropdownMenu.Item className="group relative text-lg flex h-[25px] cursor-pointer select-none items-center rounded-[3px] p-4 text-[15px]">
              <Link to={"https://focus-wtv.be/programmas"}>Programmas</Link>
            </DropdownMenu.Item>
            <DropdownMenu.Item className="group relative text-lg flex h-[25px] cursor-pointer select-none items-center rounded-[3px] p-4 text-[15px]">
              <Link to={"/"}>Reizen</Link>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </div>
  );
};

export default GlobalNavbar;
