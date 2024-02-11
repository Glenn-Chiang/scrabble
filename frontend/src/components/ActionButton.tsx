interface ActionButtonProps {
  label: string;
  className: string;
  disabled?: boolean;
  onClick: () => void;
}

export function ActionButton({
  label,
  className,
  disabled,
  onClick,
}: ActionButtonProps) {
  return (
    <button
      onClick={onClick}
      className={[
        className,
        `py-2 px-4 shadow rounded-lg text-white ${disabled && "opacity-50"}`,
      ].join(" ")}
      disabled={disabled}
    >
      {label}
    </button>
  );
}
