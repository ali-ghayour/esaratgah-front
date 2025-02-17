import { FC, useEffect, useState } from "react";
import { FriendRequest } from "../core/_models";
import { getFriendRequests } from "../core/_requests";

const FriendRequestList: FC = () => {
  const [friendRequest, setFriendRequest] = useState<FriendRequest[] | undefined>([]);
  const UPLOAD_URL = import.meta.env.VITE_APP_UPLOADS_URL;

  useEffect(() => {
    getFriendRequests().then((result) => setFriendRequest(result!.data));

    return () => {};
  }, []);
  console.log(friendRequest);
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
      {friendRequest!.map((contact) => {
        return (
          <div key={contact._id}>
            <div className="d-flex flex-stack py-4">
              <div className="d-flex align-items-center">
                {contact.sender.pic ? (
                  <div className="symbol symbol-45px symbol-circle">
                    <img
                      alt="Pic"
                      src={UPLOAD_URL + contact.sender.pic.sizes.small}
                    />
                  </div>
                ) : (
                  <div className="symbol symbol-45px symbol-circle">
                    <span className="symbol-label bg-light-danger text-danger fs-6 fw-bolder">
                      {contact.sender.full_name.toUpperCase()}
                    </span>
                  </div>
                )}

                <div className="ms-5">
                  <a
                    // href="#"
                    className="fs-5 fw-bolder text-gray-900 text-hover-primary mb-2"
                  >
                    {contact.sender.full_name}
                  </a>
                  <div className="fw-bold text-gray-500">
                    {contact.sender.phone_number}
                  </div>
                </div>
              </div>

              <div className="d-flex align-items-end ms-2">
                <button className="btn">
                  <i className="bi bi-check2 text-success fs-6"></i>
                </button>
                <button className="btn">
                  <i className="bi bi-x text-danger fs-6"></i>
                </button>
              </div>
            </div>

            <div className="separator separator-dashed d-none"></div>
          </div>
        );
      })}
    </div>
  );
};

export default FriendRequestList;
