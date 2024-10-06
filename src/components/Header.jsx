import { avatarUrl } from "@/functions/config/env";
import { Link } from "react-router-dom";

function Header({ setOpen, logout, user, loading, apps }) {
  return <header
    className="header w-full fixed top-0 z-10 left-0 right-0 bg-[#fefefe] dark:bg-coal-500"
    data-sticky="true"
    data-sticky-class="shadow-sm dark:border-b dark:border-b-coal-100"
    data-sticky-name="header"
    id="header"
  >
    {/* begin: container */}
    <div
      className="container-fixed flex lg:fixed lg:right-0 justify-between items-stretch lg:gap-4"
      id="header_container"
    >
      <div className="flex gap-1 lg:hidden items-center -ml-1">
        <span className="shrink-0">
          <img className="h-7" src="/logo.png" />
        </span>
        <div className="flex items-center">
          <button
            onClick={() => setOpen(true)}
            className="btn btn-icon btn-light btn-clear btn-sm"
            data-drawer-toggle="#sidebar"
          >
            <i className="ki-filled ki-menu"></i>
          </button>
          <button
            className="btn btn-icon btn-light btn-clear btn-sm"
            data-drawer-toggle="#megamenu_wrapper"
          >
            <i className="ki-filled ki-burger-menu-2"></i>
          </button>
        </div>
      </div>
      <div className="flex items-center gap-2 lg:gap-3.5 lg:flex-1 lg:justify-end">
        <div
          className="dropdown"
          data-dropdown="true"
          data-dropdown-offset="10px, 10px"
          data-dropdown-placement="bottom-end"
          data-dropdown-trigger="click|lg:click"
        >
          <button className="dropdown-toggle btn btn-icon btn-icon-lg size-9 rounded-full hover:bg-primary-light hover:text-primary dropdown-open:bg-primary-light dropdown-open:text-primary text-gray-500">
            <i className="ki-filled ki-element-11"></i>
          </button>
          <div className="dropdown-content light:border-gray-300 w-full max-w-[320px]">
            <div className="flex items-center justify-between gap-2.5 text-2xs text-gray-600 font-medium px-5 py-3 border-b border-b-gray-200">
              <span>Apps</span>
              <span>Enabled</span>
            </div>
            <div className="flex flex-col scrollable-y-auto max-h-[400px] divide-y divide-gray-200">
              {Object.entries(apps).map(([category, items]) => (
                <div className="flex items-center justify-between flex-wrap gap-2 px-5 py-3.5">
                  <div className="flex items-center flex-wrap gap-2">
                    <div className="flex items-center justify-center shrink-0 rounded-full bg-gray-100 border border-gray-200 size-10">
                      <img
                        alt=""
                        className="size-6"
                        src="/logo.png"
                      />
                    </div>
                    <div className="flex flex-col">
                      <a
                        className="text-2sm font-semibold text-gray-900 hover:text-primary-active"
                        href="#"
                      >
                        {category}
                      </a>
                      <span className="text-2xs font-medium text-gray-600">
                        {items[0].deskripsi}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="menu" data-menu="true">
          <div
            className="menu-item"
            data-menu-item-offset="20px, 10px"
            data-menu-item-placement="bottom-end"
            data-menu-item-toggle="dropdown"
            data-menu-item-trigger="click|lg:click"
          >
            <div className="menu-toggle btn btn-icon rounded-full">
              <img
                alt=""
                className="size-9 rounded-full border-2 border-success shrink-0"
                src={user?.avatar ? `${avatarUrl}${user?.avatar}` : 'default.png'}
              />
            </div>
            <div className="menu-dropdown menu-default light:border-gray-300 w-full max-w-[250px]">
              <div className="flex items-center justify-between px-5 py-1.5 gap-1.5">
                <div className="flex items-center gap-2">
                  <img
                    alt="foto"
                    className="size-9 rounded-full border-2 border-success"
                    src={user?.avatar ? `${avatarUrl}${user?.avatar}` : 'default.png'}
                  />
                  <div className="flex flex-col gap-1.5">
                    <span className="text-sm text-gray-800 font-semibold leading-none">
                      {user?.nama_lengkap || 'No Data Available'}
                    </span>
                  </div>
                </div>
              </div>
              <div className="menu-separator"></div>
              <div className="flex flex-col">
                <div className="menu-item">
                  <Link
                    className="menu-link"
                    to='/user-profile'
                  >
                    <span className="menu-icon">
                      <i className="ki-filled ki-profile-circle"></i>
                    </span>
                    <span className="menu-title">My Profile</span>
                  </Link>
                </div>
              </div>
              <div className="menu-separator"></div>
              <div className="flex flex-col">
                <div onClick={logout} className="menu-item px-4 py-1.5">
                  <span
                    className="btn btn-sm btn-light justify-center"
                  >
                    Log out
                    <div className={`${loading ? 'inline-flex' : 'hidden'}`}>
                      <i class="ki-filled ki-arrows-circle animate-spin"></i>
                    </div>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>;
}

export default Header