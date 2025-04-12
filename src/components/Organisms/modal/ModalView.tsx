import React from "react";
import CloseIcon from "../../svg/CloseIcon";

interface ModalPropsType {
  widthSize?: string;
  title?: string;
  content: React.ReactNode;
  isOpen: boolean;
  onCloseModal: () => void;
}

const ModalView = (props: ModalPropsType) => {
  const { title, content, isOpen, onCloseModal } = props;

  return (
    <div
      id="default-modal"
      tabIndex={-1}
      aria-hidden="true"
      className={`${
        isOpen ? "" : "hidden"
      } overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%)] max-h-full bg-black/40`}

    >
      <div className={`relative p-4 w-full max-w-xl max-h-full`}>
        <div className="relative rounded-lg shadow-sm bg-white text-black">
          <div className="flex items-center justify-between p-4 md:p-5">
            <h3 className="text-xl font-semibold">{title}</h3>
            {/* {--------------Close Button--------} */}
            <button
              type="button"
              className="text-black bg-transparent hover:bg-gray-200 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
              data-modal-hide="default-modal"
              onClick={onCloseModal}
            >
              <CloseIcon size={15} />
            </button>
            {/* {----------------Close Button--------} */}
          </div>
          <div className="pr-4 pl-6  pb-8 md:px-5 space-y-4">{content}</div>
        </div>
      </div>
    </div>
  );
};

export default ModalView;
