import { IconDefinition } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ActionButtonProps {
  label: string;
  icon?: IconDefinition;
  className: string;
  disabled?: boolean;
  onClick: () => void;
}

export function ActionButton({
  label,
  icon,
  className,
  disabled,
  onClick,
}: ActionButtonProps) {
  return (
    <button
      onClick={onClick}
      className={[
        className,
        `py-2 px-4 rounded-lg font-semibold flex gap-1 items-center justify-center ${
          disabled && "opacity-50 animate-none"
        }`,
      ].join(" ")}
      disabled={disabled}
    >
      {icon && <FontAwesomeIcon icon={icon} />}
      {label}
    </button>
  );
}
