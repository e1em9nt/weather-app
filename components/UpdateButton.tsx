import { MouseEvent } from "react";

interface UpdateButtonProps {
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
}
export default function UpdateButton({ onClick }: UpdateButtonProps) {
  return (
    <button className="btn" onClick={onClick}>
      Update
    </button>
  );
}
