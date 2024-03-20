import React from 'react';
import classNames from 'classnames';
import { Link, useLocation } from 'react-router-dom';
import { IoBodyOutline } from "react-icons/io5";
import { DASHBOARD_SIDEBAR_LINKS, DASHBOARD_SIDEBAR_BOTTOM_LINKS } from '../../lib/constants';

const linkClass =
  'flex items-center gap-2 font-light px-3 py-2 hover:bg-yellow-300 hover:no-underline active:bg-yellow-500 rounded-sm text-base';

export default function Sidebar() {
  return (
    <div className="bg-gradient-to-b from-blue-600 to-blue-400 w-60 p-3 flex flex-col">
      <div className="flex item-center gap-2 px-1 py-3">
        <IoBodyOutline fontSize={24} style={{ color: 'white' }} />
        <span className="text-white text-l font-semibold">Statistik Rata-Rata BMI Kelas 02TPLM001</span>
      </div>
      <div className="py-8 flex flex-1 flex-col gap-0.6">
        {DASHBOARD_SIDEBAR_LINKS.map((link) => (
          <SidebarLink key={link.key} link={link} />
        ))}
      </div>
      <div className="flex flex-col gap-0.5 pt-2 border-t border-yellow-400">
       <p>Muchtar Ali Anwar</p>
       <p>231011402217</p>
      </div>
    </div>
  );
}

function SidebarLink({ link }) {
  const { pathname } = useLocation();

  return (
    <Link
      to={link.path}
      className={classNames(pathname === link.path ? 'bg-yellow-400 text-black' : 'text-fuchsia-50', linkClass)}
    >
      <span className="text-xl">{link.icon}</span>
      <span className="text-base font-semibold">{link.label}</span>
    </Link>
  );
}
