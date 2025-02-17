import { FC, useEffect } from "react";
import {
  QueryRequestProvider,
  useQueryRequest,
} from "./core/QueryRequestProvider";
import {
  QueryResponseProvider,
  useQueryResponseData,
} from "./core/QueryResponseProvider";
import { addFriend } from "../../core/_requests";

type Props = {
  searchTerm?: string;
};
const SearchResult: FC<Props> = ({ searchTerm }) => {
  const result = useQueryResponseData();
  const { updateState } = useQueryRequest();
  const UPLOAD_URL = import.meta.env.VITE_APP_UPLOADS_URL;
  const handleAddFriend = (recipientId: string) => {
    addFriend(recipientId);
  };
  //   Effect for API call
  useEffect(
    () => {
      if (searchTerm !== undefined) {
        updateState({ search: searchTerm });
      }
    },
    [searchTerm] // Only call effect if debounced search term changes
    // More details about useDebounce: https://usehooks.com/useDebounce/
  );
  return (
    <div
      className="scroll-y me-n5 pe-5 h-200px h-lg-auto"
      data-kt-scroll="true"
      data-kt-scroll-activate="{default: false, lg: true}"
      data-kt-scroll-max-height="auto"
      data-kt-scroll-dependencies="#kt_header, #kt_toolbar, #kt_footer, #kt_chat_contacts_header"
      data-kt-scroll-wrappers="#kt_content, #kt_chat_contacts_body"
      data-kt-scroll-offset="0px"
    >
      {result.map((contact) => {
        return (
          <div key={contact._id}>
            <div className="d-flex flex-stack py-4">
              <div className="d-flex align-items-center">
                {contact.pic ? (
                  <div className="symbol symbol-45px symbol-circle">
                    <img alt="Pic" src={UPLOAD_URL + contact.pic.sizes.small} />
                  </div>
                ) : (
                  <div className="symbol symbol-45px symbol-circle">
                    <span className="symbol-label bg-light-danger text-danger fs-6 fw-bolder">
                      {contact.name[0].toUpperCase()}
                    </span>
                  </div>
                )}

                <div className="ms-5">
                  <a
                    // href="#"
                    className="fs-5 fw-bolder text-gray-900 text-hover-primary mb-2"
                  >
                    {contact.full_name}
                  </a>
                  {/* <div className="fw-bold text-gray-500">
                    {contact.phone_number}
                  </div> */}
                </div>
              </div>

              <div className="d-flex flex-column align-items-end ms-2">
                {(() => {
                  switch (true) {
                    case contact.is_friend:
                      return (
                        <button className="btn">
                          <i className="bi bi-chat-fill text-success"></i>
                        </button>
                      );
                    case !contact.is_friend && !contact.friend_request_sent:
                      return (
                        <button
                          className="btn"
                          onClick={(e) => {
                            e.preventDefault();
                            handleAddFriend(`${contact._id}`);
                          }}
                        >
                          <i className="bi bi-person-fill-add text-primary"></i>
                        </button>
                      );
                    case !contact.is_friend && contact.friend_request_sent:
                      return (
                        <span className="badge bg-warning text-dark">Pending</span>
                      );
                    default:
                      return (
                        <span className="text-secondary">Unknown Status</span>
                      );
                  }
                })()}
                {/* {contact.is_friend ? (
                  <button className="btn">
                    <i className="bi bi-chat-fill text-success"></i>
                  </button>
                ) : (
                  <button
                    className="btn"
                    onClick={(e) => {
                      e.preventDefault();
                      handleAddFriend(`${contact._id}`);
                    }}
                  >
                    <i className="bi bi-person-fill-add text-primary"></i>
                  </button>
                )} */}
              </div>
            </div>

            <div className="separator separator-dashed d-none"></div>
          </div>
        );
      })}
    </div>
  );
};
const SearchResultWrapper: FC<Props> = ({ searchTerm }) => {
  return (
    <QueryRequestProvider>
      <QueryResponseProvider>
        <SearchResult searchTerm={searchTerm} />
      </QueryResponseProvider>
    </QueryRequestProvider>
  );
};

export default SearchResultWrapper;
