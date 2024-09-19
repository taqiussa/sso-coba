function Header({ setOpen }) {
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
        <a className="shrink-0" href="html/demo1.html">
          <img className="max-h-[25px] w-full" src="/media/app/mini-logo.svg" />
        </a>
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
              <div className="flex items-center justify-between flex-wrap gap-2 px-5 py-3.5">
                <div className="flex items-center flex-wrap gap-2">
                  <div className="flex items-center justify-center shrink-0 rounded-full bg-gray-100 border border-gray-200 size-10">
                    <img
                      alt=""
                      className="size-6"
                      src="/media/brand-logos/jira.svg"
                    />
                  </div>
                  <div className="flex flex-col">
                    <a
                      className="text-2sm font-semibold text-gray-900 hover:text-primary-active"
                      href="#"
                    >
                      Jira
                    </a>
                    <span className="text-2xs font-medium text-gray-600">
                      Project management
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 lg:gap-5">
                  <label className="switch switch-sm">
                    <input type="checkbox" defaultValue={2} />
                  </label>
                </div>
              </div>
              <div className="flex items-center justify-between flex-wrap gap-2 px-5 py-3.5">
                <div className="flex items-center flex-wrap gap-2">
                  <div className="flex items-center justify-center shrink-0 rounded-full bg-gray-100 border border-gray-200 size-10">
                    <img
                      alt=""
                      className="size-6"
                      src="/media/brand-logos/inferno.svg"
                    />
                  </div>
                  <div className="flex flex-col">
                    <a
                      className="text-2sm font-semibold text-gray-900 hover:text-primary-active"
                      href="#"
                    >
                      Inferno
                    </a>
                    <span className="text-2xs font-medium text-gray-600">
                      Ensures healthcare app
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 lg:gap-5">
                  <label className="switch switch-sm">
                    <input
                      defaultChecked={false}
                      type="checkbox"
                      defaultValue={1}
                    />
                  </label>
                </div>
              </div>
              <div className="flex items-center justify-between flex-wrap gap-2 px-5 py-3.5">
                <div className="flex items-center flex-wrap gap-2">
                  <div className="flex items-center justify-center shrink-0 rounded-full bg-gray-100 border border-gray-200 size-10">
                    <img
                      alt=""
                      className="size-6"
                      src="/media/brand-logos/evernote.svg"
                    />
                  </div>
                  <div className="flex flex-col">
                    <a
                      className="text-2sm font-semibold text-gray-900 hover:text-primary-active"
                      href="#"
                    >
                      Evernote
                    </a>
                    <span className="text-2xs font-medium text-gray-600">
                      Notes management app
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 lg:gap-5">
                  <label className="switch switch-sm">
                    <input
                      defaultChecked={false}
                      type="checkbox"
                      defaultValue={1}
                    />
                  </label>
                </div>
              </div>
              <div className="flex items-center justify-between flex-wrap gap-2 px-5 py-3.5">
                <div className="flex items-center flex-wrap gap-2">
                  <div className="flex items-center justify-center shrink-0 rounded-full bg-gray-100 border border-gray-200 size-10">
                    <img
                      alt=""
                      className="size-6"
                      src="/media/brand-logos/gitlab.svg"
                    />
                  </div>
                  <div className="flex flex-col">
                    <a
                      className="text-2sm font-semibold text-gray-900 hover:text-primary-active"
                      href="#"
                    >
                      Gitlab
                    </a>
                    <span className="text-2xs font-medium text-gray-600">
                      DevOps platform
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 lg:gap-5">
                  <label className="switch switch-sm">
                    <input type="checkbox" defaultValue={2} />
                  </label>
                </div>
              </div>
              <div className="flex items-center justify-between flex-wrap gap-2 px-5 py-3.5">
                <div className="flex items-center flex-wrap gap-2">
                  <div className="flex items-center justify-center shrink-0 rounded-full bg-gray-100 border border-gray-200 size-10">
                    <img
                      alt=""
                      className="size-6"
                      src="/media/brand-logos/google-webdev.svg"
                    />
                  </div>
                  <div className="flex flex-col">
                    <a
                      className="text-2sm font-semibold text-gray-900 hover:text-primary-active"
                      href="#"
                    >
                      Google webdev
                    </a>
                    <span className="text-2xs font-medium text-gray-600">
                      Building web expierences
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 lg:gap-5">
                  <label className="switch switch-sm">
                    <input
                      defaultChecked={false}
                      type="checkbox"
                      defaultValue={1}
                    />
                  </label>
                </div>
              </div>
            </div>
            <div className="grid p-5 border-t border-t-gray-200">
              <a
                className="btn btn-sm btn-light justify-center"
                href="html/demo1/account/api-keys.html"
              >
                Go to Apps
              </a>
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
                src="/media/avatars/300-2.png"
              />
            </div>
            <div className="menu-dropdown menu-default light:border-gray-300 w-full max-w-[250px]">
              <div className="flex items-center justify-between px-5 py-1.5 gap-1.5">
                <div className="flex items-center gap-2">
                  <img
                    alt=""
                    className="size-9 rounded-full border-2 border-success"
                    src="/media/avatars/300-2.png"
                  />
                  <div className="flex flex-col gap-1.5">
                    <span className="text-sm text-gray-800 font-semibold leading-none">
                      Cody Fisher
                    </span>
                    <a
                      className="text-xs text-gray-600 hover:text-primary font-medium leading-none"
                      href="html/demo1/account/home/get-started.html"
                    >
                      c.fisher@gmail.com
                    </a>
                  </div>
                </div>
                <span className="badge badge-xs badge-primary badge-outline">
                  Pro
                </span>
              </div>
              <div className="menu-separator"></div>
              <div className="flex flex-col">
                <div className="menu-item">
                  <a
                    className="menu-link"
                    href="html/demo1/public-profile/profiles/default.html"
                  >
                    <span className="menu-icon">
                      <i className="ki-filled ki-badge"></i>
                    </span>
                    <span className="menu-title">Public Profile</span>
                  </a>
                </div>
                <div className="menu-item">
                  <a
                    className="menu-link"
                    href="html/demo1/account/home/user-profile.html"
                  >
                    <span className="menu-icon">
                      <i className="ki-filled ki-profile-circle"></i>
                    </span>
                    <span className="menu-title">My Profile</span>
                  </a>
                </div>
                <div
                  className="menu-item"
                  data-menu-item-offset="-50px, 0"
                  data-menu-item-placement="left-start"
                  data-menu-item-toggle="dropdown"
                  data-menu-item-trigger="click|lg:hover"
                >
                  <div className="menu-link">
                    <span className="menu-icon">
                      <i className="ki-filled ki-setting-2"></i>
                    </span>
                    <span className="menu-title">My Account</span>
                    <span className="menu-arrow">
                      <i className="ki-filled ki-right text-3xs"></i>
                    </span>
                  </div>
                  <div className="menu-dropdown menu-default light:border-gray-300 w-full max-w-[220px]">
                    <div className="menu-item">
                      <a
                        className="menu-link"
                        href="html/demo1/account/home/get-started.html"
                      >
                        <span className="menu-icon">
                          <i className="ki-filled ki-coffee"></i>
                        </span>
                        <span className="menu-title">Get Started</span>
                      </a>
                    </div>
                    <div className="menu-item">
                      <a
                        className="menu-link"
                        href="html/demo1/account/home/user-profile.html"
                      >
                        <span className="menu-icon">
                          <i className="ki-filled ki-some-files"></i>
                        </span>
                        <span className="menu-title">My Profile</span>
                      </a>
                    </div>
                    <div className="menu-item">
                      <a className="menu-link" href="#">
                        <span className="menu-icon">
                          <i className="ki-filled ki-icon"></i>
                        </span>
                        <span className="menu-title">Billing</span>
                        <span
                          className="menu-badge"
                          data-tooltip="true"
                          data-tooltip-placement="top"
                        >
                          <i className="ki-filled ki-information-2 text-md text-gray-500"></i>
                          <span className="tooltip" data-tooltip-content="true">
                            Payment and subscription info
                          </span>
                        </span>
                      </a>
                    </div>
                    <div className="menu-item">
                      <a
                        className="menu-link"
                        href="html/demo1/account/security/overview.html"
                      >
                        <span className="menu-icon">
                          <i className="ki-filled ki-medal-star"></i>
                        </span>
                        <span className="menu-title">Security</span>
                      </a>
                    </div>
                    <div className="menu-item">
                      <a
                        className="menu-link"
                        href="html/demo1/account/members/teams.html"
                      >
                        <span className="menu-icon">
                          <i className="ki-filled ki-setting"></i>
                        </span>
                        <span className="menu-title">Members &amp; Roles</span>
                      </a>
                    </div>
                    <div className="menu-item">
                      <a
                        className="menu-link"
                        href="html/demo1/account/integrations.html"
                      >
                        <span className="menu-icon">
                          <i className="ki-filled ki-switch"></i>
                        </span>
                        <span className="menu-title">Integrations</span>
                      </a>
                    </div>
                    <div className="menu-separator"></div>
                    <div className="menu-item">
                      <a
                        className="menu-link"
                        href="html/demo1/account/security/overview.html"
                      >
                        <span className="menu-icon">
                          <i className="ki-filled ki-shield-tick"></i>
                        </span>
                        <span className="menu-title">Notifications</span>
                        <label className="switch switch-sm">
                          <input
                            defaultChecked={false}
                            name="check"
                            type="checkbox"
                            defaultValue={1}
                          />
                        </label>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="menu-item">
                  <a className="menu-link" href="https://devs.keenthemes.com">
                    <span className="menu-icon">
                      <i className="ki-filled ki-message-programming"></i>
                    </span>
                    <span className="menu-title">Dev Forum</span>
                  </a>
                </div>
                <div
                  className="menu-item"
                  data-menu-item-offset="-10px, 0"
                  data-menu-item-placement="left-start"
                  data-menu-item-toggle="dropdown"
                  data-menu-item-trigger="click|lg:hover"
                >
                  <div className="menu-link">
                    <span className="menu-icon">
                      <i className="ki-filled ki-icon"></i>
                    </span>
                    <span className="menu-title">Language</span>
                    <div className="flex items-center gap-1.5 rounded-md border border-gray-300 text-gray-600 p-1.5 text-2xs font-medium shrink-0">
                      English
                      <img
                        alt=""
                        className="inline-block size-3.5 rounded-full"
                        src="/media/flags/united-states.svg"
                      />
                    </div>
                  </div>
                  <div className="menu-dropdown menu-default light:border-gray-300 w-full max-w-[170px]">
                    <div className="menu-item active">
                      <a className="menu-link h-10" href="#">
                        <span className="menu-icon">
                          <img
                            alt=""
                            className="inline-block size-4 rounded-full"
                            src="/media/flags/united-states.svg"
                          />
                        </span>
                        <span className="menu-title">English</span>
                        <span className="menu-badge">
                          <i className="ki-solid ki-check-circle text-success text-base"></i>
                        </span>
                      </a>
                    </div>
                    <div className="menu-item">
                      <a className="menu-link h-10" href="#">
                        <span className="menu-icon">
                          <img
                            alt=""
                            className="inline-block size-4 rounded-full"
                            src="/media/flags/spain.svg"
                          />
                        </span>
                        <span className="menu-title">Spanish</span>
                      </a>
                    </div>
                    <div className="menu-item">
                      <a className="menu-link h-10" href="#">
                        <span className="menu-icon">
                          <img
                            alt=""
                            className="inline-block size-4 rounded-full"
                            src="/media/flags/germany.svg"
                          />
                        </span>
                        <span className="menu-title">German</span>
                      </a>
                    </div>
                    <div className="menu-item">
                      <a className="menu-link h-10" href="#">
                        <span className="menu-icon">
                          <img
                            alt=""
                            className="inline-block size-4 rounded-full"
                            src="/media/flags/japan.svg"
                          />
                        </span>
                        <span className="menu-title">Japanese</span>
                      </a>
                    </div>
                    <div className="menu-item">
                      <a className="menu-link h-10" href="#">
                        <span className="menu-icon">
                          <img
                            alt=""
                            className="inline-block size-4 rounded-full"
                            src="/media/flags/france.svg"
                          />
                        </span>
                        <span className="menu-title">French</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="menu-separator"></div>
              <div className="flex flex-col">
                <div className="menu-item mb-0.5">
                  <div className="menu-link">
                    <span className="menu-icon">
                      <i className="ki-filled ki-moon"></i>
                    </span>
                    <span className="menu-title">Dark Mode</span>
                    <label className="switch switch-sm">
                      <input
                        data-theme-state="dark"
                        data-theme-toggle="true"
                        name="check"
                        type="checkbox"
                        defaultValue={1}
                      />
                    </label>
                  </div>
                </div>
                <div className="menu-item px-4 py-1.5">
                  <a
                    className="btn btn-sm btn-light justify-center"
                    href="html/demo1/authentication/classic/sign-in.html"
                  >
                    Log out
                  </a>
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