import Overlay from "../../../shared/components/layout/Overlay";
import Button from "../../../shared/components/ui/Button";

import ChangePasswordForm from "../components/ChangePasswordForm";

function ChangePasswordOverlay({ onClose }) {
  return (
    <Overlay>
      <div
        className="py-8 px-6 rounded-lg border-1 max-w-sm w-full
        bg-bg-base border-border/50"
      >
        <section className="flex items-center justify-between mb-6">
          <h2 className="font-semibold text-text-primary text-xl">
            Change Password
          </h2>

          <Button
            icon={{ icon: "x", size: 14 }}
            variant={"secondary"}
            className={"!p-0 border-none hover:bg-transparent"}
            onClick={onClose}
          />
        </section>

        <ChangePasswordForm onClose={onClose} />
      </div>
    </Overlay>
  );
}

export default ChangePasswordOverlay;
