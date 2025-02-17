import { FC } from "react";
import { Contact } from "../core/_models";

type Props = {
  contacts: Array<Contact> | undefined;
};

const ContactList: FC<Props> = ({ contacts }) => {
  const UPLOAD_URL = import.meta.env.VITE_APP_UPLOADS_URL;
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
        {contacts!.map((contact) => {
          return (
            <div key={contact._id}>
              <div className="d-flex flex-stack py-4">
                <div className="d-flex align-items-center">
                  {contact.pic ? (
                    <div className="symbol symbol-45px symbol-circle">
                      <img
                        alt="Pic"
                        src={UPLOAD_URL + contact.pic.sizes.small}
                      />
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
                    <div className="fw-bold text-gray-500">
                      {contact.phone_number}
                    </div>
                  </div>
                </div>

                <div className="d-flex flex-column align-items-end ms-2">
                  <span className="text-muted fs-7 mb-1">5 hrs</span>
                </div>
              </div>

              <div className="separator separator-dashed d-none"></div>
            </div>
          );
        })}
      </div>
    );
};

export default ContactList;