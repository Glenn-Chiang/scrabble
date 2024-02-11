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
        `py-2 px-4 rounded-lg font-semibold ${disabled && "opacity-50 animate-none"}`,
      ].join(" ")}
      disabled={disabled}
    >
      {label}
    </button>
  );
}
