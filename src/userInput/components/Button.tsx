import { h } from 'htm/preact';

type ButtonProps = {
  title: string;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
};
export function Button({ title, onClick, disabled, className }: ButtonProps) {
  return (
    <div style={{ display: "inline-block", margin: "5px 3px" }}>
      <button
        disabled={disabled} 
        className={className ?? "button-small"}
        onClick={() => onClick()}>
        {title}
      </button>
    </div>
  );
}

