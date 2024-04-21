import { Transition } from "@headlessui/react";

export default function MyComponent({ isShowing }: { isShowing: boolean }) {
  return (
    <>
      <Transition
        show={isShowing}
        enter="transition-opacity duration-75"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        I will fade in and out
      </Transition>
    </>
  );
}
