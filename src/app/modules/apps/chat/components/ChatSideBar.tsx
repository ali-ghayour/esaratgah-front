import { FC, useEffect, useState } from "react";
import { KTIcon, useDebounce } from "../../../../../_metronic/helpers";
import ContactList from "./ContactList";
import SearchResultWrapper from "./Search/SearchResult";
import { getContacts } from "../core/_requests";
import { Contact } from "../core/_models";
import FriendRequestList from "./FriendRequestList";
export const ChatSideBar: FC = () => {
  const [contacts, setContacts] = useState<Contact[] | undefined>([]);
  const [activeTab, setActiveTab] = useState("contacts");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearchTerm = useDebounce(searchTerm, 1000);
  useEffect(() => {
    getContacts().then((result) => setContacts(result!.data));

    return () => {};
  }, []);

  return (
    <>
      <div className="flex-column flex-lg-row-auto w-100 w-lg-300px w-xl-400px mb-10 mb-lg-0">
        <div className="card card-flush">
          <div className="card-header pt-7" id="kt_chat_contacts_header">
            <div className="container">
              <div className="row mb-4">
                <form className="w-100 position-relative" autoComplete="off">
                  <KTIcon
                    iconName="magnifier"
                    className="fs-2 text-lg-1 text-gray-500 position-absolute top-50 ms-5 translate-middle-y"
                  />

                  <input
                    type="text"
                    className="form-control form-control-solid px-15"
                    name="search"
                    placeholder="Search by username or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </form>
              </div>
              <div className="separator separator-dashed d-none"></div>
              <div className="container mt-3">
                {/* Navigation Menu */}
                <div className="row text-center">
                  {[
                    {
                      id: "contacts",
                      icon: "bi-people-fill",
                      title: "Contacts",
                    },
                    { id: "chats", icon: "bi-chat-fill", title: "Chat" },
                    { id: "settings", icon: "bi-gear-fill", title: "Settings" },
                  ].map((item) => (
                    <div className="col-4" key={item.id}>
                      <div
                        className={`menu-item py-2 ${
                          activeTab === item.id ? "active" : ""
                        }`}
                        onClick={() => {
                          setActiveTab(item.id);
                          setSearchTerm("");
                        }}
                        style={{ cursor: "pointer" }}
                      >
                        <i className={`bi ${item.icon} fs-1 d-block`}></i>
                        <span className="menu-title">{item.title}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Content Section */}
                {/* <div className="mt-4 p-3 border rounded">
                  {activeTab === "contacts" && <h3>📇 Contacts List</h3>}
                  {activeTab === "chats" && <h3>💬 Chat Section</h3>}
                  {activeTab === "settings" && <h3>⚙️ Settings Panel</h3>}
                </div> */}
              </div>
            </div>
          </div>

          <div className="card-body pt-5" id="kt_chat_contacts_body">
            {debouncedSearchTerm!.length > 0 && (
              <SearchResultWrapper searchTerm={debouncedSearchTerm} />
            )}
            {activeTab === "contacts" && debouncedSearchTerm!.length === 0 && (
              <>
                <div className="accordion border-0" id="ContactsList">
                  <div className="accordion-item border-0">
                    <h2 className="accordion-header" id="friendRequests">
                      <button
                        className="accordion-button border-0 bg-transparent text-dark collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseFriendRequest"
                        aria-expanded="true"
                        aria-controls="collapseFriendRequest"
                      >
                        Friend Requests
                      </button>
                    </h2>
                    <div
                      id="collapseFriendRequest"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingOne"
                      data-bs-parent="#ContactsList"
                    >
                      <div className="accordion-body p-0">
                        <FriendRequestList />
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item border-0">
                    <h2 className="accordion-header" id="ContactsHeading">
                      <button
                        className="accordion-button border-0 bg-transparent text-dark"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#Contacts"
                        aria-expanded="true"
                        aria-controls="Contacts"
                      >
                        Contacts
                      </button>
                    </h2>
                    <div
                      id="Contacts"
                      className="accordion-collapse collapse show"
                      aria-labelledby="Contacts"
                      data-bs-parent="#ContactsList"
                    >
                      <div className="accordion-body p-0">
                        <ContactList contacts={contacts} />
                      </div>
                    </div>
                  </div>
                  {/* <div className="accordion-item">
                    <h2 className="accordion-header" id="headingTwo">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseTwo"
                        aria-expanded="false"
                        aria-controls="collapseTwo"
                      >
                        Accordion Item #2
                      </button>
                    </h2>
                    <div
                      id="collapseTwo"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingTwo"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body">
                        <strong>
                          This is the second item's accordion body.
                        </strong>{" "}
                        It is hidden by default, until the collapse plugin adds
                        the appropriate classes that we use to style each
                        element. These classes control the overall appearance,
                        as well as the showing and hiding via CSS transitions.
                        You can modify any of this with custom CSS or overriding
                        our default variables. It's also worth noting that just
                        about any HTML can go within the{" "}
                        <code>.accordion-body</code>, though the transition does
                        limit overflow.
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingThree">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseThree"
                        aria-expanded="false"
                        aria-controls="collapseThree"
                      >
                        Accordion Item #3
                      </button>
                    </h2>
                    <div
                      id="collapseThree"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingThree"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body">
                        <strong>
                          This is the third item's accordion body.
                        </strong>{" "}
                        It is hidden by default, until the collapse plugin adds
                        the appropriate classes that we use to style each
                        element. These classes control the overall appearance,
                        as well as the showing and hiding via CSS transitions.
                        You can modify any of this with custom CSS or overriding
                        our default variables. It's also worth noting that just
                        about any HTML can go within the{" "}
                        <code>.accordion-body</code>, though the transition does
                        limit overflow.
                      </div>
                    </div>
                  </div> */}
                </div>
              </>
            )}
            {activeTab === "chats" && debouncedSearchTerm!.length === 0 && (
              <h3>💬 Chat Section</h3>
            )}
            {activeTab === "settings" && debouncedSearchTerm!.length === 0 && (
              <h3>⚙️ Settings Panel</h3>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
