import React, { JSX } from "react";
import PrimaryButton from "../../Atoms/buttons/PrimaryButton";
import SecondaryButton from "../../Atoms/buttons/SecondaryButton";

interface ModalPropsType {
  content: JSX.Element;
  isOpen: boolean;
  onCloseModal: () => void;
  onSubmitForm: (e: React.FormEvent) => void;
  submitButtonText: string;
}

const ModalForm = (props: ModalPropsType) => {
  const { content, isOpen, onCloseModal, onSubmitForm, submitButtonText} = props;

  return (
    <div
      id="default-modal"
      tabIndex={-1}
      aria-hidden="true"
      className={`${
        isOpen ? "" : "hidden"
      } overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%)] max-h-full bg-black bg-black/40`}
    >
      <div className={`relative p-4 w-full max-h-full max-w-xl`}>
        <div className="relative rounded-lg shadow-sm bg-white text-black">
          <form onSubmit={onSubmitForm}>
            <div className="pt-4 pr-8 pl-8">{content}</div>
            <div className="flex pr-4 pl-4 pb-6 w-full justify-center">
              <div className="flex flex-col gap-2 w-1/3">
                <PrimaryButton width="50%">{submitButtonText}</PrimaryButton>
                <SecondaryButton width="50%" onClick={onCloseModal}>
                  Cancel
                </SecondaryButton>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalForm;
